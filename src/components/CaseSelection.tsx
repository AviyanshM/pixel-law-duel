
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, AlertTriangle, Building, Car } from 'lucide-react';

interface CaseSelectionProps {
  onCaseSelect: (caseData: any) => void;
  onBack: () => void;
}

const CaseSelection: React.FC<CaseSelectionProps> = ({ onCaseSelect, onBack }) => {
  const sampleCases = [
    {
      id: 1,
      title: "The Digital Privacy Dilemma",
      description: "A tech company collected user data without explicit consent for targeted advertising",
      type: "Privacy Law",
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      difficulty: "Medium",
      color: "blue",
      scenario: "TechCorp collected personal browsing data from users without explicit consent and sold it to advertisers. Users claim violation of privacy rights, while TechCorp argues terms of service covered data usage."
    },
    {
      id: 2,
      title: "The Workplace Discrimination Case",
      description: "An employee claims they were passed over for promotion due to age discrimination",
      type: "Employment Law",
      icon: <Building className="w-8 h-8 text-green-400" />,
      difficulty: "Hard",
      color: "green",
      scenario: "Sarah, 55, was passed over for a promotion given to a 28-year-old colleague with less experience. She claims age discrimination, while the company argues the younger candidate was more qualified for the digital-focused role."
    },
    {
      id: 3,
      title: "The Autonomous Vehicle Accident",
      description: "Who's liable when a self-driving car causes an accident?",
      type: "Technology Law",
      icon: <Car className="w-8 h-8 text-purple-400" />,
      difficulty: "Hard",
      color: "purple",
      scenario: "An autonomous vehicle hit a pedestrian while in self-driving mode. The car manufacturer claims driver negligence for not paying attention, while the driver argues the AI system failed and they couldn't react in time."
    },
    {
      id: 4,
      title: "The Social Media Defamation",
      description: "False statements on social media damage a person's reputation",
      type: "Defamation Law",
      icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
      difficulty: "Easy",
      color: "red",
      scenario: "John posted false allegations about his neighbor's business practices on Facebook, causing the neighbor to lose clients. The neighbor sues for defamation, while John claims he was exercising free speech and believed the statements were true."
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="mb-4 border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-400 mb-4 retro-glow">Select Your Case</h1>
          <p className="text-xl text-slate-300">Choose a legal scenario for the AI lawyers to debate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {sampleCases.map((case_) => (
          <Card 
            key={case_.id} 
            className="bg-slate-800/80 border-2 hover:border-amber-500 transition-all duration-300 cursor-pointer hover:scale-105"
            onClick={() => onCaseSelect(case_)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {case_.icon}
                  <div>
                    <CardTitle className="text-xl text-amber-300">{case_.title}</CardTitle>
                    <p className="text-sm text-slate-400">{case_.type}</p>
                  </div>
                </div>
                <Badge className={`${getDifficultyColor(case_.difficulty)} text-white`}>
                  {case_.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {case_.description}
              </p>
              
              <div className="bg-slate-700/50 p-3 rounded border border-slate-600 mb-4">
                <h4 className="text-sm font-semibold text-amber-400 mb-2">Case Details:</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {case_.scenario}
                </p>
              </div>

              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold"
              >
                Select This Case
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-slate-400 mb-4">More cases coming soon...</p>
        <div className="flex justify-center gap-2">
          <Badge variant="outline" className="border-slate-600 text-slate-400">Contract Law</Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-400">Criminal Law</Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-400">Constitutional Law</Badge>
          <Badge variant="outline" className="border-slate-600 text-slate-400">IP Law</Badge>
        </div>
      </div>
    </div>
  );
};

export default CaseSelection;
