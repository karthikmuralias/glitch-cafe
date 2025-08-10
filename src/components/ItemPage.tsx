import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Zap } from 'lucide-react';

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [glitchLevel, setGlitchLevel] = useState(0);

  const items = {
    'temporal-tiramisu': {
      name: 'Temporal Tiramisu',
      description: 'Layers of time-soaked ladyfingers with dimension-hopping mascarpone',
      price: '$12.99',
      effects: {
        title: 'TEMPORAL DISPLACEMENT EFFECTS',
        description: 'Upon consumption, subjects report experiencing memories that haven\'t happened yet. Time perception becomes fluid, with minutes stretching into hours and hours compressing into seconds.',
        visual: 'time-distortion',
        audio: 'ticking-clocks',
        symptoms: [
          'Prophetic dreams about mundane events',
          'Ability to remember next Tuesday',
          'Chronological confusion lasting 24-48 hours',
          'Spontaneous knowledge of historical events that were erased',
          'Temporary ability to taste colors from the future'
        ]
      }
    },
    'deja-vu-donut': {
      name: 'Déjà Vu Donut',
      description: 'A circular pastry that tastes familiar yet entirely new',
      price: '$8.50',
      effects: {
        title: 'RECURSIVE MEMORY LOOPS',
        description: 'This item creates feedback loops in the consumer\'s memory centers. Each bite triggers the sensation that you\'ve eaten this exact donut before, in this exact location, having this exact thought.',
        visual: 'recursive-loop',
        audio: 'echo-chamber',
        symptoms: [
          'Persistent feeling of repetition',
          'Conversations that feel pre-scripted',
          'Inability to distinguish between similar experiences',
          'Dreams that repeat on a 3.7-hour cycle',
          'Compulsive need to finish sentences before others speak them'
        ]
      }
    },
    'echoing-espresso': {
      name: 'Echoing Espresso',
      description: 'Single origin beans that whisper secrets from parallel dimensions',
      price: '$4.25',
      effects: {
        title: 'AUDITORY DIMENSIONAL BLEEDING',
        description: 'The caffeine opens neural pathways to adjacent realities. Consumers report hearing conversations happening in parallel versions of their life, along with occasional glimpses of alternate decisions.',
        visual: 'echo-waves',
        audio: 'whispers-loop',
        symptoms: [
          'Hearing your own voice from other dimensions',
          'Auditory hallucinations of conversations that almost happened',
          'Ability to eavesdrop on parallel selves',
          'Words echoing in languages that don\'t exist',
          'Temporary synesthesia: hearing colors, seeing sounds'
        ]
      }
    },
    'glitch-latte': {
      name: 'The Glitch Latte',
      description: 'Milk foam art that changes patterns as you watch',
      price: '$6.75',
      effects: {
        title: 'VISUAL REALITY CORRUPTION',
        description: 'The foam art serves as a gateway to visual distortions. The patterns in the milk seem to extend into the environment, creating a persistent sense that reality itself is rendering incorrectly.',
        visual: 'visual-corruption',
        audio: 'static-interference',
        symptoms: [
          'Seeing pixels in analog environments',
          'Foam patterns appearing on other surfaces',
          'Reality occasionally buffering at 12% complete',
          'Textures loading at different resolutions',
          'Peripheral vision showing UI elements that shouldn\'t exist'
        ]
      }
    },
    'memory-leak-muffin': {
      name: 'Memory Leak Muffin',
      description: 'Each bite reveals a forgotten childhood memory',
      price: '$5.99',
      effects: {
        title: 'MEMORY ALLOCATION ERRORS',
        description: 'This muffin causes uncontrolled access to archived memories, often from ages 3-7. However, the memories may not all be your own - some appear to be from a shared consciousness backup.',
        visual: 'memory-fragments',
        audio: 'childhood-echoes',
        symptoms: [
          'Remembering birthday parties you never attended',
          'Vivid recall of learning to walk (multiple times)',
          'Nostalgia for toys that were discontinued before your birth',
          'Ability to recite nursery rhymes in dead languages',
          'Sudden expertise in playground politics from the 1800s'
        ]
      }
    },
    'quantum-quiche': {
      name: 'Quantum Quiche',
      description: 'Simultaneously hot and cold until you take the first bite',
      price: '$11.50',
      effects: {
        title: 'QUANTUM SUPERPOSITION SYNDROME',
        description: 'Consumption collapses the wave function of reality in a 3-foot radius around the subject. Multiple possible outcomes of recent decisions become simultaneously visible until observation forces a single timeline.',
        visual: 'quantum-interference',
        audio: 'probability-waves',
        symptoms: [
          'Seeing multiple versions of the same conversation',
          'Existing in several states simultaneously',
          'Schrödinger\'s appetite: hungry and full until observed',
          'Ability to taste all possible flavor combinations at once',
          'Temporary omniscience limited to breakfast decisions'
        ]
      }
    }
  };

  const currentItem = items[id as keyof typeof items];

  useEffect(() => {
    if (!currentItem) return;

    // Apply visual effects based on item
    const intervalId = setInterval(() => {
      setGlitchLevel(Math.random());
    }, 500);

    // Create audio context for sound effects
    let audioContext: AudioContext;
    let oscillator: OscillatorNode;

    const playAudio = () => {
      if (!audioPlaying && typeof window !== 'undefined') {
        setAudioPlaying(true);
        try {
          audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Different audio patterns for different items
          switch (currentItem.effects.audio) {
            case 'ticking-clocks':
              oscillator.frequency.value = 440;
              oscillator.type = 'square';
              gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
              break;
            case 'echo-chamber':
              oscillator.frequency.value = 220;
              oscillator.type = 'sawtooth';
              gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
              break;
            case 'whispers-loop':
              oscillator.frequency.value = 110;
              oscillator.type = 'sine';
              gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
              break;
            default:
              oscillator.frequency.value = 330;
              oscillator.type = 'triangle';
              gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
          }
          
          oscillator.start();
          
          setTimeout(() => {
            oscillator.stop();
            setAudioPlaying(false);
          }, 3000);
        } catch (error) {
          setAudioPlaying(false);
        }
      }
    };

    // Auto-play audio effect after 2 seconds
    const audioTimeout = setTimeout(playAudio, 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(audioTimeout);
      if (oscillator) {
        try {
          oscillator.stop();
        } catch (error) {
          // Oscillator already stopped
        }
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [currentItem, audioPlaying]);

  if (!currentItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400 glitch-text" data-text="ERROR 404">
            ERROR 404
          </h1>
          <p className="text-red-300 mb-6">Item not found in current reality</p>
          <Link to="/menu" className="text-green-400 hover:text-green-300 flex items-center justify-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  const getVisualEffectClass = () => {
    switch (currentItem.effects.visual) {
      case 'time-distortion':
        return glitchLevel > 0.7 ? 'animate-pulse' : '';
      case 'recursive-loop':
        return 'pixel-shift';
      case 'echo-waves':
        return glitchLevel > 0.5 ? 'glitch-severe' : 'glitch-light';
      case 'visual-corruption':
        return 'digital-flicker';
      case 'memory-fragments':
        return glitchLevel > 0.6 ? 'corrupted-text' : '';
      case 'quantum-interference':
        return glitchLevel > 0.8 ? 'glitch-severe' : 'glitch-medium';
      default:
        return '';
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${getVisualEffectClass()}`}>
      <Link 
        to="/menu" 
        className="text-green-400 hover:text-green-300 flex items-center space-x-2 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>← Back to Menu</span>
      </Link>

      <div className="max-w-4xl mx-auto">
        {/* Item Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 glitch-text" data-text={currentItem.name}>
            {currentItem.name}
          </h1>
          <p className="text-xl text-green-300 mb-6">{currentItem.description}</p>
          <div className="text-3xl font-bold text-green-400">{currentItem.price}</div>
        </div>

        {/* Effects Section */}
        <div className="bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            {currentItem.effects.title}
          </h2>
          
          <div className="bg-black p-6 rounded border border-red-400 border-opacity-30 mb-6">
            <p className="text-red-200 text-lg leading-relaxed">{currentItem.effects.description}</p>
          </div>

          <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            DOCUMENTED SIDE EFFECTS:
          </h3>
          
          <ul className="space-y-2">
            {currentItem.effects.symptoms.map((symptom, index) => (
              <li key={index} className="text-red-200 flex items-start">
                <span className="text-red-400 mr-2">▸</span>
                <span className={glitchLevel > 0.6 ? 'corrupted-text' : ''}>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Audio Control */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              if (!audioPlaying) {
                setAudioPlaying(true);
                // Audio logic handled in useEffect
              }
            }}
            disabled={audioPlaying}
            className="bg-green-400 text-black px-6 py-3 font-bold hover:bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {audioPlaying ? 'EXPERIENCING SIDE EFFECTS...' : 'TRIGGER AUDIO EFFECTS'}
          </button>
        </div>

        {/* Order Button */}
        <div className="text-center">
          <Link
            to="/checkout"
            className="bg-red-400 text-black px-8 py-4 text-lg font-bold hover:bg-red-300 transition-all inline-block"
          >
            ORDER AT YOUR OWN RISK
          </Link>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-50 p-6 text-center rounded-lg">
          <p className="text-yellow-300 text-sm">
            The Glitch Café is not responsible for reality fragmentation, temporal displacement, 
            existential crises, or interdimensional incidents resulting from consumption of this item. 
            Please consume responsibly within your current timeline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;