import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { BiLogoGithub, BiLogoLinkedin, BiEnvelope } from 'react-icons/bi'

const roles = [
  'Freelance Web Developer',
  'Java & Frontend Engineer',
  'Building Sites That Convert',
]

// Animated counter — defined OUTSIDE Hero to avoid re-creation on every typing re-render
const Counter = memo(function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const startTime = performance.now()
          const num = parseInt(target) || 0

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * num))
            if (progress < 1) requestAnimationFrame(animate)
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

  return <strong ref={ref}>{count}{suffix}</strong>
})

export default function Hero() {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const current = roles[roleIndex]
    let speed = isDeleting ? 40 : 90

    if (!isDeleting && charIndex === current.length) speed = 1500
    if (isDeleting && charIndex === 0) speed = 400

    timerRef.current = setTimeout(() => {
      if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      } else {
        setCharIndex((c) => c + (isDeleting ? -1 : 1))
      }
    }, speed)

    setText(current.substring(0, charIndex))
    return () => clearTimeout(timerRef.current)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <section id="home" className="hero">
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="availability-badge">
          <span className="pulse-dot" />
          Available for freelance work
        </div>

        <h1>I build websites<br />that <span className="gradient-text">win clients</span></h1>
        <h2 className="typing-text">{text}<span className="cursor">|</span></h2>
        <p>
          Custom, fast-loading websites for businesses who want to look professional online.
          From restaurants to clinics — I build and deploy your site end-to-end.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <Counter target="5" suffix="+" />
            <span>Projects Live</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>3–7</strong>
            <span>Days Delivery</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <Counter target="100" suffix="%" />
            <span>Custom Code</span>
          </div>
        </div>

        <div className="buttons">
          <a href="#services" className="btn primary">See What I Build</a>
          <a href="#contact" className="btn">Get a Free Quote</a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/RohitMane2005" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BiLogoGithub /></a>
          <a href="https://www.linkedin.com/in/rohit-mane-570487333/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BiLogoLinkedin /></a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rohitbusiness9115@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"><BiEnvelope /></a>
        </div>
      </motion.div>
    </section>
  )
}
