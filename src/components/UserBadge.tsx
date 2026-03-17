import { useNavigate } from '@tanstack/react-router'
import type { PublicUser } from '../lib/publicUser'

type UserBadgeProps = {
  user: PublicUser | null | undefined
  fallbackHandle?: string | null
  prefix?: string
  size?: 'sm' | 'md'
  link?: boolean
  showName?: boolean
}

export function UserBadge({
  user,
  fallbackHandle,
  prefix = 'by',
  size = 'sm',
  link = true,
  showName = false,
}: UserBadgeProps) {
  const navigate = useNavigate()
  const handle = user?.handle ?? user?.name ?? fallbackHandle ?? null
  const profileHandle = handle?.trim() ? handle : null
  const href = profileHandle ? `/u/${encodeURIComponent(profileHandle)}` : null
  const label = profileHandle ? `@${profileHandle}` : 'user'
  const image = user?.image ?? null
  const displayName = user?.displayName?.trim() || null
  const hasUsefulName =
    showName && Boolean(displayName) && Boolean(handle) && displayName!.toLowerCase() !== handle!.toLowerCase()
  const initial = (user?.displayName ?? user?.name ?? handle ?? 'u').charAt(0).toUpperCase()

  return (
    <span className={`user-badge user-badge-${size}`}>
      {prefix ? <span className="user-badge-prefix">{prefix}</span> : null}
      <span className="user-avatar" aria-hidden="true">
        {image ? (
          <img className="user-avatar-img" src={image} alt="" loading="lazy" />
        ) : (
          <span className="user-avatar-fallback">{initial}</span>
        )}
      </span>
      {hasUsefulName ? (
        <>
          <span className="user-name">{displayName}</span>
          <span className="user-name-sep" aria-hidden="true">
            ·
          </span>
        </>
      ) : null}
      {link && href ? (
        <span
          className="user-handle user-handle-link"
          role="link"
          tabIndex={0}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            if (!profileHandle) return
            void navigate({ to: '/u/$handle', params: { handle: profileHandle } })
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            event.stopPropagation()
            if (!profileHandle) return
            void navigate({ to: '/u/$handle', params: { handle: profileHandle } })
          }}
        >
          {label}
        </span>
      ) : (
        <span className="user-handle">{label}</span>
      )}
    </span>
  )
}
