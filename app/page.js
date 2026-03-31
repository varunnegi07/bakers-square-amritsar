'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './page.module.css'

import HeroScene from '@/components/Hero/HeroScene'
import HeroContent from '@/components/Hero/HeroContent'
import Preloader from '@/components/Preloader/Preloader'
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
    <main ref={mainRef} className={styles.main}>
      <Preloader onComplete={handlePreloaderComplete} />
      
      <section className={styles.heroSection}>
        <div className={styles.heroCanvas}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <HeroScene />
          </Canvas>
        </div>
        <HeroContent />
      </section>

      <HorizontalScroll />
      <TextReveal />
      <LocationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
