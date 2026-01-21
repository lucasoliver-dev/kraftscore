'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, type ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  Bot,
  Home,
  LayoutDashboard,
  Menu,
  Trophy,
} from 'lucide-react'

import styles from './app-shell.module.scss'

type AppShellProps = {
  children: ReactNode
}

type NavItem = {
  href: string
  icon: ReactNode
  label: string
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = useMemo(() => {
    return [
      { href: '/', label: 'Home', icon: <Home size={18} /> },
      { href: '/fixtures', label: 'Jogos', icon: <Trophy size={18} /> },
      { href: '/predictions', label: 'Análise IA', icon: <Bot size={18} /> },
      { href: '/widgets', label: 'Widgets', icon: <LayoutDashboard size={18} /> },
    ]
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href)
  }

  return (
    <div className={styles.shell}>
      {/* Sidebar desktop */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarPanel}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>KS</div>

            <div className={styles.brandText}>
              <strong>KraftScore</strong>
              <span>Insights & IA</span>
            </div>
          </div>

          <nav className={styles.nav}>
            {navItems.map(item => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                  data-active={active ? 'true' : 'false'}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className={styles.sidebarHint}>
            <p className={styles.sidebarHintTitle}>Atalho</p>
            <p className={styles.sidebarHintText}>
              Abra um jogo e clique em <b>Analisar com IA</b> para gerar o
              insight premium.
            </p>
          </div>
        </div>
      </aside>

      {/* Área principal */}
      <div className={styles.main}>
        {/* Topbar mobile */}
        <header className={styles.mobileTopbar}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className={styles.iconBtn}>
                <Menu size={18} />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className={styles.mobileSheet}>
              <SheetHeader>
                <SheetTitle className={styles.sheetTitle}>Menu</SheetTitle>
              </SheetHeader>

              <nav className={styles.sheetNav}>
                {navItems.map(item => {
                  const active = isActive(item.href)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.sheetLink}
                      data-active={active ? 'true' : 'false'}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navLabel}>{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <div className={styles.mobileBrand}>
            <div className={styles.brandIconSmall}>KS</div>
            <div className={styles.mobileBrandText}>
              <strong>KraftScore</strong>
              <span>Insights & IA</span>
            </div>
          </div>

          <Avatar className={styles.avatar}>
            <AvatarFallback>KS</AvatarFallback>
          </Avatar>
        </header>

        {/* Conteúdo */}
        <main className={styles.content}>
          <div className={styles.container}>{children}</div>
        </main>

        {/* Bottom nav mobile */}
        <nav className={styles.bottomNav}>
          {navItems.map(item => {
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={styles.bottomNavLink}
                data-active={active ? 'true' : 'false'}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
