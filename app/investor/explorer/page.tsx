import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Search, Filter, TrendingUp, MapPin, Building2, Globe, 
  ArrowRight, Star, Zap, Target, Loader2, RefreshCw
} from 'lucide-react';
import { API_BASE } from '../../../lib/apiConfig';

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

const StartupExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/startups`);
      if (response.ok) {
        const data = await response.json();
        setStartups(data);
      }
    } catch (error) {
      console.error('Error fetching startups:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = !searchQuery || 
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'all' || startup.industry === selectedIndustry;
    const matchesStage = selectedStage === 'all' || startup.stage === selectedStage;

    return matchesSearch && matchesIndustry && matchesStage;
  });

  const industries = ['all', ...Array.from(new Set(startups.map(s => s.industry).filter(Boolean)))];
  const stages = ['all', ...Array.from(new Set(startups.map(s => s.stage).filter(Boolean)))];

  const getMatchScore = () => Math.floor(Math.random() * 30) + 70; // Mock matching score

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Startup Explorer
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Discover and connect with promising startups
            </p>
          </div>
          <button
            onClick={fetchStartups}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Startups</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{startups.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Matching Results</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{filteredStartups.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Industries</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{industries.length - 1}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Stages</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stages.length - 1}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search startups..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Industry Filter */}
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry}
                </option>
              ))}
            </select>

            {/* Stage Filter */}
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            >
              {stages.map(stage => (
                <option key={stage} value={stage}>
                  {stage === 'all' ? 'All Stages' : stage}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Startup List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredStartups.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400">
              {startups.length === 0 
                ? 'No startups yet. They will appear here once created.' 
                : 'No startups match your filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStartups.map((startup) => {
              const matchScore = getMatchScore();
              return (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/startup/detail?id=${startup.id}`)}
                >
                  {/* Match Score Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      matchScore >= 85 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : matchScore >= 70 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      <Star className="w-3 h-3 inline mr-1" />
                      {matchScore}% Match
                    </div>
                    {startup.stage && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">
                        {startup.stage}
                      </span>
                    )}
                  </div>

                  {/* Startup Info */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {startup.name}
                  </h3>

                  {startup.description && (
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {startup.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {startup.industry && (
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {startup.industry}
                      </span>
                    )}
                    {startup.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {startup.location}
                      </span>
                    )}
                    {startup.website && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Website
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                      Added {new Date(startup.created_at).toLocaleDateString()}
                    </span>
                    <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default StartupExplorerPage;
