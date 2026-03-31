'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './TextReveal.module.css'
import { sectionHeadings, businessInfo, storyMilestones } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

const revealTexts = [
  { text: "Welcome to", type: "intro" },
  { text: "Baker's Square", type: "brand" },
  { text: "Where every", type: "intro" },
  { text: "sweet moment", type: "highlight" },
  { text: "becomes a", type: "intro" },
  { text: "memory", type: "highlight" },
]

const featureTexts = [
  { text: "Premium", sub: "Ingredients" },
  { text: "Handcrafted", sub: "with Love" },
  { text: "Amritsar's", sub: "Favorite" },
  { text: "Since", sub: "2015" }
]

export default function TextReveal() {
  const sectionRef = useRef(null)
  const textsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    textsRef.current.forEach((textEl, i) => {
      if (!textEl) return

      gsap.fromTo(textEl, 
        { 
          y: 100, 
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textEl,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      )
    })

  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.revealText}>
          {revealTexts.map((item, i) => (
            <div 
              key={i} 
              ref={el => textsRef.current[i] = el}
              className={`${styles.textBlock} ${styles[item.type]}`}
            >
              {item.text}
            </div>
          ))}
        </div>

        <div className={styles.features}>
          {featureTexts.map((item, i) => (
            <div 
              key={i} 
              className={styles.featureItem}
              style={{ '--i': i }}
            >
              <span className={styles.featureText}>{item.text}</span>
              <span className={styles.featureSub}>{item.sub}</span>
            </div>
          ))}
        </div>

        <div className={styles.milestones}>
          <h3 className={styles.milestonesTitle}>Our Journey</h3>
          {storyMilestones.map((milestone, i) => (
            <div 
              key={milestone.id} 
              className={styles.milestone}
              ref={el => textsRef.current[revealTexts.length + i] = el}
            >
              <span className={styles.milestoneNum}>0{i + 1}</span>
              <div className={styles.milestoneContent}>
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="#contact" className={styles.ctaLink}>
            Order Now →
          </a>
        </div>

      </div>
    </section>
  )
}
