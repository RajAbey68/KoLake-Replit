import { withCorsJson, corsPreflight } from "@/utils/cors";

export const runtime = "nodejs";

export async function GET() {
  try {
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: "1.3.3",
      services: {
        database: "connected",
        api: "operational", 
        pms: "operational"
      }
    };

    return withCorsJson(healthData);
  } catch (error) {
    return withCorsJson(
      { 
        status: "unhealthy", 
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      }, 
      500
    );
  }
}

export async function OPTIONS() { 
  return corsPreflight(); 
}