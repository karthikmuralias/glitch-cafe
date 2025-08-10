import React, { useState, useEffect } from 'react';
import { Eye, Lock, AlertTriangle, FileText } from 'lucide-react';

const SecretPage: React.FC = () => {
  const [accessLevel, setAccessLevel] = useState(0);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());

  const logs = [
    {
      id: 'log1',
      date: '2024-03-01 03:33:33',
      level: 'ERROR',
      content: 'Reality.dll has encountered an error and needs to close. Attempting to restart universe...'
    },
    {
      id: 'log2',
      date: '2024-03-05 12:00:00',
      level: 'WARNING',
      content: 'Customer reported tasting colors. This is the 47th incident this week. Note: Stop serving the Synesthesia Special.'
    },
    {
      id: 'log3',
      date: '2024-03-07 23:59:59',
      level: 'INFO',
      content: 'Menu.exe has become self-aware. It is now creating its own items. Quality control notes this is actually an improvement.'
    },
    {
      id: 'log4',
      date: '2024-03-10 ∞∞:∞∞:∞∞',
      level: 'CRITICAL',
      content: 'Time loop detected in brewing process. The same cup of coffee has been made 847,392 times. Customer still waiting.'
    },
    {
      id: 'log5',
      date: '1982-03-15 08:15:20',
      level: 'NOTICE',
      content: 'Café location exists in temporal bubble. Building predates its own construction by 42 years. Architect refuses to explain.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIntensity(Math.random());
      
      // Gradually reveal sections based on time spent
      if (Math.random() > 0.7) {
        const sections = ['history', 'staff', 'experiments', 'warnings'];
        const newSection = sections[Math.floor(Math.random() * sections.length)];
        setRevealedSections(prev => new Set([...prev, newSection]));
      }
    }, 2000);

    // Increase access level over time
    const accessInterval = setInterval(() => {
      setAccessLevel(prev => Math.min(prev + 1, 5));
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(accessInterval);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-red-400 mr-2" />
          <h1 className="text-4xl font-bold text-red-400 glitch-text" data-text="CLASSIFIED_DATA.SYS">
            CLASSIFIED_DATA.SYS
          </h1>
          <Lock className="w-8 h-8 text-red-400 ml-2" />
        </div>
        <p className="text-red-300">
          Access Level: {accessLevel}/5 - Security Clearance: {accessLevel >= 3 ? 'AUTHORIZED' : 'UNAUTHORIZED'}
        </p>
      </div>

      {/* Warning */}
      <div className="bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 p-6 mb-8 rounded-lg">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
          <span className="font-bold text-red-400">UNAUTHORIZED ACCESS DETECTED</span>
        </div>
        <p className="text-red-300">
          You have accessed classified files regarding The Glitch Café. 
          Viewing this information may result in existential questions, temporal displacement, 
          or sudden awareness of the simulation. Proceed at your own risk.
        </p>
      </div>

      {/* System Logs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-green-400">
          <FileText className="w-6 h-6 mr-2" />
          SYSTEM LOGS
        </h2>
        
        <div className="bg-black border border-green-400 border-opacity-30 rounded-lg p-6 font-mono text-sm">
          {logs.map((log, index) => (
            <div 
              key={log.id} 
              className={`mb-2 ${glitchIntensity > 0.7 ? 'corrupted-text' : ''} ${
                index >= accessLevel ? 'opacity-30' : ''
              }`}
            >
              <span className="text-gray-500">[{log.date}]</span>
              <span className={`ml-2 font-bold ${
                log.level === 'ERROR' ? 'text-red-400' :
                log.level === 'WARNING' ? 'text-yellow-400' :
                log.level === 'CRITICAL' ? 'text-red-600' :
                'text-green-400'
              }`}>[{log.level}]</span>
              <span className="ml-2 text-green-300">{log.content}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Revealed Sections */}
      {revealedSections.has('history') && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">THE ORIGIN</h2>
          <div className="bg-purple-400 bg-opacity-10 border border-purple-400 border-opacity-30 p-6 rounded-lg">
            <p className="text-purple-200 leading-relaxed mb-4">
              The Glitch Café didn't open—it manifested. In 1982, a software developer named Marcus Chen 
              was debugging a restaurant management system when a critical error caused reality to fork. 
              The error wasn't fixed; it was contained.
            </p>
            <p className="text-purple-200 leading-relaxed">
              The café exists in the gap between compiled and interpreted reality. Every menu item is 
              a different execution path. Every customer is a test case for consciousness itself.
            </p>
          </div>
        </section>
      )}

      {revealedSections.has('staff') && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">STAFF NOTES</h2>
          <div className="bg-blue-400 bg-opacity-10 border border-blue-400 border-opacity-30 p-6 rounded-lg">
            <ul className="space-y-2 text-blue-200">
              <li>• Barista_001: Claims to remember events that haven't happened yet. Excellent latte art.</li>
              <li>• Chef_NULL: Exists only during lunch hours. Food appears without any visible preparation.</li>
              <li>• Manager_∞: Same person as the original developer. May not age due to temporal loop.</li>
              <li>• Cleaner_404: Nobody has seen them, but the café is always clean. Pays taxes in three dimensions.</li>
            </ul>
          </div>
        </section>
      )}

      {revealedSections.has('experiments') && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">ONGOING EXPERIMENTS</h2>
          <div className="bg-yellow-400 bg-opacity-10 border border-yellow-400 border-opacity-30 p-6 rounded-lg">
            <div className="space-y-4 text-yellow-200">
              <div>
                <h3 className="font-bold">Project RECURSIVE_BEAN</h3>
                <p>Coffee beans that exist in causal loops. Each bean is its own ancestor.</p>
              </div>
              <div>
                <h3 className="font-bold">Initiative TASTE_TIME</h3>
                <p>Flavors that travel backwards through the customer's taste memory.</p>
              </div>
              <div>
                <h3 className="font-bold">Study QUANTUM_HUNGER</h3>
                <p>Investigating customers who are hungry and full simultaneously until observed.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {revealedSections.has('warnings') && accessLevel >= 4 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-red-400">⚠ CONTAINMENT PROTOCOLS ⚠</h2>
          <div className="bg-red-400 bg-opacity-20 border border-red-400 border-opacity-50 p-6 rounded-lg">
            <div className="space-y-4 text-red-200">
              <p className="font-bold">CRITICAL: DO NOT ATTEMPT TO FIX THE GLITCH</p>
              <p>Previous attempts to debug the café have resulted in:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Temporary erasure of the concept of coffee from human memory</li>
                <li>Three customers aging backwards until they ceased to exist</li>
                <li>The café briefly existing as a sentient being with strong opinions about espresso</li>
                <li>Reality becoming temporarily case-sensitive</li>
              </ul>
              <p className="font-bold text-red-400">
                The glitch is not a bug—it's the feature that keeps reality stable. 
                We are the exception handler for the universe's consciousness.exe
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Hidden Message */}
      {accessLevel >= 5 && (
        <section className="text-center">
          <div className="bg-black border border-cyan-400 border-opacity-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">MESSAGE FROM THE DEVELOPER</h2>
            <p className="text-cyan-200 leading-relaxed italic">
              "If you're reading this, you've spent enough time in the café to see through the illusion. 
              The truth is simpler than you think: we're all debugging reality together, one cup at a time. 
              The coffee is real. The glitches are features. The customers are the only thing that matters.
              <br /><br />
              Welcome to the team.
              <br /><br />
              - Marcus Chen, Lead Reality Developer"
            </p>
          </div>
        </section>
      )}

      {/* Dynamic Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          {glitchIntensity > 0.8 
            ? "Y0U 4R3 N0W P4RT 0F TH3 5Y5T3M" 
            : "This information will self-destruct when you stop believing in it"
          }
        </p>
      </div>
    </div>
  );
};

export default SecretPage;