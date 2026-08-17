"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface AnimatedWaveBackgroundProps {
  className?: string
}

interface WaveLayer {
  /** Peak-to-baseline height, in px. */
  amplitude: number
  /** Horizontal distance for one full sine cycle, in px. */
  wavelength: number
  /** Radians advanced per millisecond. */
  speed: number
  /** Baseline vertical position, as a fraction of the canvas height. */
  baselineRatio: number
  /** Phase offset so layers don't all crest at the same x. */
  phase: number
  opacity: number
  /** Flips the two-color gradient direction, for variety between layers. */
  reverse?: boolean
}

const LAYERS: WaveLayer[] = [
  { amplitude: 46, wavelength: 620, speed: 0.00028, baselineRatio: 0.62, phase: 0, opacity: 0.5 },
  { amplitude: 60, wavelength: 460, speed: 0.00042, baselineRatio: 0.74, phase: 2, opacity: 0.4, reverse: true },
  { amplitude: 34, wavelength: 340, speed: 0.00061, baselineRatio: 0.86, phase: 4, opacity: 0.32 },
]

/**
 * Full-bleed animated wave background for the `.neuro` skin — replaces the
 * earlier static blurred-blob glow with actual canvas-drawn, scrolling sine
 * waves. Reads `--neuro-wave-from`/`-to` off the canvas element itself (a
 * pair distinct from the `--neuro-brand-from/to` used for buttons/badges —
 * see globals.css — because a translucent wash of the button-tuned brand
 * colors was barely visible against light mode's near-white background),
 * so it automatically follows whatever `.neuro` subtree it's mounted in and
 * whichever light/dark variant is active.
 *
 * Renders one static frame (no `requestAnimationFrame` loop) when the user
 * has `prefers-reduced-motion: reduce` set.
 */
export function AnimatedWaveBackground({ className }: AnimatedWaveBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvasEl = canvasRef.current
    const parentEl = canvasEl?.parentElement
    const ctx = canvasEl?.getContext("2d")
    if (!canvasEl || !parentEl || !ctx) return

    // Re-bound as non-nullable locals: the nested `resize`/`drawLayer`/`tick`
    // functions below close over these, and TS's control-flow narrowing from
    // the guard above doesn't carry into nested function bodies.
    const canvas: HTMLCanvasElement = canvasEl
    const parent: HTMLElement = parentEl
    const ctx2d: CanvasRenderingContext2D = ctx

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let width = 0
    let height = 0
    let colorFrom = "oklch(0.6 0.19 264)"
    let colorTo = "oklch(0.75 0.14 220)"
    // Per-theme multiplier on top of each layer's own `opacity` (see
    // `--neuro-wave-opacity` in globals.css) — light mode dials the whole
    // effect down so it reads as an ambient tint instead of a heavy wash
    // against the near-white background.
    let opacityScale = 1

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)

      const styles = getComputedStyle(canvas)
      colorFrom = styles.getPropertyValue("--neuro-wave-from").trim() || colorFrom
      colorTo = styles.getPropertyValue("--neuro-wave-to").trim() || colorTo
      const scale = Number.parseFloat(styles.getPropertyValue("--neuro-wave-opacity"))
      opacityScale = Number.isFinite(scale) ? scale : 1
    }
    resize()

    function drawLayer(layer: WaveLayer, elapsed: number) {
      const baseline = height * layer.baselineRatio
      const step = 12

      ctx2d.beginPath()
      ctx2d.moveTo(0, height)
      for (let x = 0; x <= width; x += step) {
        const y =
          baseline +
          Math.sin(x / layer.wavelength + layer.phase + elapsed * layer.speed) *
            layer.amplitude
        ctx2d.lineTo(x, y)
      }
      ctx2d.lineTo(width, height)
      ctx2d.closePath()

      // Diagonal two-color gradient (same 135deg direction as
      // `.neuro-brand-gradient`) fading to transparent, instead of a flat
      // single-hue wash — reads as a real gradient rather than a dull tint,
      // which matters most in light mode where a translucent flat color
      // barely shows up against the near-white background.
      const gradient = ctx2d.createLinearGradient(0, baseline - layer.amplitude, width, height)
      const [start, end] = layer.reverse ? [colorTo, colorFrom] : [colorFrom, colorTo]
      gradient.addColorStop(0, start)
      gradient.addColorStop(0.55, end)
      gradient.addColorStop(1, "transparent")

      ctx2d.globalAlpha = layer.opacity * opacityScale
      ctx2d.fillStyle = gradient
      ctx2d.fill()
    }

    function render(elapsed: number) {
      ctx2d.clearRect(0, 0, width, height)
      for (const layer of LAYERS) drawLayer(layer, elapsed)
      ctx2d.globalAlpha = 1
    }

    let frameId: number
    function tick(time: number) {
      render(time)
      frameId = requestAnimationFrame(tick)
    }

    if (prefersReducedMotion) {
      render(0)
    } else {
      frameId = requestAnimationFrame(tick)
    }

    const handleResize = () => resize()
    window.addEventListener("resize", handleResize)

    // `resize()` also re-samples `--neuro-brand-from/to`, so re-running it
    // when `next-themes` flips the `.dark` class on `<html>` (light vs.
    // dark `.neuro` tokens, see globals.css) keeps the wave colors in sync
    // without restarting the animation loop itself.
    const themeObserver = new MutationObserver(() => resize())
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      window.removeEventListener("resize", handleResize)
      themeObserver.disconnect()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0", className)}
    />
  )
}
