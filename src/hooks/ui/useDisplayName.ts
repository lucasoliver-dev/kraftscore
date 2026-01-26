'use client'

import { useUser } from '@clerk/nextjs'
import { getDisplayName } from '@/lib/helpers/getDisplayName'

export function useDisplayName(fallback = 'Craque') {
  const { user, isLoaded } = useUser()
  const name = isLoaded ? getDisplayName(user, fallback) : '...'

  return { name, user, isLoaded }
}
