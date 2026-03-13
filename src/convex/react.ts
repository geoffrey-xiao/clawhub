import {
  ConvexReactClient,
  useAction as useConvexAction,
  useMutation as useConvexMutation,
  usePaginatedQuery as useConvexPaginatedQuery,
  useQueries as useConvexQueries,
  useQuery as useConvexQuery,
} from 'convex/react-real'
import { useMemo, useState } from 'react'
import {
  getMockPaginatedQuery,
  getMockQuery,
  mockModeEnabled,
  runMockAction,
  runMockMutation,
} from './mockData'

export * from 'convex/react-real'

const functionNameSymbol = Symbol.for('functionName')

function getFunctionName(reference: unknown) {
  const value = (reference as Record<PropertyKey, unknown> | null)?.[functionNameSymbol]
  return typeof value === 'string' ? value : null
}

export { ConvexReactClient }

export function useQuery(reference: unknown, args?: unknown) {
  if (!mockModeEnabled) {
    return useConvexQuery(reference as never, args as never)
  }
  return getMockQuery(getFunctionName(reference), args)
}

export function usePaginatedQuery(reference: unknown, args: unknown, options?: { initialNumItems?: number }) {
  if (!mockModeEnabled) {
    return useConvexPaginatedQuery(reference as never, args as never, {
      initialNumItems: options?.initialNumItems ?? 20,
    })
  }

  const allResults = getMockPaginatedQuery(getFunctionName(reference), args)
  const initial = options?.initialNumItems ?? 20
  const [visibleCount, setVisibleCount] = useState(initial)
  const results = allResults.slice(0, visibleCount)
  const status =
    visibleCount < allResults.length ? ('CanLoadMore' as const) : ('Exhausted' as const)

  return {
    results,
    status,
    loadMore: (count: number) => {
      setVisibleCount((current) => Math.min(current + count, allResults.length))
    },
  }
}

export function useAction(reference: unknown) {
  const actionName = getFunctionName(reference)
  if (!mockModeEnabled) {
    return useConvexAction(reference as never)
  }
  return useMemo(() => {
    return (args?: unknown) => runMockAction(actionName, args)
  }, [actionName])
}

export function useMutation(reference: unknown) {
  const mutationName = getFunctionName(reference)
  if (!mockModeEnabled) {
    return useConvexMutation(reference as never)
  }
  return useMemo(() => {
    return (args?: unknown) => runMockMutation(mutationName, args)
  }, [mutationName])
}

export function useQueries(queries: Record<string, { query: unknown; args: unknown }>) {
  if (!mockModeEnabled) {
    return useConvexQueries(queries as never)
  }

  return Object.fromEntries(
    Object.entries(queries).map(([key, value]) => [
      key,
      getMockQuery(getFunctionName(value.query), value.args),
    ]),
  ) as Record<string, unknown>
}
