'use client'

import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type SurfaceVariant = 'panel' | 'hero' | 'sidebar' | 'header'
export type SurfaceGlow = 'none' | 'soft' | 'strong'

type SurfaceProps = {
  children: ReactNode
  className?: string
  variant?: SurfaceVariant
  glow?: SurfaceGlow
  hover?: boolean
}

export default function Surface({
  children,
  className,
  variant = 'panel',
  glow = 'soft',
  hover = true,
}: SurfaceProps) {
  return (
    <Card
      className={cn('kbet-surface', className)}
      data-variant={variant}
      data-glow={glow}
      data-hover={hover ? 'true' : 'false'}
    >
      {children}
    </Card>
  )
}
