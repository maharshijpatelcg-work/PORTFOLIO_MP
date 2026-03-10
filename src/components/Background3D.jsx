import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Realistic planet features, tweaked sizes/speeds for dynamic motion
const PLANETS = [
  { name: 'Mercury', color: '#888888', size: 0.2, orbitRadius: 3, speed: 0.8, selfRotateSpeed: 2.0 },
  { name: 'Venus', color: '#e3bb76', size: 0.4, orbitRadius: 5, speed: 0.6, selfRotateSpeed: -0.5 },
  { name: 'Earth', color: '#2b82c9', size: 0.45, orbitRadius: 7.5, speed: 0.5, selfRotateSpeed: 1.5 },
  { name: 'Mars', color: '#c1440e', size: 0.3, orbitRadius: 10, speed: 0.4, selfRotateSpeed: 1.4 },
  { name: 'Jupiter', color: '#d39c7e', size: 1.2, orbitRadius: 16, speed: 0.2, selfRotateSpeed: 3.0 },
  { name: 'Saturn', color: '#ead6b8', size: 1.0, orbitRadius: 21, speed: 0.15, selfRotateSpeed: 2.8, hasRing: true },
  { name: 'Uranus', color: '#4b70dd', size: 0.6, orbitRadius: 26, speed: 0.1, selfRotateSpeed: -1.2 },
  { name: 'Neptune', color: '#274687', size: 0.55, orbitRadius: 31, speed: 0.08, selfRotateSpeed: 1.1 },
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
      // Realistic self-rotation of the planet on its own Y axis
      planetRef.current.rotation.y += delta * planet.selfRotateSpeed;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      <mesh ref={planetRef} position={[planet.orbitRadius, 0, 0]}>
        <sphereGeometry args={[planet.size, 64, 64]} />
        {/* Very low roughness to catch sharp light glimmers, pitch black shadows */}
        <meshStandardMaterial
          color={planet.color}
          roughness={0.9}
          metalness={0.1}
        />

        {/* Saturn's Ring - make it realistic overlapping ring */}
        {planet.hasRing && (
          <mesh rotation={[Math.PI / 2.2, 0, 0]}>
            <ringGeometry args={[planet.size * 1.4, planet.size * 2.4, 64]} />
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

const AsteroidBelt = () => {
  const meshRef = useRef();

  // Generate 600 chunky low-poly rocks
  // Placed between Mars (8) and Jupiter (15)
  const asteroids = useMemo(() => {
    const rocks = [];
    for (let i = 0; i < 600; i++) {
      const radius = 10 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.0;

      const scale = 0.05 + Math.random() * 0.15;
      const rotX = Math.random() * Math.PI;
      const rotY = Math.random() * Math.PI;
      const rotZ = Math.random() * Math.PI;

      rocks.push({ id: i, position: [x, y, z], rotation: [rotX, rotY, rotZ], scale });
    }
    return rocks;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slowly rotate the entire belt 
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {asteroids.map((rock) => (
        <mesh key={rock.id} position={rock.position} rotation={rock.rotation} scale={rock.scale}>
          {/* Dodecahedron creates chunky, irregular asteroid rocks */}
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4a423b" roughness={1} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}

const SolarSystem = () => {
  const systemRef = useRef();

  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    if (systemRef.current) {
      // Very slight terrifying camera drift based on mouse
      systemRef.current.rotation.x = 0.4 + (mouseY * 0.1);
      systemRef.current.rotation.y = (mouseX * 0.1);
    }
  });

  return (
    <group ref={systemRef} rotation={[0.4, 0, 0]}>
      {/* Central light source imitating the bright center of the universe image */}
      <pointLight position={[0, 0, 0]} intensity={35} distance={150} color="#60a5fa" decay={1.2} />
      <pointLight position={[0, 0, 0]} intensity={25} distance={80} color="#a855f7" decay={1.5} />

      {/* The Asteroid Belt Segment */}
      <AsteroidBelt />

      {/* Orbit path rings (very subtle to match image) */}
      {PLANETS.map((planet) => (
        <React.Fragment key={planet.name}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.orbitRadius - 0.015, planet.orbitRadius + 0.015, 128]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
          </mesh>
          <Planet planet={planet} />
        </React.Fragment>
      ))}
    </group>
  );
};

const Background3D = () => {
  return (
    // Pointer events off so it doesn't block interactions, entirely transparent bg
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 15, 35], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        {/* Slightly higher ambient light so the planets are still visible off-center against the bright background */}
        <ambientLight intensity={0.4} />

        <SolarSystem />
      </Canvas>
    </div>
  );
};

export default Background3D;
