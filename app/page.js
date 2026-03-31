'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './page.module.css'

import HeroContent from '@/components/Hero/HeroContent'
import Preloader from '@/components/Preloader/Preloader'
import FloatingCake from '@/components/FloatingCake/FloatingCake'
import HorizontalScroll from '@/components/HorizontalScroll/HorizontalScroll'
import TextReveal from '@/components/TextReveal/TextReveal'
import LocationSection from '@/components/Location/LocationSection'
import ContactSection from '@/components/Contact/ContactSection'
import Footer from '@/components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <main ref={mainRef} className={`${styles.main} ${!isLoading ? styles.mainLoaded : ''}`}>
        <FloatingCake />
        
        <section className={styles.heroSection}>
          <HeroContent />
        </section>

        <HorizontalScroll />
        <TextReveal />
        <LocationSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
