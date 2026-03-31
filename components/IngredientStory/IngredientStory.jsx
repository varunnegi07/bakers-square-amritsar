'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storySections } from '@/data/content'
import styles from './IngredientStory.module.css'

gsap.registerPlugin(ScrollTrigger)

const ingredients = [
  { emoji: '🌾', name: 'Premium Wheat', desc: 'Golden grains from Punjab fields', x: '10%', y: '20%' },
  { emoji: '🥛', name: 'Fresh Milk', desc: 'Creamy goodness daily', x: '85%', y: '15%' },
  { emoji: '🍫', name: 'Dark Chocolate', desc: 'Rich Belgian cocoa', x: '15%', y: '70%' },
  { emoji: '🍯', name: 'Pure Honey', desc: 'Natural sweetness', x: '80%', y: '65%' },
  { emoji: '🥚', name: 'Farm Eggs', desc: 'Fresh from local farms', x: '50%', y: '85%' },
]

export default function IngredientStory() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

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

    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(item,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          }
        }
      )
    })

  }, [])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.backgroundElements}>
        {ingredients.map((ing, i) => (
          <div 
            key={i} 
            className={styles.floatingElement}
            style={{ left: ing.x, top: ing.y }}
          >
            <span className={styles.elementEmoji}>{ing.emoji}</span>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h2 ref={(el) => el && (el.className = styles.title)} className={styles.title}>
          The Journey Begins
        </h2>
        
        <p className={styles.subtitle}>
          From the finest ingredients to your table
        </p>

        <div className={styles.storyGrid}>
          {storySections.map((story, i) => (
            <div 
              key={story.id} 
              ref={el => itemsRef.current[i] = el}
              className={styles.storyCard}
            >
              <span className={styles.cardEmoji}>{story.emoji}</span>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <div className={styles.cardNumber}>0{story.id}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
