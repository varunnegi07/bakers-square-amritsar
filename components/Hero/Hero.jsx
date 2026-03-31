'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'
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
  const secondTierRef = useRef()
  const topTierRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
    if (secondTierRef.current) {
      secondTierRef.current.rotation.y = -state.clock.elapsedTime * 0.1
    }
    if (topTierRef.current) {
      topTierRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.5} position={[0, -1.5, -1]}>
        <mesh position={[0, -1.8, 0]}>
          <cylinderGeometry args={[2.2, 2.4, 0.8, 64]} />
          <meshPhysicalMaterial 
            color="#8B4513"
            roughness={0.1}
            metalness={0.1}
            transmission={0.6}
            thickness={1.5}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1}
          />
        </mesh>
        
        <mesh position={[0, -1.4, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.3, 64]} />
          <meshPhysicalMaterial 
            color="#FFB6C1"
            roughness={0.05}
            metalness={0}
            transmission={0.9}
            thickness={0.5}
            ior={1.4}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        <group ref={secondTierRef}>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[1.5, 1.7, 0.8, 64]} />
            <meshPhysicalMaterial 
              color="#8B4513"
              roughness={0.1}
              metalness={0.1}
              transmission={0.6}
              thickness={1.5}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1}
            />
          </mesh>
          
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.3, 1.5, 0.3, 64]} />
            <meshPhysicalMaterial 
              color="#FFB6C1"
              roughness={0.05}
              metalness={0}
              transmission={0.9}
              thickness={0.5}
              ior={1.4}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={1.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
        
        <group ref={topTierRef}>
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.9, 1.1, 0.7, 64]} />
            <meshPhysicalMaterial 
              color="#8B4513"
              roughness={0.1}
              metalness={0.1}
              transmission={0.6}
              thickness={1.5}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1}
            />
          </mesh>
          
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.7, 0.9, 0.3, 64]} />
            <meshPhysicalMaterial 
              color="#FFB6C1"
              roughness={0.05}
              metalness={0}
              transmission={0.9}
              thickness={0.5}
              ior={1.4}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={1.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          <mesh position={[0, 1.85, 0]}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshPhysicalMaterial 
              color="#DC143C"
              roughness={0.1}
              metalness={0}
              transmission={0.7}
              thickness={0.3}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0}
              envMapIntensity={1}
            />
          </mesh>
        </group>
        
        {[-1.8, 0, 1.8].map((x, i) => (
          <mesh key={i} position={[x, -1.8, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshPhysicalMaterial 
              color="#FFD700"
              roughness={0.1}
              metalness={0.9}
              transmission={0.3}
              thickness={0.2}
              ior={2.4}
              clearcoat={1}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
        
        {[-1.0, 0, 1.0].map((x, i) => (
          <mesh key={i} position={[x, -0.4, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshPhysicalMaterial 
              color="#FFD700"
              roughness={0.1}
              metalness={0.9}
              transmission={0.3}
              thickness={0.2}
              ior={2.4}
              clearcoat={1}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
        
        {[-0.5, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 1.0, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial 
              color="#FFD700"
              roughness={0.1}
              metalness={0.9}
              transmission={0.3}
              thickness={0.2}
              ior={2.4}
              clearcoat={1}
              envMapIntensity={1.5}
            />
          </mesh>
        ))}
        
        <mesh position={[0, -2.2, 0]}>
          <cylinderGeometry args={[2.6, 2.6, 0.15, 64]} />
          <meshPhysicalMaterial 
            color="#654321"
            roughness={0.2}
            metalness={0.1}
            transmission={0.4}
            thickness={0.3}
            ior={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#FFD93D" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#FFB6C1" />
      <spotLight position={[0, 5, 0]} intensity={0.4} angle={0.5} penumbra={1} />
      <pointLight position={[-3, 0, 2]} intensity={0.3} color="#ffffff" />
      <pointLight position={[3, 0, 2]} intensity={0.3} color="#ffffff" />
      
      <CakeModel />
      
      {floatingElements.slice(0, 8).map((emoji, i) => (
        <FloatingBakeryItem key={i} emoji={emoji} index={i} />
      ))}
      
      <fog attach="fog" args={['#0a0a0a', 5, 20]} />
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
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }}>
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
