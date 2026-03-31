"use client";

import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';
import { businessInfo } from '../../data/content';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => onComplete?.(), 600);
        }, 400);
      } else {
        setProgress(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`${styles.preloader} ${isLoaded ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.emoji}>🎂</div>
        <div className={styles.logo}>{businessInfo.name}</div>
        <div className={styles.tagline}>{businessInfo.tagline}</div>
        
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.percentage}>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
