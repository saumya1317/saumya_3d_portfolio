import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import HeroLights from "./HeroLights";
import Particles from "./Particle";
import Scene from "./Scene";

const DraggableAnimatedScene = ({ isMobile }) => {
  const groupRef = useRef();

  // Dragging state refs
  const [isDragging, setIsDragging] = useState(false);
  const dragStartMouse = useRef([0, 0]);
  const dragStartPos = useRef([0, 0, 0]);
  const pos = useRef([0, -3.5, 0]); // current position

  // Animate floating only if NOT dragging
  useFrame(({ clock }) => {
    if (!isDragging && groupRef.current) {
      const elapsed = clock.getElapsedTime();

      pos.current[0] = Math.sin(elapsed * 0.5) * (isMobile ? 0.5 : 1);
      pos.current[1] = -3.5 + Math.sin(elapsed * 0.7) * 0.3;
      pos.current[2] = 0;

      groupRef.current.position.set(...pos.current);
    }
  });

  // Handlers to manage drag start, move, end
  const onPointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartMouse.current = [e.clientX, e.clientY];
    dragStartPos.current = [...pos.current];
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();

    const dx = (e.clientX - dragStartMouse.current[0]) / 100; // scale down movement
    const dy = (e.clientY - dragStartMouse.current[1]) / 100;

    pos.current[0] = dragStartPos.current[0] + dx;
    pos.current[1] = dragStartPos.current[1] - dy; // invert y for natural feel

    if (groupRef.current) {
      groupRef.current.position.set(...pos.current);
    }
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.7 : 1}
      rotation={[0, -Math.PI / 4, 0]}
      position={[0, -3.5, 0]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onLostPointerCapture={onPointerUp}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <Scene />
    </group>
  );
};

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <ambientLight intensity={0.2} color="#1a1a40" />

      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <DraggableAnimatedScene isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
