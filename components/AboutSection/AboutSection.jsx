'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { businessInfo } from '@/data/content'
import styles from './AboutSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    
    gsap.fromTo(`.${styles.title}`,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    )

    gsap.fromTo(`.${styles.text}`,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
        }
      }
    )

  }, [])

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <div className={styles.badge}>Since 2015</div>
        
        <h2 className={styles.title}>
          Indulge in <span className={styles.highlight}>Heavenly Delights</span>
        </h2>
        
        <div className={styles.text}>
          <p>
            At Baker&apos;s Square, we believe every treat is a masterpiece. 
            From our humble beginnings in Amritsar to becoming the city&apos;s 
            favorite bakery, we&apos;ve been crafting sweet memories for 
            thousands of families.
          </p>
          <p>
            Every cake tells a story, every scoop brings joy, and every 
            bite is a moment of pure bliss. Welcome to our world of 
            freshly baked happiness.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10+</span>
            <span className={styles.statLabel}>Years</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50K+</span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Products</span>
          </div>
        </div>
      </div>
    </section>
  )
}
