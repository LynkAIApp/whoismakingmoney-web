'use client'

import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { useLoginModalStore } from '@/store/login-modal-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogIn, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function UserMenu() {
  const { user, signOut } = useAuth()
  const { openLoginModal } = useLoginModalStore()
  const t = useTranslations('userMenu')

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={() => openLoginModal()}>
        <LogIn className="h-4 w-4 mr-2" />
        {t('signIn')}
      </Button>
    )
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const userInitials = user.email
    ? user.email.charAt(0).toUpperCase()
    : 'U'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{user.email}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.user_metadata?.full_name || 'User'}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('signOut')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
