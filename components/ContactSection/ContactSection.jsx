'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { businessInfo } from '@/data/content'
import styles from './ContactSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

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

    gsap.fromTo(`.${styles.infoCard}`,
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

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Hi Baker's Square, I'm ${formData.name}. Phone: ${formData.phone}. ${formData.message}`
    const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Visit <span className={styles.highlight}>Us</span>
        </h2>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <h4>Address</h4>
                <p>{businessInfo.address}</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <h4>Phone</h4>
                <p><a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a></p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <span className={styles.infoIcon}>🕐</span>
              <div>
                <h4>Hours</h4>
                <p>Open Daily: {businessInfo.openingHours}</p>
              </div>
            </div>

            <a 
              href={businessInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}
            >
              Get Directions →
            </a>
          </div>

          <div className={styles.formWrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3>Order Now</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <textarea
                placeholder="Your Order / Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                Send via WhatsApp 💬
              </button>
            </form>

            <div className={styles.quickActions}>
              <a href={`tel:${businessInfo.phone}`} className={styles.actionBtn}>
                📞 Call Now
              </a>
              <a href={`https://wa.me/${businessInfo.whatsapp}`} className={`${styles.actionBtn} ${styles.whatsapp}`}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Baker&apos;s Square Amritsar. All rights reserved.</p>
        </footer>
      </div>
    </section>
  )
}
