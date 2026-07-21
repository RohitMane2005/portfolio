import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import IndustriesPage from './pages/IndustriesPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoadingScreen />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:categoryId/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Fallback to home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
