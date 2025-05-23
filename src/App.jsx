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
// ThemeToggle removed from here as it's now in Navbar

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

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

    // Initialize ScrollTrigger with better settings
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
      ignoreMobileResize: false, // Allow refresh on mobile resize
      limitCallbacks: true, // Limit excessive callbacks
    })

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
