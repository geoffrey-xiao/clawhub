import type { Doc, Id } from '../../convex/_generated/dataModel'
import type { PublicSkill, PublicSoul, PublicUser } from '../lib/publicUser'

const now = Date.UTC(2026, 2, 13, 12, 0, 0)

export const mockModeEnabled =
  import.meta.env.DEV && String(import.meta.env.VITE_USE_MOCK_DATA ?? '') === '1'

type SkillPageEntry = {
  skill: PublicSkill
  ownerHandle?: string | null
  owner?: PublicUser | null
  latestVersion?: Doc<'skillVersions'> | null
}

type SkillBySlugResult = {
  skill: Doc<'skills'> | PublicSkill
  latestVersion: Doc<'skillVersions'> | null
  owner: Doc<'users'> | PublicUser | null
  pendingReview?: boolean
  moderationInfo?: unknown
  forkOf: {
    kind: 'fork' | 'duplicate'
    version: string | null
    skill: { slug: string; displayName: string }
    owner: { handle: string | null; userId: Id<'users'> | null }
  } | null
  canonical: {
    skill: { slug: string; displayName: string }
    owner: { handle: string | null; userId: Id<'users'> | null }
  } | null
} | null

const demoUser = {
  _id: 'users:demo' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 120,
  handle: 'geoffrey',
  name: 'Geoffrey',
  displayName: 'Geoffrey Demo',
  image: undefined,
  bio: 'Mock local profile for browsing ClawHub without Convex.',
  email: 'geoffrey@example.com',
  role: 'admin',
} as unknown as Doc<'users'>

const maintainerUser = {
  _id: 'users:maintainer' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 210,
  handle: 'maintainer',
  name: 'Maintainer',
  displayName: 'Registry Maintainer',
  image: undefined,
  bio: 'Publishes curated agent skills.',
} as unknown as PublicUser

const partnerUser = {
  _id: 'users:partner' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 180,
  handle: 'partner',
  name: 'Partner',
  displayName: 'Partner Studio',
  image: undefined,
  bio: 'Publishes utilities for prompt-heavy workflows.',
} as unknown as PublicUser

const soulUser = {
  _id: 'users:soul' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 240,
  handle: 'lorekeeper',
  name: 'Lorekeeper',
  displayName: 'Lorekeeper',
  image: undefined,
  bio: 'Shares reusable SOUL bundles.',
} as unknown as PublicUser

const mockUsers = [demoUser, maintainerUser, partnerUser, soulUser]

function makeHash(seed: string) {
  return seed.repeat(64).slice(0, 64)
}

function makeSkillStats(downloads: number, stars: number, versions: number, installs: number) {
  return {
    downloads,
    stars,
    versions,
    comments: Math.max(1, Math.floor(stars / 24)),
    installsAllTime: installs,
    installsCurrent: Math.floor(installs / 3),
  }
}

const skillA = {
  _id: 'skills:sonoscli' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 40,
  slug: 'sonoscli',
  displayName: 'Sonos CLI',
  summary: 'Control Sonos speakers with a terminal-first agent workflow.',
  ownerUserId: maintainerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:sonos-110' as Id<'skillVersions'>,
  tags: {
    latest: 'skillVersions:sonos-110' as Id<'skillVersions'>,
    stable: 'skillVersions:sonos-110' as Id<'skillVersions'>,
  },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 24 * 3 },
    official: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 24 * 7 },
  },
  stats: makeSkillStats(12400, 311, 3, 4200),
  createdAt: now - 1000 * 60 * 60 * 24 * 40,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSkill

const skillB = {
  _id: 'skills:shipwright' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 31,
  slug: 'shipwright',
  displayName: 'Shipwright',
  summary: 'Generate release notes, tags, and rollout checklists from a repo diff.',
  ownerUserId: demoUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:shipwright-201' as Id<'skillVersions'>,
  tags: {
    latest: 'skillVersions:shipwright-201' as Id<'skillVersions'>,
    beta: 'skillVersions:shipwright-201' as Id<'skillVersions'>,
  },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 12 },
  },
  stats: makeSkillStats(8600, 188, 2, 2700),
  createdAt: now - 1000 * 60 * 60 * 24 * 31,
  updatedAt: now - 1000 * 60 * 60 * 24,
} as unknown as PublicSkill

