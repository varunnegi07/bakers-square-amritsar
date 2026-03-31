'use client'

import styles from './Footer.module.css'
import { businessInfo } from '@/data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h3>Baker&apos;s Square</h3>
          <p>Amritsar&apos;s premier bakery & dessert destination</p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Contact</h4>
            <a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a>
            <a href={`https://wa.me/${businessInfo.whatsapp}`}>WhatsApp</a>
          </div>

          <div className={styles.linkGroup}>
            <h4>Visit</h4>
            <p>{businessInfo.address}</p>
          </div>

          <div className={styles.linkGroup}>
            <h4>Hours</h4>
            <p>{businessInfo.openingHours}</p>
          </div>
        </div>

        <div className={styles.social}>
          <a href="#" className={styles.socialLink}>Instagram</a>
          <a href="#" className={styles.socialLink}>Facebook</a>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {currentYear} Baker&apos;s Square Amritsar. All rights reserved.</p>
          <p className={styles.madeWith}>Made with ❤️ in Amritsar</p>
        </div>
      </div>
    </footer>
  )
}
