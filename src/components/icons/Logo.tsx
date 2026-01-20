'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type KsIconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const sizeMap: Record<KsIconSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 44,
  '2xl': 56,
}

const insetMap: Record<KsIconSize, number> = {
  sm: 1,
  md: 2,
  lg: 2,
  xl: 2,
  '2xl': 3,
}

const scaleMap: Record<KsIconSize, number> = {
  sm: 1.12,
  md: 1.14,
  lg: 1.16,
  xl: 1.18,
  '2xl': 1.2,
}

export type KsIconProps = {
  /** Tamanhos prontos (sem precisar passar width/height) */
  size?: KsIconSize
  className?: string
  priority?: boolean
}

export const KsIcon = ({
  size = 'md',
  className,
  priority = false,
}: KsIconProps) => {
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
        src="/images/ks.png"
        alt="KraftScore"
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
