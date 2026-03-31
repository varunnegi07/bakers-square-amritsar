'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function CakeTier({ radius, height, y, color, topColor }) {
  return (
    <group position={[0, y, 0]}>
      <mesh>
        <cylinderGeometry args={[radius, radius * 1.05, height, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, height / 2 + 0.02, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius, 0.05, 32]} />
        <meshStandardMaterial color={topColor} roughness={0.4} />
      </mesh>
    </group>
  )
}

function FrostingLayer({ radius, y, color }) {
  return (
    <mesh position={[0, y, 0]}>
      <torusGeometry args={[radius, 0.08, 16, 64]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  )
}

function Decoration({ position, color, scale = 1 }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial color={color} roughness={0.3} />
    </mesh>
  )
}

function Candle({ position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FFD93D" emissive="#FFD93D" emissiveIntensity={0.5} />
      </mesh>
      <pointLight position={[0, 0.3, 0]} intensity={0.3} color="#FFD93D" distance={1} />
    </group>
  )
}

function RealisticCake({ scrollProgress }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      const baseRotation = state.clock.elapsedTime * 0.15
      const scrollRotation = scrollProgress * Math.PI * 4
      groupRef.current.rotation.y = baseRotation + scrollRotation
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={0.7}>
        {/* Base tier - Chocolate */}
        <CakeTier radius={1.4} height={0.6} y={-0.9} color="#5D3A1A" topColor="#8B5A2B" />
        
        {/* Second tier - Vanilla */}
        <CakeTier radius={1.1} height={0.5} y={-0.35} color="#F5DEB3" topColor="#FFF8DC" />
        
        {/* Third tier - Pink */}
        <CakeTier radius={0.85} height={0.45} y={0.1} color="#FFB6C1" topColor="#FFC0CB" />
        
        {/* Top tier - White */}
        <CakeTier radius={0.6} height={0.4} y={0.5} color="#FFF5EE" topColor="#FFFFFF" />
        
        {/* Frosting layers */}
        <FrostingLayer radius={1.35} y={-0.55} color="#5D3A1A" />
        <FrostingLayer radius={1.05} y={-0.05} color="#FFB6C1" />
        <FrostingLayer radius={0.8} y={0.4} color="#FFF5EE" />
        
        {/* Cherry on top */}
        <group position={[0, 0.85, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#DC143C" roughness={0.3} />
          </mesh>
          <mesh position={[0.08, 0.15, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
        
        {/* Candles */}
        <Candle position={[0.3, 0.75, 0]} />
        <Candle position={[-0.25, 0.72, 0.15]} />
        <Candle position={[0.1, 0.78, -0.3]} />
        
        {/* Sprinkle decorations */}
        <Decoration position={[0.8, 0.55, 0.4]} color="#FF6B6B" />
        <Decoration position={[-0.7, 0.2, 0.5]} color="#FFD93D" />
        <Decoration position={[0.5, 0.15, -0.6]} color="#77DD77" />
        <Decoration position={[-0.9, -0.3, 0.3]} color="#98D8C8" />
        <Decoration position={[0.2, -0.5, 0.8]} color="#FFB347" />
        <Decoration position={[-0.5, -0.7, -0.4]} color="#D4A574" />
        <Decoration position={[0.7, -0.6, -0.3]} color="#FFFFFF" />
        <Decoration position={[-0.3, -0.4, 0.9]} color="#FF69B4" />
        
        {/* Gold rim decorations */}
        {[-0.7, 0, 0.7].map((x, i) => (
          <mesh key={i} position={[x, -0.55, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.05, 0.02, 8, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
        
        {/* Bottom plate */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.08, 64]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

function FloatingParticles() {
  const particlesRef = useRef()
  const count = 40
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
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
      <pointsMaterial size={0.04} color="#D4A574" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function GlowingOrbs() {
  const orbsRef = useRef()
  
  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.children.forEach((orb, i) => {
        orb.position.y = Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.3
      })
    }
  })

  return (
    <group ref={orbsRef}>
      {[
        [-3, 2, -1, '#FF6B6B', 0.35],
        [3, -1.5, -0.5, '#FFD93D', 0.3],
        [-2.5, -2.5, 0, '#77DD77', 0.25],
        [2.5, 2.5, -1, '#D4A574', 0.4],
        [-1.5, 3, -0.5, '#FFB347', 0.28],
        [1.5, -3, 0, '#98D8C8', 0.32],
      ].map(([x, y, z, color, scale], i) => (
        <mesh key={i} position={[x, y, z]} scale={scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={color} transparent opacity={0.35} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene({ scrollProgress = 0 }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#FFD93D" />
      <spotLight position={[0, 5, 5]} angle={0.4} penumbra={1} intensity={0.5} castShadow />
      <pointLight position={[0, 1, 4]} intensity={0.8} color="#FFB6C1" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#D4A574" />
      
      <RealisticCake scrollProgress={scrollProgress} />
      <FloatingParticles />
      <GlowingOrbs />
      
      <fog attach="fog" args={['#000000', 6, 18]} />
    </>
  )
}
