'use client'

import type { StateProps } from '@/components/ui/state'
import { State } from '@/components/ui/state'

export function LoadingState(props: Omit<StateProps, 'variant'>) {
  return <State variant="loading" {...props} />
}

export function EmptyState(props: Omit<StateProps, 'variant'>) {
  return <State variant="empty" {...props} />
}

export function ErrorState(props: Omit<StateProps, 'variant'>) {
  return <State variant="error" {...props} />
}

export function InfoState(props: Omit<StateProps, 'variant'>) {
  return <State variant="info" {...props} />
}

export function SuccessState(props: Omit<StateProps, 'variant'>) {
  return <State variant="success" {...props} />
}
