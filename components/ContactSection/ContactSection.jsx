"use client";

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { businessInfo } from '@/data/content';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

function FloatingElements() {
  const emojis = ['🍰', '🎂', '🧁', '🍩', '☕', '🧋'];
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {emojis.map((emoji, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Text
            position={[
              Math.cos((i / emojis.length) * Math.PI * 2) * 4,
              Math.sin(i * 1.5) * 0.5,
              Math.sin((i / emojis.length) * Math.PI * 2) * 4 - 5
            ]}
            fontSize={0.8}
            color="#F5DEB3"
            anchorX="center"
            anchorY="middle"
          >
            {emoji}
          </Text>
        </Float>
      ))}
    </group>
  );
}

function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#FFB6C1" />
      <pointLight position={[5, 0, 5]} intensity={0.5} color="#F5DEB3" />
      <FloatingElements />
      <fog attach="fog" args={['#0a0a0a', 5, 15]} />
    </>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(`.${styles.title}`,
      { y: 60, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

    gsap.fromTo(`.${styles.infoCard}`,
      { x: -50, opacity: 0, rotateY: -15 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
        }
      }
    );

    gsap.fromTo(formRef.current,
      { x: 50, opacity: 0, rotateY: 15 },
      {
        x: 0,
        opacity: 1,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
        }
      }
    );

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hi Baker's Square, I'm ${formData.name}. Phone: ${formData.phone}. ${formData.message}`;
    const whatsappUrl = `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ContactScene />
        </Canvas>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          Get In <span className={styles.highlight}>Touch</span>
        </h2>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={`${styles.infoCard} ${styles.card1}`}>
              <div className={styles.cardGlow}></div>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <h4>Visit Us</h4>
                <p>{businessInfo.address}</p>
              </div>
            </div>

            <div className={`${styles.infoCard} ${styles.card2}`}>
              <div className={styles.cardGlow}></div>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <h4>Call Us</h4>
                <p><a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a></p>
              </div>
            </div>

            <div className={`${styles.infoCard} ${styles.card3}`}>
              <div className={styles.cardGlow}></div>
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
              <span>Open in Maps</span>
              <span className={styles.arrow}>→</span>
            </a>
          </div>

          <div ref={formRef} className={styles.formWrapper}>
            <div className={styles.formGlass}>
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <span className={styles.inputLine}></span>
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  <span className={styles.inputLine}></span>
                </div>
                <div className={styles.inputGroup}>
                  <textarea
                    placeholder="Your Order / Message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                  <span className={styles.inputLine}></span>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  <span>Send via WhatsApp</span>
                  <span className={styles.btnIcon}>💬</span>
                </button>
              </form>
            </div>

            <div className={styles.quickActions}>
              <a href={`tel:${businessInfo.phone}`} className={styles.actionBtn}>
                <span>📞</span> Call Now
              </a>
              <a href={`https://wa.me/${businessInfo.whatsapp}`} className={`${styles.actionBtn} ${styles.whatsapp}`}>
                <span>💬</span> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
