import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

// Import components
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Research from './components/Research/Research'
import Publications from './components/Publications/Publications'
import Projects from './components/Projects/Projects'
import Awards from './components/Awards/Awards'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

// Register GSAP plugins - THIS IS THE ONLY PLACE WHERE WE REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reduce loading time for mobile devices
    const isMobile = window.innerWidth <= 768
    const loadingTime = isMobile ? 1000 : 2000 // Shorter loading time for mobile

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    // Initialize ScrollTrigger with better mobile support
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true, // Better mobile performance
      limitCallbacks: true,
      syncInterval: 200,
    })

    // Immediately refresh once to ensure proper initial positions
    setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 100)

    // Add style tag to ensure proper initial visibility of elements
    const styleTag = document.createElement('style')
    styleTag.innerHTML = `
      .hero-greeting, .hero-name, .hero-title, 
      .hero-description, .hero-stats, .cta-buttons, 
      .image-container, .floating-element, .scroll-indicator,
      .research-item, .publication-item, .project-card, .about-text {
        opacity: 1 !important;
        transform: none !important;
        visibility: visible !important;
      }
    `
    document.head.appendChild(styleTag)

    // Fix for scrollbar issues - force recalculation on resize and after animations
    const handleResize = () => {
      document.body.style.width = '100%'
      // Force layout recalculation
      window.requestAnimationFrame(() => {
        window.scrollTo(window.scrollX, window.scrollY)
        // Refresh ScrollTrigger to recalculate layouts
        ScrollTrigger.refresh()
      })
    }

    window.addEventListener('resize', handleResize)

    // Periodically refresh layout during initial load
    const refreshInterval = setInterval(() => {
      ScrollTrigger.refresh()
    }, 500)

    // Clear interval after 5 seconds
    setTimeout(() => {
      clearInterval(refreshInterval)
    }, 5000)

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'

    // Force GSAP to recalculate on load to prevent layout issues
    ScrollTrigger.refresh(true)

    // Fix for intermittent scrollbar issue - check width periodically
    const fixScroll = () => {
      const docWidth = document.documentElement.offsetWidth
      const winWidth = window.innerWidth
      if (docWidth > winWidth) {
        // If document is wider than window, force clip
        document.body.style.overflowX = 'clip'
        document.documentElement.style.overflowX = 'clip'
      }
    }

    // Run fix on load and resize
    fixScroll()
    window.addEventListener('resize', fixScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', fixScroll)
      document.documentElement.style.scrollBehavior = ''
      clearInterval(refreshInterval)
      document.head.removeChild(styleTag)
    }
  }, [])

  return (
    <div className="app-container">
      {isLoading ? (
        <div className="loading-screen">
          <div className="robot-loader">
            <div className="robot-head"></div>
            <div className="robot-body">
              <div className="robot-arm left"></div>
              <div className="robot-arm right"></div>
            </div>
          </div>
          <p className="loading-text">Initializing...</p>
        </div>
      ) : (
        <div className="content-wrapper" style={{ overflowX: 'clip', width: '100%' }}>
          <div className="viewport-constraint" style={{ width: '100%', maxWidth: '100vw', overflow: 'clip' }}>
            <div className="shape-decoration shape-decoration-1"></div>
            <div className="shape-decoration shape-decoration-2"></div>

            <Navbar />
            {/* ThemeToggle removed from here */}
            <main>
              <Hero />
              <About />
              <Research />
              <Publications />
              <Projects />
              <Awards />
              <Contact />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
