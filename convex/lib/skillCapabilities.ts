const SKILL_CAPABILITIES = [
  'shell',
  'filesystem',
  'network',
  'browser',
  'sessions',
  'messaging',
  'scheduling',
] as const

export type SkillCapability = (typeof SKILL_CAPABILITIES)[number]

const SKILL_CAPABILITY_SET = new Set<string>(SKILL_CAPABILITIES)

const CAPABILITY_ALIASES: Record<string, SkillCapability> = {
  // shell
  bash: 'shell',
  command: 'shell',
  commands: 'shell',
  exec: 'shell',
  process: 'shell',
  shell: 'shell',
  terminal: 'shell',
  shell_exec: 'shell',

  // filesystem
  apply_patch: 'filesystem',
  edit: 'filesystem',
  file: 'filesystem',
  files: 'filesystem',
  filesystem: 'filesystem',
  fs: 'filesystem',
  write: 'filesystem',

  // network
  fetch: 'network',
  http: 'network',
  mcp: 'network',
  network: 'network',
  web: 'network',
  'web-fetch': 'network',
  web_fetch: 'network',
  webfetch: 'network',
  web_search: 'network',
  'network.fetch': 'network',
  'network.search': 'network',

  // browser
  browser: 'browser',
  'computer-use': 'browser',
  computer_use: 'browser',
  gui: 'browser',
  screen: 'browser',
  ui: 'browser',

  // sessions
  delegate: 'sessions',
  orchestration: 'sessions',
  sessions: 'sessions',
  sessions_send: 'sessions',
  sessions_spawn: 'sessions',
  subagent: 'sessions',
  subagents: 'sessions',

  // messaging
  chat: 'messaging',
  message: 'messaging',
  messages: 'messaging',
  messaging: 'messaging',

  // scheduling
  cron: 'scheduling',
  schedule: 'scheduling',
  scheduler: 'scheduling',
  scheduling: 'scheduling',
  timer: 'scheduling',
}

function normalizeCapabilityName(input: string): SkillCapability | null {
  const key = input.trim().toLowerCase()
  if (!key) return null
  if (SKILL_CAPABILITY_SET.has(key)) return key as SkillCapability
  const alias = CAPABILITY_ALIASES[key]
  if (alias) return alias
  const firstSegment = key.split(/[._:-]/)[0]
  if (SKILL_CAPABILITY_SET.has(firstSegment)) return firstSegment as SkillCapability
  return null
}

function extractCapabilityNames(input: unknown): string[] {
  if (!input) return []
  if (typeof input === 'string') return [input]
  if (Array.isArray(input)) {
    return input.flatMap((entry) => {
      if (typeof entry === 'string') return [entry]
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return []
      const obj = entry as Record<string, unknown>
      const named = [obj.name, obj.type, obj.id, obj.capability].find(
        (value) => typeof value === 'string',
      )
      return typeof named === 'string' ? [named] : []
    })
  }
  if (typeof input === 'object') {
    return Object.keys(input as Record<string, unknown>)
  }
  return []
}

export function normalizeCapabilities(input: unknown): SkillCapability[] {
  const rawNames = extractCapabilityNames(input)
  const out = new Set<SkillCapability>()
  for (const rawName of rawNames) {
    const normalized = normalizeCapabilityName(rawName)
    if (normalized) out.add(normalized)
  }
  return Array.from(out)
}
