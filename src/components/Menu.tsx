import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Utensils, Clock } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  glitchVariations: {
    names: string[];
    descriptions: string[];
    prices: string[];
  };
}

const Menu: React.FC = () => {
  const [currentSecond, setCurrentSecond] = useState(0);
  const [glitchingItems, setGlitchingItems] = useState<Set<string>>(new Set());

  const menuItems: MenuItem[] = [
    {
      id: 'temporal-tiramisu',
      name: 'Temporal Tiramisu',
      description: 'Layers of time-soaked ladyfingers with dimension-hopping mascarpone',
      price: '$12.99',
      category: 'desserts',
      glitchVariations: {
        names: ['T3MP0R4L T1R4M1SU', '████████ ████████', 'VOID CAKE', 'ERROR_DESSERT.EXE'],
        descriptions: [
          'Undefined memory allocation in taste_buffer.cpp',
          'Flavors that remember you before you taste them',
          'WARNING: May cause temporal loops in digestive system',
          'CORRUPTED_DATA_CORRUPTED_DATA_CORRUPTED'
        ],
        prices: ['$∞.99', '$ERROR', '$12.█9', 'PRICELESS']
      }
    },
    {
      id: 'deja-vu-donut',
      name: 'Déjà Vu Donut',
      description: 'A circular pastry that tastes familiar yet entirely new',
      price: '$8.50',
      category: 'desserts',
      glitchVariations: {
        names: ['Déjà Vu Donut', 'D3J4 VU D0NUT', '◯◯◯◯◯◯◯◯', 'RECURSIVE_PASTRY'],
        descriptions: [
          'A circular pastry that tastes familiar yet entirely new',
          'Haven\'t you ordered this before? You will.',
          'ERROR: Stack overflow in memory.taste',
          'Infinite loop detected in flavor profile'
        ],
        prices: ['$8.50', '$8.50', '$8.50', '$8.50']
      }
    },
    {
      id: 'echoing-espresso',
      name: 'Echoing Espresso',
      description: 'Single origin beans that whisper secrets from parallel dimensions',
      price: '$4.25',
      category: 'coffee',
      glitchVariations: {
        names: ['Echo Echo Echo Espresso', '3CH01NG 35PR3550', 'SIGNAL_LOST', 'QUANTUM_CAFFEINE'],
        descriptions: [
          'Hello... Hello... Hello... from the void',
          'Beans harvested from the space between realities',
          'Connection timeout: Unable to reach taste servers',
          'Side effects include hearing colors and seeing sounds'
        ],
        prices: ['$4.25', '$?.??', '$4.25', 'UNDEFINED']
      }
    },
    {
      id: 'glitch-latte',
      name: 'The Glitch Latte',
      description: 'Milk foam art that changes patterns as you watch',
      price: '$6.75',
      category: 'coffee',
      glitchVariations: {
        names: ['The Gli7ch L4773', '███ █████ █████', 'SYNTAX_ERROR_LATTE', 'NULL_REFERENCE_MILK'],
        descriptions: [
          'Foam art rendering failed - displaying default pattern',
          'Art.exe has stopped working',
          'Milk exists in quantum superposition until observed',
          'WARNING: Pattern may induce hypnotic trance'
        ],
        prices: ['$6.█5', '$NaN', '$6.75', 'CALCULATING...']
      }
    },
    {
      id: 'memory-leak-muffin',
      name: 'Memory Leak Muffin',
      description: 'Each bite reveals a forgotten childhood memory',
      price: '$5.99',
      category: 'food',
      glitchVariations: {
        names: ['Memory L3ak Muff1n', 'NOSTALGIA.BAKED', '404_MUFFIN_NOT_FOUND', 'CHILDHOOD.COMPRESSED'],
        descriptions: [
          'malloc() failed - unable to allocate memory for taste',
          'Contains traces of your first birthday party',
          'May cause unexpected emotional responses',
          'WARNING: Some memories may not be your own'
        ],
        prices: ['$5.99', '$FREE*', '$ERROR', '$5.99']
      }
    },
    {
      id: 'quantum-quiche',
      name: 'Quantum Quiche',
      description: 'Simultaneously hot and cold until you take the first bite',
      price: '$11.50',
      category: 'food',
      glitchVariations: {
        names: ['Qu4ntum Qu1ch3', 'SCHRÖDINGER_BREAKFAST', '██████ ██████', 'WAVE_FUNCTION_COLLAPSED'],
        descriptions: [
          'Observation changes the flavor - Heisenberg principle applies',
          'Exists in all possible states until consumed',
          'CRITICAL ERROR: Reality.exe has encountered a problem',
          'Taste may vary depending on parallel universe'
        ],
        prices: ['$11.50', '$∞/-∞', '$11.█0', 'PROBABILITY: HIGH']
      }
    }
  ];

  const specialOfTheSecond = {
    names: [
      'Chaos Coffee',
      'Void Cappuccino', 
      'Digital Darkness',
      'Binary Brew',
      'Matrix Mocha',
      'Pixel Poison',
      'System Crash Smoothie',
      'Buffer Overflow Beverage',
      'Null Pointer Latte',
      'Stack Overflow Smoothie'
    ],
    descriptions: [
      'Brewed from the tears of crashed servers',
      'Tastes like the absence of light',
      'Liquid data streams with a hint of corruption',
      'Made from ground zeros and ones',
      'See through the illusion of flavor',
      'RGB values translated to taste',
      'Contains 100% organic system failures',
      'Overflows with unhandled exceptions',
      'Points to flavor that doesn\'t exist',
      'Recursively delicious until memory runs out'
    ],
    prices: ['$∞.99', '$0.00', '$404.ERR', '$NaN', '$UNDEFINED', '$NULL', '$?.??', '$-1.00', '$OVERFLOW', '$EXCEPTION']
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecond(prev => prev + 1);
      
      // Randomly glitch some items
      const itemsToGlitch = new Set<string>();
      menuItems.forEach(item => {
        if (Math.random() > 0.7) {
          itemsToGlitch.add(item.id);
        }
      });
      setGlitchingItems(itemsToGlitch);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getItemDisplay = (item: MenuItem) => {
    if (glitchingItems.has(item.id) && Math.random() > 0.5) {
      const variations = item.glitchVariations;
      return {
        name: variations.names[Math.floor(Math.random() * variations.names.length)],
        description: variations.descriptions[Math.floor(Math.random() * variations.descriptions.length)],
        price: variations.prices[Math.floor(Math.random() * variations.prices.length)]
      };
    }
    return item;
  };

  const getCurrentSpecial = () => {
    const index = currentSecond % specialOfTheSecond.names.length;
    return {
      name: specialOfTheSecond.names[index],
      description: specialOfTheSecond.descriptions[index],
      price: specialOfTheSecond.prices[index]
    };
  };

  const special = getCurrentSpecial();

  const coffeeItems = menuItems.filter(item => item.category === 'coffee');
  const foodItems = menuItems.filter(item => item.category === 'food');
  const dessertItems = menuItems.filter(item => item.category === 'desserts');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 glitch-text" data-text="MENU.EXE">
        MENU.EXE
      </h1>

      {/* Special of the Second */}
      <div className="mb-12 bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-red-400">
          <Clock className="w-6 h-6 mr-2" />
          SPECIAL OF THE SECOND
        </h2>
        <div className="bg-black p-4 rounded border border-red-400 border-opacity-30">
          <h3 className="text-xl font-bold text-red-300 corrupted-text">{special.name}</h3>
          <p className="text-red-200 mb-2">{special.description}</p>
          <span className="text-2xl font-bold text-red-400">{special.price}</span>
        </div>
      </div>

      {/* Coffee Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center text-green-400">
          <Coffee className="w-8 h-8 mr-3" />
          <span className="corrupted-text">LIQUID CONSCIOUSNESS</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coffeeItems.map(item => {
            const display = getItemDisplay(item);
            return (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-6 rounded-lg hover:border-opacity-60 transition-all hover:bg-opacity-20"
              >
                <h3 className="text-xl font-bold mb-2 text-green-300 glitch-text" data-text={display.name}>
                  {display.name}
                </h3>
                <p className="text-green-200 mb-4">{display.description}</p>
                <span className="text-2xl font-bold text-green-400">{display.price}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Food Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-400">
          <Utensils className="w-8 h-8 mr-3" />
          <span className="corrupted-text">SOLID STATE SUSTENANCE</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foodItems.map(item => {
            const display = getItemDisplay(item);
            return (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="bg-blue-400 bg-opacity-10 border border-blue-400 border-opacity-30 p-6 rounded-lg hover:border-opacity-60 transition-all hover:bg-opacity-20"
              >
                <h3 className="text-xl font-bold mb-2 text-blue-300 glitch-text" data-text={display.name}>
                  {display.name}
                </h3>
                <p className="text-blue-200 mb-4">{display.description}</p>
                <span className="text-2xl font-bold text-blue-400">{display.price}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Desserts Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center text-purple-400">
          <Coffee className="w-8 h-8 mr-3" />
          <span className="corrupted-text">SWEETNESS PROTOCOLS</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dessertItems.map(item => {
            const display = getItemDisplay(item);
            return (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="bg-purple-400 bg-opacity-10 border border-purple-400 border-opacity-30 p-6 rounded-lg hover:border-opacity-60 transition-all hover:bg-opacity-20"
              >
                <h3 className="text-xl font-bold mb-2 text-purple-300 glitch-text" data-text={display.name}>
                  {display.name}
                </h3>
                <p className="text-purple-200 mb-4">{display.description}</p>
                <span className="text-2xl font-bold text-purple-400">{display.price}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Warning */}
      <div className="bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-50 p-6 text-center rounded-lg">
        <p className="text-yellow-300">
          ⚠ Menu items subject to quantum fluctuations. Actual items may vary from displayed information. 
          The Glitch Café is not responsible for items that may not exist in your current reality. ⚠
        </p>
      </div>
    </div>
  );
};

export default Menu;