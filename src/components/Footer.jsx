import { BiLogoGithub, BiLogoLinkedin, BiEnvelope } from 'react-icons/bi'
import { RevealText } from './SectionReveal'

export default function Footer() {
  return (
    <RevealText>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">XSO<span>R</span></div>
            <p>Rohit Mane — Building websites that work for your business.</p>
          </div>

          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#projects">Work</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-social">
            <a href="https://github.com/rohitmane2005" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><BiLogoGithub /></a>
            <a href="https://www.linkedin.com/in/rohit-mane-570487333/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><BiLogoLinkedin /></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rohitbusiness9115@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"><BiEnvelope /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Rohit Mane. All rights reserved.</p>
          <p className="footer-tagline">Built with ❤️ and clean code.</p>
        </div>
      </footer>
    </RevealText>
  )
}
