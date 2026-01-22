'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import styles from './stack.module.scss'

type StackProps = {
  children: ReactNode
  className?: string
}

export default function Stack({ children, className }: StackProps) {
  return <div className={cn(styles.stack, className)}>{children}</div>
}
