import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import ItemPage from './components/ItemPage';
import SecretPage from './components/SecretPage';
import LostAndFound from './components/LostAndFound';
import Checkout from './components/Checkout';
import './glitch-effects.css';

function App() {
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className={`min-h-screen bg-black text-green-400 font-mono relative overflow-hidden ${glitchIntensity > 0.8 ? 'glitch-severe' : glitchIntensity > 0.5 ? 'glitch-medium' : 'glitch-light'}`}>
        {/* Digital noise background */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Scan lines */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-transparent scan-lines opacity-10"></div>

        <Navigation onSecretTrigger={() => setShowSecret(!showSecret)} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/lost-and-found" element={<LostAndFound />} />
          <Route path="/checkout" element={<Checkout />} />
          {showSecret && <Route path="/secret" element={<SecretPage />} />}
        </Routes>

        {/* Glitch overlay */}
        {glitchIntensity > 0.9 && (
          <div className="fixed inset-0 pointer-events-none">
            <div className="w-full h-full bg-red-500 opacity-20 animate-pulse"></div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;