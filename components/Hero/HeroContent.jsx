'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HeroContent.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function HeroContent() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(titleRef.current, 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(subtitleRef.current, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -100,
      opacity: 0
    })

  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Baker&apos;s Square
        </h1>
        
        <p ref={subtitleRef} className={styles.subtitle}>
          Indulge in heavenly delights where every treat is a masterpiece.
          <br />
          Amritsar&apos;s finest bakery since 2015
        </p>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </div>
  )
}
