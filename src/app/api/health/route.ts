import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "../../../../src/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const startTime = Date.now();
    const isHealthy = await checkDatabaseHealth();
    const responseTime = Date.now() - startTime;

    if (isHealthy) {
      return NextResponse.json({
        status: "healthy",
        database: "connected",
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        isVercel: process.env.VERCEL === "1",
      });
    } else {
      return NextResponse.json(
        {
          status: "unhealthy",
          database: "disconnected",
          responseTime: `${responseTime}ms`,
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
          isVercel: process.env.VERCEL === "1",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("❌ [Health Check] Error:", error);
    return NextResponse.json(
      {
        status: "error",
        database: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        isVercel: process.env.VERCEL === "1",
      },
      { status: 500 }
    );
  }
}
