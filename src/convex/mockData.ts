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

const asleepUser = {
  _id: 'users:asleep123' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 260,
  handle: 'Asleep123',
  name: 'Asleep123',
  displayName: 'Asleep123',
  image: 'https://avatars.githubusercontent.com/u/124599?v=4',
  bio: 'Builds calendar and workflow integrations.',
} as unknown as PublicUser

const rhysUser = {
  _id: 'users:rhys' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 190,
  handle: 'RhysSullivan',
  name: 'Rhys Sullivan',
  displayName: 'Rhys Sullivan',
  image: 'https://avatars.githubusercontent.com/u/221675?v=4',
  bio: 'Maintains community-search and knowledge retrieval tools.',
} as unknown as PublicUser

const oswalUser = {
  _id: 'users:oswal' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 170,
  handle: 'oswalpalash',
  name: 'Oswal Palash',
  displayName: 'Oswal Palash',
  image: 'https://avatars.githubusercontent.com/u/406364?v=4',
  bio: 'Focuses on knowledge graphs, retrieval, and memory systems.',
} as unknown as PublicUser

const ivanUser = {
  _id: 'users:ivan' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 165,
  handle: 'ivangdavila',
  name: 'Ivan Davila',
  displayName: 'Ivan Davila',
  image: 'https://avatars.githubusercontent.com/u/583231?v=4',
  bio: 'Publishes agent autonomy and self-improvement workflows.',
} as unknown as PublicUser

const flyUser = {
  _id: 'users:fly' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 155,
  handle: 'fly0pants',
  name: 'fly0pants',
  displayName: 'fly0pants',
  image: 'https://avatars.githubusercontent.com/u/913758?v=4',
  bio: 'Builds growth, ad analytics, and acquisition tooling.',
} as unknown as PublicUser

const ideUser = {
  _id: 'users:ide' as Id<'users'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 145,
  handle: 'ide-rea',
  name: 'ide-rea',
  displayName: 'ide-rea',
  image: 'https://avatars.githubusercontent.com/u/29600?v=4',
  bio: 'Ships search and information-retrieval skills.',
} as unknown as PublicUser

const mockUsers = [
  demoUser,
  maintainerUser,
  partnerUser,
  soulUser,
  asleepUser,
  rhysUser,
  oswalUser,
  ivanUser,
  flyUser,
  ideUser,
]

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

const skillD = {
  _id: 'skills:trello' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 28,
  slug: 'trello',
  displayName: 'Trello',
  summary: 'Manage Trello boards, lists, and cards via the Trello REST API.',
  ownerUserId: maintainerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:trello-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:trello-100' as Id<'skillVersions'> },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 8 },
  },
  stats: makeSkillStats(26500, 107, 1, 9200),
  createdAt: now - 1000 * 60 * 60 * 24 * 28,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSkill

const skillE = {
  _id: 'skills:slack' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 30,
  slug: 'slack',
  displayName: 'Slack',
  summary:
    'Use when you need to control Slack from Clawdbot via the Slack tool, including reacting to messages, posting updates, and triaging threads.',
  ownerUserId: maintainerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:slack-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:slack-100' as Id<'skillVersions'> },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 7 },
  },
  stats: makeSkillStats(28500, 93, 1, 10000),
  createdAt: now - 1000 * 60 * 60 * 24 * 30,
  updatedAt: now - 1000 * 60 * 60 * 24 * 3,
} as unknown as PublicSkill

const skillF = {
  _id: 'skills:caldav-calendar' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 26,
  slug: 'caldav-calendar',
  displayName: 'Caldav Calendar',
  summary:
    'Sync and query CalDAV calendars (iCloud, Google, Fastmail, Nextcloud, etc.) using a local calendar bridge.',
  ownerUserId: asleepUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:caldav-calendar-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:caldav-calendar-100' as Id<'skillVersions'> },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 6 },
  },
  stats: makeSkillStats(19900, 175, 1, 7000),
  createdAt: now - 1000 * 60 * 60 * 24 * 26,
  updatedAt: now - 1000 * 60 * 60 * 24 * 4,
} as unknown as PublicSkill

