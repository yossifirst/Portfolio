import { useEffect, useRef, useState } from 'react'
import { hero, links } from '../content'
import { getLenis, prefersReducedMotion, scrollToId } from '../lib/motion'

const seattleTime = () => {
  try {
    return new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' })
  } catch {
    return ''
  }
}

export function useSeattleTime() {
  const [time, setTime] = useState(seattleTime)
  useEffect(() => {
    const id = window.setInterval(() => setTime(seattleTime()), 20_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

const MIN_LOAD_MS = 1100

/** Counts to 100 while fonts and the hero photo load, then lifts like a curtain. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  const target = useRef(0.1)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setGone(true)
      onDone()
      return
    }
    const start = performance.now()
    const fonts = document.fonts?.ready.then(() => (target.current = Math.max(target.current, 0.5)))
    const img = new Image()
    img.src = hero.photo.src
    const photo = img.decode().catch(() => undefined).then(() => (target.current = Math.max(target.current, 0.9)))
    const timeout = new Promise((r) => setTimeout(r, 4000))
    Promise.race([Promise.all([fonts, photo]), timeout]).then(() => (target.current = 1))

    let raf = 0
    let shown = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const timeCap = Math.min(1, elapsed / MIN_LOAD_MS)
      const goal = Math.min(target.current, timeCap)
      shown += (goal - shown) * 0.12
      if (goal === 1 && shown > 0.995) shown = 1
      setP(shown)
      if (shown < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setDone(true)
          onDone()
          setTimeout(() => setGone(true), 1100)
        }, 200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  if (gone) return null
  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden="true">
      <div className="mono" style={{ color: 'var(--ink-mute)' }}>
        DF
      </div>
      <div className="display loader-name" data-io="" ref={(el) => el?.classList.add('is-in')}>
        <span className="mask">
          <span>{hero.name}</span>
        </span>
      </div>
      <div>
        <div className="loader-bar" style={{ ['--p' as string]: p }}>
          <span />
        </div>
        <div className="loader-foot mono">
          <span>
            <span className="num" style={{ color: 'var(--ink-text)' }}>
              {Math.round(p * 100)}
            </span>{' '}
            / 100
          </span>
          <span>Seattle</span>
        </div>
      </div>
    </div>
  )
}

const navItems = [
  ['Work', 'work'],
  ['Lab', 'aivision'],
  ['About', 'path'],
  ['Contact', 'contact'],
] as const

export function Nav() {
  const time = useSeattleTime()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 350 : 0)
  }

  return (
    <>
      <header className="nav">
        <a href="#top" className="nav-mark" onClick={go('top')} aria-label="Dan Firstenberg, back to top">
          DF
        </a>
        <nav className="nav-links" aria-label="Sections">
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={go(id)}>
              {label}
            </a>
          ))}
          <a href={links.creators}>Creators ↗</a>
        </nav>
        <span className="mono nav-time">Seattle · {time}</span>
        <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu">
          Menu
        </button>
      </header>
      <div id="menu" className={`menu${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="menu-top">
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.03em' }}>{hero.name}</span>
          <button className="menu-close" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <nav className={`menu-links${open ? ' is-in' : ''}`} aria-label="Menu">
          {navItems.map(([label, id], i) => (
            <a key={id} href={`#${id}`} onClick={go(id)} tabIndex={open ? 0 : -1}>
              <span className="mask">
                <span style={{ ['--d' as string]: `${150 + i * 50}ms` }}>{label}</span>
              </span>
              <span className="mono" style={{ color: 'var(--ink-mute)' }}>
                ↗
              </span>
            </a>
          ))}
          <a href={links.creators} tabIndex={open ? 0 : -1}>
            <span className="mask">
              <span style={{ ['--d' as string]: `${150 + navItems.length * 50}ms` }}>Creators</span>
            </span>
            <span className="mono" style={{ color: 'var(--ink-mute)' }}>
              ↗
            </span>
          </a>
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${links.email}`} style={{ fontSize: 17 }} tabIndex={open ? 0 : -1}>
            {links.email}
          </a>
          <div>
            <a href={links.linkedin} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              LinkedIn ↗
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              GitHub ↗
            </a>
            <a href={links.tedx} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
              TEDx ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

/** On fine pointers, the cursor becomes a "View" bubble over work media. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const t = (e.target as Element | null)?.closest?.('[data-cursor]')
      setLabel(t ? t.getAttribute('data-cursor') || 'View' : '')
    }
    const loop = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      if (ref.current) ref.current.style.translate = `${cx}px ${cy}px`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div ref={ref} className={`cursor${label ? ' on' : ''}`} aria-hidden="true">
      {label}
    </div>
  )
}
