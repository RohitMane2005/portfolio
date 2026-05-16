import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { BiLogoGithub, BiLogoLinkedin, BiEnvelope, BiDownload } from 'react-icons/bi'
import MagneticWrap from './MagneticWrap'

const roles = [
  'Full-Stack Developer',
  'Java & Spring Boot Engineer',
  'AI Platform Builder',
  'React & Three.js Developer',
]

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
        <motion.div
          className="availability-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="pulse-dot" />
          Open to opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          I build software<br />that <span className="gradient-text">scales</span>
        </motion.h1>

        <motion.h2
          className="typing-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {text}<span className="cursor">|</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          Full-stack developer crafting production-grade AI platforms,
          enterprise APIs, and immersive web experiences with Java,
          Spring Boot, React, and Three.js.
        </motion.p>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <div className="stat">
            <Counter target="3" suffix="+" />
            <span>Production Apps</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <Counter target="15" suffix="+" />
            <span>Technologies</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <Counter target="95" suffix="%" />
            <span>AI Accuracy</span>
          </div>
        </motion.div>

        <motion.div
          className="buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <MagneticWrap strength={0.25}>
            <a href="#projects" className="btn primary">View Projects</a>
          </MagneticWrap>
          <MagneticWrap strength={0.25}>
            <a href="#contact" className="btn">Contact Me</a>
          </MagneticWrap>
          <MagneticWrap strength={0.3}>
            <a href="/resume.pdf" download className="resume-btn">
              <BiDownload /> Resume
            </a>
          </MagneticWrap>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <MagneticWrap strength={0.4}>
            <a href="https://github.com/RohitMane2005" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BiLogoGithub /></a>
          </MagneticWrap>
          <MagneticWrap strength={0.4}>
            <a href="https://www.linkedin.com/in/rohit-mane-570487333/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BiLogoLinkedin /></a>
          </MagneticWrap>
          <MagneticWrap strength={0.4}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rohitbusiness9115@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"><BiEnvelope /></a>
          </MagneticWrap>
        </motion.div>
      </motion.div>
    </section>
  )
}
