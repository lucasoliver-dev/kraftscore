'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

type SidebarItem = {
  href: string
  label: string
  icon?: string
}

const items: SidebarItem[] = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/fixtures', label: 'Jogos', icon: '⚽' },
  { href: '/predictions', label: 'Análise IA', icon: '🤖' },
  { href: '/widgets', label: 'Widgets', icon: '📊' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-4 h-[calc(100vh-32px)] w-[260px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-3">
      <div className="px-2 py-3">
        <p className="text-sm font-semibold text-white">KraftScore</p>
        <p className="text-xs text-white/50">Insights & IA</p>
      </div>

      <nav className="mt-2 flex flex-col gap-1">
        {items.map(item => {
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition',
                active
                  ? 'bg-orange-500/15 text-orange-200'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
