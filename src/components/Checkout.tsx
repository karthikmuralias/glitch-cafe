import React, { useState, useEffect } from 'react';
import { ShoppingCart, CreditCard, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  reality: string;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(1);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    card: '',
    expiry: '',
    cvv: '',
    dimension: 'current'
  });

  const glitchyPrices = [99.99, 0.01, 404.04, -12.50, NaN, Infinity, 13.37, 66.60];
  const dimensions = ['Current Reality', 'Parallel Universe #42', 'The Void', 'Matrix Level 3', 'ERROR_DIMENSION'];

  useEffect(() => {
    // Initialize with some random items
    const initialItems: CartItem[] = [
      { id: '1', name: 'Temporal Tiramisu', price: 12.99, quantity: 1, reality: 'Current' },
      { id: '2', name: 'Glitch Latte', price: 6.75, quantity: 2, reality: 'Parallel #17' },
      { id: '3', name: 'Quantum Quiche', price: 11.50, quantity: 1, reality: 'Superposition' }
    ];
    setCartItems(initialItems);

    const calculatedTotal = initialItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(calculatedTotal);
    setDisplayTotal(calculatedTotal);

    // Glitch effects
    const interval = setInterval(() => {
      setGlitchIntensity(Math.random());
      
      // Randomly change displayed total
      if (Math.random() > 0.7) {
        const randomTotal = glitchyPrices[Math.floor(Math.random() * glitchyPrices.length)];
        setDisplayTotal(randomTotal);
        setTimeout(() => setDisplayTotal(calculatedTotal), 1000);
      }

      // Randomly glitch item names
      if (Math.random() > 0.8) {
        setCartItems(prev => prev.map(item => ({
          ...item,
          name: Math.random() > 0.5 ? item.name.replace(/[aeiou]/gi, '█') : item.name
        })));
        setTimeout(() => {
          setCartItems(prev => prev.map(item => ({
            ...item,
            name: item.name.replace(/█/g, Math.random() > 0.5 ? 'a' : 'e')
          })));
        }, 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const processOrder = () => {
    setStep(4);
    setOrderStatus('Processing...');

    const statusMessages = [
      'Initializing quantum transaction...',
      'Contacting payment dimension...',
      'Validating reality signature...',
      'Processing temporal transfer...',
      'Synchronizing with parallel banks...',
      'ERROR: Card declined in this universe',
      'Retrying in adjacent reality...',
      'Transaction successful in Universe #∞',
      'Order confirmed... for now.'
    ];

    let messageIndex = 0;
    const statusInterval = setInterval(() => {
      if (messageIndex < statusMessages.length - 1) {
        setOrderStatus(statusMessages[messageIndex]);
        messageIndex++;
      } else {
        setOrderStatus('Order confirmed... for now.');
        clearInterval(statusInterval);
        setStep(5);
      }
    }, 1500);
  };

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center text-green-400">
        <ShoppingCart className="w-6 h-6 mr-2" />
        YOUR CART.TEMP
      </h2>

      <div className="space-y-4 mb-6">
        {cartItems.map(item => (
          <div key={item.id} className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className={`font-bold text-green-300 ${glitchIntensity > 0.7 ? 'corrupted-text' : ''}`}>
                {item.name}
              </h3>
              <p className="text-gray-400 text-sm">Quantity: {item.quantity} | Reality: {item.reality}</p>
            </div>
            <div className="text-right">
              <span className="text-green-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-green-400 border-opacity-30 pt-4 mb-6">
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className="text-green-300">TOTAL:</span>
          <span className={`text-green-400 ${isNaN(displayTotal) ? 'corrupted-text' : ''}`}>
            ${isNaN(displayTotal) ? 'ERROR' : displayTotal.toFixed(2)}
          </span>
        </div>
        {displayTotal !== total && (
          <p className="text-red-400 text-sm mt-2">* Price subject to quantum fluctuations</p>
        )}
      </div>

      <button
        onClick={() => setStep(2)}
        className="w-full bg-green-400 text-black py-3 font-bold hover:bg-green-300 transition-colors"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-green-400">CUSTOMER INFORMATION</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-green-300 mb-2">Email Address (Current Reality)</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full bg-black border border-green-400 border-opacity-30 rounded p-3 text-green-300 focus:border-green-400 focus:outline-none"
            placeholder="your.email@reality.com"
          />
        </div>

        <div>
          <label className="block text-green-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full bg-black border border-green-400 border-opacity-30 rounded p-3 text-green-300 focus:border-green-400 focus:outline-none"
            placeholder="John Doe (or current identity)"
          />
        </div>

        <div>
          <label className="block text-green-300 mb-2">Delivery Dimension</label>
          <select
            value={formData.dimension}
            onChange={(e) => handleInputChange('dimension', e.target.value)}
            className="w-full bg-black border border-green-400 border-opacity-30 rounded p-3 text-green-300 focus:border-green-400 focus:outline-none"
          >
            {dimensions.map(dim => (
              <option key={dim} value={dim} className="bg-black">{dim}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-600 text-white py-3 font-bold hover:bg-gray-500 transition-colors"
        >
          BACK
        </button>
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-green-400 text-black py-3 font-bold hover:bg-green-300 transition-colors"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center text-green-400">
        <CreditCard className="w-6 h-6 mr-2" />
        PAYMENT INFORMATION
      </h2>

      <div className="bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-50 p-4 mb-6 rounded-lg">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="font-bold text-yellow-400">PAYMENT PROCESSOR WARNING</span>
        </div>
        <p className="text-yellow-300 text-sm">
          Payment processing occurs across multiple dimensions. Your card may be charged in parallel universes. 
          We are not responsible for temporal echoes or duplicate charges in alternate timelines.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-green-300 mb-2">Card Number</label>
          <input
            type="text"
            value={formData.card}
            onChange={(e) => handleInputChange('card', e.target.value)}
            className="w-full bg-black border border-green-400 border-opacity-30 rounded p-3 text-green-300 focus:border-green-400 focus:outline-none font-mono"
            placeholder="**** **** **** ****"
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-green-300 mb-2">Expiry Date</label>
            <input
              type="text"
              value={formData.expiry}
              onChange={(e) => handleInputChange('expiry', e.target.value)}
              className="w-full bg-black border border-green-400 border-opacity-30 rounded p-3 text-green-300 focus:border-green-400 focus:outline-none font-mono"
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-green-300 mb-2">CVV</label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              className="w-full bg-black border border-green-400 border-opacity-30 rounded p-3 text-green-300 focus:border-green-400 focus:outline-none font-mono"
              placeholder="***"
              maxLength={4}
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-600 text-white py-3 font-bold hover:bg-gray-500 transition-colors"
        >
          BACK
        </button>
        <button
          onClick={processOrder}
          className="flex-1 bg-red-400 text-black py-3 font-bold hover:bg-red-300 transition-colors"
        >
          PROCESS PAYMENT
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-4 text-green-400 glitch-text" data-text={orderStatus}>
          {orderStatus}
        </h2>
        <p className="text-gray-400">Please do not close this window or reality may become unstable...</p>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="text-center">
      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4 text-green-400">ORDER CONFIRMED</h2>
      <div className="bg-green-400 bg-opacity-10 border border-green-400 border-opacity-30 p-6 rounded-lg mb-6">
        <h3 className="font-bold mb-4 text-green-300">CONFIRMATION DETAILS</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>Order ID: GLT-{Math.floor(Math.random() * 999999)}-∞</p>
          <p>Estimated Delivery: {Math.random() > 0.5 ? 'Tomorrow' : 'Yesterday'}</p>
          <p>Reality Sync Status: {Math.random() > 0.5 ? 'SYNCHRONIZED' : 'PENDING'}</p>
          <p>Temporal Receipt: Will arrive 3 minutes ago</p>
        </div>
      </div>
      
      <div className="bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-50 p-4 rounded-lg mb-6">
        <p className="text-yellow-300 text-sm">
          Your order has been confirmed in this reality. If you exist in multiple dimensions, 
          you may receive duplicate orders. This is normal and part of the quantum delivery process.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-green-300">
          A confirmation email has been sent to your current timeline at: <strong>{formData.email}</strong>
        </p>
        <p className="text-gray-400 text-sm">
          If you don't receive it, check your parallel universe spam folder.
        </p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8 glitch-text" data-text="CHECKOUT.EXE">
        CHECKOUT.EXE
      </h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map(stepNumber => (
            <div key={stepNumber} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= stepNumber ? 'bg-green-400 text-black' : 'bg-gray-600 text-gray-400'
            }`}>
              {stepNumber}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-600 h-2 rounded">
          <div 
            className="bg-green-400 h-2 rounded transition-all duration-500" 
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-black border border-green-400 border-opacity-30 rounded-lg p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
      </div>

      {/* Footer Warning */}
      {step < 4 && (
        <div className="mt-8 bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-red-400 mr-2" />
            <span className="font-bold text-red-400">TEMPORAL CHECKOUT NOTICE</span>
          </div>
          <p className="text-red-300 text-sm">
            Orders placed during solar flares, lunar eclipses, or existential crises may experience 
            delivery delays or arrive before they were ordered. The Glitch Café is not responsible 
            for paradoxes created by early delivery.
          </p>
        </div>
      )}
    </div>
  );
};

export default Checkout;