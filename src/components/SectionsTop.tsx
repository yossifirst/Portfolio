import { useEffect, useRef, useState } from 'react'
import { alitheon, hero, intro, links, work } from '../content'
import { gsap, prefersReducedMotion, scrollToId, ScrollTrigger } from '../lib/motion'
import { Fade, Lines, SectionHead, useInView } from './primitives'

export function Hero({ ready }: { ready: boolean }) {
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToId(id)
  }
  return (
    <section id="top" className="section hero" aria-label="Introduction">
      <div className="wrap">
        <div className={`mono${ready ? ' is-in' : ''}`} style={{ color: 'var(--mute)' }}>
          <span className="mask">
            <span>{hero.eyebrow}</span>
          </span>
        </div>
        <h1 className={`display hero-name${ready ? ' is-in' : ''}`}>
          <span className="mask">
            <span style={{ ['--d' as string]: '80ms' }}>{hero.name}
              <span className="pip-slot" aria-hidden="true" />
            </span>
          </span>
        </h1>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className={`lede${ready ? ' is-in' : ''}`} data-reveal="fade" style={{ ['--d' as string]: '300ms' }}>
              {hero.lede}
            </p>
            <div className={`hero-actions${ready ? ' is-in' : ''}`} data-reveal="fade" style={{ ['--d' as string]: '400ms' }}>
              <a className="pill pill-solid" href="#work" onClick={go('work')}>
                See the work
              </a>
              <a className="pill pill-line" href="#contact" onClick={go('contact')}>
                Get in touch
              </a>
            </div>
            <div className={`hero-links${ready ? ' is-in' : ''}`} data-reveal="fade" style={{ ['--d' as string]: '500ms' }}>
              <a className="textlink" href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
              <a className="textlink" href={links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a className="textlink" href={links.tedx} target="_blank" rel="noreferrer">
                TEDx talk ↗
              </a>
            </div>
            <a
              className={`mono hero-caption${ready ? ' is-in' : ''}`}
              data-reveal="fade"
              style={{ ['--d' as string]: '700ms' }}
              href={links.tedx}
              target="_blank"
              rel="noreferrer"
            >
              {hero.caption[0]}
              <br />
              {hero.caption[1]} ↗
            </a>
          </div>
          <div className={`clip hero-photo${ready ? ' is-in' : ''}`} style={{ ['--d' as string]: '150ms' }}>
            <img
              src={hero.photo.src}
              alt={hero.photo.alt}
              width={hero.photo.w}
              height={hero.photo.h}
              fetchPriority="high"
              style={{ ['--d' as string]: '150ms' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Pinned paragraph: words go dark and photos pop in as you scroll through it. */
export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return
    const tokens = Array.from(text.querySelectorAll<HTMLElement>('[data-t]'))
    if (prefersReducedMotion()) {
      tokens.forEach((t) => t.classList.add('on'))
      return
    }
    const setProgress = (p: number) => {
      const lit = Math.round(p * tokens.length * 1.08)
      tokens.forEach((t, i) => t.classList.toggle('on', i < lit))
    }
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=140%',
        pin: true,
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      })
      return () => st.kill()
    })
    mm.add('(max-width: 900px)', () => {
      const st = ScrollTrigger.create({
        trigger: text,
        start: 'top 80%',
        end: 'bottom 35%',
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      })
      return () => st.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section intro" aria-label="About">
      <div className="wrap" style={{ width: '100%' }}>
        <SectionHead left="02 · Intro" />
        <p ref={textRef} className="intro-text">
          {intro.map((t, i) =>
            'word' in t ? (
              <span key={i}>
                <span data-t="" className="intro-word">
                  {t.word}
                </span>{' '}
              </span>
            ) : (
              <span key={i} data-t="" className={`intro-pop${t.tall ? ' tall' : ''}`}>
                <img src={t.img} alt={t.alt} loading="lazy" style={t.pos ? { objectPosition: t.pos } : undefined} />
              </span>
            ),
          )}
        </p>
        <div className="intro-foot">
          <span>Alitheon · Oracle · AIVision Food · UC Davis</span>
          <span className="mono">Keep scrolling ↓</span>
        </div>
      </div>
    </section>
  )
}

