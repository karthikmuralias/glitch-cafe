import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Clock, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitchTime, setGlitchTime] = useState(false);

  const welcomeMessages = [
    'WELCOME TO THE GLITCH',
    'W3LC0M3 T0 TH3 GL1TCH',
    'ERROR: WELCOME NOT FOUND',
    'INITIALIZING REALITY...',
    'WELCOME TO THE VOID',
    'SYSTEM CORRUPTED - ENTER',
    'WELCOME TO THE GLITCH'
  ];

  const [currentMessage, setCurrentMessage] = useState(welcomeMessages[0]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Randomly glitch the time display
      if (Math.random() > 0.95) {
        setGlitchTime(true);
        setTimeout(() => setGlitchTime(false), 500);
      }
    }, 1000);

    const messageInterval = setInterval(() => {
      setCurrentMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);
    }, 4000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(messageInterval);
    };
  }, []);

  const formatTime = (date: Date) => {
    if (glitchTime) {
      return '??:??:??';
    }
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 glitch-text" data-text={currentMessage}>
          {currentMessage}
        </h1>
        <p className="text-xl md:text-2xl text-green-300 mb-8 max-w-3xl mx-auto">
          Where reality meets digital chaos. Experience coffee that transcends dimensions, 
          with flavors that exist in the space between pixels.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <Link 
            to="/menu" 
            className="bg-green-400 text-black px-8 py-4 font-bold hover:bg-green-300 transition-all transform hover:scale-105 flex items-center space-x-2 digital-flicker"
          >
            <Coffee className="w-5 h-5" />
            <span>ENTER THE MENU</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="text-green-400 border border-green-400 px-6 py-4 font-mono">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>CURRENT REALITY: {formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-6 hover:border-opacity-60 transition-all">
          <Zap className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2 corrupted-text">TEMPORAL BEVERAGES</h3>
          <p className="text-green-300">
            Coffee that exists across multiple timelines simultaneously. 
            Each sip reveals flavors from past, present, and future.
          </p>
        </div>

        <div className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-6 hover:border-opacity-60 transition-all">
          <Coffee className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2 corrupted-text">REALITY DISTORTION</h3>
          <p className="text-green-300">
            Experience side effects that blur the line between digital and physical reality. 
            Warning: May cause existential contemplation.
          </p>
        </div>

        <div className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-6 hover:border-opacity-60 transition-all">
          <Clock className="w-12 h-12 text-green-400 mb-4" />
          <h3 className="text-xl font-bold mb-2 corrupted-text">NON-LINEAR SERVICE</h3>
          <p className="text-green-300">
            Our menu changes faster than you can read it. 
            What you order may not be what you receive, but it will be what you need.
          </p>
        </div>
      </div>

      {/* Warning Section */}
      <div className="bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4 glitch-text" data-text="⚠ WARNING ⚠">
          ⚠ WARNING ⚠
        </h2>
        <p className="text-red-300">
          The Glitch Café is not responsible for temporal displacement, reality fragmentation, 
          or existential crises resulting from consumption of our products. 
          Side effects may include but are not limited to: déjà vu, prophetic dreams, 
          and the ability to perceive the matrix underlying reality.
        </p>
      </div>
    </div>
  );
};

export default Home;