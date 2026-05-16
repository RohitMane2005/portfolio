import { useState, useEffect, useRef, useCallback } from 'react'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'

/**
 * Text scramble effect — reveals text character by character with a
 * glitch/decode animation when scrolled into view. Used for headings.
 */
export default function TextScramble({ text, tag: Tag = 'span', className = '' }) {
  const [display, setDisplay] = useState('')
  const ref = useRef(null)
  const hasRun = useRef(false)

  const scramble = useCallback(() => {
    let frame = 0
    const totalFrames = text.length * 3

    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(progress * text.length)

      let result = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' '
        } else if (i < revealed) {
          result += text[i]
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setDisplay(result)

      if (frame >= totalFrames) {
        setDisplay(text)
        clearInterval(interval)
      }
    }, 30)
  }, [text])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          scramble()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [scramble])

  return (
    <Tag ref={ref} className={className} style={{ fontFamily: 'var(--font-mono)' }}>
      {display || '\u00A0'}
    </Tag>
  )
}
