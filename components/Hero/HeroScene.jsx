'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function CupcakeModel() {
  const groupRef = useRef()
  const frostingRef = useRef()
  const sprinklesRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15
    }
    if (sprinklesRef.current) {
      sprinklesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.8}>
        {/* Cupcake liner */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.5, 0.4, 0.7, 32]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        
        {/* Cupcake wrapper */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.55, 0.5, 0.15, 32, 1, true]} />
          <meshStandardMaterial color="#D4A574" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Wrapper ridges */}
        {[...Array(12)].map((_, i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 6) * 0.525, 0.05, Math.sin(i * Math.PI / 6) * 0.525]} rotation={[0, i * Math.PI / 6, 0]}>
            <boxGeometry args={[0.02, 0.15, 0.08]} />
            <meshStandardMaterial color="#C49A6C" roughness={0.6} />
          </mesh>
        ))}
        
        {/* Frosting */}
        <mesh ref={frostingRef} position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Frosting swirl top */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.3} />
        </mesh>
        
        {/* Sprinkles */}
        <group ref={sprinklesRef}>
          {[
            { pos: [0.2, 0.5, 0.1], color: '#FFD93D' },
            { pos: [-0.15, 0.55, 0.2], color: '#77DD77' },
            { pos: [0.1, 0.6, -0.15], color: '#FF6B6B' },
            { pos: [-0.25, 0.45, -0.1], color: '#98D8C8' },
            { pos: [0.3, 0.4, 0], color: '#FFFFFF' },
            { pos: [0, 0.65, 0], color: '#FFB347' },
            { pos: [-0.1, 0.5, 0.3], color: '#D4A574' },
            { pos: [0.15, 0.35, 0.25], color: '#FF69B4' },
          ].map((sprinkle, i) => (
            <mesh key={i} position={sprinkle.pos} rotation={[Math.random(), Math.random(), Math.random()]}>
              <boxGeometry args={[0.08, 0.03, 0.03]} />
              <meshStandardMaterial color={sprinkle.color} />
            </mesh>
          ))}
        </group>
        
        {/* Cherry on top */}
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#DC143C" roughness={0.4} />
        </mesh>
        
        {/* Cherry stem */}
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </group>
    </Float>
  )
}

function AmbientParticles() {
  const particlesRef = useRef()
  const count = 30
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#D4A574" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GlowingOrbs() {
  const orbsRef = useRef()
  
  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.children.forEach((orb, i) => {
        orb.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.3
        orb.scale.setScalar(1 + Math.sin(state.clock.elapsedTime + i) * 0.1)
      })
    }
  })

  return (
    <group ref={orbsRef}>
      {[
        [-2.5, 1.5, -1, '#FF6B6B', 0.3],
        [2.5, -1, -0.5, '#FFD93D', 0.25],
        [-2, -2, 0, '#77DD77', 0.2],
        [2, 2, -1, '#D4A574', 0.35],
        [-1.5, 2.5, -0.5, '#FFB347', 0.22],
        [1.5, -2.5, 0, '#98D8C8', 0.28],
      ].map(([x, y, z, color, scale], i) => (
        <mesh key={i} position={[x, y, z]} scale={scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={color} transparent opacity={0.4} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#FFD93D" />
      <pointLight position={[0, 1, 4]} intensity={0.8} color="#FFB6C1" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#D4A574" />
      
      <CupcakeModel />
      <AmbientParticles />
      <GlowingOrbs />
      
      <fog attach="fog" args={['#000000', 5, 15]} />
    </>
  )
}
