import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LayoutTemplate, Code, Smartphone, TrendingUp, BrainCircuit } from 'lucide-react';
import * as THREE from 'three';

// --- IMPORTANT NOTE ---
// This WaveBackground component is copied from your Project.js.
// For better code management, you should move this WaveBackground function
// into its own file (e.g., 'components/WaveBackground.js') and then
// import it into both Project.js and Services.js.
function WaveBackground() {
  const meshRef = useRef();
  const geometry = useMemo(() => new THREE.PlaneGeometry(25, 15, 60, 40), []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave1 = Math.sin(x * 0.3 + time * 1.2) * 0.8;
        const wave2 = Math.sin(y * 0.2 + time * 0.8) * 0.5;
        const wave3 = Math.sin((x + y) * 0.15 + time * 0.6) * 0.3;
        positions.setZ(i, wave1 + wave2 + wave3);
      }
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <>
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 4, 0, 0]} position={[0, -3, -6]}>
        <meshLambertMaterial color="#8e2de2" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={geometry} rotation={[-Math.PI / 3, 0, Math.PI / 8]} position={[2, -4, -8]} scale={[0.8, 0.8, 0.8]}>
        <meshLambertMaterial color="#00c9ff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
// --- END OF COPIED COMPONENT ---

// Data for the services section
const services = [
  {
    title: 'Web Development',
    description: 'Creating robust, scalable, and high-performance websites with modern front-end and back-end technologies.',
    icon: <Code size={48} className="text-purple-400 group-hover:text-blue-400 transition-colors" />,
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive and engaging user interfaces that provide an exceptional user experience, from wireframes to final mockups.',
    icon: <LayoutTemplate size={48} className="text-purple-400 group-hover:text-blue-400 transition-colors" />,
  },
  {
    title: 'Mobile App Development',
    description: 'Building cross-platform mobile applications for iOS and Android with a focus on performance and seamless integration.',
    icon: <Smartphone size={48} className="text-purple-400 group-hover:text-blue-400 transition-colors" />,
  },
  {
    title: 'SEO Optimization',
    description: 'Improving your site’s visibility on search engines through technical SEO, content strategy, and performance enhancements.',
    icon: <TrendingUp size={48} className="text-purple-400 group-hover:text-blue-400 transition-colors" />,
  },
  {
    title: 'AI Prompt Engineering',
    description: 'Crafting and refining advanced prompts for generative AI models to produce precise, high-quality, and context-aware outputs.',
    icon: <BrainCircuit size={48} className="text-purple-400 group-hover:text-blue-400 transition-colors" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-[#111224] relative overflow-hidden">
      {/* 3D Wave Background - Identical to your Projects section */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ fov: 75, position: [0, 2, 8] }}
          style={{ background: 'transparent' }}
        >
          <WaveBackground />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} color="#8e2de2" />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#00c9ff" />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Services I Offer
        </h2>
        {/* Responsive grid for the service cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.title} className="group bg-[#1c1d3a]/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-900/50 flex flex-col">
              
              {/* Icon container */}
              <div className="h-40 flex justify-center items-center bg-gradient-to-t from-[#1c1d3a]/50 to-transparent">
                {service.icon}
              </div>

              {/* Text content container */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-fuchsia-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}