const skillG = {
  _id: 'skills:answer-overflow' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 24,
  slug: 'answer-overflow',
  displayName: 'Answer Overflow',
  summary:
    'Search indexed Discord community discussions via Answer Overflow. Find solutions, examples, and prior decisions quickly.',
  ownerUserId: rhysUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:answer-overflow-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:answer-overflow-100' as Id<'skillVersions'> },
  badges: {
    highlighted: { byUserId: demoUser._id, at: now - 1000 * 60 * 60 * 5 },
  },
  stats: makeSkillStats(12600, 123, 1, 4800),
  createdAt: now - 1000 * 60 * 60 * 24 * 24,
  updatedAt: now - 1000 * 60 * 60 * 24 * 6,
} as unknown as PublicSkill

const skillH = {
  _id: 'skills:ontology' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 42,
  slug: 'ontology',
  displayName: 'ontology',
  summary:
    'Typed knowledge graph for structured agent memory and composable skills. Use when the agent needs durable entities, relations, and retrieval.',
  ownerUserId: oswalUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:ontology-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:ontology-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(113000, 314, 1, 37000),
  createdAt: now - 1000 * 60 * 60 * 24 * 42,
  updatedAt: now - 1000 * 60 * 60 * 24 * 3,
} as unknown as PublicSkill