const skillC = {
  _id: 'skills:briefsmith' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 22,
  slug: 'briefsmith',
  displayName: 'Briefsmith',
  summary: 'Turn rough notes into tight client-ready briefs and decision memos.',
  ownerUserId: partnerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:briefsmith-100' as Id<'skillVersions'>,
  tags: {
    latest: 'skillVersions:briefsmith-100' as Id<'skillVersions'>,
  },
  badges: {},
  stats: makeSkillStats(4300, 92, 1, 1350),
  createdAt: now - 1000 * 60 * 60 * 24 * 22,
  updatedAt: now - 1000 * 60 * 60 * 24 * 5,
} as unknown as PublicSkill

const mockSkills = [skillA, skillB, skillC]

const skillVersions = [
  {
    _id: 'skillVersions:sonos-110' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillA._id,
    version: '1.1.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Adds room grouping helpers and clearer playback controls.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 420, storageId: 'storage:sonos-skill', sha256: makeHash('a') },
      { path: 'commands.md', size: 192, storageId: 'storage:sonos-commands', sha256: makeHash('b') },
      { path: 'examples/living-room.txt', size: 144, storageId: 'storage:sonos-example', sha256: makeHash('c') },
    ],
    parsed: {
      clawdis: {
        os: ['macos', 'linux'],
        nix: {
          plugin: true,
          systems: ['x86_64-linux', 'aarch64-darwin'],
        },
        config: {
          example: {
            SONOS_HOST: '192.168.1.50',
          },
        },
        cliHelp: 'Use `play`, `pause`, `group`, and `volume` commands.',
      },
    },
    sha256hash: makeHash('d'),
    vtAnalysis: {
      status: 'clean',
      checkedAt: now - 1000 * 60 * 35,
    },
    llmAnalysis: {
      status: 'clean',
      verdict: 'benign',
      confidence: 'medium',
      summary:
        'The mock package stays aligned with a Sonos control workflow, and nothing in the sample suggests hidden background execution or credential collection.',
      dimensions: [
        {
          name: 'purpose',
          label: 'Purpose alignment',
          rating: 'ok',
          detail: 'The files are focused on speaker control, room grouping, and command examples.',
        },
        {
          name: 'local_state',
          label: 'State changes',
          rating: 'note',
          detail: 'Grouping and playback commands change device state, but the sample does not introduce persistence beyond the documented CLI workflow.',
        },
      ],
      guidance:
        'Suitable for UI review and local mock testing. Verify host configuration before using against a real Sonos system.',
      findings:
        'Command examples match the declared purpose.\nNo downloader, shell bootstrapper, or secret prompt appears in the sample files.',
      model: 'mock-openclaw-local',
      checkedAt: now - 1000 * 60 * 28,
    },
  },
  {
    _id: 'skillVersions:sonos-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 8,
    skillId: skillA._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 8,
    changelog: 'Initial public release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 360, storageId: 'storage:sonos-skill-100', sha256: makeHash('e') }],
    parsed: {
      clawdis: {
        os: ['macos', 'linux'],
      },
    },
  },
  {
    _id: 'skillVersions:shipwright-201' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24,
    skillId: skillB._id,
    version: '2.0.1',
    createdAt: now - 1000 * 60 * 60 * 24,
    changelog: 'Refines changelog drafting and adds rollout checklists.',
    changelogSource: 'auto',
    files: [
      { path: 'SKILL.md', size: 1120, storageId: 'storage:shipwright-skill', sha256: makeHash('f') },
      { path: 'templates/release.md', size: 640, storageId: 'storage:shipwright-template', sha256: makeHash('g') },
      { path: 'playbooks/rollout.md', size: 462, storageId: 'storage:shipwright-rollout', sha256: makeHash('n') },
    ],
    parsed: {
      clawdis: {
        os: ['macos', 'linux', 'windows'],
      },
    },
    sha256hash: makeHash('q'),
    vtAnalysis: {
      status: 'clean',
      checkedAt: now - 1000 * 60 * 18,
    },
    llmAnalysis: {
      status: 'clean',
      verdict: 'benign',
      confidence: 'high',
      summary:
        'The skill behaves like a repo-aware release helper, and the files stay consistent with that purpose; no hidden downloads, credential handling, or persistence mechanisms were found in this mock sample.',
      dimensions: [
        {
          name: 'purpose',
          label: 'Purpose alignment',
          rating: 'ok',
          detail: 'The files focus on release notes, rollout checklists, and stakeholder updates.',
        },
        {
          name: 'network',
          label: 'Network behavior',
          rating: 'ok',
          detail: 'No outbound network calls or download instructions appear in the shipped mock files.',
        },
        {
          name: 'secrets',
          label: 'Secrets handling',
          rating: 'note',
          detail: 'The templates mention rollout checks, but they do not request storing secrets inside repo files.',
        },
      ],
      guidance:
        'Reasonable to install for local testing. As usual, review the files before use and avoid placing secrets into generated release notes.',
      findings:
        'Template files are consistent with a release-assistant workflow.\nNo hidden executables or credential prompts were detected in the mock package.',
      model: 'mock-openclaw-local',
      checkedAt: now - 1000 * 60 * 12,
    },
    staticScan: {
      status: 'suspicious',
      reasonCodes: ['suspicious.env_credential_access'],
      findings: [
        {
          code: 'suspicious.env_credential_access',
          severity: 'critical',
          file: 'templates/release.md',
          line: 8,
          message: 'Environment-style variable placeholder detected in release template.',
          evidence: '${GITHUB_TOKEN}',
        },
      ],
      summary:
        'Mock static scan flagged one credential-like placeholder so the detail panel can be reviewed during local UI checks.',
      engineVersion: 'mock-static-1',
      checkedAt: now - 1000 * 60 * 10,
    },
  },
  {
    _id: 'skillVersions:shipwright-200' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 10,
    skillId: skillB._id,
    version: '2.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 10,
    changelog: 'Major rewrite for faster release preparation.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 860, storageId: 'storage:shipwright-200', sha256: makeHash('h') },
      { path: 'templates/release.md', size: 498, storageId: 'storage:shipwright-200-template', sha256: makeHash('o') },
      { path: 'notes/launch-checklist.md', size: 304, storageId: 'storage:shipwright-200-checklist', sha256: makeHash('p') },
    ],
  },
  {
    _id: 'skillVersions:briefsmith-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 5,
    skillId: skillC._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 5,
    changelog: 'Initial release for client brief generation.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 280, storageId: 'storage:briefsmith-skill', sha256: makeHash('i') },
      { path: 'prompts/kickoff.md', size: 190, storageId: 'storage:briefsmith-kickoff', sha256: makeHash('j') },
    ],
    sha256hash: makeHash('r'),
    vtAnalysis: {
      status: 'suspicious',
      checkedAt: now - 1000 * 60 * 22,
    },
    llmAnalysis: {
      status: 'suspicious',
      verdict: 'suspicious',
      confidence: 'medium',
      summary:
        'This mock example is intentionally marked suspicious so you can compare a cautionary one-line summary against the benign samples.',
      dimensions: [
        {
          name: 'scope',
          label: 'Scope consistency',
          rating: 'concern',
          detail: 'The prompt file is brief-focused, but this mock record is intentionally flagged so the suspicious presentation can be reviewed in the UI.',
        },
        {
          name: 'operator_review',
          label: 'Manual review need',
          rating: 'note',
          detail: 'The mocked status asks for extra review before installation so you can check the expanded detail treatment.',
        },
      ],
      guidance:
        'Use this page for layout checks only. Treat the suspicious label as mock UI data rather than a real security verdict.',
      findings:
        'Mock evaluator inserted a cautionary verdict for UI testing.\nNo real external scan was performed for this local-only sample.',
      model: 'mock-openclaw-local',
      checkedAt: now - 1000 * 60 * 18,
    },
    staticScan: {
      status: 'suspicious',
      reasonCodes: ['suspicious.prompt_injection_surface'],
      findings: [
        {
          code: 'suspicious.prompt_injection_surface',
          severity: 'warn',
          file: 'prompts/kickoff.md',
          line: 1,
          message: 'Prompt file accepts broad free-form instructions in this mock sample.',
          evidence: 'Summarize the request, the audience, and the decisions needed.',
        },
      ],
      summary:
        'Mock static scan adds a warning-level finding so the suspicious-state panel can be tested without touching live data.',
      engineVersion: 'mock-static-1',
      checkedAt: now - 1000 * 60 * 16,
    },
  },
] as Doc<'skillVersions'>[]

