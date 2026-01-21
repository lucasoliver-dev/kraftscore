'use client'

import type { ImgHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import styles from './country-flag.module.scss'

export type CountryFlagSize = 'sm' | 'md'

export type CountryFlagProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src'
> & {
  src?: string | null
  size?: CountryFlagSize
}

/**
 * Renders a small country flag image.
 * If no src is provided, renders a placeholder circle.
 */
export function CountryFlag({
  src,
  size = 'sm',
  className,
  alt,
  ...props
}: CountryFlagProps) {
  if (!src) {
    return (
      <span
        className={cn(styles.placeholder, styles[size], className)}
        aria-hidden="true"
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt ?? 'Bandeira'}
      className={cn(styles.flag, styles[size], className)}
      loading="lazy"
      {...props}
    />
  )
}
