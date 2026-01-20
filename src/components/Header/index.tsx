'use client'

import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import type { BaseTheme } from '@clerk/types'
import { LineChart, Sparkles } from 'lucide-react'
import styles from './header.module.scss'
import { KsIcon } from '@/components/icons'

const Header = () => (
  <header className={styles.header} aria-label="Page Header">
    <div className={styles.container}>
      <div className={styles.brand}>
        <KsIcon size="2xl" />
        <div className={styles.brandText}>
          <h1 className={styles.title}>KraftScore Insights</h1>

          <p className={styles.subtitle}>
            <LineChart className={styles.subtitleIcon} />
            IA e estatísticas a favor das suas apostas.
          </p>
        </div>
      </div>

      <div className={styles.userArea}>
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
          <RedirectToSignIn />
        </SignedOut>
      </div>
    </div>
  </header>
)

export default Header
