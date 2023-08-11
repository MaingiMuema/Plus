import React, { useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Sphere(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('./models/Sphere/scene-transformed.glb');
  const { actions } = useAnimations(animations, group);

  // State to keep track of mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse move event
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const normalizedX = (clientX / windowWidth) * 20 - 1;
    const normalizedY = -(clientY / windowHeight) * 25 + 1;
    const normalizedZ = -(clientX / windowHeight) * -15 - 1;
    setMousePosition({ x: normalizedX, y: normalizedY, z: normalizedZ });
  };

  // Adding event listeners for mouse move
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Rotating the sphere based on mouse position
  React.useEffect(() => {
    if (group.current) {
      const rotationSpeed = 0.07;
      group.current.rotation.y = mousePosition.x * rotationSpeed;
      group.current.rotation.x = mousePosition.y * rotationSpeed;
      group.current.position.z = mousePosition.z * 0.2;
    }
  }, [mousePosition]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Icosphere_0">
          <mesh
            name="mesh_0"
            geometry={nodes.mesh_0.geometry}
            material={materials.material}
            morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
            morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/Sphere/scene-transformed.glb');
