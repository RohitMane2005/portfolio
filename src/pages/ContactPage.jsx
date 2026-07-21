import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import Toast from '../components/Toast'

export default function ContactPage() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  return (
    <main>
      <section className="page-hero page-hero--compact">
        <div className="page-hero-content">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.p>
          <motion.h1
            className="page-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Build Something <span className="accent-text">Great Together</span>
          </motion.h1>
          <motion.p
            className="page-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tell us about your project and we'll get back to you within 24 hours with a free consultation.
          </motion.p>
        </div>
      </section>
      <Contact showToast={showToast} />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </main>
  )
}
