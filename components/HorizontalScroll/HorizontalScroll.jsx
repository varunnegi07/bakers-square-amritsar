'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HorizontalScroll.module.css'
import { iceCreamFlavors, signatureCakes, foodAndDrink, vibesEmojis } from '@/data/content'

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
            <div className={styles.textList}>
              {iceCreamFlavors.map((flavor, i) => (
                <div key={flavor.id} className={styles.textItem} style={{ '--i': i }}>
                  <span className={styles.textName}>{flavor.name}</span>
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
            <div className={styles.textList}>
              {signatureCakes.map((cake, i) => (
                <div key={cake.id} className={styles.textItem} style={{ '--i': i }}>
                  <span className={styles.textName}>{cake.name}</span>
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
            <div className={styles.foodColumns}>
              <div className={styles.foodColumn}>
                <h4 className={styles.columnTitle}>Savory</h4>
                {foodAndDrink.snacks.map((item, i) => (
                  <div key={i} className={styles.textItem} style={{ '--i': i }}>
                    <span className={styles.textName}>{item.name}</span>
                  </div>
                ))}
              </div>
              <div className={styles.foodColumn}>
                <h4 className={styles.columnTitle}>Drinks</h4>
                {foodAndDrink.beverages.map((item, i) => (
                  <div key={i} className={styles.textItem} style={{ '--i': i }}>
                    <span className={styles.textName}>{item.name}</span>
                  </div>
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
            <div className={styles.vibeText}>
              <span>Fresh Baked</span>
              <span>Coffee & WiFi</span>
              <span>Cozy Seating</span>
              <span>Family Friendly</span>
              <span>Custom Orders</span>
              <span>Delivery Available</span>
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
