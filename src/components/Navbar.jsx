import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BiMenu, BiX } from 'react-icons/bi'

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/industries', label: 'Industries' },
]

const homeLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

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
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [close])

  // Close mobile menu on route change
  useEffect(() => { close() }, [location.pathname, close])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={close}>
          XSO<span>R</span>
        </Link>

        <button
          className="menu-icon"
          onClick={toggle}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <BiX /> : <BiMenu />}
        </button>

        <nav className={`nav-links ${open ? 'active' : ''}`}>
          {/* Show Home link when not on homepage */}
          {!isHome && (
            <Link to="/" onClick={close}>
              Home
            </Link>
          )}

          {/* Always show route-based links */}
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname.startsWith(l.to) ? 'active' : ''}
              onClick={close}
            >
              {l.label}
            </Link>
          ))}

          {/* Show anchor links only on home page */}
          {isHome && homeLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}

          <Link to="/contact" className="nav-cta" onClick={close}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
