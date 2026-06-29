import { useState, useEffect, useRef, memo } from 'react'
import { SectionReveal, RevealItem } from './SectionReveal'

const Counter = memo(function Counter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = performance.now()
          const num = parseInt(target) || 0

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            if (progress >= 1) {
              setCount(num)
            } else {
              setCount(Math.floor(eased * num))
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <div className="stat-number" ref={ref}>{prefix}{count}{suffix}</div>
})

const stats = [
  { target: 3, suffix: '+', label: 'Production Apps' },
  { target: 95, suffix: '%', label: 'ML Confidence' },
  { target: 40, suffix: '%', label: 'Triage Reduction' },
  { target: 30, suffix: '%+', label: 'Engagement Boost' },
]

export default function StatsSection() {
  return (
    <SectionReveal as="div">
      <section style={{ padding: '40px clamp(24px, 8vw, 12%)', position: 'relative' }}>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <RevealItem key={i}>
              <div className="stat-card">
                <Counter target={s.target} suffix={s.suffix} prefix={s.prefix || ''} />
                <div className="stat-label">{s.label}</div>
              </div>
            </RevealItem>
          ))}
        </div>
      </section>
    </SectionReveal>
  )
}