const soulA = {
  _id: 'souls:captains-log' as Id<'souls'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 14,
  slug: 'captains-log',
  displayName: 'Captain’s Log',
  summary: 'A maritime-flavored SOUL bundle for confident daily planning.',
  ownerUserId: soulUser._id,
  latestVersionId: 'soulVersions:captains-log-100' as Id<'soulVersions'>,
  tags: { latest: 'soulVersions:captains-log-100' as Id<'soulVersions'> },
  stats: { downloads: 1900, stars: 72, versions: 1, comments: 5 },
  createdAt: now - 1000 * 60 * 60 * 24 * 14,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSoul

const soulB = {
  _id: 'souls:quiet-ops' as Id<'souls'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 10,
  slug: 'quiet-ops',
  displayName: 'Quiet Ops',
  summary: 'A calm, terse SOUL for execution-focused sessions.',
  ownerUserId: demoUser._id,
  latestVersionId: 'soulVersions:quiet-ops-110' as Id<'soulVersions'>,
  tags: { latest: 'soulVersions:quiet-ops-110' as Id<'soulVersions'> },
  stats: { downloads: 1400, stars: 55, versions: 2, comments: 4 },
  createdAt: now - 1000 * 60 * 60 * 24 * 10,
  updatedAt: now - 1000 * 60 * 60 * 24,
} as unknown as PublicSoul

const mockSouls = [soulA, soulB]

const soulVersions = [
  {
    _id: 'soulVersions:captains-log-100' as Id<'soulVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 14,
    soulId: soulA._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 14,
    changelog: 'First public version.',
    changelogSource: 'user',
    files: [{ path: 'SOUL.md', size: 310, storageId: 'storage:soul-captain', sha256: makeHash('k') }],
  },
  {
    _id: 'soulVersions:quiet-ops-110' as Id<'soulVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24,
    soulId: soulB._id,
    version: '1.1.0',
    createdAt: now - 1000 * 60 * 60 * 24,
    changelog: 'Sharper daily cadence and less verbose guidance.',
    changelogSource: 'auto',
    files: [{ path: 'SOUL.md', size: 275, storageId: 'storage:soul-quiet-110', sha256: makeHash('l') }],
  },
  {
    _id: 'soulVersions:quiet-ops-100' as Id<'soulVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 8,
    soulId: soulB._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 8,
    changelog: 'Initial release.',
    changelogSource: 'user',
    files: [{ path: 'SOUL.md', size: 250, storageId: 'storage:soul-quiet-100', sha256: makeHash('m') }],
  },
] as Doc<'soulVersions'>[]

const skillReadmes: Record<string, string> = {
  'skillVersions:sonos-110': `---
name: Sonos CLI
description: Terminal-first control for Sonos systems.
---

# Sonos CLI

Use this skill when an agent needs to control playback, group rooms, or inspect current queues.
`,
  'skillVersions:sonos-100': `# Sonos CLI

Initial version of the Sonos automation skill.
`,
  'skillVersions:shipwright-201': `---
name: Shipwright
description: Repo-aware release assistant.
---

# Shipwright

Turn commits into release notes, rollout steps, and stakeholder updates.

## What changed in 2.0.1

- Adds a stronger release summary template with launch context.
- Adds rollout guidance with owners, checkpoints, and rollback notes.
- Tightens wording for external stakeholder updates.

## Operating mode

1. Read the repo diff and PR metadata first.
2. Group changes into customer-facing, internal, and risk items.
3. Draft the release note before writing rollout tasks.
4. Call out unknowns explicitly instead of smoothing them over.
`,
  'skillVersions:shipwright-200': `# Shipwright

Release prep for repos that need crisp summaries and checklists.

## Operating mode

1. Review commits.
2. Draft release notes.
3. Write a short rollout checklist.
`,
  'skillVersions:briefsmith-100': `# Briefsmith

Take scattered notes and output concise execution briefs.
`,
}

const skillFiles: Record<string, Record<string, { text: string; size: number; sha256: string }>> = {
  'skillVersions:sonos-110': {
    'SKILL.md': { text: skillReadmes['skillVersions:sonos-110'], size: 420, sha256: makeHash('a') },
    'commands.md': { text: '- play\n- pause\n- group\n- volume\n', size: 192, sha256: makeHash('b') },
    'examples/living-room.txt': { text: 'group living-room kitchen\nplay jazz favorites\n', size: 144, sha256: makeHash('c') },
  },
  'skillVersions:shipwright-201': {
    'SKILL.md': { text: skillReadmes['skillVersions:shipwright-201'], size: 1120, sha256: makeHash('f') },
    'templates/release.md': {
      text: `## Summary

- What shipped
- Why it matters
- Who should care

## Customer impact

- New behavior
- Migration notes
- Support guidance

## Risks

- Deployment risk
- Product risk
- Communication risk

## Rollout

1. Deploy backend
2. Verify logs and key metrics
3. Announce externally
`,
      size: 640,
      sha256: makeHash('g'),
    },
    'playbooks/rollout.md': {
      text: `# Rollout Playbook

## Preconditions

- Release note approved
- Owner assigned
- Rollback plan documented

## Verification

1. Check error rate
2. Confirm queue drains
3. Validate webhook traffic

## Rollback

- Revert the release tag
- Disable the feature flag
- Post status update in #launches
`,
      size: 462,
      sha256: makeHash('n'),
    },
  },
  'skillVersions:shipwright-200': {
    'SKILL.md': { text: skillReadmes['skillVersions:shipwright-200'], size: 860, sha256: makeHash('h') },
    'templates/release.md': {
      text: `## Summary

## Risks

## Rollout

- Ship to production
- Check the dashboard
`,
      size: 498,
      sha256: makeHash('o'),
    },
    'notes/launch-checklist.md': {
      text: `# Launch Checklist

- Tag the release
- Ship the build
- Paste a short note in chat
`,
      size: 304,
      sha256: makeHash('p'),
    },
  },
  'skillVersions:briefsmith-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:briefsmith-100'], size: 280, sha256: makeHash('i') },
    'prompts/kickoff.md': { text: 'Summarize the request, the audience, and the decisions needed.\n', size: 190, sha256: makeHash('j') },
  },
}

