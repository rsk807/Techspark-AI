import React, { useState } from 'react';
import { analyzeMarketingContent } from '../../../lib/api';
import { ContentAnalysisResult } from '../../../types/index';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Sparkles, AlertCircle, ThumbsUp, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AnalysisPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<ContentAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeMarketingContent(content);
      setResult(data);
    } catch (e) {
      console.error(e);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
      <div className="space-y-6">
        <Card title="Input Content" description="Paste your landing page copy, ad text, or social post">
          <textarea
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[300px] text-base leading-relaxed resize-y"
            placeholder="Paste your text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleAnalyze} isLoading={loading} disabled={!content} className="w-full md:w-auto">
              <Sparkles className="w-4 h-4 mr-2" /> Analyze & Optimize
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        {result ? (
          <>
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">Analysis Results</h3>
                        <p className="text-slate-500 text-sm">Detected Tone: <span className="font-medium text-slate-800 capitalize">{result.tone}</span></p>
                    </div>
                    <div className="relative w-16 h-16">
                        <ResponsiveContainer>
                             <PieChart>
                                <Pie
                                    data={[{ value: result.score }, { value: 100 - result.score }]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={20}
                                    outerRadius={30}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                >
                                    <Cell fill={getScoreColor(result.score)} />
                                    <Cell fill="#e2e8f0" />
                                </Pie>
                             </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-slate-900">{result.score}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2 text-amber-500" /> Suggestions
                        </h4>
                        <ul className="space-y-2">
                            {result.suggestions.map((suggestion, idx) => (
                                <li key={idx} className="text-sm text-slate-600 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-slate-400">
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            <Card title="Optimized Version" action={<ThumbsUp className="w-4 h-4 text-primary-600" />}>
                <div className="prose prose-sm max-w-none text-slate-800 bg-primary-50 p-4 rounded-lg border border-primary-100">
                    {result.improvedVersion}
                </div>
                <div className="mt-4 flex justify-end">
                     <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(result.improvedVersion)}}>
                        Copy Optimized Text
                     </Button>
                </div>
            </Card>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300 min-h-[300px]">
            <ArrowRight className="w-12 h-12 mb-4 opacity-20" />
            <p>Result will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;