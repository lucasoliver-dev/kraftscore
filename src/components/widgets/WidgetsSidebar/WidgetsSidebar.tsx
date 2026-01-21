'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { observer } from 'mobx-react-lite'

import { useStores } from '@/stores/RootStore'

import Section from '@/components/layout/section/Section'
import Stack from '@/components/layout/stack/Stack'
import Surface from '@/components/layout/surface/Surface'
import { CountryFlag } from '@/components/shared'

import styles from './widgets-sidebar.module.scss'

export const WidgetsSidebar = observer(() => {
  const { footballStore } = useStores()

  const [query, setQuery] = useState('')

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return footballStore.widgetsCountries

    return footballStore.widgetsCountries.filter(item =>
      item.label.toLowerCase().includes(q)
    )
  }, [footballStore.widgetsCountries, query])

  return (
    <Surface>
      <Section>
        <Stack>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <p className={styles.title}>Explorar</p>
              <p className={styles.subtitle}>Países e ligas disponíveis</p>
            </div>
          </div>

          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Buscar país..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className={styles.list} role="list">
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                className={styles.item}
                role="listitem"
              >
                <span className={styles.itemLeft}>
                  <span className={styles.icon}>
                    <CountryFlag src={item.flag} alt={item.label} />
                  </span>

                  <span className={styles.itemLabel}>{item.label}</span>
                </span>

                <span className={styles.itemRight}>
                  <span className={styles.count}>{item.count}</span>
                  <span className={styles.chevron}>›</span>
                </span>
              </button>
            ))}
          </div>
        </Stack>
      </Section>
    </Surface>
  )
})
