'use client'

import { useAuth } from '@/lib/auth-context'
import { useLoginModalStore } from '@/store/login-modal-store'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface LockedCardProps {
  children: React.ReactNode
  lockedContent: React.ReactNode
}

export function LockedCard({ children, lockedContent }: LockedCardProps) {
  const { user } = useAuth()
  const { openLoginModal } = useLoginModalStore()
  const [isClient, setIsClient] = useState(false)
  const t = useTranslations('lockedCard')

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 在服务端渲染时，总是显示锁定内容
  if (!isClient) {
    return (
      <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
        {lockedContent}
        
        {/* Locked Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-gray-800/80 dark:to-gray-800 backdrop-blur-sm">
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-3">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('signInToUnlock')}</p>
              <button 
                onClick={() => openLoginModal()}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {t('signInButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 在客户端渲染时，根据用户状态决定显示内容
  if (user) {
    return <>{children}</>
  }

  // If user is not authenticated, show locked content with auth dialog
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
      {lockedContent}
      
      {/* Locked Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-gray-800/80 dark:to-gray-800 backdrop-blur-sm">
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-3">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('signInToUnlock')}</p>
            <button 
              onClick={() => openLoginModal()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {t('signInButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}