import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import Card from '../../components/ui/Card';

const mockGrowthData = [
  { name: 'Jan', visitors: 400, active: 240 },
  { name: 'Feb', visitors: 300, active: 139 },
  { name: 'Mar', visitors: 200, active: 980 },
  { name: 'Apr', visitors: 278, active: 390 },
  { name: 'May', visitors: 189, active: 480 },
  { name: 'Jun', visitors: 239, active: 380 },
  { name: 'Jul', visitors: 349, active: 430 },
];

const mockCompetitorData = [
  { name: 'Us', score: 85 },
  { name: 'Comp A', score: 70 },
  { name: 'Comp B', score: 92 },
  { name: 'Comp C', score: 65 },
];

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode; isPositive?: boolean }> = ({ title, value, change, icon, isPositive = true }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 mt-2">{value}</h4>
      </div>
      <div className={`p-3 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
      <span className="text-sm text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Startup Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Last updated: Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="12,345" 
          change="+12.5%" 
          icon={<Users className="w-6 h-6" />} 
        />
        <StatCard 
          title="Monthly Revenue" 
          value="$45,230" 
          change="+8.2%" 
          icon={<DollarSign className="w-6 h-6" />} 
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="-0.4%" 
          icon={<Activity className="w-6 h-6" />} 
          isPositive={false}
        />
        <StatCard 
          title="Growth Score" 
          value="85/100" 
          change="+5.0%" 
          icon={<TrendingUp className="w-6 h-6" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" title="Growth Analytics" description="Visitor and active user trends over the last 7 months">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockGrowthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="visitors" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="active" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Competitive Benchmark" description="Market presence score comparison">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCompetitorData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <p className="text-sm text-primary-800 font-medium flex items-start gap-2">
              <Activity className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Tip: Improve content frequency to overtake "Comp B".
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;