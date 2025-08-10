import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, AlertTriangle } from 'lucide-react';

interface LostItem {
  id: string;
  name: string;
  description: string;
  dateFound: string;
  location: string;
  isAbstract?: boolean;
  claimCode?: string;
}

const LostAndFound: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mysteriousItems, setMysteriousItems] = useState<LostItem[]>([]);
  const [glitchLevel, setGlitchLevel] = useState(0);

  const lostItems: LostItem[] = [
    {
      id: '1',
      name: 'A Forgotten Feeling',
      description: 'Warm, nostalgic sensation. Approximately 7 years old. Smells like summer rain and childhood innocence.',
      dateFound: 'Yesterday (but also next Tuesday)',
      location: 'Between the coffee beans and reality',
      isAbstract: true,
      claimCode: 'NOSTALGIA_404'
    },
    {
      id: '2',
      name: 'The Color Blue',
      description: 'Not the wavelength 475nm - the actual concept of blue. Slightly used. May contain traces of sadness.',
      dateFound: '2024-03-12',
      location: 'Quantum storage unit B-42',
      isAbstract: true,
      claimCode: 'WAVELENGTH_ERROR'
    },
    {
      id: '3',
      name: 'Three Seconds of Quiet',
      description: 'Pure silence from 3:33 AM on March 3rd. No ambient noise, no thoughts, just void. Handle with care.',
      dateFound: 'Never (it was always here)',
      location: 'The space between heartbeats',
      isAbstract: true,
      claimCode: 'SILENCE_OVERFLOW'
    },
    {
      id: '4',
      name: 'Someone\'s Lost Weekend',
      description: 'Saturday and Sunday, March 14-15, 2024. Contains fragments of missed opportunities and regret.',
      dateFound: 'Monday morning',
      location: 'The void where productivity goes to die',
      isAbstract: true,
      claimCode: 'WEEKEND_RECOVERY'
    },
    {
      id: '5',
      name: 'A Half-Remembered Dream',
      description: 'Involves flying, late for an exam, and your childhood pet speaking French. Very vivid but impossible to grasp.',
      dateFound: '4:27 AM',
      location: 'REM sleep sector 7',
      isAbstract: true,
      claimCode: 'DREAM_FRAGMENT'
    },
    {
      id: '6',
      name: 'The Perfect Comeback',
      description: 'What you should have said during that argument three years ago. Devastating wit included.',
      dateFound: 'Too late to matter',
      location: 'Shower thoughts archive',
      isAbstract: true,
      claimCode: 'HINDSIGHT_2020'
    },
    {
      id: '7',
      name: 'User Manual for Reality',
      description: 'Heavily damaged, missing critical pages. Warning labels illegible. No warranty information.',
      dateFound: '∞',
      location: 'Filing cabinet marked "IMPORTANT"',
      claimCode: 'RTFM_ERROR'
    },
    {
      id: '8',
      name: 'A Sense of Direction',
      description: 'Both literal and metaphorical. Slightly damaged from GPS overuse. May conflict with Apple Maps.',
      dateFound: 'When you least expect it',
      location: 'Lost somewhere on Route 404',
      claimCode: 'NAVIGATION_FAULT'
    },
    {
      id: '9',
      name: 'Last Thursday',
      description: 'The entire day. Events include lunch, a phone call, and an existential crisis at 2:47 PM.',
      dateFound: 'This Thursday',
      location: 'Time loop storage',
      isAbstract: true,
      claimCode: 'THURSDAY_RECURSION'
    },
    {
      id: '10',
      name: 'Your Keys (Actually)',
      description: 'Small, metallic, definitely important. Found in the last place you\'d think to look.',
      dateFound: 'Right now',
      location: 'Behind the couch cushions of reality',
      claimCode: 'KEYS_FOUND'
    }
  ];

  useEffect(() => {
    // Add mysterious items that appear randomly
    const interval = setInterval(() => {
      setGlitchLevel(Math.random());
      
      if (Math.random() > 0.9) {
        const mysteriousItem: LostItem = {
          id: 'mystery-' + Date.now(),
          name: '???',
          description: 'Item description corrupted. Viewing may cause temporal displacement.',
          dateFound: 'ERROR_DATE_NOT_FOUND',
          location: 'NULL_REFERENCE_EXCEPTION',
          isAbstract: true,
          claimCode: 'MYSTERY_' + Math.floor(Math.random() * 9999)
        };
        
        setMysteriousItems(prev => [...prev, mysteriousItem].slice(-3)); // Keep only last 3
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const allItems = [...lostItems, ...mysteriousItems];
  
  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClaim = (item: LostItem) => {
    const messages = [
      'Claim processed. Reality updated.',
      'Item transferred to your current dimension.',
      'ERROR: Item claimed by future self.',
      'Claim denied: Item doesn\'t exist yet.',
      'Processing... Please wait 3-5 business realities.',
      'Item successfully forgotten again.'
    ];
    
    alert(messages[Math.floor(Math.random() * messages.length)]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 glitch-text" data-text="LOST & FOUND.SYS">
        LOST & FOUND.SYS
      </h1>

      <div className="mb-8 bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
          <span className="font-bold text-yellow-400">DIMENSIONAL STORAGE NOTICE</span>
        </div>
        <p className="text-yellow-300 mb-4">
          Items in this section exist in quantum superposition between lost and found states. 
          Claiming an item may alter your personal timeline or cause reality synchronization errors.
        </p>
        <p className="text-yellow-300 text-sm">
          The Glitch Café is not responsible for items that were never lost, were lost by someone else, 
          or exist only in theoretical dimensions.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
          <input
            type="text"
            placeholder="Search for lost concepts, feelings, or objects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-green-400 border-opacity-30 rounded-lg pl-10 pr-4 py-3 text-green-300 placeholder-green-600 focus:border-green-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`border rounded-lg p-6 transition-all duration-500 hover:border-opacity-60 ${
              item.isAbstract
                ? 'bg-purple-400 bg-opacity-10 border-purple-400 border-opacity-30 hover:bg-opacity-20'
                : 'bg-green-400 bg-opacity-10 border-green-400 border-opacity-30 hover:bg-opacity-20'
            } ${glitchLevel > 0.8 ? 'digital-flicker' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <Package className={`w-6 h-6 flex-shrink-0 ${
                item.isAbstract ? 'text-purple-400' : 'text-green-400'
              }`} />
              {item.isAbstract && (
                <span className="bg-purple-400 text-black px-2 py-1 text-xs rounded">ABSTRACT</span>
              )}
            </div>

            <h3 className={`text-xl font-bold mb-3 ${
              item.isAbstract ? 'text-purple-300' : 'text-green-300'
            } ${item.name === '???' ? 'corrupted-text' : ''}`}>
              {item.name}
            </h3>

            <p className={`text-gray-200 mb-4 leading-relaxed ${
              item.description.includes('corrupted') ? 'glitch-text font-mono' : ''
            }`}>
              {item.description}
            </p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>Found: {item.dateFound}</span>
              </div>
              <div className="text-gray-400">
                <span className="font-bold">Location:</span> {item.location}
              </div>
              {item.claimCode && (
                <div className="text-gray-400 font-mono">
                  <span className="font-bold">Claim Code:</span> {item.claimCode}
                </div>
              )}
            </div>

            <button
              onClick={() => handleClaim(item)}
              className={`w-full py-2 px-4 font-bold rounded transition-colors ${
                item.isAbstract
                  ? 'bg-purple-400 text-black hover:bg-purple-300'
                  : 'bg-green-400 text-black hover:bg-green-300'
              }`}
            >
              CLAIM ITEM
            </button>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-300">CAN'T FIND WHAT YOU'RE LOOKING FOR?</h2>
        <p className="text-green-200 mb-4">
          Sometimes items exist in dimensions we haven't indexed yet. 
          Submit a request and we'll search across parallel realities.
        </p>
        <div className="space-y-2 text-sm text-gray-400">
          <p>Email: void@glitchcafe.null</p>
          <p>Phone: 1-800-NOT-REAL</p>
          <p>Interdimensional Fax: ∞∞∞-∞∞∞-∞∞∞∞</p>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-8 bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 p-6 rounded-lg text-center">
        <h3 className="font-bold text-red-400 mb-2">EMERGENCY CONTACT</h3>
        <p className="text-red-300 text-sm">
          If you've lost your sense of self, your memories, or your entire identity, 
          please contact our Reality Recovery Department immediately at: 
          <span className="font-mono ml-1">HELP@EXISTENTIAL.CRISIS</span>
        </p>
      </div>
    </div>
  );
};

export default LostAndFound;