const soulReadmes: Record<string, string> = {
  'soulVersions:captains-log-100': '# Captain’s Log\n\nSteady, observant, and calm under pressure.\n',
  'soulVersions:quiet-ops-110': '# Quiet Ops\n\nShort answers, decisive execution, no noise.\n',
  'soulVersions:quiet-ops-100': '# Quiet Ops\n\nMinimal, focused, execution-first.\n',
}

const skillComments = [
  {
    comment: {
      _id: 'comments:1' as Id<'comments'>,
      _creationTime: now - 1000 * 60 * 45,
      skillId: skillA._id,
      userId: demoUser._id,
      body: 'This mock page is local-only, but the diff and file tabs are wired so you can review flows.',
    } as Doc<'comments'>,
    user: demoUser,
  },
  {
    comment: {
      _id: 'comments:2' as Id<'comments'>,
      _creationTime: now - 1000 * 60 * 20,
      skillId: skillA._id,
      userId: maintainerUser._id,
      body: 'The grouped-room example is especially useful for smoke testing UI states.',
    } as Doc<'comments'>,
    user: maintainerUser,
  },
]

const soulComments = [
  {
    comment: {
      _id: 'soulComments:1' as Id<'soulComments'>,
      _creationTime: now - 1000 * 60 * 30,
      soulId: soulB._id,
      userId: demoUser._id,
      body: 'Good fallback soul for local browsing demos.',
    } as Doc<'soulComments'>,
    user: demoUser,
  },
]