const skillI = {
  _id: 'skills:self-improving-proactive-agent' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 33,
  slug: 'self-improving-proactive-agent',
  displayName: 'Self-Improving + Proactive Agent',
  summary:
    'Self-reflection + Self-criticism + Self-learning + Self-organizing memory. Agent evaluates its own work and proposes next steps.',
  ownerUserId: ivanUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:self-improving-proactive-agent-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:self-improving-proactive-agent-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(82200, 432, 1, 28800),
  createdAt: now - 1000 * 60 * 60 * 24 * 33,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSkill

const skillJ = {
  _id: 'skills:admapix' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 29,
  slug: 'admapix',
  displayName: 'AdMapix',
  summary:
    'Ad intelligence and app analytics assistant. Search ad creatives, analyze apps, view rankings, and track competitor motion.',
  ownerUserId: flyUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:admapix-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:admapix-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(63300, 112, 1, 22600),
  createdAt: now - 1000 * 60 * 60 * 24 * 29,
  updatedAt: now - 1000 * 60 * 60 * 24 * 5,
} as unknown as PublicSkill

const skillK = {
  _id: 'skills:obsidian' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 36,
  slug: 'obsidian',
  displayName: 'Obsidian',
  summary:
    'Work with Obsidian vaults (plain Markdown notes) and automate via obsidian-cli.',
  ownerUserId: maintainerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:obsidian-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:obsidian-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(54800, 216, 1, 19200),
  createdAt: now - 1000 * 60 * 60 * 24 * 36,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSkill

const skillL = {
  _id: 'skills:nano-banana-pro' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 18,
  slug: 'nano-banana-pro',
  displayName: 'Nano Banana Pro',
  summary:
    'Generate and edit images with Nano Banana Pro (Gemini 3 Pro Image). Use for image create/modify flows and visual iteration.',
  ownerUserId: maintainerUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:nano-banana-pro-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:nano-banana-pro-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(54400, 216, 1, 18800),
  createdAt: now - 1000 * 60 * 60 * 24 * 18,
  updatedAt: now - 1000 * 60 * 60 * 24 * 1,
} as unknown as PublicSkill

const skillM = {
  _id: 'skills:baidu-web-search' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 21,
  slug: 'baidu-web-search',
  displayName: 'baidu web search',
  summary:
    'Search the web using Baidu AI Search Engine (BDSE). Use for live information, documentation, or market discovery.',
  ownerUserId: ideUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:baidu-web-search-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:baidu-web-search-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(47300, 124, 1, 16500),
  createdAt: now - 1000 * 60 * 60 * 24 * 21,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSkill

const skillN = {
  _id: 'skills:repo-radar' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 16,
  slug: 'repo-radar',
  displayName: 'Repo Radar',
  summary:
    'Scan repository activity, PR churn, and release readiness signals before a weekly engineering review.',
  ownerUserId: demoUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:repo-radar-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:repo-radar-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(6200, 74, 1, 2100),
  createdAt: now - 1000 * 60 * 60 * 24 * 16,
  updatedAt: now - 1000 * 60 * 60 * 24 * 2,
} as unknown as PublicSkill

const skillO = {
  _id: 'skills:prompt-linter' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 14,
  slug: 'prompt-linter',
  displayName: 'Prompt Linter',
  summary:
    'Review prompts for ambiguity, missing constraints, and weak output contracts before they reach production.',
  ownerUserId: demoUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:prompt-linter-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:prompt-linter-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(4700, 96, 1, 1800),
  createdAt: now - 1000 * 60 * 60 * 24 * 14,
  updatedAt: now - 1000 * 60 * 60 * 18,
} as unknown as PublicSkill

const skillP = {
  _id: 'skills:incident-scribe' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 11,
  slug: 'incident-scribe',
  displayName: 'Incident Scribe',
  summary:
    'Draft incident timelines, status updates, and postmortem sections from raw notes, logs, and Slack context.',
  ownerUserId: demoUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:incident-scribe-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:incident-scribe-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(3900, 58, 1, 1440),
  createdAt: now - 1000 * 60 * 60 * 24 * 11,
  updatedAt: now - 1000 * 60 * 60 * 24,
} as unknown as PublicSkill

const skillQ = {
  _id: 'skills:spec-forge' as Id<'skills'>,
  _creationTime: now - 1000 * 60 * 60 * 24 * 9,
  slug: 'spec-forge',
  displayName: 'Spec Forge',
  summary:
    'Turn product notes and issue threads into implementation-ready specs with assumptions, edge cases, and acceptance criteria.',
  ownerUserId: demoUser._id,
  canonicalSkillId: undefined,
  forkOf: undefined,
  latestVersionId: 'skillVersions:spec-forge-100' as Id<'skillVersions'>,
  tags: { latest: 'skillVersions:spec-forge-100' as Id<'skillVersions'> },
  badges: {},
  stats: makeSkillStats(5100, 121, 1, 2200),
  createdAt: now - 1000 * 60 * 60 * 24 * 9,
  updatedAt: now - 1000 * 60 * 60 * 12,
} as unknown as PublicSkill

const mockSkills = [
  skillA,
  skillB,
  skillC,
  skillD,
  skillE,
  skillF,
  skillG,
  skillH,
  skillI,
  skillJ,
  skillK,
  skillL,
  skillM,
  skillN,
  skillO,
  skillP,
  skillQ,
]

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
  {
    _id: 'skillVersions:trello-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillD._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Initial Trello workflow release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 340, storageId: 'storage:trello-skill', sha256: makeHash('ta') }],
  },
  {
    _id: 'skillVersions:slack-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 3,
    skillId: skillE._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 3,
    changelog: 'Initial Slack operations release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 396, storageId: 'storage:slack-skill', sha256: makeHash('tb') }],
  },
  {
    _id: 'skillVersions:caldav-calendar-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 4,
    skillId: skillF._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 4,
    changelog: 'Initial CalDAV calendar release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 364, storageId: 'storage:caldav-skill', sha256: makeHash('tc') }],
    parsed: {
      clawdis: {
        os: ['macos', 'linux'],
      },
    },
  },
  {
    _id: 'skillVersions:answer-overflow-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 6,
    skillId: skillG._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 6,
    changelog: 'Initial Answer Overflow search release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 352, storageId: 'storage:answer-overflow-skill', sha256: makeHash('td') }],
  },
  {
    _id: 'skillVersions:ontology-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 3,
    skillId: skillH._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 3,
    changelog: 'Initial ontology memory release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 388, storageId: 'storage:ontology-skill', sha256: makeHash('te') }],
  },
  {
    _id: 'skillVersions:self-improving-proactive-agent-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillI._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Initial proactive-agent release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 436, storageId: 'storage:self-improving-skill', sha256: makeHash('tf') }],
    parsed: {
      clawdis: {
        os: ['linux', 'macos', 'windows'],
      },
    },
  },
  {
    _id: 'skillVersions:admapix-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 5,
    skillId: skillJ._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 5,
    changelog: 'Initial AdMapix release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 368, storageId: 'storage:admapix-skill', sha256: makeHash('tg') }],
  },
  {
    _id: 'skillVersions:obsidian-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillK._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Initial Obsidian workflow release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 332, storageId: 'storage:obsidian-skill', sha256: makeHash('th') }],
    parsed: {
      clawdis: {
        os: ['macos', 'linux', 'windows'],
      },
    },
  },
  {
    _id: 'skillVersions:nano-banana-pro-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24,
    skillId: skillL._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24,
    changelog: 'Initial Nano Banana Pro image release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 344, storageId: 'storage:nano-banana-skill', sha256: makeHash('ti') }],
  },
  {
    _id: 'skillVersions:baidu-web-search-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillM._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Initial Baidu web search release.',
    changelogSource: 'user',
    files: [{ path: 'SKILL.md', size: 330, storageId: 'storage:baidu-skill', sha256: makeHash('tj') }],
  },
  {
    _id: 'skillVersions:repo-radar-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24 * 2,
    skillId: skillN._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
    changelog: 'Initial repo review workflow release.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 376, storageId: 'storage:repo-radar-skill', sha256: makeHash('tk') },
      { path: 'templates/weekly-review.md', size: 224, storageId: 'storage:repo-radar-review', sha256: makeHash('tl') },
    ],
  },
  {
    _id: 'skillVersions:prompt-linter-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 18,
    skillId: skillO._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 18,
    changelog: 'Initial prompt review release.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 358, storageId: 'storage:prompt-linter-skill', sha256: makeHash('tm') },
      { path: 'checks/rubric.md', size: 204, storageId: 'storage:prompt-linter-rubric', sha256: makeHash('tn') },
    ],
  },
  {
    _id: 'skillVersions:incident-scribe-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 24,
    skillId: skillP._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 24,
    changelog: 'Initial incident documentation release.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 392, storageId: 'storage:incident-scribe-skill', sha256: makeHash('to') },
      { path: 'templates/postmortem.md', size: 246, storageId: 'storage:incident-scribe-template', sha256: makeHash('tp') },
    ],
  },
  {
    _id: 'skillVersions:spec-forge-100' as Id<'skillVersions'>,
    _creationTime: now - 1000 * 60 * 60 * 12,
    skillId: skillQ._id,
    version: '1.0.0',
    createdAt: now - 1000 * 60 * 60 * 12,
    changelog: 'Initial specification drafting release.',
    changelogSource: 'user',
    files: [
      { path: 'SKILL.md', size: 410, storageId: 'storage:spec-forge-skill', sha256: makeHash('tq') },
      { path: 'references/acceptance.md', size: 232, storageId: 'storage:spec-forge-acceptance', sha256: makeHash('tr') },
    ],
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
  'skillVersions:trello-100': '# Trello\n\nManage boards, lists, and cards with a clear workflow-first prompt contract.\n',
  'skillVersions:slack-100': '# Slack\n\nOperate Slack channels, messages, reactions, and triage routines from one skill.\n',
  'skillVersions:caldav-calendar-100': '# Caldav Calendar\n\nSync and query CalDAV calendars across common providers.\n',
  'skillVersions:answer-overflow-100': '# Answer Overflow\n\nSearch Answer Overflow indexes to surface prior Discord discussions and fixes.\n',
  'skillVersions:ontology-100': '# ontology\n\nUse a typed knowledge graph for agent memory, retrieval, and reusable entities.\n',
  'skillVersions:self-improving-proactive-agent-100': '# Self-Improving + Proactive Agent\n\nReflect, critique, and propose better next steps before the user asks.\n',
  'skillVersions:admapix-100': '# AdMapix\n\nInspect ad creatives, app rankings, and competitor acquisition motion.\n',
  'skillVersions:obsidian-100': '# Obsidian\n\nRead and update local Markdown notes in an Obsidian vault.\n',
  'skillVersions:nano-banana-pro-100': '# Nano Banana Pro\n\nGenerate and edit images through a structured prompt workflow.\n',
  'skillVersions:baidu-web-search-100': '# baidu web search\n\nUse Baidu AI Search Engine for current web information and references.\n',
  'skillVersions:repo-radar-100': '# Repo Radar\n\nReview repository health, PR throughput, and release readiness before a weekly engineering sync.\n',
  'skillVersions:prompt-linter-100': '# Prompt Linter\n\nAudit prompts for ambiguity, missing constraints, and weak expected-output contracts.\n',
  'skillVersions:incident-scribe-100': '# Incident Scribe\n\nTurn notes, logs, and chat excerpts into clean incident timelines and postmortem drafts.\n',
  'skillVersions:spec-forge-100': '# Spec Forge\n\nConvert issue threads and rough product notes into implementation-ready specifications.\n',
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
  'skillVersions:trello-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:trello-100'], size: 340, sha256: makeHash('ta') },
  },
  'skillVersions:slack-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:slack-100'], size: 396, sha256: makeHash('tb') },
  },
  'skillVersions:caldav-calendar-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:caldav-calendar-100'],
      size: 364,
      sha256: makeHash('tc'),
    },
  },
  'skillVersions:answer-overflow-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:answer-overflow-100'],
      size: 352,
      sha256: makeHash('td'),
    },
  },
  'skillVersions:ontology-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:ontology-100'], size: 388, sha256: makeHash('te') },
  },
  'skillVersions:self-improving-proactive-agent-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:self-improving-proactive-agent-100'],
      size: 436,
      sha256: makeHash('tf'),
    },
  },
  'skillVersions:admapix-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:admapix-100'], size: 368, sha256: makeHash('tg') },
  },
  'skillVersions:obsidian-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:obsidian-100'], size: 332, sha256: makeHash('th') },
  },
  'skillVersions:nano-banana-pro-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:nano-banana-pro-100'],
      size: 344,
      sha256: makeHash('ti'),
    },
  },
  'skillVersions:baidu-web-search-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:baidu-web-search-100'],
      size: 330,
      sha256: makeHash('tj'),
    },
  },
  'skillVersions:repo-radar-100': {
    'SKILL.md': { text: skillReadmes['skillVersions:repo-radar-100'], size: 376, sha256: makeHash('tk') },
    'templates/weekly-review.md': {
      text: '## Weekly Review\n\n- PRs at risk\n- Hot spots\n- Release blockers\n- Follow-up actions\n',
      size: 224,
      sha256: makeHash('tl'),
    },
  },
  'skillVersions:prompt-linter-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:prompt-linter-100'],
      size: 358,
      sha256: makeHash('tm'),
    },
    'checks/rubric.md': {
      text: '- Goal is explicit\n- Inputs are bounded\n- Output shape is specified\n- Failure mode is defined\n',
      size: 204,
      sha256: makeHash('tn'),
    },
  },
  'skillVersions:incident-scribe-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:incident-scribe-100'],
      size: 392,
      sha256: makeHash('to'),
    },
    'templates/postmortem.md': {
      text: '## Impact\n\n## Timeline\n\n## Root Cause\n\n## Corrective Actions\n',
      size: 246,
      sha256: makeHash('tp'),
    },
  },
  'skillVersions:spec-forge-100': {
    'SKILL.md': {
      text: skillReadmes['skillVersions:spec-forge-100'],
      size: 410,
      sha256: makeHash('tq'),
    },
    'references/acceptance.md': {
      text: 'Acceptance criteria should be observable, testable, and free of hidden assumptions.\n',
      size: 232,
      sha256: makeHash('tr'),
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
