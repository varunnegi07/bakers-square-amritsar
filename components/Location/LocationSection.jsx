'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './LocationSection.module.css'
import { businessInfo, sectionHeadings } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

export default function LocationSection() {
  const sectionRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    gsap.fromTo(`.${styles.title}`,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    )

    if (mapRef.current) {
      gsap.fromTo(mapRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          }
        }
      )
    }

  }, [])

  return (
    <section id="location" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>{sectionHeadings.location.subtitle}</span>
        <h2 className={styles.title}>{sectionHeadings.location.title}</h2>
      </div>

      <div className={styles.content}>
        <div ref={mapRef} className={styles.mapContainer}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapGrid}>
              {[...Array(25)].map((_, i) => (
                <div key={i} className={styles.gridCell}></div>
              ))}
            </div>
            <div className={styles.mapPin}>
              <span className={styles.pinIcon}>📍</span>
              <div className={styles.pinPulse}></div>
            </div>
            <div className={styles.mapLabel}>
              <span>Baker's Square</span>
              <small>Amritsar, Punjab</small>
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <div className={styles.infoContent}>
              <h3>Address</h3>
              <p>{businessInfo.address}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📞</div>
            <div className={styles.infoContent}>
              <h3>Phone</h3>
              <p><a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a></p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🕐</div>
            <div className={styles.infoContent}>
              <h3>Hours</h3>
              <p>{businessInfo.openingHours}</p>
            </div>
          </div>

          <a 
            href={businessInfo.googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.directionsBtn}
          >
            Get Directions ↗
          </a>
        </div>
      </div>
    </section>
  )
}
