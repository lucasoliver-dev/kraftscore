'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    'flex w-full bg-transparent px-3 text-sm shadow-sm',
    'border border-input',
    'text-foreground placeholder:text-muted-foreground',
    'outline-none transition-all duration-200 ease-in-out',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'h-11',
    'rounded-md',
  ],
  {
    variants: {
      variant: {
        default: ['focus-visible:ring-1 focus-visible:ring-ring'],
        neon: [
          'border-zinc-700 bg-zinc-950/60',
          'focus-visible:border-orange-500',
          'focus-visible:ring-1 focus-visible:ring-orange-500',
          'focus-visible:shadow-[0_0_0_1px_rgba(249,115,22,0.55),0_0_22px_rgba(249,115,22,0.25)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export { Input }
