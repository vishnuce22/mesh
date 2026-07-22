// All figures on this page are fictional demo data for a simulated facility.

export const NAV_LINKS = [
  { href: '#story', label: 'Story' },
  { href: '#ai', label: 'AI' },
  { href: '#dashboard', label: 'Live' },
  { href: '#platform', label: 'Platform' },
  { href: '#why', label: 'Why MESH' },
]

export const CONTACT = 'mailto:vishnuce22@gmail.com?subject=MESH%20Demo%20Request'

export type Stage = {
  id: string
  index: string
  title: string
  copy: string
  meta: string
}

export const STAGES: Stage[] = [
  { id: 'rfq', index: '01', title: 'RFQ', meta: 'JOB FILE OPENED', copy: 'A customer request lands. MESH opens a digital job file — no paper, no re-typing, nothing lost.' },
  { id: 'planning', index: '02', title: 'Planning', meta: 'ROUTING · MATERIALS · TOOLING', copy: 'Routing, materials and tooling are defined once and reused forever. Every revision is tracked.' },
  { id: 'scheduling', index: '03', title: 'Scheduling', meta: 'CAPACITY-BALANCED', copy: 'Jobs drop onto a live board balanced against real machine capacity. Move one, and the whole plan re-flows.' },
  { id: 'setup', index: '04', title: 'Machine Setup', meta: 'SETUP SHEETS AT THE SPINDLE', copy: 'Operators see setup sheets, offsets and first-article requirements right at the machine.' },
  { id: 'production', index: '05', title: 'Production', meta: 'EVERY CYCLE LOGGED', copy: 'Every cycle is logged in real time. Status flows instantly to every screen on the floor.' },
  { id: 'inspection', index: '06', title: 'Inspection', meta: 'QUALITY GATES ENFORCED', copy: 'Quality gates hold the job until measurements pass. The records write themselves.' },
  { id: 'inventory', index: '07', title: 'Inventory', meta: 'FULL LOT TRACEABILITY', copy: 'Material and finished stock move with full lot traceability — scanned, located, accounted for.' },
  { id: 'shipping', index: '08', title: 'Shipping', meta: 'CERTS FROM LIVE DATA', copy: 'Certs, travelers and packing slips are generated from live production data, not retyped.' },
  { id: 'analytics', index: '09', title: 'Analytics', meta: 'OEE · MARGIN · BOTTLENECKS', copy: 'The job feeds OEE, margin and bottleneck analysis the moment it ships. The next quote gets smarter.' },
]

export type AiTurn = {
  prompt: string
  thinking: string
  answer: string
  chart: number[]
}

export const AI_TURNS: AiTurn[] = [
  {
    prompt: 'Which jobs are running behind?',
    thinking: 'Scanning 41 open work orders against plan…',
    answer: 'Two jobs are trending late: J-2214 — op 40 queued 3.2 h behind plan, and J-2189 — waiting on inspection. Re-sequencing M-07 recovers both by Thursday.',
    chart: [30, 45, 38, 62, 48, 71, 55, 40],
  },
  {
    prompt: 'Why did Machine 12 stop?',
    thinking: 'Correlating machine events, tool life and alarms…',
    answer: 'M-12 stopped at 09:41 on a tool-wear alarm, station T7. Average insert life on this material is 82 parts; this one ran 96. Replacement queued, setup sheet updated.',
    chart: [82, 84, 80, 86, 90, 96, 20, 78],
  },
  {
    prompt: 'What material will run out this week?',
    thinking: 'Projecting stock against scheduled consumption…',
    answer: '6061-T6 round bar Ø3" falls below safety stock in 6 days at current burn. One open PO covers half the gap — purchasing has been flagged.',
    chart: [88, 76, 64, 55, 44, 31, 22, 14],
  },
  {
    prompt: 'Which operator is overloaded?',
    thinking: 'Checking station load against shift standards…',
    answer: 'Evening deburr load is at 118% of standard. Moving two benched jobs to the morning shift levels both shifts under 95%.',
    chart: [95, 102, 88, 118, 76, 92, 84, 90],
  },
]

