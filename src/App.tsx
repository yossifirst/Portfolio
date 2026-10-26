import { useCallback, useEffect, useState } from 'react'
import { Cursor, Loader, Nav } from './components/Chrome'
import { AIVision, CoreLab, Halfspace, Hookd, Spoor } from './components/SectionsCases'
import { Contact, Path, Social } from './components/SectionsEnd'
import { Alitheon, Hero, Intro, Work } from './components/SectionsTop'
import { getLenis, observeReveals, ScrollTrigger, startSmoothScroll } from './lib/motion'
import { Pip } from './components/Pip'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    const lenis = startSmoothScroll()
    lenis?.stop()
    const stop = observeReveals()
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      stop()
      window.removeEventListener('load', onLoad)
    }
  }, [])

  const onLoaded = useCallback(() => {
    setReady(true)
    getLenis()?.start()
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <Loader onDone={onLoaded} />
      <Nav />
      <Cursor />
      <Pip ready={ready} />
      <main>
        <Hero ready={ready} />
        <Intro />
        <Alitheon />
        <Work />
        <Spoor />
        <AIVision />
        <CoreLab />
        <Halfspace />
        <Hookd />
        <Social />
        <Path />
        <Contact />
      </main>
    </>
  )
}
