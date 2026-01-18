import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
const FloatingShape = ({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// Rotating ring
const RotatingRing = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.8, 0.02, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

// Particle system
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#EAB308"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main 3D Scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#EAB308" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FDE047" />
      
      {/* Stars background */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
      
      {/* Floating shapes */}
      <FloatingShape position={[-3, 2, -5]} color="#EAB308" speed={1} />
      <FloatingShape position={[3, -1, -4]} color="#FDE047" speed={0.8} />
      <FloatingShape position={[0, 3, -6]} color="#EAB308" speed={1.2} />
      <FloatingShape position={[-2, -2, -3]} color="#FDE047" speed={0.9} />
      <FloatingShape position={[4, 1, -5]} color="#EAB308" speed={1.1} />
      
      {/* Rotating rings */}
      <RotatingRing position={[0, 0, -8]} color="#EAB308" />
      <RotatingRing position={[2, -1, -10]} color="#FDE047" />
      
      {/* Particle field */}
      <ParticleField />
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-40 dark:opacity-60 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