// Fictional demo fleet — deliberately not any real shop's numbers.
export const METRICS = [
  { id: 'machines', label: 'Machines', value: 34, sub: '27 running · 4 setup · 3 maintenance', accent: 'cyan' },
  { id: 'oee', label: 'OEE', value: 89, suffix: '%', sub: 'availability × performance × quality', accent: 'electric' },
  { id: 'revenue', label: "Today's Revenue", value: 48200, prefix: '$', sub: 'shipped value, updated live', accent: 'cyan', drift: true },
  { id: 'late', label: 'Late Jobs', value: 2, sub: 'of 41 open work orders', accent: 'signal' },
  { id: 'quality', label: 'Quality Pass Rate', value: 99.4, suffix: '%', decimals: 1, sub: 'rolling 30 days', accent: 'run' },
  { id: 'material', label: 'Material Availability', value: 98, suffix: '%', sub: 'against scheduled demand', accent: 'electric' },
] as const

export type Scene = {
  id: string
  index: string
  eyebrow: string
  title: string
  copy: string
  points: string[]
  shot?: { src: string; alt: string; tag: string }
  vignette: 'schedule' | 'inventory' | 'quality' | 'maintenance' | 'analytics'
}

import shotCommand from '../assets/screens/command-center.webp'
import shotParts from '../assets/screens/parts.webp'
import shotQuality from '../assets/screens/quality.webp'
import shotWhiteboard from '../assets/screens/whiteboard.webp'
import shotTraveler from '../assets/screens/traveler.webp'

export const SCENES: Scene[] = [
  {
    id: 'production',
    index: '01',
    eyebrow: 'PRODUCTION CONTROL',
    title: 'Every machine. Every job. Live.',
    copy: 'Live scheduling, animated work orders, machine utilization and operator assignments — one board the whole floor trusts. Drag a job, and the plan re-flows around it.',
    points: ['Real-time work order status', 'Capacity-balanced scheduling', 'Operator assignments per shift'],
    shot: { src: shotCommand, alt: 'Real MESH floor command center — live machine grid and KPI tiles (demo data, sensitive fields redacted)', tag: 'REAL PRODUCT UI · COMMAND CENTER' },
    vignette: 'schedule',
  },
  {
    id: 'inventory',
    index: '02',
    eyebrow: 'INVENTORY',
    title: 'Material in. Product out. Traced.',
    copy: 'Every movement scanned, every lot traceable. Stock levels update the second the floor touches them — no end-of-week surprises.',
    points: ['Lot + heat traceability', 'Barcode-driven movements', 'Live stock against demand'],
    shot: { src: shotParts, alt: 'Real MESH part catalog — classification and revision control (demo data, sensitive fields redacted)', tag: 'REAL PRODUCT UI · PART CATALOG' },
    vignette: 'inventory',
  },
  {
    id: 'quality',
    index: '03',
    eyebrow: 'QUALITY',
    title: 'Gates in the routing, not bolted on.',
    copy: 'Digital inspection reports, measurement capture and quality holds built into the routing itself. A job cannot skip its gate — the system won’t let it.',
    points: ['In-process + final inspection', 'NCR / CAPA workflows', 'Tamper-evident audit records'],
    shot: { src: shotQuality, alt: 'Real MESH quality dashboard — first-pass yield, gauges and inspection load (demo data, sensitive fields redacted)', tag: 'REAL PRODUCT UI · QUALITY' },
    vignette: 'quality',
  },
  {
    id: 'maintenance',
    index: '04',
    eyebrow: 'MAINTENANCE',
    title: 'Fix it before it stops the line.',
    copy: 'Machine health, tool wear and preventive maintenance timelines in one view — so downtime is planned in hours, not discovered at 2 a.m.',
    points: ['Tool-life tracking', 'PM schedules per machine', 'Downtime reasons, categorized'],
    vignette: 'maintenance',
  },
  {
    id: 'analytics',
    index: '05',
    eyebrow: 'ANALYTICS',
    title: 'The whole floor, measured.',
    copy: 'Utilization heat maps, bottleneck visualization and OEE trends — computed from what actually happened on the floor, not what was typed in later.',
    points: ['OEE by machine and shift', 'Bottleneck detection', 'Job cost vs. estimate'],
    vignette: 'analytics',
  },
]