const apiTokens = [
  {
    _id: 'apiTokens:1' as Id<'apiTokens'>,
    label: 'CLI token',
    prefix: 'ch_demo',
    createdAt: now - 1000 * 60 * 60 * 24 * 4,
  },
]

function getOwner(userId: Id<'users'>) {
  return mockUsers.find((user) => user._id === userId) ?? null
}

function getSkillVersion(versionId: Id<'skillVersions'> | null | undefined) {
  return skillVersions.find((entry) => entry._id === versionId) ?? null
}

function getSoulVersion(versionId: Id<'soulVersions'> | null | undefined) {
  return soulVersions.find((entry) => entry._id === versionId) ?? null
}

function buildSkillEntry(skill: PublicSkill): SkillPageEntry {
  return {
    skill,
    owner: getOwner(skill.ownerUserId),
    ownerHandle: getOwner(skill.ownerUserId)?.handle ?? null,
    latestVersion: getSkillVersion(skill.latestVersionId),
  }
}

function sortSkills(skills: PublicSkill[], sort: string | undefined, dir: 'asc' | 'desc') {
  const multiplier = dir === 'asc' ? 1 : -1
  const sorted = [...skills]
  sorted.sort((a, b) => {
    switch (sort) {
      case 'name':
        return (
          (a.displayName.localeCompare(b.displayName) || a.slug.localeCompare(b.slug)) * multiplier
        )
      case 'stars':
        return (a.stats.stars - b.stats.stars) * multiplier || (a.updatedAt - b.updatedAt) * multiplier
      case 'installs':
        return (
          ((a.stats.installsAllTime ?? 0) - (b.stats.installsAllTime ?? 0)) * multiplier ||
          (a.updatedAt - b.updatedAt) * multiplier
        )
      case 'updated':
        return (a.updatedAt - b.updatedAt) * multiplier || a.slug.localeCompare(b.slug)
      case 'newest':
        return (a.createdAt - b.createdAt) * multiplier || a.slug.localeCompare(b.slug)
      default:
        return (a.stats.downloads - b.stats.downloads) * multiplier || (a.updatedAt - b.updatedAt) * multiplier
    }
  })
  return sorted
}

