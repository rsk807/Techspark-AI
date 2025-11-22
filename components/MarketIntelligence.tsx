import React, { useState } from 'react';
import { getMarketIntelligence } from '../services/geminiService';
import { MarketTrend } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { Search, Globe, TrendingUp, Lightbulb, Target, ExternalLink } from 'lucide-react';

const MarketIntelligence: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [data, setData] = useState<{ trends: MarketTrend[], summary: string, sources?: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!industry.trim()) return;
    setLoading(true);
    try {
      const result = await getMarketIntelligence(industry);
      setData(result);
    } catch (e) {
      alert("Failed to fetch market intelligence.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Market Intelligence Scout</h2>
        <p className="text-slate-500 mb-6">Discover real-time trends and opportunities in your sector using AI-powered search.</p>
        
        <div className="max-w-lg mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter industry (e.g. FinTech, Sustainable Fashion)"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button size="lg" onClick={handleSearch} isLoading={loading} disabled={!industry}>
            Analyze
          </Button>
        </div>
      </div>

      {data && (
        <div className="space-y-6">
          <Card title="Executive Summary" description="Market overview based on recent search data">
            <p className="text-slate-700 leading-relaxed">{data.summary}</p>
            {data.sources && data.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Sources</p>
                    <div className="flex flex-wrap gap-2">
                        {data.sources.map((source, idx) => (
                            <a key={idx} href={source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-primary-600 hover:text-primary-700 hover:underline bg-primary-50 px-2 py-1 rounded border border-primary-100">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Source {idx + 1}
                            </a>
                        ))}
                    </div>
                </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.trends.map((item, index) => (
              <Card key={index} className="h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 mb-3">
                      {index === 0 ? <TrendingUp className="w-4 h-4" /> : index === 1 ? <Target className="w-4 h-4" /> : <Lightbulb className="w-4 h-4" />}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.trend}</h3>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Impact</p>
                      <p className="text-sm text-slate-600">{item.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Opportunity</p>
                      <p className="text-sm text-slate-800 font-medium bg-green-50 p-2 rounded border border-green-100">
                        {item.opportunity}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {!data && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 pointer-events-none filter blur-[1px]">
           {/* Placeholder skeleton for visual balance before search */}
           {[1,2,3].map(i => (
               <div key={i} className="h-64 bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4">
                   <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                   <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                   <div className="h-20 bg-slate-50 rounded w-full"></div>
                   <div className="h-20 bg-slate-50 rounded w-full mt-auto"></div>
               </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default MarketIntelligence;