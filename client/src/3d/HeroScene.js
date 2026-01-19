import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function NeonOrb({ position = [0, 0, 0], color = "#3b82f6", scale = 1 }) {
  const mesh = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.25;
      mesh.current.rotation.x = t * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.9}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.35}
          metalness={0.65}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const lights = useMemo(
    () => [
      { position: [2, 2, 3], intensity: 1.2 },
      { position: [-3, -1, 2], intensity: 0.9 },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={0.35} />
      {lights.map((l, idx) => (
        <pointLight key={idx} position={l.position} intensity={l.intensity} />
      ))}
      <NeonOrb position={[-1.35, 0.35, 0]} color="#7c3aed" scale={1.05} />
      <NeonOrb position={[1.15, -0.1, -0.5]} color="#22d3ee" scale={0.85} />
      <NeonOrb position={[0.15, 1.15, -0.9]} color="#3b82f6" scale={0.72} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent" />
      <Canvas camera={{ position: [0, 0, 4.2], fov: 55 }}>
        <Scene />
      </Canvas>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      </div>
    </div>
  );
}

