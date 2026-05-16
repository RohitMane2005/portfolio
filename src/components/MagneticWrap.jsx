import { useRef, useEffect, useCallback } from 'react'

/**
 * Magnetic button effect - buttons subtly attract toward cursor on hover.
 * Wrap any element with <MagneticWrap> for the effect.
 */
export default function MagneticWrap({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)

  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }, [strength])

  const handleLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    setTimeout(() => {
      if (el) el.style.transition = 'transform 0.15s ease'
    }, 400)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.15s ease'
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleMove, handleLeave])

  return (
    <div ref={ref} className={`magnetic-wrap ${className}`} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
