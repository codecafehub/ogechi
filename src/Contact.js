import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <section id="contact" className="relative py-20 px-4 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-${i % 3} ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent transform -skew-y-12 animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Let's Work Together
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Options */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => setShowForm(!showForm)}
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-1"
              >
                <MessageSquare size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {showForm ? 'Hide Form' : 'Send Message'}
              </button>
              
              <a 
                href="mailto:hello@example.com" 
                className="group inline-flex items-center px-8 py-4 border-2 border-purple-600 rounded-full hover:bg-purple-600 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1"
              >
                <Mail size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Quick Email
              </a>
            </div>
            
            <div className="text-center md:text-left">
              <a 
                href="#" 
                className="group inline-flex items-center px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <User size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Download Resume
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 transform ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-purple-500/50"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 hover:border-purple-500/50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors duration-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none hover:border-purple-500/50"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(-180deg); opacity: 0.6; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-25px) rotate(90deg); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
};

export default Contact;