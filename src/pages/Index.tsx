
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gavel, Scale, Users, Zap } from 'lucide-react';
import CaseSelection from '@/components/CaseSelection';
import Courtroom from '@/components/Courtroom';
import ArgumentGenerator from '@/components/ArgumentGenerator';

const Index = () => {
  const [gameState, setGameState] = useState<'menu' | 'case-selection' | 'courtroom' | 'verdict'>('menu');
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [prosecutionArgument, setProsecutionArgument] = useState('');
  const [defenseArgument, setDefenseArgument] = useState('');
  const [verdict, setVerdict] = useState<any>(null);

  const handleCaseSelect = (caseData: any) => {
    setSelectedCase(caseData);
    setGameState('courtroom');
  };

  const handleArgumentsGenerated = (prosecution: string, defense: string) => {
    setProsecutionArgument(prosecution);
    setDefenseArgument(defense);
  };

  const handleVerdict = (verdictData: any) => {
    setVerdict(verdictData);
    setGameState('verdict');
  };

  const resetGame = () => {
    setGameState('menu');
    setSelectedCase(null);
    setProsecutionArgument('');
    setDefenseArgument('');
    setVerdict(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-amber-900 text-foreground pixel-perfect">
      {gameState === 'menu' && (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Gavel className="w-16 h-16 text-amber-400 mr-4 retro-glow" />
              <h1 className="text-6xl font-bold retro-glow text-amber-400 tracking-wider">
                LEXICON DUEL
              </h1>
            </div>
            <p className="text-xl text-amber-200 mb-2">The Legal Argument Simulator</p>
            <p className="text-lg text-slate-300">Where AI Lawyers Battle in Pixel Court</p>
          </div>

          <Card className="w-full max-w-2xl bg-slate-800/80 border-amber-600 border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-amber-400 flex items-center justify-center gap-2">
                <Scale className="w-8 h-8" />
                Choose Your Arena
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-slate-700/50 rounded border border-slate-600 hover:border-amber-500 transition-colors">
                  <Users className="w-12 h-12 text-blue-400 mb-2" />
                  <h3 className="text-lg font-semibold text-slate-200">AI vs AI</h3>
                  <p className="text-sm text-slate-400 text-center">Watch two AI lawyers duel</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-700/50 rounded border border-slate-600 hover:border-amber-500 transition-colors">
                  <Zap className="w-12 h-12 text-amber-400 mb-2" />
                  <h3 className="text-lg font-semibold text-slate-200">Quick Cases</h3>
                  <p className="text-sm text-slate-400 text-center">Pre-built legal scenarios</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-700/50 rounded border border-slate-600 hover:border-amber-500 transition-colors">
                  <Gavel className="w-12 h-12 text-red-400 mb-2" />
                  <h3 className="text-lg font-semibold text-slate-200">Judge AI</h3>
                  <p className="text-sm text-slate-400 text-center">AI delivers final verdict</p>
                </div>
              </div>
              
              <div className="text-center pt-6">
                <Button 
                  onClick={() => setGameState('case-selection')}
                  className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold text-xl px-8 py-4 border-2 border-amber-400"
                >
                  Enter the Courtroom
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-slate-700 text-amber-400">Pixel Art</Badge>
              <Badge variant="secondary" className="bg-slate-700 text-blue-400">AI Powered</Badge>
              <Badge variant="secondary" className="bg-slate-700 text-red-400">Legal Drama</Badge>
              <Badge variant="secondary" className="bg-slate-700 text-green-400">Educational</Badge>
            </div>
          </div>
        </div>
      )}

      {gameState === 'case-selection' && (
        <CaseSelection 
          onCaseSelect={handleCaseSelect}
          onBack={() => setGameState('menu')}
        />
      )}

      {gameState === 'courtroom' && selectedCase && (
        <Courtroom 
          selectedCase={selectedCase}
          prosecutionArgument={prosecutionArgument}
          defenseArgument={defenseArgument}
          onBack={() => setGameState('case-selection')}
          onArgumentsGenerated={handleArgumentsGenerated}
          onVerdict={handleVerdict}
        />
      )}

      {gameState === 'verdict' && verdict && (
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-4xl bg-slate-800/90 border-amber-600 border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-amber-400 flex items-center justify-center gap-2 gavel-animation">
                <Gavel className="w-12 h-12" />
                FINAL VERDICT
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">
                  Winner: {verdict.winner}
                </h3>
                <div className="speech-bubble text-slate-900 text-lg">
                  {verdict.explanation}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Prosecution Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-300">{verdict.prosecutionScore}/10</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-red-400">Defense Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-300">{verdict.defenseScore}/10</div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center space-x-4">
                <Button 
                  onClick={resetGame}
                  className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold"
                >
                  New Case
                </Button>
                <Button 
                  onClick={() => setGameState('case-selection')}
                  variant="outline"
                  className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-slate-900"
                >
                  Select Different Case
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
