import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeTicker from './components/MarqueeTicker'
import TerminalIntro from './components/TerminalIntro'
import About from './components/About'
import SkillsOrbit from './components/SkillsOrbit'
import StatsSection from './components/StatsSection'
import Timeline from './components/Timeline'
import FeaturedProjects from './components/FeaturedProjects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Toast from './components/Toast'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <MarqueeTicker />
        <TerminalIntro />
        <About />
        <SkillsOrbit />
        <StatsSection />
        <Timeline />
        <FeaturedProjects />
        <Contact showToast={showToast} />
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  )
}
