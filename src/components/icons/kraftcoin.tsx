'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type KraftcoinIconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const sizeMap: Record<KraftcoinIconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 44,
  '2xl': 56,
}

const insetMap: Record<KraftcoinIconSize, number> = {
  sm: 1,
  md: 2,
  lg: 2,
  xl: 2,
  '2xl': 3,
}

const scaleMap: Record<KraftcoinIconSize, number> = {
  sm: 1.12,
  md: 1.14,
  lg: 1.16,
  xl: 1.18,
  '2xl': 1.2,
}

export type KraftcoinIconProps = {
  /** Tamanhos prontos (sem precisar passar width/height) */
  size?: KraftcoinIconSize
  className?: string
  priority?: boolean
}

export const KraftcoinIcon = ({
  size = 'md',
  className,
  priority = false,
}: KraftcoinIconProps) => {
  const px = sizeMap[size]
  const inset = insetMap[size]
  const scale = scaleMap[size]

  return (
    <span
      className={cn('relative inline-block', className)}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <Image
        src="/images/iconKraftcoin.png"
        alt="Kraftcoin"
        fill
        priority={priority}
        className="object-contain"
        style={{
          padding: inset,
          transform: `scale(${scale})`,
        }}
      />
    </span>
  )
}
