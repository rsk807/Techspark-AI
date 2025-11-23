import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Building2, Globe, MapPin, Tag, Calendar, Plus, FileText, Link as LinkIcon,
  Trash2, Loader2, Brain, CheckCircle2, AlertCircle, TrendingUp, Users, Target
} from 'lucide-react';
import { API_BASE } from '../../lib/apiConfig';

interface Startup {
  id: number;
  name: string;
  website?: string;
  description?: string;
  industry?: string;
  stage?: string;
  location?: string;
  created_at: string;
}

interface ContentItem {
  id: number;
  startup_id: number;
  source_type: string;
  source_identifier?: string;
  text: string;
  created_at: string;
}

interface Analysis {
  summary: string;
  target_customers: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const StartupDetail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startupId = searchParams.get('id');

  const [startup, setStartup] = useState<Startup | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add content form
  const [showAddContent, setShowAddContent] = useState(false);
  const [newContent, setNewContent] = useState({
    source_type: 'manual',
    source_identifier: '',
    text: ''
  });

  useEffect(() => {
    if (!startupId) {
      navigate('/startup/create');
      return;
    }
    fetchStartupData();
  }, [startupId]);

  const fetchStartupData = async () => {
    try {
      setLoading(true);
      const [startupRes, contentRes] = await Promise.all([
        fetch(`${API_BASE}/startups/${startupId}`),
        fetch(`${API_BASE}/startups/${startupId}/content`)
      ]);

      if (!startupRes.ok) throw new Error('Failed to fetch startup');
      
      const startupData = await startupRes.json();
      const contentData = await contentRes.json();
      
      setStartup(startupData);
      setContent(contentData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.text) return;

    try {
      const response = await fetch(`${API_BASE}/startups/${startupId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });

      if (!response.ok) throw new Error('Failed to add content');

      const addedContent = await response.json();
      setContent([...content, addedContent]);
      setNewContent({ source_type: 'manual', source_identifier: '', text: '' });
      setShowAddContent(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add content');
    }
  };

  const handleDeleteContent = async (contentId: number) => {
    try {
      await fetch(`${API_BASE}/startups/${startupId}/content/${contentId}`, {
        method: 'DELETE'
      });
      setContent(content.filter(c => c.id !== contentId));
    } catch (err) {
      setError('Failed to delete content');
    }
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError(null);

      const response = await fetch(`${API_BASE}/startups/${startupId}/analyze`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const analysisData = await response.json();
      setAnalysis(analysisData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (!startup) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-600">Startup not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Startup Header */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{startup.name}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                {startup.industry && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {startup.industry}
                  </span>
                )}
                {startup.stage && (
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {startup.stage}
                  </span>
                )}
                {startup.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {startup.location}
                  </span>
                )}
              </div>
            </div>
            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                Visit Website
              </a>
            )}
          </div>
          {startup.description && (
            <p className="text-slate-700 leading-relaxed">{startup.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Content Library</h2>
                <button
                  onClick={() => setShowAddContent(!showAddContent)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Content
                </button>
              </div>

              {/* Add Content Form */}
              {showAddContent && (
                <form onSubmit={handleAddContent} className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Source Type</label>
                      <select
                        value={newContent.source_type}
                        onChange={(e) => setNewContent({ ...newContent, source_type: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="manual">Manual Text</option>
                        <option value="website">Website URL</option>
                        <option value="document">Document</option>
                      </select>
                    </div>
                    {newContent.source_type !== 'manual' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Source URL/Name</label>
                        <input
                          type="text"
                          value={newContent.source_identifier}
                          onChange={(e) => setNewContent({ ...newContent, source_identifier: e.target.value })}
                          placeholder="https://example.com or document.pdf"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                      <textarea
                        value={newContent.text}
                        onChange={(e) => setNewContent({ ...newContent, text: e.target.value })}
                        placeholder="Paste content here..."
                        rows={4}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddContent(false)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Content List */}
              {content.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No content added yet. Add content to enable AI analysis.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {content.map((item) => (
                    <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.source_type === 'website' ? (
                            <LinkIcon className="w-4 h-4 text-blue-600" />
                          ) : (
                            <FileText className="w-4 h-4 text-slate-600" />
                          )}
                          <span className="text-sm font-semibold text-slate-700">
                            {item.source_type.charAt(0).toUpperCase() + item.source_type.slice(1)}
                          </span>
                          {item.source_identifier && (
                            <span className="text-xs text-slate-500">• {item.source_identifier}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  AI Analysis
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Summary</h3>
                    <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Target Customers
                    </h3>
                    <ul className="space-y-2">
                      {analysis.target_customers.map((customer, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700">
                          <Target className="w-4 h-4 text-blue-600" />
                          {customer}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-700 mb-3">✅ Strengths</h3>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-slate-700">• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-700 mb-3">⚠️ Weaknesses</h3>
                      <ul className="space-y-2">
                        {analysis.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-slate-700">• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">💡 Recommendations</h3>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-slate-700 pl-4 border-l-2 border-purple-400">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Analysis
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Run AI analysis on your content to get insights, identify strengths, and discover opportunities.
              </p>
              <button
                onClick={handleAnalyze}
                disabled={content.length === 0 || analyzing}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Run Analysis
                  </>
                )}
              </button>
              {content.length === 0 && (
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Add content first to enable analysis
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Content Items</span>
                  <span className="font-semibold text-slate-900">{content.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Created</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(startup.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StartupDetail;
