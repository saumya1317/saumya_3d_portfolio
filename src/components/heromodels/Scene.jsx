import React from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export default function Model(props) {
  const { scene } = useGLTF("/models/scene.gltf");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  // Make clothes and dress materials double-sided to avoid disappearing on rotation
  React.useMemo(() => {
    // List materials you want double-sided
    const matsToFix = [
      materials.Coat,
      materials.Dress,
      materials.Outline_Coth,
      materials.Outline_Hair,
      materials.Outline_Skin,
      materials.Outline_Coth,
      // Add any other clothes related materials if needed
    ];

    matsToFix.forEach((mat) => {
      if (mat) {
        mat.side = THREE.DoubleSide;
        mat.needsUpdate = true; // force update of material
      }
    });
  }, [materials]);

  return (
    <group {...props} dispose={null} scale={3.5}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={nodes._rootJoint} />

        {/* Character skinned meshes */}
        <skinnedMesh
          geometry={nodes.Object_162.geometry}
          material={materials.Body}
          skeleton={nodes.Object_162.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_163.geometry}
          material={materials.Coat}
          skeleton={nodes.Object_163.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_164.geometry}
          material={materials.Outline_Skin}
          skeleton={nodes.Object_164.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_166.geometry}
          material={materials.Dress}
          skeleton={nodes.Object_166.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_167.geometry}
          material={materials.Outline_Coth}
          skeleton={nodes.Object_167.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_169.geometry}
          material={materials.Dress}
          skeleton={nodes.Object_169.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_170.geometry}
          material={materials.Outline_Coth}
          skeleton={nodes.Object_170.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_172.geometry}
          material={materials.Coat}
          skeleton={nodes.Object_172.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_173.geometry}
          material={materials.Outline_Coth}
          skeleton={nodes.Object_173.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_175.geometry}
          material={materials.Coat}
          skeleton={nodes.Object_175.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_176.geometry}
          material={materials.Brooch}
          skeleton={nodes.Object_176.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_177.geometry}
          material={materials.Outline_Coth}
          skeleton={nodes.Object_177.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_179.geometry}
          material={materials.Coat}
          skeleton={nodes.Object_179.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_180.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_180.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_181.geometry}
          material={materials.Dress}
          skeleton={nodes.Object_181.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_182.geometry}
          material={materials.Outline_Hair}
          skeleton={nodes.Object_182.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_184.geometry}
          material={materials.Hair}
          skeleton={nodes.Object_184.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_185.geometry}
          material={materials.Face}
          skeleton={nodes.Object_185.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_186.geometry}
          material={materials.Body}
          skeleton={nodes.Object_186.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Object_187.geometry}
          material={materials.Outline_Skin}
          skeleton={nodes.Object_187.skeleton}
        />

        {/* Wand group positioned relative to the character */}
        <group position={[0.1, -0.8, 0.2]} rotation={[0, 0, 0]} scale={1}>
          <mesh geometry={nodes.Wand_broom_0.geometry} material={materials.broom} />
          <mesh
            geometry={nodes.Wand_Outline_cloth_0.geometry}
            material={materials.Outline_cloth}
          />
        </group>

        {/* Ribbon group positioned relative to the character */}
        <group position={[0, -0.5, 0]} rotation={[0, 0, 0]} scale={1}>
          <mesh geometry={nodes.ribbon_Dress_0.geometry} material={materials.Dress} />
          <mesh
            geometry={nodes.ribbon_Outline_Coth_0.geometry}
            material={materials.Outline_Coth}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/scene.gltf");