function getFilteredSkills(args: Record<string, unknown> | undefined) {
  let list = [...mockSkills]
  if (args?.highlightedOnly) {
    list = list.filter((skill) => Boolean(skill.badges?.highlighted))
  }
  if (args?.nonSuspiciousOnly) {
    list = list.filter((skill) => !skill.badges?.deprecated)
  }
  return sortSkills(list, typeof args?.sort === 'string' ? args.sort : 'downloads', (args?.dir === 'asc' ? 'asc' : 'desc'))
}

function searchSkills(query: string, args: Record<string, unknown> | undefined) {
  const lower = query.trim().toLowerCase()
  return getFilteredSkills(args)
    .filter((skill) => {
      if (!lower) return true
      return [skill.slug, skill.displayName, skill.summary ?? ''].some((value) =>
        value.toLowerCase().includes(lower),
      )
    })
    .map((skill, index) => ({
      skill,
      version: getSkillVersion(skill.latestVersionId),
      score: 100 - index,
      owner: getOwner(skill.ownerUserId),
      ownerHandle: getOwner(skill.ownerUserId)?.handle ?? null,
    }))
}

function findSkillBySlug(slug: string) {
  return mockSkills.find((entry) => entry.slug === slug) ?? null
}

function findSoulBySlug(slug: string) {
  return mockSouls.find((entry) => entry.slug === slug) ?? null
}

function buildSkillBySlugResult(skill: PublicSkill | null): SkillBySlugResult {
  if (!skill) return null
  const owner = getOwner(skill.ownerUserId)
  return {
    skill: skill as Doc<'skills'>,
    latestVersion: getSkillVersion(skill.latestVersionId),
    owner: owner as Doc<'users'> | null,
    forkOf: null,
    canonical: null,
    moderationInfo: null,
  }
}

function getMockTelemetry() {
  return {
    roots: [
      {
        rootId: 'root:demo',
        label: '~/work/skills',
        firstSeenAt: now - 1000 * 60 * 60 * 24 * 7,
        lastSeenAt: now - 1000 * 60 * 60 * 4,
        skills: [
          {
            skill: {
              slug: skillB.slug,
              displayName: skillB.displayName,
              summary: skillB.summary,
              stats: skillB.stats,
              ownerUserId: String(skillB.ownerUserId),
            },
            firstSeenAt: now - 1000 * 60 * 60 * 24 * 7,
            lastSeenAt: now - 1000 * 60 * 60 * 4,
            lastVersion: '2.0.1',
          },
        ],
      },
    ],
    cutoffDays: 30,
  }
}

export function getMockPaginatedQuery(functionName: string | null, args: unknown) {
  if (!functionName) return []
  const safeArgs = (args && typeof args === 'object' ? args : {}) as Record<string, unknown>
  switch (functionName) {
    case 'skills:listPublicPageV2':
      return getFilteredSkills(safeArgs).map(buildSkillEntry)
    default:
      return []
  }
}

