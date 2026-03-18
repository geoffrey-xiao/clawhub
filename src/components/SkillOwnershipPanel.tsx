import { useNavigate } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { buildSkillHref } from './skillDetailUtils'

type OwnedSkillOption = {
  _id: Id<'skills'>
  slug: string
  displayName: string
}

type SkillOwnershipPanelProps = {
  skillId: Id<'skills'>
  slug: string
  ownerHandle: string | null
  ownerId: Id<'users'> | null
  ownedSkills: OwnedSkillOption[]
}

function formatMutationError(error: unknown) {
  if (error instanceof Error) {
    return error.message
      .replace(/\[CONVEX[^\]]*\]\s*/g, '')
      .replace(/\[Request ID:[^\]]*\]\s*/g, '')
      .replace(/^Server Error Called by client\s*/i, '')
      .replace(/^ConvexError:\s*/i, '')
      .trim()
  }
  return 'Request failed.'
}

export function SkillOwnershipPanel({
  skillId,
  slug,
  ownerHandle,
  ownerId,
  ownedSkills,
}: SkillOwnershipPanelProps) {
  const navigate = useNavigate()
  const renameOwnedSkill = useMutation(api.skills.renameOwnedSkill)
  const mergeOwnedSkillIntoCanonical = useMutation(api.skills.mergeOwnedSkillIntoCanonical)

  const [renameSlug, setRenameSlug] = useState(slug)
  const [mergeTargetSlug, setMergeTargetSlug] = useState(ownedSkills[0]?.slug ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ownerHref = (nextSlug: string) => buildSkillHref(ownerHandle, ownerId, nextSlug)

  const handleRename = async () => {
    const nextSlug = renameSlug.trim().toLowerCase()
    if (!nextSlug || nextSlug === slug) return
    if (!window.confirm(`Rename ${slug} to ${nextSlug}? Old slug will redirect.`)) return
    setIsSubmitting(true)
    setError(null)
    try {
      await renameOwnedSkill({ slug, newSlug: nextSlug })
      await navigate({
        to: '/$owner/$slug',
        params: {
          owner: ownerHandle ?? String(ownerId ?? ''),
          slug: nextSlug,
        },
        replace: true,
      })
    } catch (renameError) {
      setError(formatMutationError(renameError))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMerge = async () => {
    const targetSlug = mergeTargetSlug.trim().toLowerCase()
    if (!targetSlug || targetSlug === slug) return
    if (
      !window.confirm(
        `Merge ${slug} into ${targetSlug}? ${slug} will stop listing publicly and redirect.`,
      )
    ) {
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await mergeOwnedSkillIntoCanonical({
        sourceSlug: slug,
        targetSlug,
      })
      await navigate({
        to: '/$owner/$slug',
        params: {
          owner: ownerHandle ?? String(ownerId ?? ''),
          slug: targetSlug,
        },
        replace: true,
      })
    } catch (mergeError) {
      setError(formatMutationError(mergeError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="card skill-owner-tools" data-skill-id={skillId}>
      <h2 className="section-title" style={{ marginTop: 0 }}>
        Owner tools
      </h2>
      <p className="section-subtitle">
        Rename the canonical slug or fold this listing into another one you own. Old slugs stay as
        redirects and stop polluting search/list views.
      </p>

      <div className="skill-owner-tools-list">
        <div className="skill-owner-tool-row">
          <label className="skill-owner-tool-main">
            <div className="skill-owner-tool-header">
              <span className="mono">rename slug</span>
              <h3 className="skill-owner-tool-title">Rename listing URL</h3>
            </div>
            <input
              className="management-field"
              value={renameSlug}
              onChange={(event) => setRenameSlug(event.target.value)}
              placeholder="new-slug"
              autoComplete="off"
              spellCheck={false}
            />
            <div className="skill-owner-tool-preview">
              <span className="mono">current page</span>
              <strong>{ownerHref(slug)}</strong>
            </div>
            <div className="skill-owner-tool-preview">
              <span className="mono">after rename</span>
              <strong>{ownerHref(renameSlug.trim().toLowerCase() || slug)}</strong>
            </div>
          </label>
          <div className="skill-owner-tool-action">
            <span className="skill-owner-tool-note">Old slug stays as a redirect.</span>
            <button
              className="btn btn-primary management-action-btn"
              type="button"
              onClick={() => void handleRename()}
              disabled={isSubmitting || renameSlug.trim().toLowerCase() === slug}
            >
              Apply rename
            </button>
          </div>
        </div>

        <div className="skill-owner-tool-row">
          <label className="skill-owner-tool-main">
            <div className="skill-owner-tool-header">
              <span className="mono">merge into</span>
              <h3 className="skill-owner-tool-title">Merge into another owned skill</h3>
            </div>
            <select
              className="management-field"
              value={mergeTargetSlug}
              onChange={(event) => setMergeTargetSlug(event.target.value)}
              disabled={ownedSkills.length === 0 || isSubmitting}
            >
              {ownedSkills.length === 0 ? <option value="">No other owned skills</option> : null}
              {ownedSkills.map((entry) => (
                <option key={entry._id} value={entry.slug}>
                  {entry.displayName} ({entry.slug})
                </option>
              ))}
            </select>
            <div className="skill-owner-tool-preview">
              <span className="mono">target page</span>
              <strong>{mergeTargetSlug ? ownerHref(mergeTargetSlug) : 'Pick a target skill'}</strong>
            </div>
          </label>
          <div className="skill-owner-tool-action">
            <span className="skill-owner-tool-note">
              Merge keeps the target live and hides this row. Versions and stats stay on the
              original records for now.
            </span>
            <button
              className="btn management-action-btn"
              type="button"
              onClick={() => void handleMerge()}
              disabled={isSubmitting || !mergeTargetSlug}
            >
              Merge listing
            </button>
          </div>
        </div>
      </div>

      {error ? <div className="stat" style={{ color: 'var(--danger)' }}>{error}</div> : null}
    </div>
  )
}
