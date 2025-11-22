import React, { useState } from 'react';
import { generateFundraisingMaterial } from '../services/geminiService';
import { FundraisingGeneratedContent } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { Send, FileText, Mic, Copy, Check } from 'lucide-react';

const FundraisingAssistant: React.FC = () => {
  const [companyDetails, setCompanyDetails] = useState('');
  const [targetAudience, setTargetAudience] = useState('Angel Investors');
  const [result, setResult] = useState<FundraisingGeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (type: 'email' | 'pitch_deck_outline' | 'elevator_pitch') => {
    if (!companyDetails.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await generateFundraisingMaterial(companyDetails, type, targetAudience);
      setResult(data);
    } catch (e) {
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      const textToCopy = result.subject ? `Subject: ${result.subject}\n\n${result.content}` : result.content;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full animate-in fade-in duration-500">
      <div className="lg:col-span-1 space-y-6">
        <Card title="Startup Details" description="Provide context for the AI">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">What does your startup do?</label>
              <textarea
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-32 resize-none text-sm"
                placeholder="e.g., We build AI-powered drones for agricultural monitoring, helping farmers reduce water usage by 30%..."
                value={companyDetails}
                onChange={(e) => setCompanyDetails(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              >
                <option>Angel Investors</option>
                <option>Pre-Seed VCs</option>
                <option>Series A VCs</option>
                <option>Corporate Partners</option>
                <option>Customers (B2B)</option>
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <Button 
                variant="primary" 
                className="w-full justify-start" 
                onClick={() => handleGenerate('email')}
                isLoading={loading}
                disabled={!companyDetails}
              >
                <Send className="w-4 h-4 mr-2" /> Generate Cold Email
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleGenerate('pitch_deck_outline')}
                isLoading={loading}
                disabled={!companyDetails}
              >
                <FileText className="w-4 h-4 mr-2" /> Generate Pitch Deck Outline
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleGenerate('elevator_pitch')}
                isLoading={loading}
                disabled={!companyDetails}
              >
                <Mic className="w-4 h-4 mr-2" /> Generate Elevator Pitch
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-2 h-full">
        <Card className="h-full flex flex-col" title="Generated Output" 
          action={result && (
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          )}
        >
          {result ? (
            <div className="prose prose-slate max-w-none overflow-y-auto max-h-[600px]">
              {result.type === 'email' && result.subject && (
                <div className="mb-4 pb-4 border-b border-slate-100">
                  <span className="text-slate-500 text-sm font-semibold">Subject:</span>
                  <p className="text-slate-900 font-medium">{result.subject}</p>
                </div>
              )}
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {result.content}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <FileText className="w-12 h-12 mb-4 opacity-20" />
              <p>Fill in your details and select a generation option.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FundraisingAssistant;