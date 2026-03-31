"use client";

import { useState, useEffect } from 'react';
import styles from './FloatingNav.module.css';
import { navLinks } from '../../data/content';

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.visible : ''}`}>
        <div className={styles.logo}>Baker&apos;s Square</div>
        
        <button 
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ''}`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${styles.mobileMenuBg} ${isOpen ? styles.visible : ''}`} onClick={() => setIsOpen(false)} />
    </>
  );
}
