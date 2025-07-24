import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "../../../../src/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const startTime = Date.now();

    // Verificar saúde do banco
    const isHealthy = await checkDatabaseHealth();
    const responseTime = Date.now() - startTime;

    // Informações do ambiente
    const environment = {
      nodeEnv: process.env.NODE_ENV,
      isVercel: process.env.VERCEL === "1",
      region: process.env.VERCEL_REGION || "unknown",
      functionTimeout: process.env.VERCEL_FUNCTION_TIMEOUT || "unknown",
    };

    // Informações de conexão
    const connectionInfo = {
      databaseUrl: process.env.DATABASE_URL ? "configured" : "missing",
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    };

    if (isHealthy) {
      return NextResponse.json({
        status: "healthy",
        database: "connected",
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        environment,
        connectionInfo,
        recommendations:
          responseTime > 5000
            ? [
                "Response time is high (>5s), consider optimizing database queries",
                "Check if Supabase is experiencing high load",
              ]
            : [],
      });
    } else {
      return NextResponse.json(
        {
          status: "unhealthy",
          database: "disconnected",
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString(),
          environment,
          connectionInfo,
          recommendations: [
            "Check Supabase service status",
            "Verify DATABASE_URL is correct",
            "Check network connectivity from Vercel to Supabase",
            "Consider increasing connection timeout settings",
          ],
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
          "Contact support if issue persists",
        ],
      },
      { status: 500 }
    );
  }
}
