import { aivision, coreLab, halfspace, hookd, links, spoor } from '../content'

const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`
import { ClipImage, Counter, Fade, Lines, SectionHead } from './primitives'

export function Spoor() {
  return (
    <section id="spoor" className="section dark" aria-label="Spoor case study">
      <div className="wrap">
        <SectionHead
          left="05 · Case study"
          right={
            <a className="textlink" href={links.spoor} target="_blank" rel="noreferrer">
              spoorapp.com ↗
            </a>
          }
        />
        <div className="case-grid">
          <div className="case-copy">
            <Lines lines={['Spoor']} className="display case-title" as="h2" />
            <Fade as="p" className="lede" delay={150}>
              {spoor.lede}
            </Fade>
            <Fade className="meta-grid" delay={250}>
              {spoor.meta.map(([k, v]) => (
                <div key={k}>
                  <div className="label">{k}</div>
                  <div>{v}</div>
                </div>
              ))}
            </Fade>
            <Fade className="callout" delay={350}>
              <div className="label">A constraint I planned around</div>
              <p>{spoor.constraint}</p>
            </Fade>
          </div>
          <div className="spoor-stage">
            <div className="spoor-phones">
              {spoor.phones.map((ph, i) => (
                <div key={ph.src} className="float" style={{ animationDelay: `${i * 1.2}s` }}>
                  <ClipImage src={ph.src} alt={ph.alt} delay={150 + i * 120} width={786} height={1704} />
                </div>
              ))}
            </div>
            <div className="spoor-steps">
              {spoor.steps.map(([t, d], i) => (
                <Fade key={t} delay={300 + i * 80}>
                  <span className="step-n">0{i + 1}</span>
                  <b>{t}</b>
                  <p>{d}</p>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AIVision() {
  return (
    <section id="aivision" className="section" aria-label="AIVision Food">
      <div className="wrap">
        <SectionHead left="06 · Lab" right={aivision.meta} />
        <div className="case-grid">
          <div className="case-copy">
            <Lines lines={['AIVision Food']} className="h2" as="h2" />
            <Fade as="p" className="lede" delay={150}>
              {aivision.lede}
            </Fade>
            <div className="steps">
              {aivision.steps.map(([t, d], i) => (
                <Fade key={t} className="step" delay={250 + i * 70}>
                  <span className="step-n">0{i + 1}</span>
                  <div>
                    <b>{t}</b> <span className="muted">{d}</span>
                  </div>
                </Fade>
              ))}
            </div>
            <Fade className="big-stat" delay={400}>
              <div>
                <div className="label">Detection accuracy</div>
                <p>{aivision.accuracy.note}</p>
                <div className="label" style={{ marginTop: 10, color: 'var(--ink-mute)' }}>
                  YOLOv8 · Python · AWS · Docker
                </div>
              </div>
              <span className="value">
                <Counter from={aivision.accuracy.from} to={aivision.accuracy.to} duration={2200} suffix="%" />
              </span>
            </Fade>
          </div>
          <div className="av-media">
            <ClipImage src={img("aivision-booth.webp")} alt="The AIVision Food team at their trade show booth" pos="50% 42%" tag="The team at our trade show booth" delay={150} />
            <ClipImage src={img("smartprobe-warehouse.webp")} alt="A SmartProbe hanging in a food warehouse" pos="40% 40%" tag="In a warehouse" delay={250} />
            <div className="clip probe-cell" data-io="" style={{ ['--d' as string]: '330ms', position: 'relative' }}>
              <img className="probe" src={img("smartprobe.webp")} alt="The SmartProbe hardware" loading="lazy" />
              <span className="chip-tag">SmartProbe</span>
            </div>
            <ClipImage src={img("smartprobe-captures.webp")} alt="What the probe's camera sees after 45 days" pos="50% 50%" tag="What the camera sees" delay={410} style={{ background: '#fff' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function CoreLab() {
  return (
    <section id="corelab" className="section dark" aria-label="CORE Lab autonomous race car">
      <div className="wrap">
        <SectionHead left="07 · Lab" right={coreLab.meta} />
        <div className="case-grid">
          <div className="case-copy">
            <Lines lines={['Teaching a race', 'car to see.']} className="h2" as="h2" />
            <Fade as="p" className="lede muted" delay={150}>
              {coreLab.lede}
            </Fade>
            <div className="steps">
              {coreLab.steps.map(([t, d], i) => (
                <Fade key={t} className="step" delay={250 + i * 70}>
                  <span className="step-n">0{i + 1}</span>
                  <div>
                    <b>{t}</b> <span className="muted">{d}</span>
                  </div>
                </Fade>
              ))}
            </div>
            <Fade className="stack-line" delay={450}>
              {coreLab.stack}
            </Fade>
          </div>
          <div className="cl-media">
            <ClipImage src={img("darc-dan-car.webp")} alt="Dan holding the race car at the UC Davis senior design showcase" pos="60% 50%" delay={150} />
            <ClipImage src={img("darc-poster.webp")} alt="The team's poster: Autonomous Racing with Computer Vision Map Generation" className="cl-poster" delay={250} />
            <ClipImage src={img("darc-track.webp")} alt="The track from above" pos="62% 55%" tag="The track from above" delay={330} />
            <ClipImage src={img("darc-cnn.webp")} alt="The CNN's predicted steering and speed (blue) against the real values (red)" className="cnn" delay={410}>
              <img className="scan" src={img("darc-cnn.webp")} alt="" loading="lazy" />
            </ClipImage>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Halfspace() {
  return (
    <section id="halfspace" className="section" aria-label="Halfspace case study">
      <div className="wrap">
        <SectionHead
          left="08 · Case study"
          right={
            <a className="textlink" href={links.halfspace} target="_blank" rel="noreferrer">
              Live · try it ↗
            </a>
          }
        />
        <div className="case-grid">
          <div className="case-copy">
            <Lines lines={['Halfspace']} className="display hs-title" as="h2" />
            <Fade as="p" className="lede" delay={150}>
              {halfspace.lede}
            </Fade>
            <div className="hs-points">
              {halfspace.points.map(([t, d], i) => (
                <Fade key={t} delay={250 + i * 70}>
                  <b>{t}</b> <span className="muted">{d}</span>
                </Fade>
              ))}
            </div>
            <Fade className="stack-line" delay={450}>
              {halfspace.stack}
            </Fade>
          </div>
          <div className="hs-right" data-io="">
            <div className="hs-search" aria-label={`Example search: ${halfspace.query}`}>
              <span style={{ color: '#7d8590' }} aria-hidden="true">
                ⌕
              </span>
              <span className="hs-typed" aria-hidden="true">
                {halfspace.query}
              </span>
            </div>
            <div className="hs-chips" aria-hidden="true">
              {halfspace.chips.map((c, i) => (
                <span key={c} style={{ ['--d' as string]: `${i * 120}ms` }}>
                  {c}
                </span>
              ))}
            </div>
            <a href={links.halfspace} target="_blank" rel="noreferrer" data-cursor="Open">
              <ClipImage src={img("halfspace-player.gif")} alt="Halfspace phase player with an animated pitch" className="hs-shot" delay={200} />
            </a>
            <div className="stats-row">
              {halfspace.stats.map((s) => (
                <div key={s.label}>
                  <b>
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} format={s.format} duration={s.value > 1000 ? 2200 : 1400} />
                  </b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Hookd() {
  return (
    <section id="hookd" className="section dark" aria-label="Hookd AI case study">
      <div className="wrap">
        <SectionHead
          left="09 · Case study"
          right={
            <a className="textlink" href={links.hookd} target="_blank" rel="noreferrer">
              hookd-ai.com ↗
            </a>
          }
        />
        <div className="case-grid">
          <div className="case-copy">
            <Fade className="hk-mark" delay={0}>
              <img src={img('hookd-logo.svg')} alt="" width={112} height={112} />
            </Fade>
            <Lines lines={['Hookd AI']} className="display hs-title" as="h2" />
            <Fade as="p" className="lede" delay={150}>
              {hookd.lede}
            </Fade>
            <Fade className="meta-grid" delay={250}>
              {hookd.meta.map(([k, v]) => (
                <div key={k}>
                  <div className="label">{k}</div>
                  <div>{v}</div>
                </div>
              ))}
            </Fade>
            <div className="hs-points">
              {hookd.points.map(([t, d], i) => (
                <Fade key={t} delay={300 + i * 70}>
                  <b>{t}</b> <span className="muted">{d}</span>
                </Fade>
              ))}
            </div>
            <Fade className="stack-line" delay={500}>
              {hookd.stack}
            </Fade>
          </div>
          <div className="hs-right">
            <a href={links.hookd} target="_blank" rel="noreferrer" data-cursor="Open">
              <ClipImage
                src={img('hookd-landing.webp')}
                alt="The Hookd AI landing page: type your idea and watch it turn into a thumbnail"
                className="hk-shot"
                delay={150}
              />
            </a>
            <Fade className="label" delay={250}>
              {hookd.winsSource}
            </Fade>
            <div className="hk-versions">
              {hookd.wins.map((v, i) => (
                <div key={v.src}>
                  <ClipImage src={v.src} alt={v.title} className="hk-version" delay={250 + i * 100} />
                  <Fade className="hk-win" delay={400 + i * 100}>
                    <b>{v.views}</b>
                    <span>views</span>
                  </Fade>
                </div>
              ))}
            </div>
            <div className="stats-row hk-stats">
              {hookd.stats.map((s) => (
                <div key={s.label}>
                  <b>
                    <Counter to={s.value} duration={1400} />
                  </b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <Fade className="label" delay={300}>
              {hookd.statsSource}
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}
