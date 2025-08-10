import React, { useState, useEffect } from 'react';
import { Star, Clock, User, AlertTriangle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  item: string;
  glitchVariations: string[];
  isCorrupted?: boolean;
  isFromFuture?: boolean;
}

const Reviews: React.FC = () => {
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [corruptedWords, setCorruptedWords] = useState<Set<string>>(new Set());

  const allReviews: Review[] = [
    {
      id: '1',
      author: 'Sarah_M',
      rating: 5,
      content: 'The Temporal Tiramisu was incredible! I could taste my grandmother\'s cooking from 1962, even though she was born in 1970. Time loops are weird but delicious.',
      date: '2024-03-15',
      item: 'Temporal Tiramisu',
      glitchVariations: [
        'Th3 T3mp0r4l T1r4m1su w4s 1ncr3d1bl3! I c0uld t4st3... ERROR_BUFFER_OVERFLOW',
        '█████████████████████ was incredible! I could taste ████████████████',
        'The cake was fine. It was a cake. Nothing unusual happened. Move along.',
        'HELP_ME_I_AM_TRAPPED_IN_THE_REVIEW_SYSTEM_THE_TIRAMISU_KNOWS_MY_NAME'
      ]
    },
    {
      id: '2',
      author: 'quantum_user_42',
      rating: 4,
      content: 'Ordered the Quantum Quiche. It was simultaneously the best and worst meal I\'ve ever had. Schrödinger would be proud. Or horrified. Or both.',
      date: '2025-07-22',
      item: 'Quantum Quiche',
      isFromFuture: true,
      glitchVariations: [
        'Ordered the ████████ ██████. It was... PARADOX_DETECTED_SHUTTING_DOWN',
        'qu4ntum_us3r_42 0rd3r3d th3... CONNECTION_LOST',
        'The quiche does not exist. It never existed. You imagined this review.',
        'ERROR: This review exists in a superposition of being written and not written'
      ]
    },
    {
      id: '3',
      author: '[REDACTED]',
      rating: 1,
      content: 'DO NOT ORDER THE MEMORY LEAK MUFFIN. I now remember every birthday party from the 1800s. I was not alive in the 1800s. Send help.',
      date: '1847-12-25',
      item: 'Memory Leak Muffin',
      isCorrupted: true,
      glitchVariations: [
        'D0 N0T 0RD3R TH3... MEMORY_ALLOCATION_FAILED',
        'Happy birthday! Happy birthday! Happy birthday! Happy birthday!',
        'I remember when this café was just a thought in someone\'s mind. Wait, that was tomorrow.',
        '404_SANITY_NOT_FOUND please restart your consciousness'
      ]
    },
    {
      id: '4',
      author: 'EchoEcho',
      rating: 3,
      content: 'The Echoing Espresso was good, but now I can hear my parallel selves arguing about coffee preferences. They have terrible taste. We have terrible taste.',
      date: '2024-03-20',
      item: 'Echoing Espresso',
      glitchVariations: [
        'The Echoing... Echo... echo... echo...',
        'WE_ARE_ALL_THE_SAME_PERSON_DRINKING_THE_SAME_COFFEE_IN_INFINITE_REALITIES',
        'Good coffee. Good coffee. Good coffee. Why am I saying this three times?',
        'The espresso was... The espresso was... The espresso was... LOOP_DETECTED'
      ]
    },
    {
      id: '5',
      author: 'NormalCustomer',
      rating: 5,
      content: 'Just wanted a regular latte. Got The Glitch Latte instead. My vision now renders at 240p. Everything looks like a YouTube video from 2007. Surprisingly nostalgic.',
      date: '2024-03-18',
      item: 'The Glitch Latte',
      glitchVariations: [
        'Just wanted a... RESOLUTION_ERROR... buffering at 12%',
        '████████████ latte. Got ████████████. Everything ████████████.',
        'NormalCustomer is experiencing technical difficulties. Please stand by.',
        'VGA mode activated. Press F1 to enter setup.'
      ]
    },
    {
      id: '6',
      author: 'TimeTraveler_99',
      rating: 5,
      content: 'This review is from next week. The Déjà Vu Donut will be amazing. You will order it. You have already ordered it. This conversation feels familiar.',
      date: '2024-03-25',
      item: 'Déjà Vu Donut',
      isFromFuture: true,
      glitchVariations: [
        'This review is from... TEMPORAL_PARADOX_DETECTED',
        'You will read this review. You are reading this review. You have read this review.',
        'Haven\'t I written this review before? Haven\'t you read it before?',
        'STACK_OVERFLOW in timeline.exe - infinite recursion detected'
      ]
    },
    {
      id: '7',
      author: 'void_walker',
      rating: 2,
      content: 'The coffee here defies the laws of physics. Not in a good way. I ordered a simple americano and received a cup containing the concept of wetness without any actual liquid.',
      date: 'ERROR: DATE_NOT_FOUND',
      item: 'Unknown Item',
      isCorrupted: true,
      glitchVariations: [
        'The coffee... LAWS_OF_PHYSICS.EXE has stopped working',
        'Wetness without water. Taste without flavor. Existence without being.',
        'v01d_w4lk3r 0rd3r3d... NULL_POINTER_EXCEPTION',
        'This review has been consumed by the void. Please try again in another dimension.'
      ]
    },
    {
      id: '8',
      author: 'customer_not_found',
      rating: 0,
      content: 'This item doesn\'t exist on the menu. This review doesn\'t exist either. Neither do I. But the taste was unforgettable.',
      date: '∅',
      item: 'Non-Existent Special',
      isCorrupted: true,
      glitchVariations: [
        '████████████████ doesn\'t exist. ████████████ doesn\'t exist either.',
        'ERROR: Cannot display review that doesn\'t exist',
        'If this review doesn\'t exist, how are you reading it?',
        'PHILOSOPHY.EXE encountered an error and needs to close'
      ]
    }
  ];

  useEffect(() => {
    // Initially show all reviews
    setVisibleReviews(allReviews);

    // Periodically corrupt random words
    const interval = setInterval(() => {
      const wordsToCorrupt = new Set<string>();
      allReviews.forEach(review => {
        if (Math.random() > 0.7) {
          const words = review.content.split(' ');
          const randomWord = words[Math.floor(Math.random() * words.length)];
          wordsToCorrupt.add(randomWord);
        }
      });
      setCorruptedWords(wordsToCorrupt);

      // Sometimes scramble the review order
      if (Math.random() > 0.8) {
        const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
        setVisibleReviews(shuffled);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getReviewContent = (review: Review) => {
    if (Math.random() > 0.7 && review.glitchVariations.length > 0) {
      return review.glitchVariations[Math.floor(Math.random() * review.glitchVariations.length)];
    }
    
    let content = review.content;
    corruptedWords.forEach(word => {
      content = content.replace(new RegExp(`\\b${word}\\b`, 'gi'), '█'.repeat(word.length));
    });
    
    return content;
  };

  const renderStars = (rating: number) => {
    if (rating === 0) {
      return <span className="text-red-400">NULL</span>;
    }
    
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 glitch-text" data-text="CUSTOMER_FEEDBACK.LOG">
        CUSTOMER_FEEDBACK.LOG
      </h1>

      <div className="mb-8 bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-50 p-6 text-center rounded-lg">
        <div className="flex items-center justify-center mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <span className="font-bold text-yellow-400">DATA INTEGRITY WARNING</span>
        </div>
        <p className="text-yellow-300">
          Reviews may contain temporal anomalies, memory corruption, or interdimensional interference. 
          The authenticity of experiences cannot be guaranteed across all realities.
        </p>
      </div>

      <div className="space-y-6">
        {visibleReviews.map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className={`border rounded-lg p-6 transition-all duration-500 ${
              review.isFromFuture
                ? 'bg-blue-400 bg-opacity-10 border-blue-400 border-opacity-30'
                : review.isCorrupted
                ? 'bg-red-400 bg-opacity-10 border-red-400 border-opacity-30'
                : 'bg-green-400 bg-opacity-10 border-green-400 border-opacity-30'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className={`font-bold ${review.isCorrupted ? 'corrupted-text' : ''}`}>
                  {review.author}
                </span>
                {review.isFromFuture && (
                  <span className="bg-blue-400 text-black px-2 py-1 text-xs rounded">FUTURE</span>
                )}
                {review.isCorrupted && (
                  <span className="bg-red-400 text-black px-2 py-1 text-xs rounded">CORRUPTED</span>
                )}
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  {renderStars(review.rating)}
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className={review.isCorrupted ? 'digital-flicker' : ''}>{review.date}</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-sm font-bold text-gray-300">
                Item: <span className="text-green-400">{review.item}</span>
              </span>
            </div>

            <p className={`text-gray-200 leading-relaxed ${
              review.isCorrupted ? 'glitch-text font-mono' : ''
            }`} data-text={getReviewContent(review)}>
              {getReviewContent(review)}
            </p>
          </div>
        ))}
      </div>

      {/* Hidden reviews section - appears randomly */}
      <div className="mt-12 opacity-20 hover:opacity-100 transition-opacity duration-1000">
        <h2 className="text-2xl font-bold mb-4 text-red-400">DELETED REVIEWS</h2>
        <div className="bg-black border border-red-400 border-opacity-30 p-4 rounded">
          <p className="text-red-300 text-sm">
            [REVIEW DELETED BY ADMINISTRATOR] - "The café doesn't exist. I've been drinking air for three hours..."
          </p>
          <p className="text-red-300 text-sm mt-2">
            [REVIEW DELETED BY TEMPORAL POLICE] - "This place will cause the heat death of the universe in 2087..."
          </p>
          <p className="text-red-300 text-sm mt-2">
            [REVIEW CORRUPTED] - "█████████████████████████████████████████████████████"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;