import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { SectionReveal, RevealItem } from './SectionReveal'

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
      .sendForm('service_chl7279', 'template_3hzwpmg', form, 'eTl6eGjIuIEZNHmXY')
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
    <SectionReveal id="contact" className="contact">
      <RevealItem>
        <p className="section-label center">Get In Touch</p>
        <h2 className="section-heading center">Ready to build your website?</h2>
        <p className="section-sub">Tell me about your business and I'll get back to you within 24 hours with a free quote.</p>
      </RevealItem>

      <RevealItem>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="form-row">
            <input type="text" name="from_name" placeholder="Your Name" required maxLength={100} />
            <input type="email" name="from_email" placeholder="Your Email" required maxLength={150} />
          </div>

          <input type="text" name="business_type" placeholder="Business Type (e.g. Restaurant, Clinic, Salon...)" maxLength={100} />

          <select name="budget" className="form-select" defaultValue="">
            <option value="" disabled>Estimated Budget</option>
            <option value="starter">₹4,999 – Starter</option>
            <option value="business">₹9,999 – Business</option>
            <option value="premium">₹15,000+ – Premium / Custom</option>
            <option value="discuss">Not sure, let's discuss</option>
          </select>

          <textarea name="message" placeholder="Tell me about your project — what pages do you need, any features, your deadline?" required maxLength={2000} />

          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Send Message'}
          </button>

          <p id="form-status" />
        </form>
      </RevealItem>
    </SectionReveal>
  )
}
