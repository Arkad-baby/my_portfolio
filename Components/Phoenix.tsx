"use client";

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

export function Phoenix(props: any) {
  const group = useRef<any>(null);
  const lightRef = useRef<any>(null);
  
  const { nodes, materials, animations }: any = useGLTF('/phoenix_bird.glb');
  const { actions, names } = useAnimations(animations, group);
const [targetRotationY, setTargetRotationY] = React.useState(0);

  // 1. Play the Flight Animation automatically
  useEffect(() => {
    const action = actions[names[0]];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
    return () => { action?.fadeOut(0.5); };
  }, [actions, names]);

useFrame((state, delta) => {
  if (group.current) {
    const t = state.clock.getElapsedTime();
    
    // 1. Target coordinates (mapped to screen size)
    const targetX = (state.pointer.x * state.viewport.width) / 1.5;
    const targetY = (state.pointer.y * state.viewport.height) / 1.5;

    // 2. Slow Movement (Increase 1.5 to 2.0 s to make it even slower)
    easing.damp3(
      group.current.position, 
      [targetX, targetY, 2], 
      2.5, // Much slower damping
      delta
    );

    // 3. 180-Degree Flip Logic
    // We check if the mouse is far enough to the side to trigger a turn
    const turnTarget = state.pointer.x > 0 ? 0 : Math.PI;

    // 4. Slow Rotation (Majestic turn)
    easing.dampE(
      group.current.rotation,
      [targetY * -0.1, turnTarget, 0],
      1.2, // Slow rotation for the 180-degree flip
      delta
    );
  }
});

useFrame((state) => {
  if (lightRef.current) {
    // Math.sin(t) + 1 stays between 0 and 2. 
    // Multiplied by 3, it stays between 0 and 6. 
    // Adding 2 ensures it never hits 0.
    const flicker = (Math.sin(state.clock.elapsedTime * 2) + 1) * 2 + 2;
    lightRef.current.intensity = flicker;
  }

});
  return (
/* Apply scale directly here. 0.1 is 10% of original size */
  <group ref={group} scale={0.01} {...props} dispose={null}>
<pointLight 
  ref={lightRef}
  intensity={4}           // Dropped to a single digit
  distance={15}            // Very short reach
  color="#ff6600"         // Deep orange/red (less "white" light)
  decay={4}               // Very sharp fall-off
/>  
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0.053]}>
          <group name="5f59736c86d4457fa045aec4aea6b7e0fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.MatI_Ride_FengHuang_01a}
                    skeleton={nodes.Object_7.skeleton}
                    castShadow
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.MatI_Ride_FengHuang_01b}
                    skeleton={nodes.Object_8.skeleton}
                    castShadow
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./public/phoenix_bird.glb');