'use client'

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import type { BaseTheme } from '@clerk/types'
import { LogIn, UserPlus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import styles from './user-menu.module.scss'

export type UserMenuProps = {
  className?: string
  signedOutMode?: 'redirect' | 'buttons'
}

export function UserMenu({
  className,
  signedOutMode = 'buttons',
}: UserMenuProps) {
  return (
    <div className={cn(styles.root, className)}>
      <SignedIn>
        <UserButton
          appearance={{
            baseTheme: 'dark' as unknown as BaseTheme,
            variables: {
              colorBackground: '#020617',
              colorText: '#f9fafb',
              colorPrimary: '#f97316',
              colorTextOnPrimaryBackground: '#020617',
            },
            elements: {
              userButtonAvatarBox: styles.userAvatarBox,
              userButtonTrigger: styles.userButtonTrigger,
              userButtonPopoverCard: styles.popoverCard,
              userButtonPopoverHeaderTitle: styles.popoverTitle,
              userButtonPopoverHeaderSubtitle: styles.popoverSubtitle,
              userButtonPopoverActionButton: styles.popoverAction,
              userButtonPopoverActionButtonIcon: styles.popoverActionIcon,
              userButtonPopoverActionButtonText: styles.popoverActionText,
              userButtonPopoverFooter: styles.popoverFooter,
            },
          }}
        />
      </SignedIn>

      <SignedOut>
        {signedOutMode === 'redirect' ? (
          <RedirectToSignIn />
        ) : (
          <div className={styles.authButtons}>
            <SignInButton mode="modal">
              <Button variant="secondaryCta" size="sm">
                <LogIn size={14} />
                Entrar
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button variant="neon" size="sm">
                <UserPlus size={14} />
                Criar conta
              </Button>
            </SignUpButton>
          </div>
        )}
      </SignedOut>
    </div>
  )
}
