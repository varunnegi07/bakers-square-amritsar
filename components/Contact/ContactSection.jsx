'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ContactSection.module.css'
import { businessInfo, sectionHeadings } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    date: ''
  })

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

    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          }
        }
      )
    }

  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = `Hi Baker's Square, I'm ${formData.name}. Phone: ${formData.phone}. ${formData.message}. Date: ${formData.date}`
    const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <span className={styles.subtitle}>{sectionHeadings.contact.subtitle}</span>
        <h2 className={styles.title}>{sectionHeadings.contact.title}</h2>
      </div>

      <div ref={formRef} className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your number"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Order Details</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your order..."
              rows={4}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send via WhatsApp →
          </button>
        </form>

        <div className={styles.quickActions}>
          <a href={`tel:${businessInfo.phone}`} className={styles.actionBtn}>
            <span>📞</span>
            Call Now
          </a>
          <a href={`https://wa.me/${businessInfo.whatsapp}`} className={styles.actionBtn}>
            <span>💬</span>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
