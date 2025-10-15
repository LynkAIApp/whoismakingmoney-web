import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 简单的健康检查
    return NextResponse.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'whoismakingmoney-web'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
