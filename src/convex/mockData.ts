import type { Doc, Id } from '../../convex/_generated/dataModel'
import type { PublicSkill, PublicSoul, PublicUser } from '../lib/publicUser'

const mockModeFlag = String(import.meta.env.VITE_USE_MOCK_DATA ?? '')
  .trim()
  .toLowerCase()

export const mockModeEnabled = mockModeFlag === '1' || mockModeFlag === 'true'

const now = Date.UTC(2026, 2, 17, 12, 0, 0)

type SkillPageEntry = {
  skill: PublicSkill
  ownerHandle?: string | null
  owner?: PublicUser | null
  latestVersion?: Doc<'skillVersions'> | null
}

type SkillBySlugResult = {
  requestedSlug?: string | null
  resolvedSlug?: string | null
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
    installsCurrent: Math.max(1, Math.floor(installs / 3)),
  }
}

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
  handle: 'steipete',
  name: 'steipete',
  displayName: 'Peter Steinberger',
  image: 'https://avatars.githubusercontent.com/u/11161?v=4',
  bio: 'Publishes practical CLI tools and developer utilities.',
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

const skillA = {
  _id: 'skills:blogwatcher' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 40,
  slug: 'blogwatcher',
  displayName: 'Blogwatcher',
  summary: 'Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.',
  ownerUserId: maintainerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:blogwatcher-110' as Id<'skillVersions'>,
  tags: {
    latest: 'skillVersions:blogwatcher-110' as Id<'skillVersions'>,
    stable: 'skillVersions:blogwatcher-110' as Id<'skillVersions'>,
  },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 24 * 3 },
    official: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 24 * 7 },
  },
  stats: makeSkillStats(25800, 47, 2, 1100),
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
    _id: 'skillVersions:blogwatcher-110' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillA._id,
    version: '1.1.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Adds grouped watchlists and examples.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 420, storageId: 'storage:blogwatcher-skill', sha256: makeHash('a') },
      { path: 'feeds.md', size: 192, storageId: 'storage:blogwatcher-feeds', sha256: makeHash('b') },
      { path: 'examples/watchlist.txt', size: 144, storageId: 'storage:blogwatcher-example', sha256: makeHash('c') },
    ],
    parsed: {
      clawdis: {
        emoji: ':newspaper:',
        requires: {
          bins: ['blogwatcher'],
        },
        install: [
          {
            id: 'blogwatcher-go',
            kind: 'go',
            label: 'Install blogwatcher (go)',
            bins: ['blogwatcher'],
            module: 'github.com/Hyaxia/blogwatcher/cmd/blogwatcher@latest',
          },
        ],
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
      confidence: 'high',
      summary: 'The instructions and install method match the stated purpose.',
      findings: 'Install command and binary names are consistent.',
      model: 'mock-openclaw-local',
      checkedAt: now - 1000 * 60 * 28,
    },
  },
  {
    _id: 'skillVersions:blogwatcher-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 8,
    skillId: skillA._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 8,
    changelog: 'Initial public release.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 360, storageId: 'storage:blogwatcher-skill-100', sha256: makeHash('e') },
    ],
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
      summary: 'The files stay consistent with a release-assistant workflow.',
      findings: 'No credential prompts or hidden executables were detected in the mock package.',
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
      summary: 'Mock static scan flagged one credential-like placeholder for local UI testing.',
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
      summary: 'This mock example is intentionally flagged so suspicious states can be reviewed.',
      findings: 'Mock evaluator inserted a cautionary verdict for UI testing.',
      model: 'mock-openclaw-local',
      checkedAt: now - 1000 * 60 * 18,
    },
  },
] as Doc<'skillVersions'>[]

const soulA = {
  _id: 'souls:captains-log' as Id<'souls'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 14,
  slug: 'captains-log',
  displayName: "Captain's Log",
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
  'skillVersions:blogwatcher-110': `---
name: Blogwatcher
description: Monitor blogs and RSS/Atom feeds for updates using the blogwatcher CLI.
---

# Blogwatcher

Use this skill when an agent needs to monitor blogs and RSS/Atom feeds for updates.
`,
  'skillVersions:blogwatcher-100': '# Blogwatcher\n\nInitial version of the blog and feed monitoring skill.\n',
  'skillVersions:shipwright-201': `---
name: Shipwright
description: Repo-aware release assistant.
---

# Shipwright

Turn commits into release notes, rollout steps, and stakeholder updates.

## Operating mode

1. Read the repo diff and PR metadata first.
2. Group changes into customer-facing, internal, and risk items.
3. Draft the release note before writing rollout tasks.
4. Call out unknowns explicitly instead of smoothing them over.
`,
  'skillVersions:shipwright-200': '# Shipwright\n\nRelease prep for repos that need crisp summaries and checklists.\n',
  'skillVersions:briefsmith-100': '# Briefsmith\n\nTake scattered notes and output concise execution briefs.\n',
}

