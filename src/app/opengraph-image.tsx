import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'WhoIsMakingMoney.ai - AI Product Analysis Platform'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: '40px',
                fontWeight: 'bold',
              }}
            >
              W
            </div>
          </div>
          <div
            style={{
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            WhoIsMakingMoney.ai
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            color: 'white',
            fontSize: '64px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            maxWidth: '1000px',
            lineHeight: 1.1,
          }}
        >
          Find Your Next Profitable AI Project
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: '#94a3b8',
            fontSize: '32px',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.3,
          }}
        >
          Explore in-depth case studies of today&apos;s fastest-growing AI applications
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
