'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { businessInfo, floatingElements } from '@/data/content'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

function FloatingBakeryItem({ emoji, index }) {
  const groupRef = useRef()
  const [position] = useState(() => ({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 4 - 2
  }))
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.5
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.2
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2 + index) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[position.x, position.y, position.z]}>
        <Text scale={0.4} fontSize={1} color="#D4A574" anchorX="center" anchorY="middle">
          {emoji}
        </Text>
      </group>
    </Float>
  )
}

function CakeModel() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} scale={0.6}>
        {/* Base tier - chocolate */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[1.4, 1.5, 0.6, 32]} />
          <meshStandardMaterial color="#5D3A1A" roughness={0.3} />
        </mesh>
        
        {/* Second tier - vanilla */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[1.1, 1.3, 0.5, 32]} />
          <meshStandardMaterial color="#F5DEB3" roughness={0.3} />
        </mesh>
        
        {/* Third tier - pink */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.85, 1.1, 0.45, 32]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.3} />
        </mesh>
        
        {/* Top tier - white */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.6, 0.85, 0.4, 32]} />
          <meshStandardMaterial color="#FFF5EE" roughness={0.3} />
        </mesh>
        
        {/* Cherry on top */}
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#DC143C" roughness={0.3} />
        </mesh>
        
        {/* Candles */}
        {[0.3, -0.25, 0.1].map((x, i) => (
          <mesh key={i} position={[x, 0.75, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
            <meshStandardMaterial color="#FF6B6B" />
          </mesh>
        ))}
        
        {/* Gold decorations */}
        {[-0.7, 0, 0.7].map((x, i) => (
          <mesh key={i} position={[x, -0.55, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.05, 0.02, 8, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#FFD93D" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#FFB6C1" />
      
      <CakeModel />
      
      {floatingElements.slice(0, 8).map((emoji, i) => (
        <FloatingBakeryItem key={i} emoji={emoji} index={i} />
      ))}
      
      <fog attach="fog" args={['#000000', 5, 15]} />
    </>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(taglineRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

  }, [])

  return (
    <section id="home" ref={containerRef} className={styles.hero}>
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>
      
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {businessInfo.name}
        </h1>
        
        <p ref={taglineRef} className={styles.tagline}>
          {businessInfo.tagline}
        </p>
        
        <div ref={ctaRef} className={styles.cta}>
          <a href="#flavors" className={styles.primaryBtn}>
            Explore Flavors
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Order Now
          </a>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  )
}
