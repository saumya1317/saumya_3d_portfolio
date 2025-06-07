import { OrbitControls, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Computer from "./Computer";

const ContactExperience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
      {/* Soft ambient light */}
      <ambientLight intensity={0.5} color="#d9cfff" />

      {/* Gentle directional light with pastel tone */}
      <directionalLight
        position={[4, 5, 3]}
        intensity={1.2}
        color="#c8b6ff"
        castShadow
      />

      {/* Floating subtle sparkles */}
      <Sparkles
        size={6}          // size of each sparkle
        scale={[10, 5, 10]} // area where sparkles appear
        speed={0.2}       // animation speed
        count={40}        // number of sparkles
        color="#c8b6ff"   // pastel lilac sparkle color
      />

      {/* Postprocessing Bloom Glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.6}
          kernelSize={5}
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Floor with pastel lavender */}
      <mesh
        receiveShadow
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#e6ddff" />
      </mesh>

      {/* Vertical back wall with misty purple */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#ddd6f3" />
      </mesh>

      {/* Model */}
      <group scale={0.03} position={[0, -1.49, -2]} castShadow>
        <Computer />
      </group>
    </Canvas>
  );
};

export default ContactExperience;
