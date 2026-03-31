'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import styles from './Preloader.module.css'

function GiftBox({ isOpening, isOpen }) {
  const groupRef = useRef()
  const lidRef = useRef()
  const contentRef = useRef()
  
  useFrame((state) => {
    if (lidRef.current && isOpening) {
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        -Math.PI / 2,
        0.05
      )
    }
    
    if (contentRef.current && isOpening) {
      contentRef.current.position.y = THREE.MathUtils.lerp(
        contentRef.current.position.y,
        2,
        0.03
      )
    }
    
    if (groupRef.current && !isOpening) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Box bottom */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.2, 0.6, 1.2]} />
        <meshStandardMaterial color="#D4A574" roughness={0.4} />
      </mesh>
      
      {/* Box sides - darker */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.15, 0.1, 1.15]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
      
      {/* Content rising out */}
      <group ref={contentRef} position={[0, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.4, 0.5, 32]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
        </mesh>
        <mesh position={[0.15, 0.6, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>
      </group>
      
      {/* Lid */}
      <group ref={lidRef} position={[0, 0, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[1.25, 0.15, 1.25]} />
          <meshStandardMaterial color="#C49A6C" roughness={0.4} />
        </mesh>
        {/* Ribbon */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.15, 0.2, 1.3]} />
          <meshStandardMaterial color="#8B0000" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[1.3, 0.2, 0.15]} />
          <meshStandardMaterial color="#8B0000" roughness={0.5} />
        </mesh>
        {/* Bow */}
        <mesh position={[0, 0.5, 0]}>
          <torusGeometry args={[0.15, 0.05, 8, 16]} />
          <meshStandardMaterial color="#8B0000" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}

function FloatingElements() {
  const ref = useRef()
  const count = 20
  
  const positions = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 4,
      speed: 0.5 + Math.random() * 0.5
    }))
  )
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const p = positions.current[i]
        child.position.y = Math.sin(state.clock.elapsedTime * p.speed + i) * 0.3 + p.y * 0.5
        child.scale.setScalar(0.03 + Math.sin(state.clock.elapsedTime + i) * 0.01)
      })
    }
  })
  
  return (
    <group ref={ref}>
      {positions.current.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#D4A574" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function Preloader({ onComplete }) {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setIsOpening(true)
          setTimeout(() => {
            setIsOpen(true)
            setTimeout(() => {
              onComplete()
            }, 1000)
          }, 500)
          return 100
        }
        return p + 2
      })
    }, 30)
    
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`${styles.preloader} ${isOpen ? styles.hidden : ''}`}>
      <div className={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[0, 2, 2]} intensity={0.5} color="#FFB6C1" />
          
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
            <GiftBox isOpening={isOpening} isOpen={isOpen} />
          </Float>
          <FloatingElements />
          
          <fog attach="fog" args={['#000000', 3, 10]} />
        </Canvas>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>Baker&apos;s Square</h2>
        <p className={styles.subtitle}>Unwrapping sweetness...</p>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.percent}>{progress}%</p>
      </div>
    </div>
  )
}
