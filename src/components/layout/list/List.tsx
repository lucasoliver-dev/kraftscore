'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import styles from './list.module.scss'

type ListGap = 'sm' | 'md' | 'lg'

export type ListProps = {
  children: ReactNode
  className?: string

  gap?: ListGap

  /** ativa scroll interno */
  scroll?: boolean

  /** altura máxima do scroll (ex: 560) */
  maxHeight?: number

  /** adiciona fade no final (só faz sentido com scroll=true) */
  fade?: boolean
}

export default function List({
  children,
  className,
  gap = 'md',
  scroll = false,
  maxHeight,
  fade = false,
}: ListProps) {
  return (
    <div
      className={cn(
        styles.list,
        styles[`gap_${gap}`],
        scroll && styles.scroll,
        fade && styles.fade,
        className
      )}
      style={{
        maxHeight: scroll && maxHeight ? `${maxHeight}px` : undefined,
      }}
    >
      {children}
    </div>
  )
}
