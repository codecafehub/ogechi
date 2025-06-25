import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// We pass the wave's "height" (displacement) from the vertex to the fragment shader
const vertexShader = `
  uniform float uTime;
  varying float vDisplacement;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Create a subtle, slow-moving wave
    float wave = sin(modelPosition.x * 2.0 + uTime * 0.8) * sin(modelPosition.y * 3.0 + uTime * 0.5);
    vDisplacement = wave * 0.2; // Control the intensity of the color change
    modelPosition.z += wave * 0.03; // Control the physical height of the wave

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

// The fragment shader uses the wave's height to mix between two colors
const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vDisplacement;

  void main() {
    // Mix between the two colors based on the wave displacement
    // The clamp ensures the value stays between 0.0 and 1.0
    float mixFactor = clamp(vDisplacement + 0.5, 0.0, 1.0);
    gl_FragColor = vec4(mix(uColorA, uColorB, mixFactor), 1.0);
  }
`;

const WavePlane = ({ colorA, colorB }) => {
  const materialRef = useRef();

  // Define the shader material directly
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(colorA) },
        uColorB: { value: new THREE.Color(colorB) },
      },
      vertexShader,
      fragmentShader,
    });
  }, [colorA, colorB]);

  // Animate the uTime uniform
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.1, 0, 0]}>
      <planeGeometry args={[6, 6, 64, 64]} />
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
};

const Wave = ({ colorA, colorB }) => {
  return (
    <Canvas camera={{ fov: 20, position: [0, 4, 0] }}>
      <WavePlane colorA={colorA} colorB={colorB} />
    </Canvas>
  );
};

export default Wave;