'use client'

import { LineChart } from 'lucide-react'

import styles from './header.module.scss'
import { KsIcon } from '@/components/icons'
import { UserMenu } from './UserMenu'

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
        <UserMenu />
      </div>
    </div>
  </header>
)

export default Header