export function Alitheon() {
  const [stageRef, inView] = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return
    const id = window.setInterval(() => setDesktop((d) => !d), 3200)
    return () => window.clearInterval(id)
  }, [inView])

  return (
    <section id="alitheon" className="section dark" aria-label="Alitheon">
      <div className="wrap">
        <SectionHead
          left={
            <>
              <span className="live-dot" aria-hidden="true" />
              03 · Now
            </>
          }
          right="Alitheon · Bellevue, WA"
        />
        <div className="ali-grid">
          <div className="ali-copy">
            <div>
              <Lines lines={alitheon.title} className="h2" />
              <Fade as="p" delay={200}>
                {alitheon.body}
              </Fade>
            </div>
            <div className="ali-cards">
              {alitheon.cards.map((c, i) => (
                <Fade key={c.title} className="tile" delay={300 + i * 80}>
                  <div className="tile-head">
                    <span className="tile-title">{c.title}</span>
                    <span className="label">{c.tag}</span>
                  </div>
                  <p>{c.body}</p>
                </Fade>
              ))}
            </div>
          </div>
          <div ref={stageRef} className={`device-stage${desktop ? ' desktop' : ''}`} role="img" aria-label="Illustration of an app switching between phone and desktop layouts">
            <div className="device-top">
              <span className="label">Both customer-facing apps</span>
              <div className="device-toggle" aria-hidden="true">
                <span className={desktop ? '' : 'on'}>Mobile</span>
                <span className={desktop ? 'on' : ''}>Desktop</span>
              </div>
            </div>
            <div className={`device${desktop ? ' desktop' : ''}`} aria-hidden="true">
              <div className="device-ui">
                <div className="device-side">
                  <div className="sk" style={{ width: 60, height: 10 }} />
                  <div className="sk" style={{ width: 70 }} />
                  <div className="sk" style={{ width: 50 }} />
                  <div className="sk" style={{ width: 64 }} />
                </div>
                <div className="device-main">
                  <div className="sk" style={{ width: '45%', height: 12, background: '#0b0b0b' }} />
                  <div className="device-view" />
                  <div className="sk" style={{ width: '80%' }} />
                  <div className="sk" style={{ width: '60%' }} />
                  <div className="device-btn" />
                </div>
              </div>
            </div>
            <div className="device-stand" />
          </div>
        </div>
      </div>
    </section>
  )
}

/** Vertical scroll drives the row sideways on desktop; native swipe on touch. */
export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth)
      if (distance() < 40) return
      // On shorter screens the captions sit below the fold, so hold the pin
      // until the bottom of the row (captions included) is in view.
      const overflow = () =>
        Math.max(0, track.getBoundingClientRect().bottom - section.getBoundingClientRect().top + 32 - window.innerHeight)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${overflow()} top`,
          // The row only overflows by a few hundred pixels on wide screens, so give
          // the sideways move enough scroll that it reads as a deliberate slide.
          end: () => `+=${Math.max(distance() * 1.5, window.innerHeight * 0.6)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      return () => tween.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [])

  const open = (href?: string) => (e: React.MouseEvent) => {
    if (!href) return
    e.preventDefault()
    scrollToId(href.slice(1))
  }

  return (
    <section ref={sectionRef} id="work" className="section work" aria-label="Selected work">
      <div className="wrap">
        <SectionHead left="04 · Selected work" right="Scroll to move the row" />
        <div className="work-head">
          <Lines lines={["Things I've built"]} className="h2" />
          <Fade className="mono">
            0{work.length} projects
          </Fade>
        </div>
        <div ref={trackRef} className="work-track">
          {work.map((p, i) => {
            const Tag = p.href ? 'a' : 'div'
            return (
              <Tag
                key={p.id}
                className="work-card"
                {...(p.href ? { href: p.href, onClick: open(p.href), 'data-cursor': 'View' } : {})}
              >
                <div className="clip work-media" data-io="" style={{ ['--d' as string]: `${i * 120}ms` }}>
                  {p.kind === 'phones' && (
                    <div className="clip-inner work-phones">
                      {p.images.map((src, j) => (
                        <img key={src} src={src} alt={j === 0 ? 'Spoor home screen' : 'Spoor walking screen'} loading="lazy" />
                      ))}
                    </div>
                  )}
                  {p.kind === 'image' && <img src={p.images[0]} alt="Halfspace phase player with an animated pitch" loading="lazy" />}
                  {p.kind === 'hookd' && (
                    <div className="clip-inner hookd">
                      <img src={p.images[0]} alt="Hookd AI logo" loading="lazy" />
                    </div>
                  )}
                </div>
                <div className="work-meta">
                  <span className="work-name">{p.name}</span>
                  <span className="work-note">{p.note}</span>
                </div>
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
