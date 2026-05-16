import { useState, useCallback } from 'react'
import BackgroundCanvas from './scene/BackgroundCanvas'
import CustomCursor from './components/CustomCursor'
import ParticleTrail from './components/ParticleTrail'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'
import FloatingControls from './components/FloatingControls'
import EasterEgg from './components/EasterEgg'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TerminalIntro from './components/TerminalIntro'
import About from './components/About'
import SkillsOrbit from './components/SkillsOrbit'
import StatsSection from './components/StatsSection'
import Timeline from './components/Timeline'
import FeaturedProjects from './components/FeaturedProjects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Toast from './components/Toast'

export default function App() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ParticleTrail />
      <ScrollProgress />
      <FloatingControls />
      <EasterEgg />
      <BackgroundCanvas />
      <Navbar />
      <main>
        <Hero />
        <TerminalIntro />
        <div className="section-divider" />
        <About />
        <SkillsOrbit />
        <StatsSection />
        <div className="section-divider" />
        <Timeline />
        <div className="section-divider" />
        <FeaturedProjects />
        <div className="section-divider" />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  )
}
