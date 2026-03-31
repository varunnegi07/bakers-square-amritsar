'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '@/components/Hero/Hero'
import IngredientStory from '@/components/IngredientStory/IngredientStory'
import FlavorShowcase from '@/components/FlavorShowcase/FlavorShowcase'
import FoodSection from '@/components/FoodSection/FoodSection'
import AboutSection from '@/components/AboutSection/AboutSection'
import ContactSection from '@/components/ContactSection/ContactSection'
import FloatingNav from '@/components/FloatingNav/FloatingNav'
import Preloader from '@/components/Preloader/Preloader'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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
      
      <main ref={mainRef} className={`${!isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <FloatingNav />
        <Hero />
        <IngredientStory />
        <FlavorShowcase />
        <FoodSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}
