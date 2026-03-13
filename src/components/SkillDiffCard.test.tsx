import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { SkillDiffCard } from './SkillDiffCard'

const { getFileTextMock } = vi.hoisted(() => ({
  getFileTextMock: vi.fn(),
}))

vi.mock('convex/react', () => ({
  useAction: () => getFileTextMock,
}))

vi.mock('@monaco-editor/react', async () => {
  const React = await import('react')

  return {
    useMonaco: () => null,
    DiffEditor: ({
      options,
    }: {
      options?: { renderSideBySide?: boolean }
    }) => {
      return React.createElement('div', {
        'data-testid': 'diff-editor',
        'data-render-side-by-side': String(options?.renderSideBySide),
      })
    },
  }
})

describe('SkillDiffCard', () => {
  beforeEach(() => {
    getFileTextMock.mockReset()
    getFileTextMock.mockImplementation(
      async ({ versionId, path }: { versionId: string; path: string }) => ({
        text: `${versionId}:${path}`,
      }),
    )
  })

  it('updates the mounted Monaco diff editor when toggling layout mode', async () => {
    render(
      <SkillDiffCard
        skill={
          {
            _id: 'skills:1',
            slug: 'weather',
            tags: { latest: 'skillVersions:2' },
          } as never
        }
        versions={
          [
            {
              _id: 'skillVersions:1',
              version: '1.0.0',
              files: [{ path: 'SKILL.md', sha256: 'old', size: 12 }],
            },
            {
              _id: 'skillVersions:2',
              version: '1.1.0',
              files: [{ path: 'SKILL.md', sha256: 'new', size: 12 }],
            },
          ] as never
        }
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('diff-editor')).toHaveAttribute('data-render-side-by-side', 'true')
    })

    fireEvent.click(screen.getByRole('button', { name: /inline/i }))

    await waitFor(() => {
      expect(screen.getByTestId('diff-editor')).toHaveAttribute('data-render-side-by-side', 'false')
    })

    fireEvent.click(screen.getByRole('button', { name: /side-by-side/i }))

    await waitFor(() => {
      expect(screen.getByTestId('diff-editor')).toHaveAttribute('data-render-side-by-side', 'true')
    })
  })
})
