"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Subtle mouse interaction
      const targetX = (state.mouse.x * Math.PI) / 4;
      const targetY = (state.mouse.y * Math.PI) / 4;
      
      meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
      meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#0af0b8"
          emissive="#0af0b8"
          emissiveIntensity={0.5}
          wireframe
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner solid core */}
      <mesh scale={0.8}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#00c896" emissive="#00c896" emissiveIntensity={0.2} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingCore />
      </Canvas>
    </div>
  );
}
