'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Preloader.module.css'

const bakeryItems = ['🍰', '🎂', '🧁', '🍩', '🍪', '🥐', '🥨', '🍮', '🍦', '🍫']

export default function Preloader({ onComplete }) {
  const [visibleItems, setVisibleItems] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < bakeryItems.length) {
        setVisibleItems(prev => [...prev, bakeryItems[currentIndex]])
        setCurrentIndex(prev => prev + 1)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 800)
        }, 500)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [currentIndex, onComplete])

  useEffect(() => {
    if (isComplete && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut'
      })
    }
  }, [isComplete])

  return (
    <div ref={containerRef} className={styles.preloader}>
      <div className={styles.logoGrid}>
        {visibleItems.map((item, index) => (
          <div 
            key={index} 
            className={styles.logoItem}
            style={{ 
              '--index': index,
              '--delay': `${index * 0.1}s`
            }}
          >
            <span className={styles.logoEmoji}>{item}</span>
          </div>
        ))}
      </div>
      <div className={styles.loadingBar}>
        <div 
          className={styles.loadingProgress}
          style={{ width: `${(currentIndex / bakeryItems.length) * 100}%` }}
        />
      </div>
      <p className={styles.loadingText}>
        Loading sweet treats...
      </p>
    </div>
  )
}
