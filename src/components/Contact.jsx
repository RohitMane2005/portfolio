import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { BiLogoGithub, BiLogoLinkedin, BiEnvelope, BiCode, BiPhone } from 'react-icons/bi'
import { SectionReveal, RevealItem } from './SectionReveal'
import ContactModel from '../scene/ContactModel'

export default function Contact({ showToast }) {
  const formRef = useRef()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current

    // Honeypot spam check
    if (form.company && form.company.value) return

    setLoading(true)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE || 'service_chl7279',
        import.meta.env.VITE_EMAILJS_TEMPLATE || 'template_3hzwpmg',
        form,
        import.meta.env.VITE_EMAILJS_KEY || 'eTl6eGjIuIEZNHmXY'
      )
      .then(() => {
        form.reset()
        showToast("Message sent! I'll reply within 24 hours ✓", 'success')
      })
      .catch(() => {
        showToast('Failed to send. Please try again.', 'error')
      })
      .finally(() => setLoading(false))
  }

  return (
    <SectionReveal as="div">
      <section id="contact">
        <RevealItem>
          <p className="section-label center">Let's Connect</p>
          <h2 className="section-heading center">Get In Touch</h2>
          <p className="section-sub">
            Have a project idea, want to collaborate, or just say hello? I'd love to hear from you.
          </p>
        </RevealItem>

        <RevealItem>
          <div className="contact-3d-visual">
            <ContactModel />
          </div>
        </RevealItem>

        <RevealItem>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's build something<br /><span className="gradient-text">incredible</span> together.</h3>
              <p>
                Whether you need a full-stack web application, an AI-powered platform,
                or a stunning portfolio — I'm ready to bring your vision to life.
              </p>
              <div className="contact-links">
                <a href="mailto:rohitbusiness9115@gmail.com" className="contact-link">
                  <span className="contact-link-icon"><BiEnvelope /></span>
                  <div className="contact-link-text">
                    <span>Email</span>
                    <strong>rohitbusiness9115@gmail.com</strong>
                  </div>
                </a>
                <a href="https://github.com/RohitMane2005" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-link-icon"><BiLogoGithub /></span>
                  <div className="contact-link-text">
                    <span>GitHub</span>
                    <strong>RohitMane2005</strong>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/rohitmane2005/" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-link-icon"><BiLogoLinkedin /></span>
                  <div className="contact-link-text">
                    <span>LinkedIn</span>
                    <strong>Rohit Mane</strong>
                  </div>
                </a>
                <a href="https://leetcode.com/rohitmane2005" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-link-icon"><BiCode /></span>
                  <div className="contact-link-text">
                    <span>LeetCode</span>
                    <strong>rohitmane2005</strong>
                  </div>
                </a>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from_name">Name</label>
                  <input id="from_name" type="text" name="from_name" placeholder="Your name" required maxLength={100} />
                </div>
                <div className="form-group">
                  <label htmlFor="from_email">Email</label>
                  <input id="from_email" type="email" name="from_email" placeholder="you@example.com" required maxLength={150} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" type="text" name="subject" placeholder="What's this about?" maxLength={200} />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell me about your project..." required maxLength={2000} />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Send Message'}
              </button>
            </form>
          </div>
        </RevealItem>
      </section>
    </SectionReveal>
  )
}
