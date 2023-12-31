/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 scene.gltf --transform 
Files: scene.gltf [10.15KB] > scene-transformed.glb [356.34KB] (-3411%)
Author: tamminen (https://sketchfab.com/tamminen)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/supernova-6214cf6421234104872cf213e1afcd19
Title: Supernova
*/

import React, { useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three';


export function Cosmos(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('./models/cosmos/scene-transformed.glb');
  const { actions } = useAnimations(animations, group);

  // State variable to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to update mouse position
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    // Normalize the mouse position to the range [-1, 1] for rotation
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  // Define a new material with a specific color
  const coloredMaterial = new THREE.MeshBasicMaterial({ color: '#ff0000' });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onMouseMove={handleMouseMove}
      rotation={[mousePosition.y * 0.2, mousePosition.x * 0.2, 0]} // Adjust the rotation factor to control sensitivity
    >
      <group name="Sketchfab_Scene">
        <group name="GLTF_SceneRootNode">
          <group name="Icosphere_0">
            {/* Use the new coloredMaterial */}
            <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={coloredMaterial} />
          </group>
        </group>
        <mesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.material} scale={2.712} />
      </group>
    </group>
  );
}

useGLTF.preload('./models/cosmos/scene-transformed.glb')
