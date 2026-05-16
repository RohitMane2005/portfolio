import { useEffect, useRef } from 'react'

/**
 * Canvas-based mouse particle trail with fading purple/blue particles.
 * Renders on a fixed full-screen canvas, invisible to interaction.
 */
export default function ParticleTrail() {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['rgba(102,126,234,', 'rgba(118,75,162,', 'rgba(129,140,248,']
    let frame = 0

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY

      // Spawn particles every 2 frames to keep it lightweight
      if (frame % 2 === 0) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 3 + 1,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5 - 0.3,
          color,
        })
      }
    }

    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const arr = particles.current
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        p.size *= 0.98

        if (p.life <= 0) {
          arr.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.life + ')'
        ctx.fill()
      }

      // Cap particles for performance
      if (arr.length > 80) arr.splice(0, arr.length - 80)

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        pointerEvents: 'none',
      }}
    />
  )
}
