import { ConvexHttpClient } from 'convex/browser'
import { ConvexReactClient } from 'convex/react'
import { getRequiredRuntimeEnv } from '../lib/runtimeEnv'
import { getMockQuery, mockModeEnabled, runMockAction } from './mockData'

const functionNameSymbol = Symbol.for('functionName')

function getFunctionName(reference: unknown) {
  const value = (reference as Record<PropertyKey, unknown> | null)?.[functionNameSymbol]
  return typeof value === 'string' ? value : null
}

const convexUrl = mockModeEnabled
  ? 'https://mock.convex.local'
  : getRequiredRuntimeEnv('VITE_CONVEX_URL')

const mockHttpClient = {
  query(reference: unknown, args?: unknown) {
    return Promise.resolve(getMockQuery(getFunctionName(reference), args)) as ReturnType<
      ConvexHttpClient['query']
    >
  },
  action(reference: unknown, args?: unknown) {
    return runMockAction(getFunctionName(reference), args) as ReturnType<
      ConvexHttpClient['action']
    >
  },
} as Pick<ConvexHttpClient, 'query' | 'action'>

export const convex = new ConvexReactClient(convexUrl)
export const convexHttp: Pick<ConvexHttpClient, 'query' | 'action'> = mockModeEnabled
  ? mockHttpClient
  : new ConvexHttpClient(convexUrl)