export function getMockQuery(functionName: string | null, args: unknown) {
  if (!functionName) return null
  const safeArgs = (args && typeof args === 'object' ? args : {}) as Record<string, unknown>

  switch (functionName) {
    case 'appMeta:getDeploymentInfo':
      return {
        appBuildSha: 'mock-build-sha',
      }
    case 'users:me':
      return demoUser
    case 'users:getByHandle': {
      const handle = String(safeArgs.handle ?? '')
      return mockUsers.find((user) => user.handle === handle) ?? null
    }
    case 'users:list': {
      const search = String(safeArgs.search ?? '').trim().toLowerCase()
      const items = mockUsers.filter((user) => {
        if (!search) return true
        return [user.handle, user.name, user.displayName]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(search))
      })
      return { items, total: items.length }
    }
    case 'skills:countPublicSkills':
      return mockSkills.length
    case 'skills:listHighlightedPublic':
      return mockSkills.filter((skill) => Boolean(skill.badges?.highlighted)).slice(0, Number(safeArgs.limit ?? 6)).map(buildSkillEntry)
    case 'skills:listPublicPageV2': {
      const items = getFilteredSkills(safeArgs).map(buildSkillEntry)
      const numItems = Number((safeArgs.paginationOpts as { numItems?: number } | undefined)?.numItems ?? items.length)
      return {
        page: items.slice(0, numItems),
        isDone: numItems >= items.length,
        continueCursor: null,
      }
    }
    case 'skills:getBySlug':
    case 'skills:getBySlugForStaff':
      return buildSkillBySlugResult(findSkillBySlug(String(safeArgs.slug ?? '')))
    case 'skills:listVersions':
      return skillVersions
        .filter((version) => version.skillId === safeArgs.skillId)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, Number(safeArgs.limit ?? 50))
    case 'skills:list':
      return mockSkills
        .filter((skill) => skill.ownerUserId === safeArgs.ownerUserId)
        .map((skill) => ({
          ...skill,
          pendingReview: false,
        }))
    case 'skills:checkSlugAvailability': {
      const slug = String(safeArgs.slug ?? '').trim().toLowerCase()
      const taken = mockSkills.some((skill) => skill.slug === slug)
      return taken
        ? {
            available: false,
            reason: 'taken',
            message: 'This slug already exists in mock data.',
            url: `/u/${maintainerUser.handle}/${slug}`,
          }
        : {
            available: true,
            reason: 'available',
            message: null,
            url: null,
          }
    }
    case 'skills:listRecentVersions':
      return skillVersions
        .slice()
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, Number(safeArgs.limit ?? 20))
        .map((version) => ({
          version,
          skill: findSkillBySlug(mockSkills.find((skill) => skill._id === version.skillId)?.slug ?? '') as Doc<'skills'> | null,
          owner: getOwner(mockSkills.find((skill) => skill._id === version.skillId)?.ownerUserId ?? demoUser._id) as Doc<'users'> | null,
        }))
    case 'skills:listReportedSkills':
      return [
        {
          skill: skillA as Doc<'skills'>,
          latestVersion: getSkillVersion(skillA.latestVersionId),
          owner: getOwner(skillA.ownerUserId) as Doc<'users'> | null,
          reports: [
            {
              reason: 'Possible stale docs in the local mock dataset.',
              createdAt: now - 1000 * 60 * 25,
              reporterHandle: demoUser.handle ?? null,
              reporterId: demoUser._id,
            },
          ],
        },
      ]
    case 'skills:listDuplicateCandidates':
      return []
    case 'stars:isStarred':
      return safeArgs.skillId === skillA._id || safeArgs.skillId === skillB._id
    case 'stars:listByUser':
      return [skillA, skillB]
    case 'comments:listBySkill':
      return skillComments.filter((entry) => entry.comment.skillId === safeArgs.skillId)
    case 'souls:list':
      return mockSouls.slice(0, Number(safeArgs.limit ?? mockSouls.length))
    case 'souls:getBySlug': {
      const soul = findSoulBySlug(String(safeArgs.slug ?? ''))
      if (!soul) return null
      return {
        soul,
        latestVersion: getSoulVersion(soul.latestVersionId),
        owner: getOwner(soul.ownerUserId),
      }
    }
    case 'souls:listVersions':
      return soulVersions
        .filter((version) => version.soulId === safeArgs.soulId)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, Number(safeArgs.limit ?? 50))
    case 'soulStars:isStarred':
      return safeArgs.soulId === soulB._id
    case 'soulComments:listBySoul':
      return soulComments.filter((entry) => entry.comment.soulId === safeArgs.soulId)
    case 'telemetry:getMyInstalled':
      return getMockTelemetry()
    case 'tokens:listMine':
      return apiTokens
    default:
      return null
  }
}

