import { useState, useEffect, useCallback } from 'react'
import { BiMenu, BiX } from 'react-icons/bi'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills-orbit', label: 'Skills' },
  { href: '#timeline', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [])

  const toggle = () => {
    setOpen((v) => {
      document.body.style.overflow = v ? '' : 'hidden'
      return !v
    })
  }

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('section[id]')
      let current = ''
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 200 && window.scrollY < s.offsetTop + s.offsetHeight - 200) {
          current = s.id
        }
      })
      setActive(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [close])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="logo" onClick={close}>
        XSO<span>R</span>
      </a>

      <button className="menu-icon" onClick={toggle} aria-label="Toggle navigation" aria-expanded={open}>
        {open ? <BiX /> : <BiMenu />}
      </button>

      <nav className={`nav-links ${open ? 'active' : ''}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={active === l.href.slice(1) ? 'active' : ''}
            onClick={close}
          >
            {l.label}
          </a>
        ))}
        <a href="#contact" className="nav-cta" onClick={close}>Contact</a>
      </nav>
    </header>
  )
}
