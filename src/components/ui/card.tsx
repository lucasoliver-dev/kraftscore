import * as React from 'react'
import { cn } from '@/lib/utils'

type CardDensity = 'tight' | 'default' | 'loose'

const densityVars: Record<CardDensity, string> = {
  tight:
    '[--card-pad:var(--space-4,16px)] [--card-gap:var(--space-1,6px)]',
  default:
    '[--card-pad:var(--space-5,20px)] [--card-gap:var(--space-2,8px)]',
  loose:
    '[--card-pad:var(--space-6,24px)] [--card-gap:var(--space-3,12px)]',
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  density?: CardDensity
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, density = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl border border-border bg-card text-card-foreground shadow-sm',
        densityVars[density],
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-[var(--card-gap)] p-[var(--card-pad)]',
      className
    )}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * Use quando tem CardHeader acima.
 * (fica sem padding no topo para não "duplicar" o espaçamento)
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-[var(--card-pad)] pb-[var(--card-pad)] pt-0',
      className
    )}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

/**
 * Use quando NÃO tem header (um card simples).
 */
const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-[var(--card-pad)]', className)}
    {...props}
  />
))
CardBody.displayName = 'CardBody'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center px-[var(--card-pad)] pb-[var(--card-pad)] pt-0',
      className
    )}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBody,
}
