"use client";
import { useGLTF,useAnimations } from '@react-three/drei'
import React, { useEffect, useRef,useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'


export function Model(props:any) {
const group:any=useRef(null)
  const { nodes, materials }:any = useGLTF('/fanart_attack_of_titan.glb')
const [scrollProgress, setScrollProgress] = useState(0);
useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage (0 to 1)
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

useFrame((state) => {

  if (group.current) {
      // 1. Smoothly spin Levi based on the scroll progress
      // We use Math.PI * 2 to make him do a full 360 rotation as you scroll to the bottom
      const targetRotation = scrollProgress * Math.PI * 2;
    
    // Smoothly "Lerp" (Linear Interpolation) to that target using delta
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, 
      targetRotation, 
      0.1 // The smoothing factor
    );

    // 1. Smooth "Breathing" (Vertical movement)
      const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.8) * 0.1;

    // 2. The "Modern Float" (Subtle figure-eight rotation)
    // Moving both X and Z rotations slightly out of sync makes it look high-end
    group.current.rotation.x = Math.cos(t * 0.5) * 0.05;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.05;

    // 3. Interactive Mouse Tracking
    // This is the "Cool" factor: Levi slowly faces the user's cursor
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * (Math.PI / 8), // Max rotation angle
      0.5 // "Smoothness" factor (lower is smoother)
    );
  }
});



  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.GLTF_created_0_rootJoint} />
      <skinnedMesh
        geometry={nodes.Object_7.geometry}
        material={materials['5_coat_1.0_0_0']}
        skeleton={nodes.Object_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_8.geometry}
        material={materials['5_WPNhips_1.0_0_0']}
        skeleton={nodes.Object_8.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_9.geometry}
        material={materials['5_-WPNswords_1.0_0_0']}
        skeleton={nodes.Object_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_10.geometry}
        material={materials['5_body_1.0_0_0']}
        skeleton={nodes.Object_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_11.geometry}
        material={materials['5_boots_1.0_0_0']}
        skeleton={nodes.Object_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_12.geometry}
        material={materials['5_eyes_1.0_0_0']}
        skeleton={nodes.Object_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_13.geometry}
        material={materials['5_face_1.0_0_0']}
        skeleton={nodes.Object_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_14.geometry}
        material={materials['5_hair_1.0_0_0']}
        skeleton={nodes.Object_14.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_15.geometry}
        material={materials['5_skin_1.0_0_0']}
        skeleton={nodes.Object_15.skeleton}
      />

      <meshStandardMaterial 
    emissive="cyan" 
    emissiveIntensity={10} 
    toneMapped={false} 
  />
    </group>
  )
}

useGLTF.preload('./public/fanart_attack_of_titan.glb')
