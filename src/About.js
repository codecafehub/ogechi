import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { Briefcase, Award } from 'lucide-react';

// --- 3D Component ---
// This component contains the actual 3D objects and the animation logic.
// It is designed to be placed INSIDE a <Canvas> component.
function AnimatedCube() {
  const meshRef = useRef();

  // This hook is now valid because this component will be rendered inside a Canvas
  useFrame(() => {
    if (meshRef.current) {
      // Slowly rotate the cube
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <>
      {/* Ambient light to softly illuminate the whole scene */}
      <ambientLight intensity={0.5} />
      {/* Directional light to cast shadows and add highlights */}
      <directionalLight position={[3, 2, 5]} intensity={1.5} />
      
      {/* Stars for a cool space-like background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <mesh ref={meshRef}>
        {/* The shape of our object */}
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        {/* The material/skin of our object */}
        <meshStandardMaterial
          color="#a855f7" // A nice purple
          wireframe={true}
          emissive="#a855f7" // Makes the wireframe glow
          emissiveIntensity={1.5}
        />
      </mesh>
      
      {/* Allows the user to rotate the object with their mouse */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}


// --- Main About Section Component ---
// This is what you should export from About.js
export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-gray-900">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Crafting Digital Experiences
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            A fusion of elegant design and robust engineering.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-3 space-y-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate software engineer with 5+ years of experience building scalable web applications and mobile solutions. I love turning complex problems into simple, beautiful, and intuitive designs. My goal is to create software that is not only functional but also a joy to use.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not immersed in code, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community through articles and talks.
            </p>

            {/* Stats Cards with Glassmorphism Effect */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-xl flex items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">50+</h3>
                  <p className="text-gray-400">Projects Completed</p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-xl flex items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="bg-pink-500/10 p-3 rounded-lg">
                  <Briefcase className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">5+</h3>
                  <p className="text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Animation */}
          <div className="lg:col-span-2 h-80 sm:h-96 w-full">
            {/* The Canvas now wraps our scene component */}
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <AnimatedCube />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}