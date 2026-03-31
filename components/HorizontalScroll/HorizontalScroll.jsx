'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HorizontalScroll.module.css'
import { iceCreamFlavors, signatureCakes, foodAndDrink } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

const totalSections = 4

export default function HorizontalScroll() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current

    if (!section || !container) return

    const getScrollAmount = () => -(container.scrollWidth - window.innerWidth)

    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${container.scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const sectionIndex = Math.floor(progress * totalSections)
          setActiveSection(Math.min(sectionIndex, totalSections - 1))
        }
      }
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={containerRef} className={styles.container}>
        
        <div className={styles.panel}>
          <div className={styles.panelContent}>
            <span className={styles.panelNumber}>01</span>
            <h2 className={styles.panelTitle}>Ice Creams</h2>
            <p className={styles.panelDesc}>13 heavenly flavors crafted with love</p>
            <div className={styles.flavorsList}>
              {iceCreamFlavors.slice(0, 6).map((flavor, i) => (
                <div key={flavor.id} className={styles.flavorItem} style={{ '--i': i }}>
                  <span className={styles.flavorDot} style={{ background: flavor.color }}></span>
                  <span>{flavor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelContent}>
            <span className={styles.panelNumber}>02</span>
            <h2 className={styles.panelTitle}>Cakes</h2>
            <p className={styles.panelDesc}>Every celebration deserves a masterpiece</p>
            <div className={styles.cakesGrid}>
              {signatureCakes.map((cake, i) => (
                <div key={cake.id} className={styles.cakeCard} style={{ '--i': i }}>
                  <span className={styles.cakeEmoji}>🎂</span>
                  <span className={styles.cakeName}>{cake.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelContent}>
            <span className={styles.panelNumber}>03</span>
            <h2 className={styles.panelTitle}>Food & Drinks</h2>
            <p className={styles.panelDesc}>Savor every bite, sip every moment</p>
            <div className={styles.foodList}>
              <div className={styles.foodColumn}>
                <h4>Savory</h4>
                {foodAndDrink.snacks.map((item, i) => (
                  <div key={i} className={styles.foodItem}>{item.name}</div>
                ))}
              </div>
              <div className={styles.foodColumn}>
                <h4>Drinks</h4>
                {foodAndDrink.beverages.map((item, i) => (
                  <div key={i} className={styles.foodItem}>{item.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelContent}>
            <span className={styles.panelNumber}>04</span>
            <h2 className={styles.panelTitle}>The Vibe</h2>
            <p className={styles.panelDesc}>Where sweetness meets hospitality</p>
            <div className={styles.vibeGrid}>
              <div className={styles.vibeCard} style={{ '--i': 0 }}>🍰</div>
              <div className={styles.vibeCard} style={{ '--i': 1 }}>☕</div>
              <div className={styles.vibeCard} style={{ '--i': 2 }}>🎂</div>
              <div className={styles.vibeCard} style={{ '--i': 3 }}>🧁</div>
              <div className={styles.vibeCard} style={{ '--i': 4 }}>🍪</div>
              <div className={styles.vibeCard} style={{ '--i': 5 }}>🍩</div>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.progressBar}>
        {[...Array(totalSections)].map((_, i) => (
          <div 
            key={i} 
            className={`${styles.progressDot} ${i === activeSection ? styles.active : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
