import { NextResponse } from 'next/server';

// 健康检查端点 - 必须快速响应，不依赖任何外部服务
export async function GET() {
  try {
    // 简单的健康检查，确保快速响应
    // 不进行任何数据库或外部服务调用，避免影响健康检查性能
    return NextResponse.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'whoismakingmoney-web',
        uptime: process.uptime()
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    // 即使出错也要返回响应，避免健康检查失败
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}
