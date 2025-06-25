import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { Github, ExternalLink } from 'lucide-react';
import * as THREE from 'three';

// --- 3D WAVE BACKGROUND COMPONENT ---
function WaveBackground() {
  const meshRef = useRef();
  
  // Create wave geometry with more vertices for smoother animation
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(25, 15, 60, 40);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position;
      
      // Animate vertices to create wave effect
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Create multiple wave patterns with larger amplitude
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
      {/* Main wave surface */}
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 4, 0, 0]} position={[0, -3, -6]}>
        <meshLambertMaterial
          color="#8e2de2"
          transparent
          opacity={0.25}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Secondary wave for depth */}
      <mesh geometry={geometry} rotation={[-Math.PI / 3, 0, Math.PI / 8]} position={[2, -4, -8]} scale={[0.8, 0.8, 0.8]}>
        <meshLambertMaterial
          color="#00c9ff"
          transparent
          opacity={0.15}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

// --- ANIMATED SPHERE COMPONENT ---
function AnimatedSphere({ color }) {
  const distortRef = useRef();

  useFrame(({ clock }) => {
    if (distortRef.current) {
        distortRef.current.distort = 0.4 + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          ref={distortRef}
          color={color}
          speed={2}
          distort={0.4}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </>
  );
}

const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and real-time order tracking.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
      color: '#8e2de2'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      github: '#',
      live: '#',
      color: '#c31432'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and severe weather alerts.',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind'],
      github: '#',
      live: '#',
      color: '#00c9ff'
    },
];

export default function Project() {
  return (
    <section id="projects" className="py-20 px-4 bg-[#111224] relative overflow-hidden">
      {/* 3D Wave Background */}
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
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div key={project.title} className="group bg-[#1c1d3a]/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-900/50">
              <div className="h-48 relative cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1d3a]/80 to-transparent z-10"></div>
                <div className="absolute inset-0">
                  <Canvas camera={{ fov: 25, position: [0, 0, 8] }}>
                    <AnimatedSphere color={project.color} />
                  </Canvas>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-fuchsia-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.github} className="flex items-center text-gray-400 hover:text-white transition-colors duration-300">
                    <Github size={16} className="mr-2" />
                    Code
                  </a>
                  <a href={project.live} className="flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-300">
                    <ExternalLink size={16} className="mr-2" />
                    Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}