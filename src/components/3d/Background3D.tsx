/* eslint-disable @typescript-eslint/no-namespace */
// @ts-nocheck - React Three Fiber JSX elements are not recognized by TypeScript
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js elements for R3F
import '@react-three/fiber';

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.1 + Math.random() * 0.3,
      type: Math.floor(Math.random() * 3)
    }));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });
  
  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} index={i} />
      ))}
    </group>
  );
}

interface FloatingShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  type: number;
  index: number;
}

function FloatingShape({ position, rotation, scale, speed, type, index }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = rotation[0] + time * speed;
      meshRef.current.rotation.y = rotation[1] + time * speed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(time * speed + index) * 0.5;
    }
  });
  
  const color = index % 2 === 0 ? '#00E6FB' : '#00FF9F';
  
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 0 && <octahedronGeometry args={[1, 0]} />}
      {type === 1 && <tetrahedronGeometry args={[1, 0]} />}
      {type === 2 && <icosahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      
      const isCyan = Math.random() > 0.5;
      colors[i * 3] = isCyan ? 0 : 0;
      colors[i * 3 + 1] = isCyan ? 0.9 : 1;
      colors[i * 3 + 2] = isCyan ? 0.98 : 0.62;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

interface Background3DProps {
  className?: string;
}

export function Background3D({ className = '' }: Background3DProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00E6FB" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00FF9F" />
        
        <FloatingShapes />
        <ParticleField />
      </Canvas>
    </div>
  );
}

export default Background3D;