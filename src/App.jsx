import { useState, useCallback } from 'react'
import BackgroundCanvas from './scene/BackgroundCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import DevProjects from './components/DevProjects'
import Resources from './components/Resources'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Toast from './components/Toast'
import PreviewModal from './components/PreviewModal'

export default function App() {
  const [toast, setToast] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  return (
    <>
      <BackgroundCanvas />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Projects onPreview={setPreviewUrl} />
        <Process />
        <Testimonials />
        <Pricing />
        <DevProjects onPreview={setPreviewUrl} />
        <Resources />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
      {previewUrl && <PreviewModal url={previewUrl} onClose={() => setPreviewUrl(null)} />}
    </>
  )
}
