import { NextResponse } from "next/server";
import { checkDatabaseHealth, getConnectionInfo } from "../../../../src/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const startTime = Date.now();

    // Verificar saúde do banco
    const isHealthy = await checkDatabaseHealth();
    const responseTime = Date.now() - startTime;

    // Obter informações da conexão
    const connectionInfo = getConnectionInfo();

    // Informações do ambiente
    const environment = {
      nodeEnv: process.env.NODE_ENV,
      isVercel: process.env.VERCEL === "1",
      region: process.env.VERCEL_REGION || "unknown",
      functionTimeout: process.env.VERCEL_FUNCTION_TIMEOUT || "unknown",
    };

    // Informações de conexão
    const databaseInfo = {
      databaseUrl: process.env.DATABASE_URL ? "configured" : "missing",
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      isUsingPooling: connectionInfo.isUsingPooling,
      port: connectionInfo.port,
    };

    // Gerar recomendações baseadas no status
    const recommendations = [];

    if (!isHealthy) {
      recommendations.push(
        "Database connection failed - check Supabase status"
      );
    }

    if (!connectionInfo.isUsingPooling) {
      recommendations.push(
        "⚠️ Not using connection pooling - recommended for Vercel serverless"
      );
      recommendations.push(
        "Enable connection pooling in Supabase Dashboard → Database → Connection pooling"
      );
      recommendations.push(
        "Use URL: postgresql://postgres.[project]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
      );
    }

    if (responseTime > 5000) {
      recommendations.push(
        "Response time is high (>5s) - consider optimizing queries"
      );
    }

    if (!databaseInfo.hasSupabaseUrl || !databaseInfo.hasSupabaseKey) {
      recommendations.push("Missing Supabase environment variables");
    }

    if (isHealthy) {
      return NextResponse.json({
        status: "healthy",
        database: "connected",
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        environment,
        databaseInfo,
        recommendations,
        connectionType: connectionInfo.isUsingPooling
          ? "Connection Pooling (PgBouncer)"
          : "Direct Connection",
      });
    } else {
      return NextResponse.json(
        {
          status: "unhealthy",
          database: "disconnected",
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString(),
          environment,
          databaseInfo,
          recommendations,
          connectionType: connectionInfo.isUsingPooling
            ? "Connection Pooling (PgBouncer)"
            : "Direct Connection",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("❌ [DB Status] Error:", error);
    return NextResponse.json(
      {
        status: "error",
        database: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        environment: {
          nodeEnv: process.env.NODE_ENV,
          isVercel: process.env.VERCEL === "1",
        },
        recommendations: [
          "Check application logs for detailed error information",
          "Verify all environment variables are set correctly",
          "Enable connection pooling in Supabase Dashboard",
          "Contact support if issue persists",
        ],
      },
      { status: 500 }
    );
  }
}
