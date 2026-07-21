import { useState, useCallback } from 'react'
import Hero from '../components/Hero'
import MarqueeTicker from '../components/MarqueeTicker'
import TerminalIntro from '../components/TerminalIntro'
import About from '../components/About'
import SkillsOrbit from '../components/SkillsOrbit'
import StatsSection from '../components/StatsSection'
import Timeline from '../components/Timeline'
import FeaturedProjects from '../components/FeaturedProjects'
import Contact from '../components/Contact'
import Toast from '../components/Toast'
import ServicesPreview from '../components/ServicesPreview'
import IndustriesPreview from '../components/IndustriesPreview'

export default function Home() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  return (
    <>
      <Hero />
      <MarqueeTicker />
      <TerminalIntro />
      <About />
      <ServicesPreview />
      <IndustriesPreview />
      <SkillsOrbit />
      <StatsSection />
      <Timeline />
      <FeaturedProjects />
      <Contact showToast={showToast} />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  )
}
