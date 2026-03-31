'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { iceCreamFlavors } from '@/data/content'
import styles from './FlavorShowcase.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function FlavorShowcase() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

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

    if (gridRef.current) {
      const cards = gridRef.current.children
      gsap.fromTo(cards,
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
          }
        }
      )
    }

  }, [])

  return (
    <section id="flavors" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Ice Cream <span className={styles.highlight}>Paradise</span>
        </h2>
        
        <p className={styles.subtitle}>
          11 heavenly flavors, crafted with love
        </p>

        <div ref={gridRef} className={styles.grid}>
          {iceCreamFlavors.map((flavor, i) => (
            <div 
              key={flavor.id} 
              className={styles.card}
              style={{ '--delay': `${i * 0.05}s` }}
            >
              <div 
                className={styles.colorDot}
                style={{ background: flavor.color }}
              />
              <h3 className={styles.flavorName}>{flavor.name}</h3>
              <p className={styles.flavorDesc}>{flavor.description}</p>
              <span className={styles.cardIndex}>0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
