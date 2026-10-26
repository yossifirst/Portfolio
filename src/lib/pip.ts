// Pip: a small ink-drop creature that wanders the page.
// One canvas moved with transform, one requestAnimationFrame loop, no library.
// Drawn white with mix-blend-mode: difference, so it is always the opposite of what's under it.

type Vec = { x: number; y: number }
type Strain = { xx: number; yy: number; xy: number }
type Wall = { nx: number; ny: number; d: number }
type Expr = 'none' | 'open' | 'curious' | 'happy' | 'sleep' | 'squint' | 'startled'
type State =
  | 'hidden'
  | 'intro'
  | 'idle'
  | 'travel'
  | 'perched'
  | 'inspecting'
  | 'curious'
  | 'flee'
  | 'sleep'
  | 'bed'
  | 'reading'
  | 'carried'
  | 'thrown'
  | 'still'
  | 'moment'
type Task =
  | { type: 'wander' }
  | { type: 'perch'; el: HTMLElement; dx: number }
  | { type: 'look'; el: HTMLElement }
  | { type: 'bed'; el: HTMLElement; dx: number }
  | { type: 'read' }
/** A one-off bit tied to a project section. Coordinates are in page space. */
type Moment = {
  kind: 'scan' | 'lap' | 'pass' | 'thumb'
  t: number
  c: Vec
  w: number
  h: number
  u0: number
  trail: Vec[]
  ball: Vec
  from: Vec
  to: Vec
  passes: { a: Vec; b: Vec; t: number }[]
  leg: number
  label: string
}

export type PipElements = {
  canvas: HTMLCanvasElement
  tracks: HTMLCanvasElement
}

const TAU = Math.PI * 2
const SIZE = 160
const NAV = 64 // keep clear of the fixed nav
const ENERGY = 0.55
const CURIOSITY = 0.6
const SLEEP_AFTER = 25

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const rand = (a: number, b: number) => a + Math.random() * (b - a)

/** Stretch by s along (ux, uy) and squeeze across it, roughly keeping area. */
const stretch = (ux: number, uy: number, s: number): Strain => ({
  xx: s * (2 * ux * ux - 1),
  yy: s * (2 * uy * uy - 1),
  xy: s * 2 * ux * uy,
})

