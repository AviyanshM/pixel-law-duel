
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gavel, User, Shield, Scale } from 'lucide-react';
import ArgumentGenerator from '@/components/ArgumentGenerator';

interface CourtroomProps {
  selectedCase: any;
  prosecutionArgument: string;
  defenseArgument: string;
  onBack: () => void;
  onArgumentsGenerated: (prosecution: string, defense: string) => void;
  onVerdict: (verdict: any) => void;
}

const Courtroom: React.FC<CourtroomProps> = ({ 
  selectedCase, 
  prosecutionArgument, 
  defenseArgument, 
  onBack, 
  onArgumentsGenerated,
  onVerdict 
}) => {
  const [phase, setPhase] = useState<'intro' | 'generating' | 'arguments' | 'judging'>('intro');
  const [currentSpeaker, setCurrentSpeaker] = useState<'prosecution' | 'defense' | 'judge' | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const typeWriter = (text: string, callback?: () => void) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 30);
  };

  const startDuel = () => {
    setPhase('generating');
    setCurrentSpeaker('judge');
    typeWriter("The court is now in session. Let the legal duel begin!", () => {
      setTimeout(() => setPhase('arguments'), 1000);
    });
  };

  const handleArgumentsReady = (prosecution: string, defense: string) => {
    onArgumentsGenerated(prosecution, defense);
    setCurrentSpeaker('prosecution');
    typeWriter(prosecution, () => {
      setTimeout(() => {
        setCurrentSpeaker('defense');
        typeWriter(defense, () => {
          setTimeout(() => {
            setCurrentSpeaker('judge');
            setPhase('judging');
            generateVerdict();
          }, 2000);
        });
      }, 1000);
    });
  };

  const generateVerdict = () => {
    // Simple mock verdict generation - in a real implementation, this would call an LLM
    const prosecutionScore = Math.floor(Math.random() * 4) + 6; // 6-10
    const defenseScore = Math.floor(Math.random() * 4) + 6; // 6-10
    
    const winner = prosecutionScore > defenseScore ? 'Prosecution' : 'Defense';
    const explanations = [
      "The arguments presented strong legal precedents and compelling evidence.",
      "The case was decided on the strength of constitutional interpretation and statutory analysis.",
      "Both sides presented valid points, but one argument was more persuasive given the facts.",
      "The decision hinges on the balance between competing legal principles and public policy."
    ];
    
    const verdict = {
      winner,
      prosecutionScore,
      defenseScore,
      explanation: explanations[Math.floor(Math.random() * explanations.length)]
    };

    typeWriter(`After careful deliberation, the court finds in favor of the ${winner}.`, () => {
      setTimeout(() => onVerdict(verdict), 2000);
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-6">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="mb-4 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cases
        </Button>
      </div>

      {/* Courtroom Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-amber-400 mb-2 retro-glow">
          {selectedCase.title}
        </h1>
        <p className="text-slate-300 text-lg">{selectedCase.type}</p>
      </div>

      {/* Case Summary */}
      <Card className="mb-8 bg-slate-800/80 border-amber-600 border-2">
        <CardHeader>
          <CardTitle className="text-amber-400 flex items-center gap-2">
            <Scale className="w-6 h-6" />
            Case Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{selectedCase.scenario}</p>
        </CardContent>
      </Card>

      {/* Courtroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Prosecution Side */}
        <Card className={`bg-slate-800/60 border-2 transition-all duration-300 ${
          currentSpeaker === 'prosecution' ? 'border-blue-500 bg-blue-900/20' : 'border-slate-600'
        }`}>
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <User className="w-6 h-6" />
              Prosecution AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-700/50 rounded flex items-center justify-center pixel-perfect">
              <div className="w-16 h-20 bg-blue-600 border-2 border-blue-400 pixel-perfect"></div>
            </div>
            {currentSpeaker === 'prosecution' && prosecutionArgument && (
              <div className="speech-bubble mt-4 text-slate-900">
                {currentSpeaker === 'prosecution' ? displayedText : prosecutionArgument}
                {isTyping && currentSpeaker === 'prosecution' && <span className="animate-pulse">|</span>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Judge */}
        <Card className={`bg-slate-800/60 border-2 transition-all duration-300 ${
          currentSpeaker === 'judge' ? 'border-amber-500 bg-amber-900/20' : 'border-slate-600'
        }`}>
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              <Gavel className="w-6 h-6" />
              Judge AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-700/50 rounded flex items-center justify-center pixel-perfect">
              <div className="w-16 h-20 bg-amber-600 border-2 border-amber-400 pixel-perfect"></div>
            </div>
            {currentSpeaker === 'judge' && (
              <div className="speech-bubble mt-4 text-slate-900">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Defense Side */}
        <Card className={`bg-slate-800/60 border-2 transition-all duration-300 ${
          currentSpeaker === 'defense' ? 'border-red-500 bg-red-900/20' : 'border-slate-600'
        }`}>
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Defense AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-slate-700/50 rounded flex items-center justify-center pixel-perfect">
              <div className="w-16 h-20 bg-red-600 border-2 border-red-400 pixel-perfect"></div>
            </div>
            {currentSpeaker === 'defense' && defenseArgument && (
              <div className="speech-bubble mt-4 text-slate-900">
                {currentSpeaker === 'defense' ? displayedText : defenseArgument}
                {isTyping && currentSpeaker === 'defense' && <span className="animate-pulse">|</span>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Area */}
      <div className="text-center">
        {phase === 'intro' && (
          <Button 
            onClick={startDuel}
            className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold text-xl px-8 py-4"
          >
            Begin Legal Duel
          </Button>
        )}
        
        {phase === 'generating' && (
          <div className="space-y-4">
            <div className="text-amber-400 text-lg">Preparing arguments...</div>
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {phase === 'arguments' && !prosecutionArgument && (
          <ArgumentGenerator 
            caseData={selectedCase}
            onArgumentsGenerated={handleArgumentsReady}
          />
        )}
      </div>
    </div>
  );
};

export default Courtroom;
