import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  Layers, 
  Palette,
  Layout,
  Zap,
  FileCode,
  Brain,
  Server,
  Monitor
} from 'lucide-react';

// --- 3D FLOATING CUBES BACKGROUND ---
function FloatingCube({ position, scale, rotationSpeed, color }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + position[0]) * 0.3;
      
      // Rotation
      meshRef.current.rotation.x = time * rotationSpeed[0];
      meshRef.current.rotation.y = time * rotationSpeed[1];
      meshRef.current.rotation.z = time * rotationSpeed[2];
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

function FloatingBlock({ position, scale, rotationSpeed, color }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      
      // Different floating pattern for blocks
      meshRef.current.position.y = position[1] + Math.cos(time * 0.7 + position[0] * 2) * 0.4;
      meshRef.current.position.x = position[0] + Math.sin(time * 0.3 + position[1]) * 0.2;
      
      // Slower rotation for blocks
      meshRef.current.rotation.x = time * rotationSpeed[0] * 0.5;
      meshRef.current.rotation.y = time * rotationSpeed[1] * 0.5;
      meshRef.current.rotation.z = time * rotationSpeed[2] * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[2, 0.5, 1]} />
      <meshLambertMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
}

function FloatingShapes() {
  const cubes = useMemo(() => {
    const cubeArray = [];
    for (let i = 0; i < 15; i++) {
      cubeArray.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20 - 10
        ],
        scale: Math.random() * 0.5 + 0.3,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8
        ],
        color: ['#8e2de2', '#00c9ff', '#c31432', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 5)]
      });
    }
    return cubeArray;
  }, []);

  const blocks = useMemo(() => {
    const blockArray = [];
    for (let i = 0; i < 10; i++) {
      blockArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 15 - 8
        ],
        scale: Math.random() * 0.4 + 0.4,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6
        ],
        color: ['#8e2de2', '#00c9ff', '#c31432', '#ff9f43', '#7d5fff'][Math.floor(Math.random() * 5)]
      });
    }
    return blockArray;
  }, []);

  return (
    <>
      {cubes.map((cube, index) => (
        <FloatingCube key={`cube-${index}`} {...cube} />
      ))}
      {blocks.map((block, index) => (
        <FloatingBlock key={`block-${index}`} {...block} />
      ))}
    </>
  );
}

const skills = [
  { 
    name: 'JavaScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    color: '#f7df1e' 
  },
  { 
    name: 'React', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    color: '#61dafb' 
  },
  { 
    name: 'Node.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    color: '#339933' 
  },
  { 
    name: 'TypeScript', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    color: '#3178c6' 
  },
  { 
    name: 'MongoDB', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    color: '#47a248' 
  },
  { 
    name: 'React Native', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    color: '#61dafb' 
  },
  { 
    name: 'HTML', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    color: '#e34f26' 
  },
  { 
    name: 'CSS', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    color: '#1572b6' 
  },
  { 
    name: 'Bootstrap', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
    color: '#7952b3' 
  },
  { 
    name: 'Tailwind CSS', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06b6d4' 
  },
  { 
    name: 'jQuery', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg',
    color: '#0769ad' 
  },
  { 
    name: 'WordPress', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg',
    color: '#21759b' 
  },
  { 
    name: 'MySQL', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    color: '#4479a1' 
  },
  { 
    name: 'Express.js', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    color: '#000000' 
  },
  { 
    name: 'Flutter', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    color: '#02569b' 
  },
  { 
    name: 'AI Prompt Engineer', 
    icon: Brain, 
    color: '#8e2de2' 
  },
  { 
    name: 'PHP', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    color: '#777bb4' 
  },
  { 
    name: 'Laravel', 
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
    color: '#ff2d20' 
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] relative overflow-hidden">
      {/* 3D Floating Background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ fov: 60, position: [0, 0, 10] }}
          style={{ background: 'transparent' }}
        >
          <FloatingShapes />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#8e2de2" />
          <pointLight position={[0, 0, 10]} intensity={0.5} color="#00c9ff" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16  bg-gradient-to-r from-purple-200 to-blue-400 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {skills.map((skill) => {
            return (
              <div 
                key={skill.name} 
                className="group bg-[#1c1d3a]/80 backdrop-blur-sm rounded-xl p-6 hover:transform hover:scale-110 transition-all duration-300 hover:shadow-2xl border border-purple-900/50 hover:border-purple-500/50 hover:bg-[#1c1d3a]/90"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div 
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    {skill.logo ? (
                      <img 
                        src={skill.logo} 
                        alt={skill.name}
                        className="w-8 h-8 transition-all duration-300 group-hover:drop-shadow-lg"
                        style={{ 
                          filter: skill.name === 'Express.js' ? 'invert(1)' : 'none' 
                        }}
                      />
                    ) : (
                      <skill.icon 
                        size={32} 
                        style={{ color: skill.color }}
                        className="transition-all duration-300 group-hover:drop-shadow-lg"
                      />
                    )}
                  </div>
                  <h3 
                    className="text-sm font-semibold text-white group-hover:transition-colors duration-300"
                    style={{ color: skill.name === 'AI Prompt Engineer' ? '#8e2de2' : 'white' }}
                  >
                    {skill.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}