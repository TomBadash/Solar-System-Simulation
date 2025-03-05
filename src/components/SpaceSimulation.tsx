'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Line } from '@react-three/drei';
import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import * as THREE from 'three';

interface PlanetProps {
  radius: number;
  distance: number;
  speed: number;
  color: string;
  name: string;
  details?: string;
}

const OrbitPath = ({ distance }: { distance: number }) => {
  const points = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      ));
    }
    points.push(points[0]); // Close the circle
    return points;
  }, [distance]);

  return (
    <Line
      points={points}
      color="rgba(255,255,255,0.2)"
      lineWidth={0.5}
      dashed={true}
    />
  );
};

const Planet = ({ radius, distance, speed, color, name, details }: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const timeRef = useRef(0);

  useFrame((state) => {
    const isPaused = (state as any).isPaused;
    if (!isPaused) {
      timeRef.current = state.clock.getElapsedTime();
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += isPaused ? 0 : speed * 0.01;
      planetRef.current.position.x = Math.cos(timeRef.current * speed) * distance;
      planetRef.current.position.z = Math.sin(timeRef.current * speed) * distance;
    }
  });

  return (
    <>
      <OrbitPath distance={distance} />
      <mesh
        ref={planetRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setShowDetails(!showDetails)}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={0.1}
        />
        <Html position={[0, radius * 1.5, 0]} center>
          <div className={`px-2 py-1 rounded text-sm whitespace-nowrap ${hovered ? 'text-yellow-300' : 'text-white'} transition-all duration-300`}
               style={{
                 backgroundColor: 'rgba(0, 0, 0, 0.8)',
                 textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
                 fontWeight: hovered ? 'bold' : 'normal',
                 border: hovered ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                 transform: `scale(${hovered ? 1.1 : 1})`,
                 color: hovered ? '#ffeb3b' : '#ffffff'
               }}>
            {name}
          </div>
        </Html>
        {showDetails && (
          <Html position={[radius * 2, 0, 0]}>
            <div className="bg-black/80 text-white p-4 rounded-lg border border-white/20 shadow-lg"
                 style={{ 
                   minWidth: '200px',
                   color: '#ffffff',
                   textShadow: '0 0 4px rgba(255, 255, 255, 0.4)'
                 }}>
              <h3 className="text-lg font-bold mb-2 text-white">{name}</h3>
              <p className="text-sm text-white">{details || `Distance from Sun: ${distance} units`}</p>
              <p className="text-sm mt-1 text-white">Orbital Speed: {speed.toFixed(2)} units</p>
            </div>
          </Html>
        )}
      </mesh>
    </>
  );
};

const Scene = () => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useFrame((state) => {
    (state as any).isPaused = isPaused;
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 30, 150]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffd700" />
      <Stars radius={300} depth={60} count={50000} factor={7} saturation={0} fade speed={1.5} />
      
      {/* Sun with enhanced glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          color="#ffd700" 
          emissive="#ff8c00" 
          emissiveIntensity={2.5} 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Planets with enhanced materials and details */}
      <Planet 
        radius={0.8} 
        distance={15} 
        speed={0.5} 
        color="#b5a642" 
        name="Mercury"
        details="Smallest planet, closest to the Sun. Surface temperature varies dramatically."
      />
      <Planet 
        radius={1.2} 
        distance={20} 
        speed={0.4} 
        color="#e6b800" 
        name="Venus"
        details="Often called Earth's sister planet due to similar size. Hottest planet due to greenhouse effect."
      />
      <Planet 
        radius={1.5} 
        distance={25} 
        speed={0.3} 
        color="#4287f5" 
        name="Earth"
        details="Our home planet. Only known planet with life. Has one natural satellite: the Moon."
      />
      <Planet 
        radius={1.2} 
        distance={30} 
        speed={0.25} 
        color="#ff4d4d" 
        name="Mars"
        details="The Red Planet. Has the largest volcano in the solar system: Olympus Mons."
      />
      <Planet 
        radius={2.5} 
        distance={40} 
        speed={0.15} 
        color="#ffa500" 
        name="Jupiter"
        details="Largest planet in our solar system. Has a Great Red Spot storm that's been raging for centuries."
      />
      <Planet 
        radius={2} 
        distance={50} 
        speed={0.1} 
        color="#ffd700" 
        name="Saturn"
        details="Known for its beautiful ring system. Has 82 confirmed moons."
      />
      <Planet 
        radius={1.8} 
        distance={60} 
        speed={0.08} 
        color="#87ceeb" 
        name="Uranus"
        details="Ice giant that rotates on its side. Has a unique blue-green color due to methane."
      />
      <Planet 
        radius={1.8} 
        distance={70} 
        speed={0.06} 
        color="#4169e1" 
        name="Neptune"
        details="The windiest planet, with speeds reaching 1,200 mph. Has 14 known moons."
      />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={200}
        target={[0, 0, 0]}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
      />

      {/* Space-themed Controls UI */}
      <Html position={[-10, -10, 0]} center>
        <div className="fixed bottom-4 left-4 flex gap-3">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="group px-6 py-3 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm border border-blue-400/50 
                     text-blue-400 rounded-xl hover:bg-blue-400/10 transition-all duration-300 
                     font-space tracking-wider text-sm flex items-center gap-2"
            style={{
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.2)',
              textShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
            }}
          >
            <span className="text-xl">🌎</span>
            {autoRotate ? 'Stop Rotation' : 'Start Rotation'}
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="group px-6 py-3 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm border border-purple-400/50 
                     text-purple-400 rounded-xl hover:bg-purple-400/10 transition-all duration-300 
                     font-space tracking-wider text-sm flex items-center gap-2"
            style={{
              boxShadow: '0 0 20px rgba(192, 132, 252, 0.2)',
              textShadow: '0 0 10px rgba(192, 132, 252, 0.5)'
            }}
          >
            <span className="text-xl">{isPaused ? '▶️' : '⏸️'}</span>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </Html>
    </>
  );
};

const SpaceSimulation = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'black',
      overflow: 'hidden'
    }}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <div className="text-2xl mb-4">Loading Space Simulation...</div>
            <div className="text-sm text-gray-400">Preparing the universe for you...</div>
          </div>
        </div>
      }>
        <Canvas
          camera={{ position: [0, 30, 80], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: 'black' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default SpaceSimulation; 