export const PROOF_STRIP = [
  { src: shotWhiteboard, alt: 'Real MESH digital whiteboard — machine and operator shift assignments (demo data, sensitive fields redacted)', tag: 'REAL PRODUCT UI · DIGITAL WHITEBOARD' },
  { src: shotTraveler, alt: 'Real MESH work order traveler — routing operations and status gates (demo data, sensitive fields redacted)', tag: 'REAL PRODUCT UI · WORK ORDER TRAVELER' },
]

export type Seg = { s: number; e: number; k: 'run' | 'setup' | 'inspect' | 'maint' | 'idle' }
export type Lane = { id: string; segs: Seg[] }

export const LANES: Lane[] = [
  { id: 'M-01', segs: [ { s: 0, e: 0.08, k: 'setup' }, { s: 0.08, e: 0.42, k: 'run' }, { s: 0.42, e: 0.48, k: 'inspect' }, { s: 0.48, e: 0.86, k: 'run' }, { s: 0.86, e: 1, k: 'idle' } ] },
  { id: 'M-02', segs: [ { s: 0, e: 0.3, k: 'run' }, { s: 0.3, e: 0.4, k: 'setup' }, { s: 0.4, e: 0.78, k: 'run' }, { s: 0.78, e: 0.84, k: 'inspect' }, { s: 0.84, e: 1, k: 'run' } ] },
  { id: 'M-03', segs: [ { s: 0, e: 0.14, k: 'maint' }, { s: 0.14, e: 0.22, k: 'setup' }, { s: 0.22, e: 0.65, k: 'run' }, { s: 0.65, e: 0.7, k: 'inspect' }, { s: 0.7, e: 1, k: 'run' } ] },
  { id: 'M-04', segs: [ { s: 0, e: 0.5, k: 'run' }, { s: 0.5, e: 0.56, k: 'inspect' }, { s: 0.56, e: 0.64, k: 'setup' }, { s: 0.64, e: 0.92, k: 'run' }, { s: 0.92, e: 1, k: 'idle' } ] },
  { id: 'M-05', segs: [ { s: 0, e: 0.06, k: 'idle' }, { s: 0.06, e: 0.16, k: 'setup' }, { s: 0.16, e: 0.58, k: 'run' }, { s: 0.58, e: 0.68, k: 'maint' }, { s: 0.68, e: 1, k: 'run' } ] },
  { id: 'M-06', segs: [ { s: 0, e: 0.36, k: 'run' }, { s: 0.36, e: 0.41, k: 'inspect' }, { s: 0.41, e: 0.74, k: 'run' }, { s: 0.74, e: 0.8, k: 'setup' }, { s: 0.8, e: 1, k: 'run' } ] },
]

export const LANE_EVENTS = [
  { t: 0.18, lane: 2, label: 'TOOL CHANGE' },
  { t: 0.42, lane: 0, label: 'QC PASS' },
  { t: 0.58, lane: 4, label: 'PM START' },
  { t: 0.78, lane: 1, label: 'FAI COMPLETE' },
  { t: 0.92, lane: 3, label: 'SHIPPED' },
]

export const SEG_COLORS: Record<Seg['k'], string> = {
  run: '#34D399',
  setup: '#3B82F6',
  inspect: '#22D3EE',
  maint: '#FB923C',
  idle: 'rgba(255,255,255,0.07)',
}

export const BEFORE = [
  'Whiteboards and dry-erase schedules',
  'Paper travelers walked between departments',
  'Phone calls to find out what’s running',
  'Excel exports that age by the hour',
  'Manual scheduling from memory',
  'Bottlenecks discovered after the miss',
]

export const AFTER = [
  'Real-time visibility on every screen',
  'AI insights before problems become late jobs',
  'Paperless production, end to end',
  'Live dashboards, one source of truth',
  'Predictive, capacity-aware planning',
  'A connected factory that explains itself',
]

export const TRUST = [
  'Paperless Manufacturing',
  'AI Assisted',
  'Real-Time Tracking',
  'Digital Shop Floor',
  'Quality Management',
  'Inventory Intelligence',
  'Production Visibility',
  'Machine Monitoring',
  'Industrial Automation',
]
