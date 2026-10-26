import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { prefersReducedMotion } from '../lib/motion'

type Delay = { delay?: number }
const delayStyle = (delay?: number, extra?: CSSProperties) =>
  ({ ...(delay ? { '--d': `${delay}ms` } : {}), ...extra }) as CSSProperties

/** Headline lines that rise through their own masks. Parent gets is-in. */
export function Lines({
  lines,
  as: Tag = 'h2',
  className,
  stagger = 70,
  delay = 0,
}: {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'div'
  className?: string
  stagger?: number
  delay?: number
}) {
  return (
    <Tag className={className} data-io="">
      {lines.map((line, i) => (
        <span className="mask" key={i}>
          <span style={delayStyle(delay + i * stagger)}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}

export function Fade({
  children,
  delay,
  className,
  as: Tag = 'div',
  style,
}: { children: ReactNode; className?: string; as?: 'div' | 'p' | 'span'; style?: CSSProperties } & Delay) {
  return (
    <Tag className={className} data-reveal="fade" data-io="" style={delayStyle(delay, style)}>
      {children}
    </Tag>
  )
}

/** The signature move: a rounded mask opens while the image settles from 115%. */
export function ClipImage({
  src,
  alt,
  className = '',
  pos,
  delay,
  tag,
  style,
  children,
  eager,
  width,
  height,
}: {
  src: string
  alt: string
  className?: string
  pos?: string
  tag?: string
  style?: CSSProperties
  children?: ReactNode
  eager?: boolean
  width?: number
  height?: number
} & Delay) {
  return (
    <div className={`clip ${className}`} data-io="" style={delayStyle(delay, style)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={width}
        height={height}
        style={delayStyle(delay, pos ? { objectPosition: pos } : undefined)}
      />
      {children}
      {tag && <span className="chip-tag">{tag}</span>}
    </div>
  )
}

export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.3 }) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, inView] as const
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/** Counts up once when visible. Tabular figures so digits don't jitter. */
export function Counter({
  to,
  from = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  format,
}: {
  to: number
  from?: number
  duration?: number
  prefix?: string
  suffix?: string
  format?: 'count'
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 })
  const [val, setVal] = useState(prefersReducedMotion() ? to : from)
  // Latch on first sight. Scrolling past mid-count used to cancel the frame loop
  // with nothing to restart it, leaving the number stuck partway.
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (inView) setStarted(true)
  }, [inView])
  useEffect(() => {
    if (!started) return
    if (prefersReducedMotion()) return setVal(to)
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setVal(Math.round(from + (to - from) * easeOutExpo(t)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, to, from, duration])
  const text = format === 'count' ? val.toLocaleString('en-US') : String(val)
  return (
    <span ref={ref} className="num" aria-label={`${prefix}${format === 'count' ? to.toLocaleString('en-US') : to}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {text}
        {suffix}
      </span>
    </span>
  )
}

export function SectionHead({ left, right }: { left: ReactNode; right?: ReactNode }) {
  return (
    <div className="section-head mono">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  )
}
