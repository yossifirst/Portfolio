import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'
import { pipHiddenPref, setPipHiddenPref, startPip } from '../lib/pip'
import './pip.css'

/** Pip, the small creature that wanders the page. It starts as the period after the name in the hero. */
export function Pip({ ready }: { ready: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const tracks = useRef<HTMLCanvasElement>(null)
  const pip = useRef<ReturnType<typeof startPip> | null>(null)

  useEffect(() => {
    if (!canvas.current || !tracks.current) return
    document.documentElement.classList.add('pip-on')
    pip.current = startPip(
      { canvas: canvas.current, tracks: tracks.current },
      { reduced: prefersReducedMotion() },
    )
    return () => {
      pip.current?.destroy()
      pip.current = null
      document.documentElement.classList.remove('pip-on')
    }
  }, [])

  useEffect(() => {
    if (ready) pip.current?.setReady()
  }, [ready])

  return (
    <>
      <canvas ref={tracks} className="pip-tracks" aria-hidden="true" />
      <canvas ref={canvas} className="pip" aria-hidden="true" />
    </>
  )
}

/** The off switch in the footer. The choice is remembered on this device. */
export function PipToggle() {
  const [hidden, setHidden] = useState(pipHiddenPref)
  useEffect(() => {
    document.documentElement.classList.toggle('pip-hidden', hidden)
  }, [hidden])
  return (
    <button
      type="button"
      className="pip-toggle"
      onClick={() => {
        setHidden(!hidden)
        setPipHiddenPref(!hidden)
      }}
    >
      {hidden ? 'Bring Pip back' : 'Hide Pip'}
    </button>
  )
}