export async function runMockAction(functionName: string | null, args: unknown) {
  const safeArgs = (args && typeof args === 'object' ? args : {}) as Record<string, unknown>

  switch (functionName) {
    case 'search:searchSkills':
      return searchSkills(String(safeArgs.query ?? ''), safeArgs).slice(0, Number(safeArgs.limit ?? 25))
    case 'skills:getReadme':
      return { text: skillReadmes[String(safeArgs.versionId ?? '')] ?? '# Mock skill\n\nNo README found.' }
    case 'souls:getReadme':
      return { text: soulReadmes[String(safeArgs.versionId ?? '')] ?? '# Mock soul\n\nNo SOUL.md found.' }
    case 'skills:getFileText': {
      const versionId = String(safeArgs.versionId ?? '')
      const path = String(safeArgs.path ?? '')
      return skillFiles[versionId]?.[path] ?? { text: '', size: 0, sha256: makeHash('z') }
    }
    case 'seed:ensureSoulSeeds':
      return { ok: true }
    case 'githubImport:previewGitHubImport':
      return {
        candidates: [
          {
            path: 'skills/mock-skill',
            readmePath: 'skills/mock-skill/SKILL.md',
            name: 'Mock Imported Skill',
            description: 'Preview-only mock import candidate.',
          },
        ],
      }
    case 'githubImport:previewGitHubImportCandidate':
      return {
        resolved: {
          owner: 'openai',
          repo: 'mock-repo',
          ref: 'main',
          commit: 'deadbeefcafebabe',
          path: 'skills/mock-skill',
          repoUrl: 'https://github.com/openai/mock-repo',
          originalUrl: String(safeArgs.url ?? 'https://github.com/openai/mock-repo'),
        },
        candidate: {
          path: 'skills/mock-skill',
          readmePath: 'skills/mock-skill/SKILL.md',
          name: 'Mock Imported Skill',
          description: 'Preview-only mock import candidate.',
        },
        defaults: {
          selectedPaths: ['skills/mock-skill/SKILL.md', 'skills/mock-skill/examples.md'],
          slug: 'mock-imported-skill',
          displayName: 'Mock Imported Skill',
          version: '0.1.0',
          tags: ['latest'],
        },
        files: [
          { path: 'skills/mock-skill/SKILL.md', size: 320, defaultSelected: true },
          { path: 'skills/mock-skill/examples.md', size: 180, defaultSelected: true },
          { path: 'README.md', size: 90, defaultSelected: false },
        ],
      }
    case 'githubImport:importGitHubSkill':
      return { slug: String(safeArgs.slug ?? 'mock-imported-skill') }
    case 'skills:generateChangelogPreview':
    case 'souls:generateChangelogPreview':
      return { changelog: 'Auto-generated mock changelog preview for local development.' }
    case 'skills:publishVersion':
    case 'souls:publishVersion':
      return { slug: String(safeArgs.slug ?? 'mock-slug') }
    default:
      return null
  }
}

export async function runMockMutation(functionName: string | null, args: unknown) {
  const safeArgs = (args && typeof args === 'object' ? args : {}) as Record<string, unknown>

  switch (functionName) {
    case 'tokens:create':
      return { token: 'ch_mock_local_token_1234567890' }
    case 'uploads:generateUploadUrl':
      return 'https://example.com/mock-upload'
    case 'comments:report':
      return { alreadyReported: false }
    case 'skills:report':
      return { reported: true }
    case 'users:updateProfile':
    case 'users:deleteAccount':
    case 'users:ensure':
    case 'users:setRole':
    case 'users:banUser':
    case 'stars:toggle':
    case 'soulStars:toggle':
    case 'comments:add':
    case 'comments:remove':
    case 'soulComments:add':
    case 'soulComments:remove':
    case 'tokens:revoke':
    case 'skills:updateTags':
    case 'skills:setBatch':
    case 'skills:setSoftDeleted':
    case 'skills:hardDelete':
    case 'skills:changeOwner':
    case 'skills:setDuplicate':
    case 'skills:setOfficialBadge':
    case 'skills:setDeprecatedBadge':
    case 'skills:setSkillManualOverride':
    case 'skills:clearSkillManualOverride':
    case 'telemetry:clearMyTelemetry':
      return { ok: true, args: safeArgs }
    default:
      return { ok: true, args: safeArgs }
  }
}
