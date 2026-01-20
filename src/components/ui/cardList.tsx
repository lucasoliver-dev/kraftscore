'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type CardListProps = {
  children: ReactNode
  className?: string
}

export default function CardList({ children, className }: CardListProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {children}
    </div>
  )
}
