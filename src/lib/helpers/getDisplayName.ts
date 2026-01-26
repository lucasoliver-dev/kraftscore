import type { UserResource } from '@clerk/types'

export function getDisplayName(
  user?: UserResource | null,
  fallback = 'Craque'
) {
  return user?.firstName || user?.username || user?.fullName || fallback
}
