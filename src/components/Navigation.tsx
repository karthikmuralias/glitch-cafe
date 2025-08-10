import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu as MenuIcon, MessageSquare, FileText, ShoppingCart } from 'lucide-react';

interface NavigationProps {
  onSecretTrigger: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSecretTrigger }) => {
  const [glitchCount, setGlitchCount] = useState(0);
  const [title, setTitle] = useState('GLITCH CAFÉ');
  const location = useLocation();

  const titles = [
    'GLITCH CAFÉ',
    'GL1TCH C4FÉ',
    '▓▓▓▓▓ CAFÉ',
    'ERROR_CAFÉ.EXE',
    'GLITCH CAFÉ',
    '█LITCH C█FÉ',
    'SYSTEM_CAFÉ',
    'GLITCH CAFÉ'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitle(titles[Math.floor(Math.random() * titles.length)]);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    setGlitchCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 7) {
        onSecretTrigger();
        return 0;
      }
      return newCount;
    });
  };

  return (
    <nav className="bg-black border-b border-green-400 border-opacity-30 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
          onClick={handleLogoClick}
        >
          <Coffee className="w-8 h-8 pixel-shift" />
          <span className="text-2xl font-bold glitch-text" data-text={title}>
            {title}
          </span>
        </Link>

        <div className="flex space-x-6">
          <Link 
            to="/menu" 
            className={`flex items-center space-x-1 hover:text-green-300 transition-colors ${
              location.pathname === '/menu' ? 'text-green-300' : 'text-green-400'
            }`}
          >
            <MenuIcon className="w-4 h-4" />
            <span className="corrupted-text">MENU</span>
          </Link>
          
          <Link 
            to="/reviews" 
            className={`flex items-center space-x-1 hover:text-green-300 transition-colors ${
              location.pathname === '/reviews' ? 'text-green-300' : 'text-green-400'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="corrupted-text">REVIEWS</span>
          </Link>
          
          <Link 
            to="/lost-and-found" 
            className={`flex items-center space-x-1 hover:text-green-300 transition-colors ${
              location.pathname === '/lost-and-found' ? 'text-green-300' : 'text-green-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="corrupted-text">LOST & FOUND</span>
          </Link>
          
          <Link 
            to="/checkout" 
            className={`flex items-center space-x-1 hover:text-green-300 transition-colors ${
              location.pathname === '/checkout' ? 'text-green-300' : 'text-green-400'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="corrupted-text">ORDER</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;