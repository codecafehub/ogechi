import React, { useState, useEffect } from 'react';
import heroIllustration from './assets/hero-illustration.png'; 
import skillsWheel from './assets/skills-wheel.png'; // Add this new import
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Smartphone, ArrowDown, Menu, X } from 'lucide-react';
import Rainfall from './Rainfall';
import About from './About';
import Project from './Project';
import Skills from './Skills';
import Contact from './Contact';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills = [
    { name: 'JavaScript', level: 95, icon: Code },
    { name: 'React', level: 90, icon: Code },
    { name: 'Node.js', level: 85, icon: Database },
    { name: 'Python', level: 88, icon: Code },
    { name: 'TypeScript', level: 82, icon: Code },
    { name: 'MongoDB', level: 80, icon: Database },
    { name: 'AWS', level: 75, icon: Globe },
    { name: 'React Native', level: 70, icon: Smartphone },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and real-time order tracking.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      github: '#',
      live: '#',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and severe weather alerts.',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind'],
      github: '#',
      live: '#',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-x-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-6 h-6 border-2 border-purple-500 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              &lt;Dev/&gt;
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-purple-400 transition-colors duration-300 ${
                    activeSection === item ? 'text-purple-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize hover:text-purple-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        {/* The background animation (no change) */}
        <Rainfall />
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -inset-10 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>
        
        {/* --- THIS IS THE LINE TO CHANGE --- */}
        {/* Changed 'container' to 'max-w-6xl' for consistent alignment */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Column: Text Content (no change) */}
          <div className="text-left animate-fade-in">
            <p>I'M</p>
            <h1 className="text-5xl  bg-gradient-to-r from-purple-200 to-blue-400 bg-clip-text text-transparent  md:text-6xl font-bold  mb-6">
              OGECHI OKACHI.S
            </h1>
            <button className="border border-gray-400 text-white font-semibold rounded-full px-8 py-3 hover:bg-white hover:text-gray-900 transition-colors duration-300">
              Learn More
            </button>
          </div>

          {/* Right Column: Composite Image (no change) */}
          <div className="relative flex items-center justify-center animate-fade-in-delay-1">
            <img 
              src={heroIllustration} 
              alt="Illustration of a developer working at a desk" 
              className="max-w-full z-10  h-auto"
            />
            <img
              src={skillsWheel}
              alt="Rotating wheel of technology icons"
              className="absolute w-full h-full object-contain animate-slow-spin"
            />
          </div>
        </div>
      </section>
      {/* End Hero Section */}

      

      {/* About Section */}
     <About />

      {/* Projects Section */}
      <Project />

      {/* Skills Section */}
     <Skills />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Software Engineer Portfolio. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default App;