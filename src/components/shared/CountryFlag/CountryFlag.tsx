import Image, { type ImageProps } from 'next/image'

import { cn } from '@/lib/utils'
import styles from './country-flag.module.scss'

type CountryFlagSize = 'sm' | 'md' | 'lg'

const SIZE_PX: Record<CountryFlagSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}

export type CountryFlagProps = Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'sizes' | 'placeholder'
> & {
  src?: string | null
  alt?: string | null
  size?: CountryFlagSize
  className?: string
  placeholder?: 'blur' | 'empty'
}

export function CountryFlag({
  src,
  alt,
  size = 'md',
  className,
  placeholder = 'empty',
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

  const px = SIZE_PX[size]

  return (
    <Image
      src={src}
      alt={alt ?? 'Bandeira'}
      width={px}
      height={px}
      sizes={`${px}px`}
      className={cn(styles.flag, styles[size], className)}
      placeholder={placeholder}
      loading="lazy"
      {...props}
    />
  )
}
