'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // base (bem semelhante ao shadcn, porém com “premium/glass”)
  'inline-flex items-center gap-2 whitespace-nowrap rounded-full border font-extrabold tracking-tight ' +
    'select-none leading-none ' +
    '[&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // ✅ padrão glass leve (igual seus badges atuais)
        soft:
          'border-white/10 bg-white/5 text-foreground ' + 'backdrop-blur-md',

        // ✅ muted (mais apagado)
        muted:
          'border-white/10 bg-black/20 text-muted-foreground ' +
          'backdrop-blur-md',

        // ✅ kraft brand (laranja)
        brand:
          'border-orange-500/20 bg-orange-500/10 text-orange-400 ' +
          'backdrop-blur-md',

        // ✅ outline limpo
        outline: 'border-white/15 bg-transparent text-foreground',

        // ✅ danger (se precisar em alertas)
        danger:
          'border-red-500/25 bg-red-500/10 text-red-300 ' + 'backdrop-blur-md',
      },

      size: {
        sm: 'px-2.5 py-1 text-[11px]',
        md: 'px-3 py-1.5 text-[12px]',
      },
    },

    defaultVariants: {
      variant: 'soft',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
