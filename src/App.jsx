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
import Education from './components/Education/Education'
import Collaborations from './components/Collaborations/Collaborations'

// Import device detection utilities
import { getAnimationSettings, applyDeviceClasses } from './utils/deviceDetection'

// Import motion provider
import { MotionProvider } from './contexts/MotionContext'

// Register GSAP plugins - THIS IS THE ONLY PLACE WHERE WE REGISTER SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [animSettings, setAnimSettings] = useState(null)

  useEffect(() => {
    // Apply device-specific classes for CSS optimizations
    const cleanupDeviceClasses = applyDeviceClasses();

    // Configure GSAP based on device capabilities
    const settings = getAnimationSettings();
    setAnimSettings(settings);

    // Apply GSAP configuration based on device capabilities
    if (settings.disableAnimations) {
      // If animations are disabled, make all GSAP animations instant
      gsap.defaults({
        duration: 0.01,
        ease: "none"
      });

      // Disable ScrollTrigger for smoother experience
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
      });

      // Make sure all elements are visible without animations
      gsap.set("section *", { clearProps: "all" });
    }
    else if (settings.useSimplifiedAnimations) {
      // Use simplified animations for mobile/low-power devices
      gsap.defaults({
        duration: 0.5 * settings.durationMultiplier,
        ease: settings.easingFunction,
        overwrite: "auto"
      });

      ScrollTrigger.config({
        ignoreMobileResize: true,
        // Use less frequent refresh on mobile
        refreshInterval: 200,
        // Add tolerance for smoother operation
        tolerance: 10
      });

      // Make text always visible on mobile regardless of animation state
      gsap.set(".section-title, .section-subtitle, p, h1, h2, h3, h4, h5, h6", {
        autoAlpha: 1,
        opacity: 1,
        visibility: "visible"
      });
    } else {
      // Desktop with good performance - use full animations
      ScrollTrigger.config({
        ignoreMobileResize: false,
        refreshInterval: 100,
        tolerance: 5
      });
    }

    // Global navigation handler to ensure content visibility
    const handleNavigation = () => {
      // Force all sections except hero to be visible
      const sections = document.querySelectorAll('section:not(#hero):not(#home)');
      sections.forEach(section => {
        section.classList.add('force-visible');
        const elements = section.querySelectorAll('*');
        elements.forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
        });
      });

      // Refresh ScrollTrigger after navigation
      setTimeout(() => {
        if (ScrollTrigger) {
          ScrollTrigger.refresh();
        }

        // Remove force-visible class after refresh (excluding hero)
        setTimeout(() => {
          sections.forEach(section => {
            section.classList.remove('force-visible');
          });
        }, 500);
      }, 100);
    };

    // Listen for hash changes (navigation)
    window.addEventListener('hashchange', handleNavigation);

    // Handle initial load navigation
    if (window.location.hash) {
      setTimeout(handleNavigation, 1000);
    }

    // Adjust loading time for different devices
    const loadingTime = settings.isMobile || settings.isLowPowerDevice
      ? 1200  // Shorter loading time for mobile/low-power devices
      : 2000; // Normal loading time for desktop

    // Simulate loading delay with reduced time for mobile
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Ensure content is visible after loading
      setTimeout(handleNavigation, 100);
    }, loadingTime)

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
      window.removeEventListener('hashchange', handleNavigation)
      document.documentElement.style.scrollBehavior = ''
      clearInterval(refreshInterval)
      cleanupDeviceClasses();
    }
  }, [])

  return (
    <MotionProvider>
      <div className="app-container">
        {isLoading ? (
          <div className={`loading-screen ${animSettings?.isMobile ? 'is-mobile-device' : ''}`}>
            <div className="robot-loader">
              <div className="robot-head"></div>
              <div className="robot-body">
                <div className="robot-arm left"></div>
                <div className="robot-arm right"></div>
              </div>
            </div>
            <p className="loading-text">{animSettings?.isMobile ? 'Loading...' : 'Initializing...'}</p>
          </div>
        ) : (
          <div className="content-wrapper" style={{ overflowX: 'clip', width: '100%' }}>
            <div className="viewport-constraint" style={{ width: '100%', maxWidth: '100vw', overflow: 'clip' }}>
              <div className="shape-decoration shape-decoration-1"></div>
              <div className="shape-decoration shape-decoration-2"></div>

              <Navbar />
              {/* Pass animation settings as context to all components */}
              <main className={animSettings?.isMobile ? 'mobile-optimized' : ''}>
                <Hero />
                <About />
                <Research />
                <Collaborations />
                <Education />
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
    </MotionProvider>
  )
}

export default App
