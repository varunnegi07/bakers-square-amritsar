'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HeroContent.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function HeroContent() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    const titleChars = titleRef.current?.querySelectorAll('.char')
    const subtitleWords = subtitleRef.current?.querySelectorAll('.word')

    if (titleChars) {
      gsap.set(titleChars, { opacity: 0, y: 100 })
      tl.to(titleChars, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out'
      })
    }

    if (subtitleWords) {
      gsap.set(subtitleWords, { opacity: 0, y: 30 })
      tl.to(subtitleWords, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.5')
    }

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: -100,
      opacity: 0
    })

  }, [])

  const splitText = (text) => {
    return text.split('').map((char, i) => (
      char === ' ' ? <span key={i} className="char"> </span> : <span key={i} className="char">{char}</span>
    ))
  }

  const splitWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word">{word} </span>
    ))
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {splitText("Baker's Square")}
        </h1>
        
        <p ref={subtitleRef} className={styles.subtitle}>
          {splitWords("Indulge in heavenly delights where every treat is a masterpiece • Amritsar")}
        </p>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </div>
  )
}
