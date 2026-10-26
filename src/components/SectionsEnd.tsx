import { useEffect, useRef, useState } from 'react'
import { community, links, path, social } from '../content'
import { prefersReducedMotion, ScrollTrigger } from '../lib/motion'
import { PipToggle } from './Pip'
import { ClipImage, Counter, Fade, Lines, SectionHead } from './primitives'

export function Social() {
  return (
    <section id="creators" className="section" aria-label="Social media consulting">
      <div className="wrap">
        <SectionHead left="10 · Outside the day job" right="Social media consultant · since 2024" />
        <div className="so-grid">
          <div className="so-copy">
            <Lines lines={['I help creators grow.']} className="h2" />
            <Fade as="p" className="lede muted" delay={150} style={{ maxWidth: 600 }}>
              {social.lede}
            </Fade>
            <div className="so-big" aria-label={`${social.views} million`}>
              <Counter to={social.views} duration={2400} />M
            </div>
            <Fade as="p" className="lede" delay={200} style={{ maxWidth: 560 }}>
              {social.viewsNote}
            </Fade>
            <Fade className="label" delay={300}>
              {social.viewsSource}
            </Fade>
            <Fade delay={320}>
              <a className="pill pill-line" href={links.creators}>
                {social.more} ↗
              </a>
            </Fade>
            <Fade className="so-client" delay={350}>
              <div>
                <div className="label">{social.client.label}</div>
                <p>{social.client.body}</p>
              </div>
              {social.client.stats.map(([v, l]) => (
                <div key={l}>
                  <b>{v}</b>
                  <span>{l}</span>
                </div>
              ))}
            </Fade>
          </div>
          <div className="so-videos">
            {social.videos.map((v, i) => (
              <div key={v.src}>
                <ClipImage src={v.src} alt={v.title} delay={150 + i * 100} />
                <Fade delay={500 + i * 100}>
                  <b>{v.views}</b>
                  <span>{v.title}</span>
                </Fade>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** A line draws across the timeline as you scroll; each stop lights up as it's reached. */
export function Path() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(prefersReducedMotion() ? 1 : 0)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 55%',
      scrub: true,
      onUpdate: (self) => setP(self.progress),
    })
    return () => st.kill()
  }, [])

  return (
    <section id="path" className="section dark" aria-label="The path">
      <div className="wrap">
        <SectionHead left="11 · The path" right="2024 to now" />
        <Lines lines={['How I got here.']} className="h2" />
        <div ref={ref} className="path-scroller" style={{ marginTop: 56 }}>
          <div className="path-photos">
            {path.map((s, i) => (
              <ClipImage key={s.date} src={s.img} alt={`${s.role}, ${s.org}`} pos={s.pos} delay={i * 90} />
            ))}
          </div>
          <div className="path-line" aria-hidden="true">
            <span style={{ ['--p' as string]: p }} />
          </div>
          <ol className="path-items" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {path.map((s, i) => (
              <li key={s.date} className={`path-item${p * path.length >= i + 0.2 ? ' on' : ''}${s.now ? ' now' : ''}`}>
                <span className="path-dot" aria-hidden="true" />
                <Fade delay={i * 90}>
                  <div className="label">{s.date}</div>
                  <div className="role">{s.role}</div>
                  <div className="org">{s.org}</div>
                  <p>
                    {s.body}
                    {s.href && (
                      <>
                        {' '}
                        <a className="textlink" href={s.href} target="_blank" rel="noreferrer">
                          Watch the talk ↗
                        </a>
                      </>
                    )}
                  </p>
                </Fade>
              </li>
            ))}
          </ol>
          <ol className="path-mobile" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {path.map((s) => (
              <li key={s.date} className="path-item on">
                <ClipImage src={s.img} alt={`${s.role}, ${s.org}`} pos={s.pos} />
                <div className="label">{s.date}</div>
                <div className="role">{s.role}</div>
                <div className="org">{s.org}</div>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <Fade className="path-foot">
          <div className="label">Community</div>
          <p>{community}</p>
        </Fade>
      </div>
    </section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }
  const words = 'Software engineer · Builder · Speaker · Growth and creative strategist · Seattle ·'
  return (
    <section id="contact" className="section dark contact" aria-label="Contact">
      <div className="wrap">
        <SectionHead left="12 · Contact" right="Based in Seattle" />
        <Lines lines={['Say hello.']} className="display contact-title" />
        <Fade as="p" className="lede muted" delay={150} style={{ maxWidth: 560, marginTop: 28 }}>
          I'm always up for talking about AI agents, products and what makes software feel good to use.
        </Fade>
        <div className="contact-mail" data-io="">
          <a href={`mailto:${links.email}`}>{links.email}</a>
          <button className="pill pill-solid" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span className={`toast${copied ? ' on' : ''}`} role="status" aria-live="polite">
            {copied ? 'Email copied to clipboard' : ''}
          </span>
        </div>
        <Fade className="contact-links" delay={200}>
          <a className="textlink" href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="textlink" href={links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="textlink" href={links.tedx} target="_blank" rel="noreferrer">
            TEDx talk ↗
          </a>
        </Fade>
        <div className="marquee" aria-hidden="true" style={{ marginTop: 'auto', paddingTop: 18 }}>
          <div className="marquee-track">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>{words}</span>
            ))}
          </div>
        </div>
        <div className="foot mono">
          <span>© {new Date().getFullYear()} Dan Firstenberg</span>
          <PipToggle />
          <a href="#top" onClick={(e) => (e.preventDefault(), window.scrollTo({ top: 0, behavior: 'smooth' }))}>
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  )
}
