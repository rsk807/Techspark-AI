import React from 'react';
import { NavView } from '../types';
import { LayoutDashboard, Rocket, Edit3, Globe, Menu, X, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: NavView;
  onNavigate: (view: NavView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: NavView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: NavView.FUNDRAISING, label: 'Fundraising', icon: <Rocket className="w-5 h-5" /> },
    { id: NavView.CONTENT_OPTIMIZER, label: 'Content Optimizer', icon: <Edit3 className="w-5 h-5" /> },
    { id: NavView.MARKET_INTEL, label: 'Market Intel', icon: <Globe className="w-5 h-5" /> },
  ];

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-slate-800 flex items-center gap-2">
        <div className="bg-primary-500 p-1.5 rounded-lg">
            <Rocket className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">StartupIQ</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onNavigate(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
              currentView === item.id
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`${currentView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span className="ml-3 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-2">Credits Remaining</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div className="bg-primary-500 h-2 rounded-full w-[75%]"></div>
            </div>
            <p className="text-xs text-white font-medium text-right">750 / 1000</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 border-r border-slate-800 shadow-xl z-10">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 shadow-xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="absolute top-4 right-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
             <div className="bg-primary-600 p-1 rounded">
                <Rocket className="w-4 h-4 text-white" />
             </div>
             <h1 className="text-lg font-bold text-slate-900">StartupIQ</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;