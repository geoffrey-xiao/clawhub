import {
  ConvexAuthProvider as RealConvexAuthProvider,
  useAuthActions as useRealAuthActions,
} from '@convex-dev/auth/react-real'
import { useMemo, type ReactNode } from 'react'
import { mockModeEnabled } from './mockData'

export function ConvexAuthProvider({
  children,
  ...props
}: {
  children: ReactNode
  client?: unknown
  shouldHandleCode?: boolean
  [key: string]: unknown
}) {
  if (mockModeEnabled) {
    return <>{children}</>
  }
  return <RealConvexAuthProvider {...(props as any)}>{children}</RealConvexAuthProvider>
}

export function useAuthActions() {
  if (!mockModeEnabled) {
    return useRealAuthActions()
  }

  return useMemo(
    () => ({
      signIn: async () => ({ signingIn: true }),
      signOut: async () => undefined,
    }),
    [],
  )
}
