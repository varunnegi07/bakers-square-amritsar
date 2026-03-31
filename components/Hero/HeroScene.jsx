'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function CakeModel() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={[0, 0, 0]} scale={0.8}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.3, 1.5, 0.7, 64]} />
          <meshStandardMaterial color="#8B4513" roughness={0.4} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.1, 1.3, 0.7, 64]} />
          <meshStandardMaterial color="#D4A574" roughness={0.3} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.9, 1.1, 0.6, 64]} />
          <meshStandardMaterial color="#F5DEB3" roughness={0.3} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
        </mesh>

        <mesh position={[0.7, 0.2, 0.4]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#228B22" roughness={0.5} />
        </mesh>
        <mesh position={[-0.6, 0.3, -0.3]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#FFD93D" roughness={0.5} />
        </mesh>
        <mesh position={[0.4, 0.4, -0.5]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.5} />
        </mesh>
        <mesh position={[-0.4, 0.25, 0.5]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
        </mesh>
        
        {[[-0.35, 1.1, 0], [0.35, 1.1, 0], [0, 1.2, 0.35], [0, 1.2, -0.35]].map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function FloatingParticles() {
  const particlesRef = useRef()
  const count = 80
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4A574"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function AmbientBubbles() {
  const bubblesRef = useRef()
  const count = 15
  
  const [positions, scales] = useMemo(() => {
    const pos = []
    const scl = []
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2
      ])
      scl.push(0.1 + Math.random() * 0.2)
    }
    return [pos, scl]
  }, [])

  useFrame((state) => {
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((bubble, i) => {
        bubble.position.y += 0.003
        if (bubble.position.y > 4) {
          bubble.position.y = -4
        }
        bubble.scale.setScalar(scales[i] * (1 + Math.sin(state.clock.elapsedTime + i) * 0.1))
      })
    }
  })

  return (
    <group ref={bubblesRef}>
      {positions.map((pos, i) => (
        <Sphere key={i} args={[1, 16, 16]} position={pos} scale={scales[i]}>
          <meshStandardMaterial 
            color="#D4A574" 
            transparent 
            opacity={0.3}
            roughness={0.1}
            metalness={0.2}
          />
        </Sphere>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#FFD93D" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#FF6B6B" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#D4A574" />
      
      <CakeModel />
      <FloatingParticles />
      <AmbientBubbles />
      
      <fog attach="fog" args={['#000000', 4, 12]} />
    </>
  )
}
