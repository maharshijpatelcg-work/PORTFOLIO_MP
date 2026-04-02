import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Reduced to 5 planets for performance — removed Mercury and Uranus/Neptune (far away, barely visible)
const PLANETS = [
  { name: 'Venus', color: '#e3bb76', size: 0.35, orbitRadius: 5, speed: 0.4, selfRotateSpeed: -0.3 },
  { name: 'Earth', color: '#2b82c9', size: 0.4, orbitRadius: 7.5, speed: 0.35, selfRotateSpeed: 1.0 },
  { name: 'Mars', color: '#c1440e', size: 0.28, orbitRadius: 10, speed: 0.3, selfRotateSpeed: 0.8 },
  { name: 'Jupiter', color: '#d39c7e', size: 1.0, orbitRadius: 16, speed: 0.15, selfRotateSpeed: 1.8 },
  { name: 'Saturn', color: '#ead6b8', size: 0.85, orbitRadius: 21, speed: 0.1, selfRotateSpeed: 1.5, hasRing: true },
];

const Planet = ({ planet }) => {
  const orbitGroupRef = useRef();
  const planetRef = useRef();

  // Randomize start position
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y = state.clock.getElapsedTime() * planet.speed * 0.5 + randomOffset;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * planet.selfRotateSpeed;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      <mesh ref={planetRef} position={[planet.orbitRadius, 0, 0]}>
        {/* Reduced segments from 64 to 24 — still looks round, much fewer polygons */}
        <sphereGeometry args={[planet.size, 24, 24]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.9}
          metalness={0.1}
        />

        {/* Saturn's Ring */}
        {planet.hasRing && (
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[planet.size * 1.4, planet.size * 2.4, 32]} />
            <meshStandardMaterial
              color="#d2c1a1"
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
              roughness={0.4}
            />
          </mesh>
        )}
      </mesh>
    </group>
  );
};

// Asteroid belt using InstancedMesh for massive performance gain
// Instead of 600 individual meshes, we use 1 instanced mesh
const AsteroidBelt = () => {
  const meshRef = useRef();
  const instancedRef = useRef();
  const count = 150; // Reduced from 600 to 150, with instancing

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Build instance matrices once
  useEffect(() => {
    if (!instancedRef.current) return;

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.0;

      const scale = 0.05 + Math.random() * 0.12;

      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <instancedMesh ref={instancedRef} args={[null, null, count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#4a423b" roughness={1} metalness={0} />
      </instancedMesh>
    </group>
  );
};

const SolarSystem = () => {
  const systemRef = useRef();

  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    if (systemRef.current) {
      // Lerp for smoother movement instead of direct assignment
      systemRef.current.rotation.x += (0.4 + mouseY * 0.1 - systemRef.current.rotation.x) * 0.05;
      systemRef.current.rotation.y += (mouseX * 0.1 - systemRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={systemRef} rotation={[0.4, 0, 0]}>
      {/* Reduced light count and intensity */}
      <pointLight position={[0, 0, 0]} intensity={25} distance={120} color="#60a5fa" decay={1.5} />
      <pointLight position={[0, 0, 0]} intensity={15} distance={60} color="#a855f7" decay={1.8} />

      <AsteroidBelt />

      {/* Orbit path rings — reduced segments from 128 to 64 */}
      {PLANETS.map((planet) => (
        <React.Fragment key={planet.name}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.orbitRadius - 0.015, planet.orbitRadius + 0.015, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
          <Planet planet={planet} />
        </React.Fragment>
      ))}
    </group>
  );
};

const Background3D = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when tab is not visible
  useEffect(() => {
    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Don't render on mobile or low-performance devices
  const [shouldRender, setShouldRender] = useState(true);
  useEffect(() => {
    // Skip 3D on mobile (screen width < 768) or devices with < 4 logical cores
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    if (isMobile || isLowEnd) {
      setShouldRender(false);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 15, 35], fov: 45 }}
        dpr={[1, 1.5]} // Capped at 1.5 instead of 2 for perf
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        frameloop={isVisible ? 'always' : 'never'} // Stop rendering when tab hidden
      >
        <ambientLight intensity={0.4} />
        <SolarSystem />
      </Canvas>
    </div>
  );
};

export default Background3D;
