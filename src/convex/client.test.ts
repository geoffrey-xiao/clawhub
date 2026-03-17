/* @vitest-environment node */

import { afterEach, describe, expect, it, vi } from 'vitest'

const env = import.meta.env as Record<string, unknown>
const originalMockFlag = env.VITE_USE_MOCK_DATA
const originalConvexUrl = process.env.VITE_CONVEX_URL

afterEach(() => {
  vi.resetModules()
  if (originalMockFlag === undefined) {
    delete env.VITE_USE_MOCK_DATA
  } else {
    env.VITE_USE_MOCK_DATA = originalMockFlag
  }
  if (originalConvexUrl === undefined) {
    delete process.env.VITE_CONVEX_URL
  } else {
    process.env.VITE_CONVEX_URL = originalConvexUrl
  }
})

describe('convex client mock mode', () => {
  it('serves local query and action data without VITE_CONVEX_URL', async () => {
    env.VITE_USE_MOCK_DATA = '1'
    delete process.env.VITE_CONVEX_URL

    const { convexHttp } = await import('./client')
    const { api } = await import('../../convex/_generated/api')

    const page = await convexHttp.query(api.skills.listPublicPageV4, {
      numItems: 2,
      sort: 'downloads',
      dir: 'desc',
    })
    const readme = await convexHttp.action(api.skills.getReadme, {
      versionId: 'skillVersions:shipwright-201',
    })

    expect(page).toMatchObject({
      hasMore: true,
      nextCursor: '2',
    })
    expect(page.page).toHaveLength(2)
    expect(readme).toEqual(
      expect.objectContaining({
        text: expect.stringContaining('# Shipwright'),
      }),
    )
  })
})
