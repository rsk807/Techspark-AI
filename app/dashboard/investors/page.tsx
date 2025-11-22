import React, { useState } from 'react';
import { generateFundraisingMaterial } from '../../../lib/api';
import { FundraisingGeneratedContent } from '../../../types/index';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { 
  Target, Users, Star, Mail, CheckCircle2, 
  Send, ExternalLink, X, Loader2, Check, Copy, MapPin, DollarSign, TrendingUp
} from 'lucide-react';

// Mock Data for Interface
const INVESTORS = [
  {
    id: 1,
    name: "Sarah Chen",
    firm: "Vertex Ventures",
    role: "Partner",
    avatar: "SC",
    color: "bg-blue-100 text-blue-600",
    tags: ["SaaS", "AI/ML"],
    ticketSize: "$500K - $2M",
    portfolioCount: 45,
    matchScore: 92,
    location: "San Francisco, CA"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    firm: "Sequoia Capital",
    role: "Associate",
    avatar: "MR",
    color: "bg-orange-100 text-orange-600",
    tags: ["Enterprise", "B2B"],
    ticketSize: "$1M - $5M",
    portfolioCount: 60,
    matchScore: 88,
    location: "Menlo Park, CA"
  },
  {
    id: 3,
    name: "Jessica Wu",
    firm: "Lightspeed Venture",
    role: "Partner",
    avatar: "JW",
    color: "bg-purple-100 text-purple-600",
    tags: ["FinTech", "Consumer"],
    ticketSize: "$2M - $8M",
    portfolioCount: 32,
    matchScore: 85,
    location: "New York, NY"
  }
];

