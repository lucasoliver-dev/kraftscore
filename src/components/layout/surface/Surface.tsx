'use client'

import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import styles from './surface.module.scss'

type SurfaceGlow = 'none' | 'soft' | 'strong'

export default function Surface({
  children,
  className,
  glow = 'soft',
}: {
  children: ReactNode
  className?: string
  glow?: SurfaceGlow
}) {
  return (
    <Card
      className={cn(
        'kbet-panel', // ✅ aplica seu design system global
        styles.surface,
        glow !== 'none' && styles[`glow_${glow}`],
        className
      )}
    >
      {children}
    </Card>
  )
}
