'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HorizontalScroll.module.css'
import { iceCreamFlavors, signatureCakes, foodAndDrink, vibesImages } from '@/data/content'

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
            <div className={styles.flavorsGrid}>
              {iceCreamFlavors.slice(0, 6).map((flavor, i) => (
                <div key={flavor.id} className={styles.flavorCard} style={{ '--i': i }}>
                  <div className={styles.flavorImageWrapper}>
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className={styles.flavorImage}
                    />
                  </div>
                  <div className={styles.flavorInfo}>
                    <span className={styles.flavorDot} style={{ background: flavor.color }}></span>
                    <span className={styles.flavorName}>{flavor.name}</span>
                  </div>
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
                  <img 
                    src={cake.image} 
                    alt={cake.name}
                    className={styles.cakeImage}
                  />
                  <div className={styles.cakeInfo}>
                    <span className={styles.cakeName}>{cake.name}</span>
                    <span className={styles.cakeDesc}>{cake.description}</span>
                  </div>
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
            <div className={styles.foodLayout}>
              <div className={styles.foodImage}>
                <img 
                  src={foodAndDrink.images[0]} 
                  alt="Food and Drinks"
                  className={styles.mainFoodImage}
                />
              </div>
              <div className={styles.foodList}>
                <div className={styles.foodColumn}>
                  <h4>Savory</h4>
                  {foodAndDrink.snacks.map((item, i) => (
                    <div key={i} className={styles.foodItem}>
                      <span className={styles.foodEmoji}>{item.emoji}</span>
                      <div className={styles.foodItemContent}>
                        <span className={styles.foodItemName}>{item.name}</span>
                        <span className={styles.foodItemDesc}>{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.foodColumn}>
                  <h4>Drinks</h4>
                  {foodAndDrink.beverages.map((item, i) => (
                    <div key={i} className={styles.foodItem}>
                      <span className={styles.foodEmoji}>{item.emoji}</span>
                      <div className={styles.foodItemContent}>
                        <span className={styles.foodItemName}>{item.name}</span>
                        <span className={styles.foodItemDesc}>{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
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
              {vibesImages.slice(0, 6).map((img, i) => (
                <div key={i} className={styles.vibeCard} style={{ '--i': i }}>
                  <img src={img} alt={`Vibe ${i + 1}`} className={styles.vibeImage} />
                </div>
              ))}
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