const FundraisingPage: React.FC = () => {
  // State for AI Generation Modal
  const [selectedInvestor, setSelectedInvestor] = useState<typeof INVESTORS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<FundraisingGeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const openGenerateModal = (investor: typeof INVESTORS[0]) => {
    setSelectedInvestor(investor);
    setGeneratedContent(null);
    setIsModalOpen(true);
  };

  const handleGenerateEmail = async () => {
    if (!selectedInvestor) return;
    setLoading(true);
    try {
      const companyContext = "We are StartupIQ, an AI-powered platform helping early-stage startups accelerate fundraising and growth.";
      const target = `${selectedInvestor.name} from ${selectedInvestor.firm}, focusing on ${selectedInvestor.tags.join(', ')}`;
      
      const data = await generateFundraisingMaterial(companyContext, 'email', target);
      setGeneratedContent(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      const text = generatedContent.subject 
        ? `Subject: ${generatedContent.subject}\n\n${generatedContent.content}`
        : generatedContent.content;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Investor Connect</h1>
        <p className="text-slate-500 mt-1">AI-matched investors and fundraising insights for your startup</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
           <div className="p-2 bg-blue-50 w-fit rounded-lg">
             <Target className="w-6 h-6 text-blue-600" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-slate-900">$2.5M</h3>
             <p className="text-sm text-slate-500">Target Raise</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
           <div className="p-2 bg-green-50 w-fit rounded-lg">
             <Users className="w-6 h-6 text-green-600" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-slate-900">47</h3>
             <p className="text-sm text-slate-500">Investor Matches</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
           <div className="p-2 bg-purple-50 w-fit rounded-lg">
             <Star className="w-6 h-6 text-purple-600" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-slate-900">86%</h3>
             <p className="text-sm text-slate-500">Avg. Match Score</p>
           </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-32">
           <div className="p-2 bg-orange-50 w-fit rounded-lg">
             <Mail className="w-6 h-6 text-orange-600" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-slate-900">23</h3>
             <p className="text-sm text-slate-500">Outreach Sent</p>
           </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Investor Matches */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
             <div>
                <h2 className="text-lg font-bold text-slate-900">Top Investor Matches</h2>
                <p className="text-slate-500 text-sm">Investors aligned with your startup profile and fundraising goals</p>
             </div>
          </div>

          {/* Investor Cards */}
          <div className="space-y-4">
            {INVESTORS.map((investor) => (
              <Card key={investor.id} className="transition-shadow hover:shadow-md" noPadding>
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${investor.color}`}>
                      {investor.avatar}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{investor.name}</h3>
                          <p className="text-sm text-slate-500">{investor.firm}</p>
                        </div>
                        <div className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                          <Star className="w-3 h-3 fill-current" />
                          {investor.matchScore}%
                        </div>
                      </div>
                      
                      {/* Meta Data */}
                      <div className="mt-3 flex flex-wrap items-center gap-y-2 text-sm text-slate-600">
                         <div className="flex items-center mr-4">
                           <Target className="w-3 h-3 mr-1.5 text-slate-400" />
                           {investor.tags.join(', ')}
                         </div>
                         <div className="flex items-center mr-4">
                           <DollarSign className="w-3 h-3 mr-1 text-slate-400" />
                           {investor.ticketSize}
                         </div>
                         <div className="flex items-center">
                           <TrendingUp className="w-3 h-3 mr-1.5 text-slate-400" />
                           {investor.portfolioCount} companies
                         </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="mt-5 flex gap-3">
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          onClick={() => openGenerateModal(investor)}
                          className="bg-slate-900 text-white hover:bg-slate-800"
                        >
                          <Mail className="w-3 h-3 mr-2" /> Send Intro
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-3 h-3 mr-2" /> View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Progress */}
        <div className="lg:col-span-1">
          <Card title="Fundraising Progress" description="Track your journey to closing the round">
             <div className="space-y-6 mt-2">
               
               {/* Pitch Deck */}
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium text-slate-700">Pitch Deck</span>
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                 </div>
                 <p className="text-xs text-slate-400 mt-1 text-right">100% complete</p>
               </div>

               {/* Financial Model */}
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium text-slate-700">Financial Model</span>
                   <CheckCircle2 className="w-5 h-5 text-green-500" />
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                 </div>
                 <p className="text-xs text-slate-400 mt-1 text-right">100% complete</p>
               </div>

               {/* Investor Outreach */}
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium text-slate-700">Investor Outreach</span>
                   <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">In Progress</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-slate-800 rounded-full" style={{ width: '65%' }}></div>
                 </div>
                 <p className="text-xs text-slate-400 mt-1 text-right">65% complete</p>
               </div>

               {/* Due Diligence */}
               <div>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium text-slate-700">Due Diligence</span>
                   <span className="text-xs text-slate-400">Pending</span>
                 </div>
                 <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }}></div>
                 </div>
               </div>

             </div>
          </Card>
        </div>
      </div>

      {/* Generator Modal */}
      {isModalOpen && selectedInvestor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Draft Cold Email</h3>
                <p className="text-sm text-slate-500">To: {selectedInvestor.name}, {selectedInvestor.firm}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {!generatedContent ? (
                <div className="text-center py-12 space-y-4">
                   <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Mail className="w-8 h-8" />
                   </div>
                   <h4 className="text-lg font-medium text-slate-900">Generate personalized outreach</h4>
                   <p className="text-slate-500 max-w-sm mx-auto mb-6">
                     Our AI will analyze {selectedInvestor.name}'s profile and portfolio to draft a high-conversion intro email.
                   </p>
                   <Button onClick={handleGenerateEmail} isLoading={loading} className="w-full max-w-xs mx-auto">
                     {loading ? 'Analyzing Profile & Drafting...' : 'Generate Email Draft'}
                   </Button>
                </div>
              ) : (
                <div className="space-y-4">
                   {generatedContent.subject && (
                     <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Subject</span>
                        <p className="font-medium text-slate-900">{generatedContent.subject}</p>
                     </div>
                   )}
                   <div className="bg-white p-4 rounded-lg border border-slate-200 min-h-[200px] max-h-[400px] overflow-y-auto">
                      <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm">{generatedContent.content}</p>
                   </div>
                   <div className="flex justify-end gap-3 pt-2">
                      <Button variant="outline" onClick={() => setGeneratedContent(null)}>Back</Button>
                      <Button variant="primary" onClick={copyToClipboard}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                      </Button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FundraisingPage;