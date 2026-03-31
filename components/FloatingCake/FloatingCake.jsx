'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FloatingCake.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function FloatingCake() {
  const containerRef = useRef(null)
  const cakeRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const cake = cakeRef.current

    if (!container || !cake) return

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress
        
        if (progress < 0.15) {
          gsap.to(cake, {
            scale: 1 - progress * 2,
            opacity: 1,
            x: 0,
            y: 0,
            rotation: progress * Math.PI * 2,
            duration: 0.3,
            ease: "power2.out"
          })
        } else {
          const edgeProgress = (progress - 0.15) / 0.85
          const side = edgeProgress % 2 < 1 ? 'right' : 'right'
          const xOffset = side === 'right' ? 45 : -45
          
          gsap.to(cake, {
            scale: 0.3 + edgeProgress * 0.15,
            opacity: 1,
            x: xOffset,
            y: -window.innerHeight * 0.35,
            rotation: progress * Math.PI * 8,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }
    })

  }, [])

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={cakeRef} className={styles.cakeWrapper}>
        <div className={styles.cake}>
          <div className={styles.tier} style={{ '--color': '#5D3A1A', height: '50px', width: '120px', bottom: '0' }}>
            <div className={styles.top} style={{ background: '#8B5A2B' }}></div>
          </div>
          <div className={styles.tier} style={{ '--color': '#F5DEB3', height: '45px', width: '95px', bottom: '50px' }}>
            <div className={styles.top} style={{ background: '#FFF8DC' }}></div>
          </div>
          <div className={styles.tier} style={{ '--color': '#FFB6C1', height: '40px', width: '70px', bottom: '95px' }}>
            <div className={styles.top} style={{ background: '#FFC0CB' }}></div>
          </div>
          <div className={styles.tier} style={{ '--color': '#FFF5EE', height: '35px', width: '50px', bottom: '135px' }}>
            <div className={styles.top} style={{ background: '#FFFFFF' }}></div>
          </div>
          <div className={styles.cherry}></div>
          <div className={styles.candle} style={{ left: '15px', bottom: '160px' }}>
            <div className={styles.flame}></div>
          </div>
          <div className={styles.candle} style={{ left: '35px', bottom: '165px' }}>
            <div className={styles.flame}></div>
          </div>
          <div className={styles.candle} style={{ left: '55px', bottom: '162px' }}>
            <div className={styles.flame}></div>
          </div>
          <div className={styles.plate}></div>
        </div>
      </div>
    </div>
  )
}