function drawBody(c: CanvasRenderingContext2D, o: number, r: number, E: Strain, t: number, wob: number, walls: Wall[]) {
  const N = 28
  const pts: [number, number][] = []
  for (let i = 0; i < N; i++) {
    const th = (i / N) * TAU
    const rr = r * (1 + wob * (0.55 * Math.sin(3 * th + t * 1.9) + 0.45 * Math.sin(2 * th - t * 1.3)))
    const x = Math.cos(th) * rr
    const y = Math.sin(th) * rr
    let X = x * (1 + E.xx) + y * E.xy
    let Y = x * E.xy + y * (1 + E.yy)
    for (const w of walls) {
      const k = X * w.nx + Y * w.ny
      if (k > w.d) {
        const over = k - w.d
        const side = Math.sign(-X * w.ny + Y * w.nx) || 1
        X += -w.nx * over - w.ny * side * over * 0.45
        Y += -w.ny * over + w.nx * side * over * 0.45
      }
    }
    pts.push([X, Y])
  }
  const mid = (a: [number, number], b: [number, number]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const m = mid(pts[N - 1], pts[0])
  c.beginPath()
  c.moveTo(o + m[0], o + m[1])
  for (let i = 0; i < N; i++) {
    const p = pts[i]
    const q = mid(p, pts[(i + 1) % N])
    c.quadraticCurveTo(o + p[0], o + p[1], o + q[0], o + q[1])
  }
  c.closePath()
  c.fill()
}

/** Eyes are cut out in black, which leaves the page showing through under difference blending. */
function drawEyes(c: CanvasRenderingContext2D, o: number, r: number, E: Strain, kind: Expr, g: Vec, blink: number) {
  if (kind === 'none') return
  c.fillStyle = '#000'
  c.strokeStyle = '#000'
  c.lineCap = 'round'
  c.lineJoin = 'round'
  c.lineWidth = Math.max(1.2, 0.11 * r)
  for (const s of [-1, 1]) {
    const ex = s * 0.36 * r + g.x * 0.24 * r
    const ey = -0.1 * r + g.y * 0.2 * r
    const X = o + ex * (1 + E.xx) + ey * E.xy
    const Y = o + ex * E.xy + ey * (1 + E.yy)
    c.beginPath()
    if (kind === 'happy') {
      c.arc(X, Y + 0.08 * r, 0.13 * r, Math.PI * 1.1, Math.PI * 1.9)
      c.stroke()
    } else if (kind === 'sleep') {
      c.arc(X, Y - 0.06 * r, 0.12 * r, Math.PI * 0.15, Math.PI * 0.85)
      c.stroke()
    } else if (kind === 'squint') {
      c.moveTo(X - s * 0.1 * r, Y - 0.1 * r)
      c.lineTo(X + s * 0.06 * r, Y)
      c.lineTo(X - s * 0.1 * r, Y + 0.1 * r)
      c.stroke()
    } else {
      const big = kind === 'startled'
      const scl = kind === 'curious' ? (s < 0 ? 1.15 : 0.9) : 1
      const w = (big ? 0.17 : 0.115) * r * scl
      const h = (big ? 0.17 : 0.21) * r * scl * blink
      if (h < 0.05 * r) {
        c.moveTo(X - w, Y)
        c.lineTo(X + w, Y)
        c.stroke()
      } else {
        c.ellipse(X, Y, w, h, 0, 0, TAU)
        c.fill()
      }
    }
  }
}

const STORE_KEY = 'pip:hidden'
export const pipHiddenPref = () => {
  try {
    return localStorage.getItem(STORE_KEY) === '1'
  } catch {
    return false
  }
}
export const setPipHiddenPref = (hidden: boolean) => {
  try {
    localStorage.setItem(STORE_KEY, hidden ? '1' : '0')
  } catch {
    /* private mode: the switch still works for this visit */
  }
  window.dispatchEvent(new CustomEvent('pip:hidden', { detail: hidden }))
}

export function startPip(els: PipElements, opts: { reduced: boolean }) {
  const { canvas, tracks } = els
  const ctx = canvas.getContext('2d')!
  const tctx = tracks.getContext('2d')!

  let dpr = 1
  let vw = 0
  let vh = 0
  let rBase = 14
  let ready = false
  let readyAt = 0
  let hidden = pipHiddenPref()

  const P = {
    x: -200,
    y: -200,
    vx: 0,
    vy: 0,
    r: 14,
    E: { xx: 0, yy: 0, xy: 0 } as Strain,
    Ev: { xx: 0, yy: 0, xy: 0 } as Strain,
    g: { x: 0, y: 0 },
    gt: { x: 0, y: 0 },
    glance: { x: 0, y: 0 },
    glanceUntil: 0,
    blinkT: -1,
    nextBlink: 2,
    expr: 'none' as Expr,
    exprUntil: 0,
    state: 'hidden' as State,
    t: 0,
    task: { type: 'wander' } as Task,
    target: { x: 0, y: 0 },
    pulseIn: 0,
    windup: 0,
    dir: { x: 1, y: 0 },
    nextThink: 1,
    stayFor: 3,
    pinned: false,
    wallAmt: 0,
    z: [] as { t: number }[],
    zNext: 0,
    last: { x: 0, y: 0 },
    side: 1,
    prints: [] as { x: number; y: number; a: number; t: number }[],
    moment: null as Moment | null,
    done: new Set<string>(),
    pokes: [] as number[],
    petT: 0,
    grab: { x: 0, y: 0 },
    down: { t: 0, x: 0, y: 0 },
  }
  const ptr = { x: -9999, y: -9999, vx: 0, vy: 0, t: 0, mouse: true, down: false, lastMove: -99 }
  const seen = new WeakMap<Element, number>()
  let now = 0
  let lastInput = 0
  let scrollV = 0
  let lastScrollY = window.scrollY
  let selRect: DOMRect | null = null
  let raf = 0

  const sy = () => window.scrollY
  const speed = () => Math.hypot(P.vx, P.vy)
  const input = () => (lastInput = now)

  function setState(s: State) {
    P.state = s
    P.t = 0
  }
  function setExpr(e: Expr, dur: number) {
    P.expr = e
    P.exprUntil = now + dur
  }
  function kick(ux: number, uy: number, s: number) {
    const e = stretch(ux, uy, s * 4)
    P.Ev.xx += e.xx
    P.Ev.yy += e.yy
    P.Ev.xy += e.xy
  }
  function gazeAt(x: number, y: number) {
    const dx = x - P.x
    const dy = y - P.y
    const d = Math.hypot(dx, dy) || 1
    const m = Math.min(1, d / 50)
    P.gt = { x: (dx / d) * m, y: (dy / d) * m }
  }
  function glance(x: number, y: number, dur: number) {
    const dx = x - P.x
    const dy = y - P.y
    const d = Math.hypot(dx, dy) || 1
    P.glance = { x: dx / d, y: dy / d }
    P.glanceUntil = now + dur
  }

  function measure() {
    dpr = Math.min(2, window.devicePixelRatio || 1)
    vw = document.documentElement.clientWidth
    vh = window.innerHeight
    rBase = vw < 700 ? 11 : 14
    canvas.width = canvas.height = SIZE * dpr
    canvas.style.width = canvas.style.height = `${SIZE}px`
    tracks.width = vw * dpr
    tracks.height = vh * dpr
  }

  // ---------- where to go ----------

  /** The empty side gutters, left and right of the content column. */
  function gutters() {
    const wrap = document.querySelector('main .section:not(.hero) .wrap')
    const b = wrap?.getBoundingClientRect()
    const l = b ? b.left : 40
    const r = b ? b.right : vw - 40
    return [
      { a: Math.min(rBase + 10, l / 2), b: Math.max(l / 2, l - rBase - 6) },
      { a: Math.min(r + rBase + 6, (r + vw) / 2), b: Math.max((r + vw) / 2, vw - rBase - 10) },
    ]
  }
  function wanderPoint(): Vec {
    const g = gutters()
    let best: (Vec & { score: number }) | null = null
    for (let k = 0; k < 8; k++) {
      const strip = g[Math.random() < (P.x < vw / 2 ? 0.75 : 0.25) ? 0 : 1]
      const x = rand(strip.a, strip.b)
      const y = sy() + rand(0.22, 0.78) * vh
      const score = Math.abs(Math.hypot(x - P.x, y - P.y) - 220) + rand(0, 80)
      if (!best || score < best.score) best = { x, y, score }
    }
    return best!
  }
  /** Headings sit inside masks; the first line's span is the visible text. */
  const textBox = (el: Element) => (el.querySelector('.mask > span') ?? el).getBoundingClientRect()
  const fresh = (el: Element) => now - (seen.get(el) ?? -99) > 25

  function pickTarget(urgent: boolean) {
    const band = (b: DOMRect, pad = 0) => b.top > NAV + 30 + pad && b.top < vh * 0.82 && b.width > 0
    const bed = document.querySelector('.contact .foot')
    if (bed && fresh(bed)) {
      const b = bed.getBoundingClientRect()
      if (band(b) && Math.random() < 0.8) {
        seen.set(bed, now)
        const dx = Math.min(b.width - 40, rand(80, 220))
        return go({ type: 'bed', el: bed as HTMLElement, dx }, b.left + dx, b.top + sy() - P.r * 0.72)
      }
    }
    if (Math.random() < (urgent ? 0.7 : 0.45 + CURIOSITY * 0.3)) {
      const perches = Array.from(
        document.querySelectorAll<HTMLElement>('main .section :is(.h2, .display, h2):not(.hero-name).is-in'),
      ).filter((el) => fresh(el) && band(textBox(el)))
      const looks = Array.from(document.querySelectorAll<HTMLElement>('main .clip.is-in')).filter((el) => {
        const b = el.getBoundingClientRect()
        return fresh(el) && b.bottom > NAV + 60 && b.top < vh - 60 && b.width > 80
      })
      const all = [...perches.map((el) => ['perch', el] as const), ...looks.map((el) => ['look', el] as const)]
      if (all.length) {
        const [type, el] = all[Math.floor(Math.random() * all.length)]
        seen.set(el, now)
        if (type === 'perch') {
          const b = textBox(el)
          const dx = clamp(rand(0.08, 0.92) * Math.min(b.width, 420), rBase, b.width - rBase)
          return go({ type: 'perch', el, dx }, b.left + dx, b.top + sy() - rBase * 0.55)
        }
        const b = el.getBoundingClientRect()
        const left = b.left + b.width / 2 < vw / 2
        const x = clamp(left ? b.left - rBase - 10 : b.right + rBase + 10, rBase + 10, vw - rBase - 10)
        const y = clamp(b.top + b.height * 0.3, NAV + 40, vh * 0.8) + sy()
        return go({ type: 'look', el }, x, y)
      }
    }
    const w = wanderPoint()
    go({ type: 'wander' }, w.x, w.y)
  }

  function go(task: Task, x: number, y: number) {
    P.task = task
    P.target = { x, y }
    setState('travel')
    P.pulseIn = 0.22 // the eyes lead the body
    P.windup = 0
    P.glanceUntil = 0
    gazeAt(x, y)
  }

  function arrive() {
    P.vx *= 0.3
    P.vy *= 0.3
    kick(0, 1, -0.3)
    const task = P.task
    if (task.type === 'perch') {
      setState('perched')
      P.stayFor = rand(2.5, 6)
    } else if (task.type === 'look') {
      setState('inspecting')
      P.stayFor = rand(1.8, 3.2)
      const b = task.el.getBoundingClientRect()
      gazeAt(b.left + b.width / 2, b.top + b.height / 2 + sy())
    } else if (task.type === 'bed') setState('bed')
    else if (task.type === 'read') setState('reading')
    else setState('idle')
    P.nextThink = rand(0.8, 2.4) * (1.3 - ENERGY * 0.6)
  }

  function idleMicro() {
    const r = Math.random()
    if (now - ptr.lastMove < 2 && r < 0.4) glance(ptr.x, ptr.y + sy(), rand(0.6, 1.2))
    else if (r < 0.75) {
      const a = rand(0, TAU)
      glance(P.x + Math.cos(a) * 50, P.y + Math.sin(a) * 50, rand(0.4, 1.1))
    } else if (r < 0.88) P.Ev.xy += rand(-1, 1) * 1.6
    else P.nextBlink = now
    P.nextThink = rand(0.9, 2.2) * (1.3 - ENERGY * 0.6)
  }

  function think() {
    const s = P.y - sy()
    if (s < NAV + 20 || s > vh * 0.9) return pickTarget(true)
    if (P.state === 'perched' || P.state === 'inspecting') {
      if (P.t < P.stayFor) return idleMicro()
      return pickTarget(false)
    }
    if (Math.random() < 0.28 + ENERGY * 0.45) return pickTarget(false)
    idleMicro()
  }

  function pulse() {
    const dx = P.target.x - P.x
    const dy = P.target.y - P.y
    const d = Math.hypot(dx, dy) || 1
    const ang = Math.atan2(dy, dx) + (d > 60 ? rand(-0.3, 0.3) : 0)
    const imp = d < 30 ? d * 5 : Math.min(d * 2.5, 1000 * (0.65 + ENERGY * 0.7))
    const ux = Math.cos(ang)
    const uy = Math.sin(ang)
    P.vx += ux * imp
    P.vy += uy * imp
    kick(ux, uy, 0.5 * Math.min(1, imp / 900) + 0.15)
  }

  function startle(up: number) {
    setState('idle')
    setExpr('startled', 0.6)
    P.vy -= up
    kick(0, 1, 1.1)
    P.nextThink = 1.2
  }

  // ---------- update ----------

  function update(dt: number) {
    P.t += dt
    const scrollY = sy()
    const sp = speed()
    const pdx = ptr.x - P.x
    const pdy = ptr.y + scrollY - P.y
    const pd = Math.hypot(pdx, pdy)
    const pSpeed = Math.hypot(ptr.vx, ptr.vy)
    const free = ['idle', 'travel', 'perched', 'inspecting', 'curious', 'reading', 'sleep', 'bed'].includes(P.state)

    // jump away from a cursor rushing at it
    if (free && ptr.mouse && now - ptr.lastMove < 0.12 && pd < 170 && pSpeed > 1300 * (1.3 - CURIOSITY * 0.5)) {
      const toward = (ptr.vx * -pdx + ptr.vy * -pdy) / (pSpeed * (pd || 1))
      if (toward > 0.5) {
        const ux = -pdx / (pd || 1)
        const uy = -pdy / (pd || 1)
        P.vx += ux * 900
        P.vy += uy * 900
        kick(ux, uy, 1.2)
        setState('flee')
        setExpr('startled', 0.7)
      }
    }
    // edge closer to a cursor that's resting nearby
    const curiousRange = 120 + CURIOSITY * 200
    if (
      ['idle', 'perched', 'inspecting'].includes(P.state) &&
      ptr.mouse &&
      !ptr.down &&
      now - ptr.lastMove < 1.2 &&
      pd < curiousRange &&
      pSpeed < 500
    )
      setState('curious')

    switch (P.state) {
      case 'intro': {
        const slot = document.querySelector('.pip-slot')
        if (!slot) {
          setState('idle')
          break
        }
        const b = slot.getBoundingClientRect()
        P.x = b.left + b.width / 2
        P.y = b.top + scrollY + b.height / 2
        P.r = b.width / 2
        P.vx = P.vy = 0
        if (P.t > 2.0 && P.t < 2.6) glance(P.x - 100, P.y, 0.2)
        else if (P.t > 2.6 && P.t < 3.2) glance(P.x + 100, P.y - 20, 0.2)
        if (P.t > 3.6 || scrollY > 40 || b.bottom < 0) {
          P.vx = 420
          P.vy = -300
          kick(0.7, -0.7, 1.4)
          setExpr('happy', 0.5)
          setState('idle')
          P.nextThink = 0.6
          document.documentElement.classList.add('pip-left')
        }
        break
      }
      case 'moment':
        if (!stepMoment(dt)) {
          P.moment = null
          setState('idle')
          P.nextThink = 0.8
        }
        break
      case 'still': {
        const slot = document.querySelector('.pip-slot')
        if (slot) {
          const b = slot.getBoundingClientRect()
          P.x = b.left + b.width / 2
          P.y = b.top + scrollY + b.height / 2
          P.r = b.width / 2
        }
        P.gt = { x: 0.3, y: -0.2 }
        break
      }
      case 'perched': {
        if (P.task.type === 'perch') {
          const b = textBox(P.task.el)
          if (b.bottom < 0 || b.top > vh) {
            setState('idle')
            break
          }
          P.x = lerp(P.x, b.left + P.task.dx, Math.min(1, dt * 10))
          P.y = lerp(P.y, b.top + scrollY - P.r * 0.55, Math.min(1, dt * 10))
          P.vx = P.vy = 0
        }
      }
      // falls through: perched also thinks
      case 'idle':
      case 'inspecting':
        P.nextThink -= dt
        if (P.state === 'idle' && now - lastInput > SLEEP_AFTER) {
          setState('sleep')
          break
        }
        if (P.nextThink <= 0) think()
        break
      case 'travel': {
        const d = Math.hypot(P.target.x - P.x, P.target.y - P.y)
        gazeAt(P.target.x, P.target.y)
        if ((d < 6 && sp < 40) || P.t > 9) {
          arrive()
          break
        }
        if (P.windup > 0) {
          P.windup -= dt
          if (P.windup <= 0) {
            pulse()
            P.pulseIn = rand(0.36, 0.62) * (1.35 - ENERGY * 0.7)
          }
        } else if ((P.pulseIn -= dt) <= 0 && sp < 170) {
          const dd = d || 1
          P.dir = { x: (P.target.x - P.x) / dd, y: (P.target.y - P.y) / dd }
          P.windup = 0.09
        }
        break
      }
      case 'curious': {
        gazeAt(ptr.x, ptr.y + scrollY)
        const want = 50 + (1 - CURIOSITY) * 70
        if (pd < P.r + 6 && pSpeed < 160) {
          if ((P.petT += dt) > 0.5) setExpr('happy', 0.3)
        } else P.petT = Math.max(0, P.petT - dt)
        if (pd > want + 30 && sp < 60 && P.t > 0.5) {
          const ux = pdx / pd
          const uy = pdy / pd
          const imp = Math.min((pd - want) * 2.25, 500)
          P.vx += ux * imp
          P.vy += uy * imp
          kick(ux, uy, 0.4)
          P.t = 0.1
        }
        if (now - ptr.lastMove > 3.5 || pd > curiousRange + 160) {
          setState('idle')
          P.nextThink = 0.8
        }
        break
      }
      case 'flee':
        if (P.t > 0.8) {
          setState('idle')
          P.nextThink = rand(0.4, 1)
        }
        break
      case 'sleep':
        if (now - lastInput < 0.2) startle(260)
        break
      case 'bed': {
        if (P.task.type === 'bed') {
          const b = P.task.el.getBoundingClientRect()
          if (b.top < NAV || b.top > vh) {
            setState('idle')
            break
          }
          P.x = lerp(P.x, b.left + P.task.dx, Math.min(1, dt * 10))
          P.y = lerp(P.y, b.top + scrollY - P.r * 0.72, Math.min(1, dt * 10))
          P.vx = P.vy = 0
        }
        if (pd < 60 && now - ptr.lastMove < 0.2) startle(200)
        break
      }
      case 'reading': {
        if (!selRect) {
          setState('idle')
          setExpr('happy', 0.6)
          break
        }
        const ph = (now * 0.6) % 1
        P.gt = { x: lerp(-0.9, 0.9, ph < 0.85 ? ph / 0.85 : 1 - (ph - 0.85) / 0.15), y: 0.5 }
        break
      }
      case 'carried': {
        const tx = ptr.x + P.grab.x
        const ty = ptr.y + scrollY + P.grab.y + 6
        P.vx += ((tx - P.x) * 220 - P.vx * 16) * dt
        P.vy += ((ty - P.y) * 220 - P.vy * 16 + 400) * dt
        P.gt = { x: clamp(-P.vx / 600, -1, 1), y: 0.7 }
        break
      }
      case 'thrown':
        if (sp < 70) {
          setState('idle')
          setExpr('happy', 0.8)
          P.Ev.xy += 3
          P.nextThink = 1.2
        }
        break
    }

    // physics
    const anchored = ['intro', 'still', 'perched', 'bed', 'moment'].includes(P.state)
    if (!anchored) {
      const drag = P.state === 'thrown' ? 1.1 : P.state === 'carried' ? 0 : 5
      const f = Math.exp(-drag * dt)
      P.vx *= f
      P.vy *= f
      P.x += P.vx * dt
      P.y += P.vy * dt
      P.r = lerp(P.r, rBase, Math.min(1, dt * 6))
    }

    // it stands on the page, so scrolling pushes it against the screen edge
    P.pinned = false
    let wallTarget = 0
    if (P.state !== 'intro' && P.state !== 'still' && P.state !== 'moment') {
      const m = 8
      const top = scrollY + NAV + P.r
      const bot = scrollY + vh - P.r - m
      const bounce = P.state === 'thrown'
      const hit = (ux: number, uy: number, v: number) => kick(ux, uy, -Math.min(1.2, Math.abs(v) / 1200))
      if (P.y < top) {
        P.y = top
        if (bounce && P.vy < 0) {
          hit(0, 1, P.vy)
          P.vy *= -0.55
        } else P.vy = Math.max(P.vy, 0)
        P.pinned = true
        if (P.state === 'perched' || P.state === 'bed') setState('idle')
      } else if (P.y > bot) {
        P.y = bot
        if (bounce && P.vy > 0) {
          hit(0, 1, P.vy)
          P.vy *= -0.55
        } else P.vy = Math.min(P.vy, 0)
        P.pinned = true
        if (P.state === 'perched' || P.state === 'bed') setState('idle')
      }
      if (P.pinned) wallTarget = clamp(Math.abs(scrollV) / 3200, 0.06, 0.36)
      const left = P.r + m
      const right = vw - P.r - m
      if (P.x < left || P.x > right) {
        const v = P.vx
        P.x = clamp(P.x, left, right)
        if (bounce && Math.sign(v) === (P.x === left ? -1 : 1)) {
          hit(1, 0, v)
          P.vx *= -0.55
        } else P.vx = 0
      }
      if (P.pinned && P.state === 'travel' && Math.abs(scrollV) > 200) P.target.y = P.y
    }
    P.wallAmt = lerp(P.wallAmt, wallTarget, Math.min(1, dt * 12))

    // body: springs toward a target shape
    const Et: Strain = { xx: 0, yy: 0, xy: 0 }
    const add = (e: Strain) => {
      Et.xx += e.xx
      Et.yy += e.yy
      Et.xy += e.xy
    }
    const sp2 = speed()
    if (sp2 > 5) add(stretch(P.vx / sp2, P.vy / sp2, Math.min(0.3, sp2 / 2600)))
    if (P.windup > 0) add(stretch(P.dir.x, P.dir.y, -0.16))
    if (P.wallAmt > 0.01) add(stretch(0, 1, -P.wallAmt))
    const asleep = P.state === 'sleep' || P.state === 'bed'
    const b = Math.sin(now * TAU * (asleep ? 0.28 : 0.4)) * (asleep ? 0.05 : 0.018)
    Et.yy += b
    Et.xx -= b * 0.8
    if (P.state === 'perched') add(stretch(0, 1, -0.06))
    if (asleep) add(stretch(0, 1, -0.1))
    if (P.expr === 'happy' && P.state === 'curious') Et.xy += Math.sin(now * 22) * 0.05
    for (const k of ['xx', 'yy', 'xy'] as const) {
      P.Ev[k] += ((Et[k] - P.E[k]) * 240 - P.Ev[k] * 10) * dt
      P.E[k] = clamp(P.E[k] + P.Ev[k] * dt, -0.55, 0.55)
    }

    // eyes
    let g = P.gt
    if (P.glanceUntil > now) g = P.glance
    if (Math.abs(scrollV) > 400 && !['carried', 'thrown', 'reading', 'curious'].includes(P.state))
      g = { x: 0, y: Math.sign(scrollV) * 0.9 }
    const gk = Math.min(1, dt * 18)
    P.g.x = lerp(P.g.x, g.x, gk)
    P.g.y = lerp(P.g.y, g.y, gk)
    if (P.blinkT < 0 && now > P.nextBlink) P.blinkT = 0
    if (P.blinkT >= 0 && (P.blinkT += dt) > 0.15) {
      P.blinkT = -1
      P.nextBlink = now + (Math.random() < 0.18 ? 0.22 : rand(2, 6))
    }
    if (asleep && P.t > 1.5 && now > P.zNext) {
      P.z.push({ t: 0 })
      P.zNext = now + 1.6
    }
    P.z = P.z.filter((z) => (z.t += dt) < 2.4)
    if (P.exprUntil && now > P.exprUntil) P.exprUntil = 0
    if (!P.exprUntil) {
      P.expr = asleep
        ? 'sleep'
        : P.state === 'carried' && P.t < 0.35
          ? 'startled'
          : P.state === 'intro'
            ? P.t < 1.5
              ? 'none'
              : 'open'
            : P.state === 'curious'
              ? 'curious'
              : P.wallAmt > 0.22
                ? 'squint'
                : 'open'
    }

    sectionMoments(scrollY)
  }

  // ---------- one moment per section ----------

  function sectionMoments(scrollY: number) {
    const onFoot = !['carried', 'thrown', 'intro', 'still', 'moment'].includes(P.state)
    // Spoor: "spoor" is the word for an animal's tracks
    const spoor = document.getElementById('spoor')?.getBoundingClientRect()
    const sx = P.x
    const syc = P.y - scrollY
    if (onFoot && spoor && sx > spoor.left && sx < spoor.right && syc > spoor.top && syc < spoor.bottom) {
      const md = Math.hypot(P.x - P.last.x, P.y - P.last.y)
      if (md > 16) {
        const ux = (P.x - P.last.x) / md
        const uy = (P.y - P.last.y) / md
        P.side *= -1
        P.prints.push({ x: P.x - uy * 5 * P.side, y: P.y + ux * 5 * P.side, a: Math.atan2(uy, ux), t: now })
        P.last = { x: P.x, y: P.y }
      }
    } else P.last = { x: P.x, y: P.y }
    P.prints = P.prints.filter((p) => now - p.t < 9)

    // Each project section gets one moment, the first time Pip is in it with the section filling the screen
    if (P.state === 'moment' || !onFoot || opts.reduced || syc < NAV + 60 || syc > vh - 80) return
    for (const [id, kind] of [
      ['aivision', 'scan'],
      ['corelab', 'lap'],
      ['halfspace', 'pass'],
      ['hookd', 'thumb'],
    ] as const) {
      if (P.done.has(id)) continue
      const b = document.getElementById(id)?.getBoundingClientRect()
      if (b && b.top < vh * 0.35 && b.bottom > vh * 0.65) {
        P.done.add(id)
        startMoment(kind)
        return
      }
    }
  }

  function startMoment(kind: Moment['kind']) {
    const scrollY = sy()
    const k = rBase / 14
    const w = kind === 'lap' ? Math.min(300 * k, vw * 0.7) : kind === 'thumb' ? 128 * k : 0
    const h = kind === 'lap' ? w * 0.48 : kind === 'thumb' ? w * 0.5625 : 0
    const pad = 16
    const c = {
      x: clamp(P.x, w / 2 + pad, vw - w / 2 - pad),
      // big moments play near the middle of the screen, not up against the nav
      y: clamp(P.y - scrollY, Math.max(NAV + h / 2 + 40, h ? vh * 0.4 : 0), vh - h / 2 - 60) + scrollY,
    }
    const m: Moment = { kind, t: 0, c, w, h, u0: 0, trail: [], ball: { x: 0, y: 0 }, from: { x: P.x, y: P.y }, to: c, passes: [], leg: 0, label: '' }
    if (kind === 'lap') {
      // start the lap at the point on the track closest to Pip
      m.u0 = Math.atan2((P.y - c.y) / h, (P.x - c.x) / w) / TAU
      m.to = lapPoint(m, 0)
    }
    if (kind === 'pass') {
      const dir = P.x < vw / 2 ? 1 : -1
      m.ball = { x: P.x + dir * (P.r + 8), y: P.y + 4 }
    }
    P.moment = m
    P.vx = P.vy = 0
    setState('moment')
  }

  /** A stadium-shaped loop, like a small race track. u runs 0 to 1 around it. */
  function lapPoint(m: Moment, u: number, scale = 1): Vec {
    const a = (u + m.u0) * TAU
    const ca = Math.cos(a)
    const sa = Math.sin(a)
    return {
      x: m.c.x + (m.w / 2) * scale * Math.sign(ca) * Math.abs(ca) ** 0.55,
      y: m.c.y + (m.h / 2) * scale * Math.sign(sa) * Math.abs(sa) ** 0.55,
    }
  }

  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)
  const passEase = (x: number) => 1 - (1 - x) ** 3

  /** Moves Pip through its current moment. Returns false when the moment is over. */
  function stepMoment(dt: number): boolean {
    const m = P.moment!
    m.t += dt
    const t = m.t
    const place = (to: Vec) => {
      const nx = lerp(P.x, to.x, Math.min(1, dt * 12))
      const ny = lerp(P.y, to.y, Math.min(1, dt * 12))
      P.vx = (nx - P.x) / dt
      P.vy = (ny - P.y) / dt
      P.x = nx
      P.y = ny
    }
    switch (m.kind) {
      // AIVision: a probe camera sweeps over Pip, then the detector boxes it
      case 'scan':
        place(m.to)
        if (t > 0.7 && t - dt <= 0.7) setExpr('startled', 0.6)
        if (t > 1.3 && t - dt <= 1.3) setExpr('happy', 1.4)
        if (Math.random() < 0.08) m.label = `INSECT? NO · PIP 0.${Math.floor(rand(91, 99))}`
        if (!m.label) m.label = 'INSECT? NO · PIP 0.97'
        return t < 3.2
      // CORE Lab: map the track edges, plan the line, then one fast lap
      case 'lap': {
        if (t < 1.6) {
          place(m.to)
          gazeAt(m.c.x, m.c.y)
        } else if (t < 3.0) {
          const p = lapPoint(m, ease((t - 1.6) / 1.4))
          P.vx = (p.x - P.x) / dt
          P.vy = (p.y - P.y) / dt
          P.x = p.x
          P.y = p.y
          gazeAt(P.x + P.vx, P.y + P.vy)
          m.trail.push({ x: P.x, y: P.y })
          if (m.trail.length > 18) m.trail.shift()
        } else {
          P.vx = P.vy = 0
          if (m.trail.length) m.trail.shift()
          if (t - dt < 3.0) {
            setExpr('squint', 0.9)
            P.Ev.xy += 4
          }
          if (t > 3.2 && t < 3.9) P.gt = { x: Math.cos(t * 14) * 0.8, y: Math.sin(t * 14) * 0.8 } // dizzy
        }
        return t < 4.6
      }
      // Halfspace: a quick counterattack, two passes and a shot
      case 'pass': {
        const legs = 3
        const legT = 0.95
        const leg = Math.floor(t / legT)
        if (leg > m.leg || t - dt <= 0) {
          m.leg = Math.max(leg, 0)
          if (m.leg < legs) {
            const a = { ...m.ball }
            let b: Vec
            if (m.leg < legs - 1) {
              const ang = Math.atan2(sy() + vh / 2 - a.y, vw / 2 - a.x) + rand(-0.9, 0.9)
              const d = rand(110, 170)
              b = {
                x: clamp(a.x + Math.cos(ang) * d, 30, vw - 30),
                y: clamp(a.y + Math.sin(ang) * d, sy() + NAV + 40, sy() + vh - 80),
              }
            } else {
              // the goal sits toward the nearer screen edge
              const right = a.x > vw / 2
              b = { x: right ? Math.min(vw - 40, a.x + 160) : Math.max(40, a.x - 160), y: a.y }
              m.to = b
            }
            m.from = a
            m.passes.push({ a, b, t })
          }
        }
        const cur = m.passes[m.passes.length - 1]
        if (cur) {
          const f = passEase(clamp((t - cur.t) / 0.45, 0, 1))
          m.ball = { x: lerp(cur.a.x, cur.b.x, f), y: lerp(cur.a.y, cur.b.y, f) }
        }
        if (m.leg < legs - 1 || t < legs * legT - 0.5) {
          // chase the ball, staying just behind it
          const tx = m.ball.x - Math.sign(m.ball.x - P.x || 1) * (P.r + 6)
          P.vx += ((tx - P.x) * 60 - P.vx * 9) * dt
          P.vy += ((m.ball.y - P.y) * 60 - P.vy * 9) * dt
          P.x += P.vx * dt
          P.y += P.vy * dt
          gazeAt(m.ball.x, m.ball.y)
        } else {
          P.vx *= 0.8
          P.vy *= 0.8
          P.x += P.vx * dt
          P.y += P.vy * dt
        }
        if (m.leg >= legs - 1 && t - cur.t > 0.45 && !m.label) {
          m.label = 'COUNTERATTACK · REACHED THE BOX'
          setExpr('happy', 1.6)
          kick(0, 1, 1)
        }
        return t < legs * legT + 1.6
      }
      // Hookd AI: Pip gets a thumbnail, edited by chat into better versions
      case 'thumb': {
        place(m.c)
        const v = t < 1.1 ? 1 : t < 2.2 ? 2 : 3
        m.label = t > 3.4 ? 'SAVED AS V3' : ['V1 · GENERATING', 'V2 · MORE EXPRESSIVE', 'V3 · BIGGER FACE'][v - 1]
        if (v === 2 && t - dt < 1.1) {
          setExpr('startled', 1.1)
          kick(0, 1, 1)
        }
        if (v === 3 && t - dt < 2.2) {
          setExpr('happy', 1.8)
          kick(0, 1, 1.2)
        }
        P.r = lerp(P.r, v === 3 && t < 3.9 ? rBase * 1.6 : rBase, Math.min(1, dt * 8))
        P.gt = { x: 0, y: 0 }
        return t < 4.4
      }
    }
  }

  function chip(c: CanvasRenderingContext2D, text: string, x: number, y: number, alpha: number) {
    c.font = '500 10px "Geist Mono", ui-monospace, monospace'
    const w = c.measureText(text).width + 12
    c.globalAlpha = alpha
    c.fillStyle = '#fff'
    c.beginPath()
    c.roundRect(x, y - 16, w, 16, 4)
    c.fill()
    c.fillStyle = '#000'
    c.fillText(text, x + 6, y - 5)
    c.globalAlpha = 1
  }

  /** Draws the current moment on the overlay, in viewport space. */
  function drawMoment(c: CanvasRenderingContext2D, scrollY: number) {
    const m = P.moment
    if (!m) return
    const t = m.t
    const px = P.x
    const py = P.y - scrollY
    c.strokeStyle = '#fff'
    c.fillStyle = '#fff'
    c.lineCap = 'round'
    c.lineJoin = 'round'
    if (m.kind === 'scan') {
      const s = P.r * 2 + 16
      if (t < 0.7) {
        const y = py - 30 + (t / 0.7) * 60
        c.globalAlpha = 0.8
        c.fillRect(px - 34, y, 68, 1.5)
      } else {
        const a = t > 2.9 ? (3.2 - t) / 0.3 : Math.min(1, (t - 0.7) / 0.15)
        const pop = 1 + Math.max(0, 0.25 - (t - 0.7)) * 1.2
        c.globalAlpha = a
        c.lineWidth = 1.5
        c.beginPath()
        c.roundRect(px - (s / 2) * pop, py - (s / 2) * pop, s * pop, s * pop, 6)
        c.stroke()
        chip(c, m.label, px - s / 2, py - s / 2 - 4, a)
      }
    }
    if (m.kind === 'lap') {
      const fade = t > 3.9 ? Math.max(0, 1 - (t - 3.9) / 0.7) : 1
      const path = (scale: number, upto: number) => {
        c.beginPath()
        for (let i = 0; i <= 80 * upto; i++) {
          const p = lapPoint(m, i / 80, scale)
          if (i === 0) c.moveTo(p.x, p.y - scrollY)
          else c.lineTo(p.x, p.y - scrollY)
        }
        c.stroke()
      }
      // track edges first, the way the camera pipeline found them
      const edges = clamp((t - 0.3) / 0.7, 0, 1)
      c.globalAlpha = 0.5 * fade
      c.lineWidth = 1
      c.setLineDash([2, 5])
      path(1.18, edges)
      path(0.8, edges)
      c.setLineDash([])
      // then the planned racing line
      const line = clamp((t - 1.0) / 0.6, 0, 1)
      c.globalAlpha = 0.85 * fade
      c.lineWidth = 1.5
      if (line > 0) path(1, line)
      if (t > 0.3 && t < 4.2) chip(c, t < 1.0 ? 'MAPPING THE TRACK' : t < 3.0 ? 'FASTEST LINE' : 'LAP 0:01.4', m.c.x - m.w / 2, m.c.y - m.h / 2 - scrollY - 18, fade)
      // speed trail behind Pip
      for (let i = 1; i < m.trail.length; i++) {
        const a = m.trail[i - 1]
        const b = m.trail[i]
        c.globalAlpha = (i / m.trail.length) * 0.9
        c.lineWidth = (i / m.trail.length) * P.r * 1.4
        c.beginPath()
        c.moveTo(a.x, a.y - scrollY)
        c.lineTo(b.x, b.y - scrollY)
        c.stroke()
      }
    }
    if (m.kind === 'pass') {
      const end = 3 * 0.95 + 1.6
      const fade = t > end - 0.5 ? Math.max(0, (end - t) / 0.5) : 1
      c.lineWidth = 1.2
      c.setLineDash([3, 5])
      for (const ps of m.passes) {
        const age = t - ps.t
        const grow = clamp(age / 0.35, 0, 1)
        c.globalAlpha = 0.7 * fade
        const bx = lerp(ps.a.x, ps.b.x, grow)
        const by = lerp(ps.a.y, ps.b.y, grow)
        c.beginPath()
        c.moveTo(ps.a.x, ps.a.y - scrollY)
        c.lineTo(bx, by - scrollY)
        c.stroke()
        if (grow === 1) {
          const ang = Math.atan2(ps.b.y - ps.a.y, ps.b.x - ps.a.x)
          c.setLineDash([])
          c.beginPath()
          c.moveTo(ps.b.x - Math.cos(ang - 0.5) * 7, ps.b.y - scrollY - Math.sin(ang - 0.5) * 7)
          c.lineTo(ps.b.x, ps.b.y - scrollY)
          c.lineTo(ps.b.x - Math.cos(ang + 0.5) * 7, ps.b.y - scrollY - Math.sin(ang + 0.5) * 7)
          c.stroke()
          c.setLineDash([3, 5])
        }
      }
      c.setLineDash([])
      // the goal: three sides of a small box, open toward the play
      if (m.passes.length >= 3) {
        const g = m.to
        const dir = g.x > vw / 2 ? 1 : -1
        c.globalAlpha = Math.min(1, (t - m.passes[2].t) / 0.2) * fade
        c.lineWidth = 1.5
        c.beginPath()
        c.moveTo(g.x - dir * 4, g.y - scrollY - 22)
        c.lineTo(g.x + dir * 12, g.y - scrollY - 22)
        c.lineTo(g.x + dir * 12, g.y - scrollY + 22)
        c.lineTo(g.x - dir * 4, g.y - scrollY + 22)
        c.stroke()
      }
      c.globalAlpha = fade
      c.beginPath()
      c.arc(m.ball.x, m.ball.y - scrollY, Math.max(3, P.r * 0.3), 0, TAU)
      c.fill()
      if (m.label) {
        c.font = '500 10px "Geist Mono", ui-monospace, monospace'
        const w = c.measureText(m.label).width + 12
        const x = clamp(m.to.x - w / 2, 12, vw - w - 12)
        chip(c, m.label, x, m.to.y - scrollY - 32, fade)
      }
    }
    if (m.kind === 'thumb') {
      const a = t > 4.0 ? Math.max(0, (4.4 - t) / 0.4) : Math.min(1, t / 0.25)
      const v = t < 1.1 ? 1 : t < 2.2 ? 2 : 3
      const since = v === 1 ? t : v === 2 ? t - 1.1 : t - 2.2
      const pop = 1 + Math.max(0, 0.15 - since) * 0.8
      const w = m.w * pop
      const h = m.h * pop
      const x = m.c.x - w / 2
      const y = m.c.y - scrollY - h / 2
      c.globalAlpha = a
      c.lineWidth = 1.5
      c.beginPath()
      c.roundRect(x, y, w, h, 8)
      c.stroke()
      if (v === 1) {
        // a progress bar while the first version renders
        c.globalAlpha = a * 0.8
        c.fillRect(x + 8, y + h - 10, (w - 16) * Math.min(1, t / 1.0), 2)
      }
      if (v === 3) {
        c.globalAlpha = a
        c.font = `600 ${Math.round(h * 0.26)}px "Geist", ui-sans-serif, sans-serif`
        c.fillText('PIP?!', x + 8, y + h - 8)
      }
      chip(c, m.label, x, y - 4, a)
    }
    c.globalAlpha = 1
  }

  // ---------- render ----------

  let tracksDirty = false
  function render() {
    const scrollY = sy()
    canvas.style.transform = `translate3d(${(P.x - SIZE / 2).toFixed(1)}px, ${(P.y - scrollY - SIZE / 2).toFixed(1)}px, 0)`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, SIZE, SIZE)
    const o = SIZE / 2
    let blink = P.blinkT >= 0 ? Math.max(0.05, Math.abs(P.blinkT / 0.075 - 1)) : 1
    if (P.state === 'intro' && P.t >= 1.5 && P.t < 1.7) blink = (P.t - 1.5) / 0.2
    const asleep = P.state === 'sleep' || P.state === 'bed'
    const walls: Wall[] =
      P.state === 'perched' ? [{ nx: 0, ny: 1, d: P.r * 0.55 }] : asleep ? [{ nx: 0, ny: 1, d: P.r * 0.72 }] : []
    const calm = P.state === 'intro' || P.state === 'still'
    ctx.fillStyle = '#fff'
    drawBody(ctx, o, P.r, P.E, now, calm ? 0 : 0.012, walls)
    drawEyes(ctx, o, P.r, P.E, P.state === 'intro' && P.t < 1.5 ? 'none' : P.expr, P.g, blink)
    if (P.z.length) {
      ctx.fillStyle = '#fff'
      for (const z of P.z) {
        ctx.globalAlpha = Math.min(1, z.t * 2) * (1 - z.t / 2.4)
        ctx.font = `500 ${Math.round(8 + z.t * 4)}px "Geist Mono", monospace`
        ctx.fillText('z', o + P.r * 0.7 + Math.sin(z.t * 3) * 3 + z.t * 6, o - P.r * 0.8 - z.t * 18)
      }
      ctx.globalAlpha = 1
    }

    if (P.prints.length || P.moment || tracksDirty) {
      tctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      tctx.clearRect(0, 0, vw, vh)
      drawMoment(tctx, scrollY)
      tctx.fillStyle = '#fff'
      for (const p of P.prints) {
        const age = now - p.t
        tctx.globalAlpha = age < 5 ? 0.6 : 0.6 * (1 - (age - 5) / 4)
        tctx.save()
        tctx.translate(p.x, p.y - scrollY)
        tctx.rotate(p.a)
        tctx.beginPath()
        tctx.ellipse(0, 0, 2.6, 1.9, 0, 0, TAU)
        tctx.fill()
        for (const [tx, ty] of [
          [3.6, -1.9],
          [4.3, 0],
          [3.6, 1.9],
        ]) {
          tctx.beginPath()
          tctx.arc(tx, ty, 0.8, 0, TAU)
          tctx.fill()
        }
        tctx.restore()
      }
      tctx.globalAlpha = 1
      tracksDirty = P.prints.length > 0 || !!P.moment
    }
  }

  function frame(ts: number) {
    const t = ts / 1000
    const dt = Math.min(0.034, Math.max(0.001, t - (now || t)))
    now = t
    const inst = (window.scrollY - lastScrollY) / dt
    scrollV = lerp(scrollV, inst, 0.3)
    if (Math.abs(inst) > 4) input()
    lastScrollY = window.scrollY
    if (P.state === 'hidden' && ready && !hidden && now - readyAt > 1.1) {
      canvas.classList.add('on')
      setState(opts.reduced ? 'still' : 'intro')
      if (!document.querySelector('.pip-slot') && !opts.reduced) {
        P.x = vw - 40
        P.y = window.scrollY + vh / 2
        setState('idle')
      }
    }
    if (P.state !== 'hidden') {
      update(dt)
      render()
    }
    ptr.vx *= 0.9
    ptr.vy *= 0.9
    raf = requestAnimationFrame(frame)
  }

  // ---------- input ----------

  const onMove = (e: PointerEvent) => {
    const t = performance.now() / 1000
    const dt = Math.max(0.008, t - ptr.t)
    if (ptr.t) {
      ptr.vx = lerp(ptr.vx, (e.clientX - ptr.x) / dt, 0.4)
      ptr.vy = lerp(ptr.vy, (e.clientY - ptr.y) / dt, 0.4)
    }
    ptr.x = e.clientX
    ptr.y = e.clientY
    ptr.t = t
    ptr.mouse = e.pointerType === 'mouse'
    ptr.lastMove = now
    input()
  }
  function poke() {
    P.pokes = P.pokes.filter((t) => now - t < 0.9)
    P.pokes.push(now)
    kick(0, 1, -1.3)
    setExpr('happy', 0.9)
    if (P.pokes.length >= 3 && !opts.reduced) {
      P.pokes = []
      P.vy -= 520
      P.vx += rand(-200, 200)
      kick(0, 1, 1.4)
      setState('thrown')
      setExpr('happy', 1.2)
    }
  }
  const onDown = (e: PointerEvent) => {
    ptr.mouse = e.pointerType === 'mouse'
    ptr.x = e.clientX
    ptr.y = e.clientY
    ptr.lastMove = now
    input()
    if (P.state === 'hidden' || P.state === 'intro' || e.button !== 0) return
    const dx = e.clientX - P.x
    const dy = e.clientY + sy() - P.y
    if (Math.hypot(dx, dy) > P.r + 12) return
    e.preventDefault()
    e.stopPropagation()
    P.down = { t: now, x: e.clientX, y: e.clientY }
    if (opts.reduced || !ptr.mouse) return poke()
    ptr.down = true
    P.moment = null
    P.grab = { x: -dx, y: -dy }
    setState('carried')
    document.documentElement.classList.add('pip-dragging')
  }
  const onUp = (e: PointerEvent) => {
    if (!ptr.down) return
    ptr.down = false
    document.documentElement.classList.remove('pip-dragging')
    const held = now - P.down.t
    const moved = Math.hypot(e.clientX - P.down.x, e.clientY - P.down.y)
    if (held < 0.25 && moved < 6) {
      setState('idle')
      P.nextThink = 1.2
      return poke()
    }
    const vx = clamp(ptr.vx, -2600, 2600)
    const vy = clamp(ptr.vy, -2600, 2600)
    if (Math.hypot(vx, vy) > 250) {
      P.vx = vx
      P.vy = vy
      setState('thrown')
      setExpr('startled', 0.5)
    } else {
      setState('idle')
      P.nextThink = 1
    }
  }
  let selTimer = 0
  const onSelect = () => {
    window.clearTimeout(selTimer)
    selTimer = window.setTimeout(() => {
      const s = window.getSelection()
      if (!s || s.isCollapsed || s.toString().trim().length < 4 || ptr.down || opts.reduced) {
        selRect = null
        return
      }
      const r = s.getRangeAt(0).getBoundingClientRect()
      if (!r.width || r.top < NAV || r.bottom > vh) {
        selRect = null
        return
      }
      selRect = r
      if (['carried', 'thrown', 'intro', 'hidden', 'still'].includes(P.state)) return
      const x = clamp(r.right + rBase + 10, rBase + 10, vw - rBase - 10)
      go({ type: 'read' }, x, r.top + sy() + r.height / 2)
    }, 300)
  }
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf)
      raf = 0
      return
    }
    if (!raf) {
      now = 0
      raf = requestAnimationFrame(frame)
    }
    // back from another tab: it noticed
    if (!['hidden', 'intro', 'still'].includes(P.state)) {
      P.Ev.yy += 3
      setExpr('startled', 0.5)
      glance(vw / 2, sy() + vh / 2, 1)
    }
  }
  const onHidden = (e: Event) => {
    hidden = (e as CustomEvent<boolean>).detail
    if (hidden) {
      setState('hidden')
      canvas.classList.remove('on')
      P.moment = null
      P.prints = []
      tracksDirty = true
      render()
    } else if (ready) {
      readyAt = now - 2
      if (!opts.reduced) {
        // comes back in from the right edge
        P.x = vw + 20
        P.y = sy() + vh * 0.5
        P.vx = -500
        P.r = rBase
        setState('idle')
        setExpr('happy', 0.8)
        canvas.classList.add('on')
      }
    }
  }

  measure()
  window.addEventListener('resize', measure)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { capture: true })
  window.addEventListener('pointerup', onUp)
  window.addEventListener('keydown', input)
  window.addEventListener('pip:hidden', onHidden)
  document.addEventListener('selectionchange', onSelect)
  document.addEventListener('visibilitychange', onVisibility)
  raf = requestAnimationFrame(frame)

  return {
    /** Call once the loader curtain has lifted. */
    setReady() {
      ready = true
      readyAt = now
    },
    destroy() {
      cancelAnimationFrame(raf)
      window.clearTimeout(selTimer)
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown, { capture: true })
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('keydown', input)
      window.removeEventListener('pip:hidden', onHidden)
      document.removeEventListener('selectionchange', onSelect)
      document.removeEventListener('visibilitychange', onVisibility)
      document.documentElement.classList.remove('pip-left', 'pip-dragging')
    },
  }
}