const skillFiles: Record<string, Record<string, { text: string; size: number; sha256: string }>> = {
  'skillVersions:blogwatcher-110': {
    'SKILL.md': { text: skillReadmes['skillVersions:blogwatcher-110'], size: 420, sha256: makeHash('a') },
    'feeds.md': {
      text: '- https://daringfireball.net/feeds/main\n- https://feeds.feedburner.com/inessential/full\n',
      size: 192,
      sha256: makeHash('b'),
    },
    'examples/watchlist.txt': {
      text: 'watch https://daringfireball.net/feeds/main\nwatch https://feeds.feedburner.com/inessential/full\n',
      size: 144,
      sha256: makeHash('c'),
    },
  },
  'skillVersions:shipwright-201': {
    'SKILL.md': { text: skillReadmes['skillVersions:shipwright-201'], size: 1120, sha256: makeHash('f') },
    'templates/release.md': {
      text: '## Summary\n\n- What shipped\n- Why it matters\n- Who should care\n\n## Rollout\n\n1. Deploy backend\n2. Verify logs and key metrics\n3. Announce externally\n',
      size: 640,
      sha256: makeHash('g'),
    },
    'playbooks/rollout.md': {
      text: '# Rollout Playbook\n\n1. Check error rate\n2. Confirm queue drains\n3. Validate webhook traffic\n',
      size: 462,
      sha256: makeHash('n'),
    },
  },
  'skillVersions:shipwright-200': {
    'SKILL.md': { text: skillReadmes['skillVersions:shipwright-200'], size: 860, sha256: makeHash('h') },
    'templates/release.md': {
      text: '## Summary\n\n## Risks\n\n## Rollout\n\n- Ship to production\n- Check the dashboard\n',
      size: 498,
      sha256: makeHash('o'),
    },
  },
  'skillVersions:briefsmith-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:briefsmith-100'], size: 280, sha256: makeHash('i') },
    'prompts/kickoff.md': {
      text: 'Summarize the request, the audience, and the decisions needed.\n',
      size: 190,
      sha256: makeHash('j'),
    },
  },
}

const soulReadmes: Record<string, string> = {
  'soulVersions:captains-log-100': "# Captain's Log\n\nSteady, observant, and calm under pressure.\n",
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
        return (a.displayName.localeCompare(b.displayName) || a.slug.localeCompare(b.slug)) * multiplier
      case 'stars':
        return (a.stats.stars - b.stats.stars) * multiplier || (a.updatedAt - b.updatedAt) * multiplier
      case 'installs':
        return (((a.stats.installsAllTime ?? 0) - (b.stats.installsAllTime ?? 0)) * multiplier) || (a.updatedAt - b.updatedAt) * multiplier
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
  return sortSkills(list, typeof args?.sort === 'string' ? args.sort : 'downloads', args?.dir === 'asc' ? 'asc' : 'desc')
}

function buildPaginatedSkillPage(args: Record<string, unknown> | undefined) {
  const items = getFilteredSkills(args).map(buildSkillEntry)
  const parsedCursor = Number.parseInt(String(args?.cursor ?? ''), 10)
  const start = Number.isFinite(parsedCursor) && parsedCursor > 0 ? parsedCursor : 0
  const requestedCount = Number(args?.numItems ?? items.length)
  const count = Number.isFinite(requestedCount) && requestedCount > 0 ? requestedCount : items.length
  const page = items.slice(start, start + count)
  const nextOffset = start + page.length
  const hasMore = nextOffset < items.length

  return {
    page,
    hasMore,
    nextCursor: hasMore ? String(nextOffset) : null,
  }
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
    requestedSlug: skill.slug,
    resolvedSlug: skill.slug,
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
      return mockSkills
        .filter((skill) => Boolean(skill.badges?.highlighted))
        .slice(0, Number(safeArgs.limit ?? 6))
        .map(buildSkillEntry)
    case 'skills:listPublicPageV4':
      return buildPaginatedSkillPage(safeArgs)
    case 'skills:listPublicPageV2': {
      const items = getFilteredSkills(safeArgs).map(buildSkillEntry)
      const numItems = Number(
        (safeArgs.paginationOpts as { numItems?: number } | undefined)?.numItems ?? items.length,
      )
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
          skill: mockSkills.find((skill) => skill._id === version.skillId) as Doc<'skills'> | undefined,
          owner: getOwner(
            (mockSkills.find((skill) => skill._id === version.skillId)?.ownerUserId ??
              demoUser._id) as Id<'users'>,
          ) as Doc<'users'> | null,
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
      return { text: skillReadmes[String(safeArgs.versionId ?? '')] ?? '# Mock skill\n\nNo README found.\n' }
    case 'souls:getReadme':
      return { text: soulReadmes[String(safeArgs.versionId ?? '')] ?? '# Mock soul\n\nNo SOUL.md found.\n' }
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
    default:
      return { ok: true, args: safeArgs }
  }
}

export function getMockSkillMeta(slug: string) {
  const result = buildSkillBySlugResult(findSkillBySlug(slug))
  if (!result?.skill) return null

  return {
    displayName: result.skill.displayName ?? null,
    summary: result.skill.summary ?? null,
    owner: result.owner?.handle ?? result.owner?.name ?? null,
    ownerId: result.owner?._id ? String(result.owner._id) : null,
    version: result.latestVersion?.version ?? null,
  }
}

export function getMockSoulMeta(slug: string) {
  const soul = findSoulBySlug(slug)
  if (!soul) return null

  return {
    displayName: soul.displayName ?? null,
    summary: soul.summary ?? null,
    owner: getOwner(soul.ownerUserId)?.handle ?? getOwner(soul.ownerUserId)?.name ?? null,
    version: getSoulVersion(soul.latestVersionId)?.version ?? null,
  }
}
