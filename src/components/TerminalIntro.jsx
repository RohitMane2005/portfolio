import { useState, useEffect, useRef } from 'react'
import { SectionReveal, RevealItem } from './SectionReveal'

const lines = [
  { type: 'prompt', text: '~$', cmd: ' whoami' },
  { type: 'output', text: 'Rohit Mane — Full-Stack Developer' },
  { type: 'prompt', text: '~$', cmd: ' cat skills.txt' },
  { type: 'output', text: 'Java · Spring Boot · React · PostgreSQL · Docker · Git' },
  { type: 'prompt', text: '~$', cmd: ' cat status.txt' },
  { type: 'output', text: '✓ Open to opportunities & freelance projects' },
  { type: 'prompt', text: '~$', cmd: ' echo $MISSION' },
  { type: 'output', text: 'Build software that solves real problems at scale' },
]

export default function TerminalIntro() {
  const [visibleLines, setVisibleLines] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let i = 0
          const interval = setInterval(() => {
            i++
            setVisibleLines(i)
            if (i >= lines.length) clearInterval(interval)
          }, 350)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionReveal>
      <section id="intro" style={{ padding: 'clamp(60px, 8vh, 100px) clamp(24px, 8vw, 12%)' }}>
        <div className="terminal" ref={ref}>
          <div className="terminal-header">
            <div className="terminal-dot red" />
            <div className="terminal-dot yellow" />
            <div className="terminal-dot green" />
            <span className="terminal-title">rohit@dev:~</span>
          </div>
          <div className="terminal-body">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="terminal-line">
                {line.type === 'prompt' ? (
                  <>
                    <span className="terminal-prompt">{line.text}</span>
                    <span className="terminal-cmd">{line.cmd}</span>
                  </>
                ) : (
                  <span className="terminal-output">{line.text}</span>
                )}
              </div>
            ))}
            {visibleLines < lines.length && <span className="terminal-cursor" />}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
