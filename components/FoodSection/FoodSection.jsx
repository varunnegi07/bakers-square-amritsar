'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { foodItems } from '@/data/content'
import styles from './FoodSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function FoodSection() {
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

    const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`)
    if (cards) {
      gsap.fromTo(cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
          }
        }
      )
    }

  }, [])

  return (
    <section id="menu" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          More Than Just <span className={styles.highlight}>Sweets</span>
        </h2>
        
        <p className={styles.subtitle}>
          Delicious bites & refreshing drinks
        </p>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              <span>🍔</span> Savory
            </h3>
            <div className={styles.cardGrid}>
              {foodItems.snacks.map((item, i) => (
                <div key={i} className={styles.card}>
                  <span className={styles.emoji}>{item.emoji}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>
              <span>🥛</span> Beverages
            </h3>
            <div className={styles.cardGrid}>
              {foodItems.beverages.map((item, i) => (
                <div key={i} className={styles.card}>
                  <span className={styles.emoji}>{item.emoji}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
