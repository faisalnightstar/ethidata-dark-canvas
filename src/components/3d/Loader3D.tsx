/* eslint-disable @typescript-eslint/no-namespace */
// @ts-nocheck - React Three Fiber JSX elements are not recognized by TypeScript
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Extend Three.js elements for R3F
import '@react-three/fiber';

interface AnimatedSphereProps {
  progress: number;
}

function AnimatedSphere({ progress }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      
      // Scale based on progress
      const scale = 1 + (progress / 100) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });
  
  // Dynamic color based on progress
  const color = new THREE.Color().setHSL(0.52 + (progress / 100) * 0.1, 1, 0.5);
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4 - (progress / 100) * 0.2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2 + (progress / 100) * 0.3}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00E6FB"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

interface Loader3DProps {
  onComplete?: () => void;
  duration?: number;
}

export function Loader3D({ onComplete, duration = 2500 }: Loader3DProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  
  useEffect(() => {
    // Animate progress
    gsap.to(progressRef.current, {
      value: 100,
      duration: duration / 1000,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressRef.current.value));
      },
      onComplete: () => {
        setIsComplete(true);
        
        // Fade out animation
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              onComplete?.();
            }
          });
        }
      }
    });
  }, [duration, onComplete]);
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00E6FB" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FF9F" />
          
          <AnimatedSphere progress={progress} />
          <ParticleField />
          
          <Environment preset="night" />
        </Canvas>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="relative h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))'
            }}
          />
        </div>
        
        <span className="text-mono text-body-sm text-muted-foreground">
          {progress}%
        </span>
        
        <span className="text-display-lg gradient-text">
          EDT
        </span>
      </div>
    </div>
  );
}

export default Loader3D;