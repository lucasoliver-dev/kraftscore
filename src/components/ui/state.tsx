'use client'

import type { ReactNode } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

type StateVariant = 'loading' | 'empty' | 'error' | 'info' | 'success'

export type StateProps = {
  variant: StateVariant
  title: string
  description?: string
  className?: string

  /**
   * Optional custom icon. If not provided, default icon is chosen by variant.
   */
  icon?: ReactNode

  /**
   * Optional action button
   */
  actionLabel?: string
  onActionClick?: () => void
}

const variantStyles: Record<StateVariant, { wrapper: string; icon: string }> = {
  loading: {
    wrapper: 'border-border bg-card/60 text-muted-foreground',
    icon: 'text-orange-400',
  },
  empty: {
    wrapper: 'border-border bg-card/60 text-muted-foreground',
    icon: 'text-muted-foreground',
  },
  info: {
    wrapper: 'border-border bg-card/60 text-muted-foreground',
    icon: 'text-blue-400',
  },
  success: {
    wrapper: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    icon: 'text-emerald-400',
  },
  error: {
    wrapper: 'border-destructive/40 bg-destructive/10 text-destructive',
    icon: 'text-destructive',
  },
}

function getDefaultIcon(variant: StateVariant) {
  switch (variant) {
    case 'loading':
      return <Spinner className={variantStyles.loading.icon} />
    case 'empty':
      return <Sparkles className={cn('h-4 w-4', variantStyles.empty.icon)} />
    case 'error':
      return <AlertCircle className={cn('h-4 w-4', variantStyles.error.icon)} />
    case 'success':
      return (
        <CheckCircle2 className={cn('h-4 w-4', variantStyles.success.icon)} />
      )
    case 'info':
    default:
      return <Info className={cn('h-4 w-4', variantStyles.info.icon)} />
  }
}

export function State({
  variant,
  title,
  description,
  className,
  icon,
  actionLabel,
  onActionClick,
}: StateProps) {
  const styles = variantStyles[variant]

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-2 rounded-md border px-3 py-2 text-sm',
        styles.wrapper,
        className
      )}
    >
      <span className="mt-0.5">{icon ?? getDefaultIcon(variant)}</span>

      <div className="flex-1">
        <p className={cn('font-medium', variant === 'error' ? 'text-destructive' : 'text-foreground')}>
          {title}
        </p>

        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}

        {actionLabel && onActionClick ? (
          <div className="mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onActionClick}
            >
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
