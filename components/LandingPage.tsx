import React, { useState } from 'react';
import { 
  Rocket, CheckCircle, Zap, BarChart3, Users, ArrowRight, Star, 
  ChevronDown, ChevronUp, Shield, Globe, Menu, X, Lock, Server, Eye, Search 
} from 'lucide-react';
import Button from './ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const faqs = [
    { q: "How does the AI investor matching work?", a: "Our AI analyzes your startup's industry, stage, and metrics to match you with investors who have a proven track record of investing in similar companies." },
    { q: "What kind of content does the analysis tool monitor?", a: "We monitor social media posts, blog articles, and landing page copy to provide sentiment analysis and optimization suggestions." },
    { q: "Can I integrate StartupIQ with my existing tools?", a: "Yes, we offer integrations with popular tools like Slack, Notion, and major CRM platforms on our Growth and Enterprise plans." },
    { q: "Is my startup data secure and confidential?", a: "Absolutely. We use enterprise-grade encryption and strictly adhere to SOC 2 compliance standards to keep your data safe." },
    { q: "What happens after the free trial ends?", a: "You can choose to upgrade to one of our paid plans or downgrade to a limited free version. Your data will remain accessible." },
    { q: "How quickly will I see results?", a: "Most startups see an improvement in content engagement within 48 hours and receive their first investor matches within 24 hours of onboarding." },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scaleFeatures = [
    {
      title: "Investor Connect",
      description: "AI-powered investor matching and fundraising tools to close rounds faster.",
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Content Analysis",
      description: "Discover customer insights from social media and online content to drive engagement.",
      icon: <Search className="w-6 h-6 text-white" />,
      color: "bg-purple-600"
    },
    {
      title: "Business Analytics",
      description: "Real-time metrics and actionable growth insights to keep you on track.",
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      color: "bg-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onStart}>
              <div className="bg-blue-600 p-2 rounded-lg shadow-md shadow-blue-600/20">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">StartupIQ</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">How it Works</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Pricing</a>
              <button onClick={onStart} className="text-slate-900 font-semibold text-sm hover:text-blue-600">Sign In</button>
              <Button onClick={onStart} className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">Start Free Trial</Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 absolute w-full shadow-xl animate-in slide-in-from-top-5">
            <a href="#features" className="block text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            <a href="#pricing" className="block text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <button onClick={onStart} className="block w-full text-left text-slate-900 font-bold p-2 hover:bg-slate-50 rounded">Sign In</button>
            <Button onClick={onStart} className="w-full bg-slate-900 mt-4">Start Free Trial</Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50/40 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8 border border-blue-100 shadow-sm">
            <Rocket className="w-3 h-3 mr-2" /> Trusted by 500+ Early-Stage Startups
          </div>
          
          <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4">AI-Powered Analysis Tool for Startups</h2>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
            A smart platform designed to help early-stage startups accelerate funding, acquire customers, and dominate their market with AI-driven insights.
          </h1>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button onClick={onStart} className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-slate-900/20 flex items-center justify-center min-w-[180px]">
              <Rocket className="w-4 h-4 mr-2" /> Get Started Free
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition-all hover:shadow-lg flex items-center justify-center min-w-[180px]">
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Accelerate fundraising with targeted investor matching</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Increase customer acquisition by 3x with content insights</span>
          </div>
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500 mt-2">
            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Real-time analytics dashboard for data-driven decisions</span>
            <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Competitive intelligence to stay ahead of the market</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights Cards */}
      <section id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Orange Card */}
             <div className="p-10 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Competitive Benchmarking</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Compare your online presence against competitors and industry leaders to identify gaps and opportunities.
                </p>
             </div>

             {/* Pink Card */}
             <div className="p-10 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-pink-500/20 group-hover:scale-110 transition-transform">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Smart Optimization</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Get AI-powered quick wins to boost visibility and accelerate growth with actionable content suggestions.
                </p>
             </div>
           </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm font-medium text-slate-500">Active Startups</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">$2.5B+</div>
                <div className="text-sm font-medium text-slate-500">Funds Raised</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
                <div className="text-sm font-medium text-slate-500">Investor Matches</div>
              </div>
              <div className="border-none">
                <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
                <div className="text-sm font-medium text-slate-500">Avg. Growth Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">How StartupIQ Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get started in minutes and see results in days</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
             {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-blue-200 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Sign Up & Connect", desc: "Create your account and connect your startup data sources in under 5 minutes", step: 1, icon: <Rocket className="w-6 h-6"/> },
                { title: "AI Analysis", desc: "Our AI analyzes your market, competitors, content, and identifies growth opportunities", step: 2, icon: <Zap className="w-6 h-6"/> },
                { title: "Get Insights", desc: "Receive personalized recommendations, investor matches, and actionable strategies", step: 3, icon: <Eye className="w-6 h-6"/> },
                { title: "Grow & Scale", desc: "Implement AI-powered strategies and track your progress with real-time analytics", step: 4, icon: <BarChart3 className="w-6 h-6"/> },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-8 shadow-xl shadow-blue-600/20 border-4 border-white z-10 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow w-full h-full">
                    <div className="mb-4 inline-block p-3 bg-blue-50 rounded-lg text-blue-600">{item.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button onClick={onStart} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 inline-flex items-center group">
              Start Your Journey <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Scale Section (Accordion) */}
      <section className="py-24 bg-white">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Everything You Need to Scale</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Comprehensive tools for every stage of your startup journey</h3>
            </div>

            <div className="space-y-4">
                {scaleFeatures.map((feature, index) => (
                    <div 
                        key={index}
                        className={`border rounded-2xl transition-all duration-300 overflow-hidden ${activeFeature === index ? 'border-slate-300 shadow-lg bg-white' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <button 
                            className="w-full px-8 py-6 flex items-center justify-between text-left"
                            onClick={() => setActiveFeature(index)}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${feature.color}`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">{feature.title}</h4>
                                    <p className={`text-slate-500 mt-1 transition-all duration-300 ${activeFeature === index ? 'opacity-100' : 'opacity-0 h-0 md:opacity-100 md:h-auto'}`}>
                                        {activeFeature === index || window.innerWidth >= 768 ? feature.description : ''}
                                    </p>
                                </div>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeFeature === index ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Loved by Startup Founders</h2>
            <p className="text-slate-600 text-lg">See how StartupIQ is helping startups achieve their goals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Chen", role: "CEO & Co-founder, TechFlow AI", quote: "StartupIQ helped us close our seed round 3 months faster than expected. The investor matching was spot-on and saved us countless hours." },
              { name: "Marcus Rodriguez", role: "Founder, GrowthMetrics", quote: "The content analysis feature is a game-changer. We identified customer pain points we never knew existed and tripled our conversion rate." },
              { name: "Emily Watson", role: "Co-founder & CTO, DataStream", quote: "Best investment we made as an early-stage startup. The competitive benchmarking keeps us ahead of the curve in our market." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex mb-6 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-8 flex-1 text-lg leading-relaxed">"{item.quote}"</p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 shadow-lg shadow-blue-600/20">
                    {item.name.charAt(0)}{item.name.split(' ')[1].charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Security Section */}
       <section className="py-24 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Enterprise-Grade Security & Compliance</h2>
          <h3 className="text-2xl text-slate-600 mb-16">Your data is protected with industry-leading security standards</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            {[
                { icon: <Shield className="w-8 h-8 text-blue-600"/>, title: "SOC 2 Certified", desc: "Type II compliance ensuring highest security standards" },
                { icon: <Lock className="w-8 h-8 text-blue-600"/>, title: "256-bit SSL", desc: "Bank-level encryption for all data in transit" },
                { icon: <Globe className="w-8 h-8 text-blue-600"/>, title: "GDPR Compliant", desc: "Full compliance with data privacy regulations" },
                { icon: <CheckCircle className="w-8 h-8 text-blue-600"/>, title: "99.9% Uptime", desc: "Reliable service with guaranteed availability" },
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 max-w-[200px]">{item.desc}</p>
                </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 inline-block w-full max-w-4xl shadow-sm">
             <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Trusted by Industry Leaders</h4>
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                 <p className="text-lg font-bold text-slate-800">Join hundreds of startups and venture capital firms who trust StartupIQ with their most sensitive business data.</p>
                 <div className="flex gap-4">
                    <span className="px-3 py-1 border rounded text-xs font-bold text-slate-600">ISO 27001</span>
                    <span className="px-3 py-1 border rounded text-xs font-bold text-slate-600">PCI DSS</span>
                    <span className="px-3 py-1 border rounded text-xs font-bold text-slate-600">Privacy Shield</span>
                    <span className="px-3 py-1 border rounded text-xs font-bold text-slate-600">CCPA Compliant</span>
                 </div>
                 <div className="flex gap-4 ml-auto">
                     <div className="bg-white border rounded-lg p-2 shadow-sm flex flex-col items-center w-20">
                         <Shield className="w-6 h-6 text-blue-600 mb-1" />
                         <span className="text-[10px] font-bold text-slate-700">Verified</span>
                     </div>
                     <div className="bg-white border rounded-lg p-2 shadow-sm flex flex-col items-center w-20">
                         <Lock className="w-6 h-6 text-green-600 mb-1" />
                         <span className="text-[10px] font-bold text-slate-700">Certified</span>
                     </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">Choose the plan that fits your startup stage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col hover:border-slate-300 transition-colors">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Starter</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-blue-600">$49</span>
                <span className="text-slate-500 ml-2">/month</span>
              </div>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">Perfect for early-stage startups just getting started.</p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Up to 5 investor matches/month', 'Basic content analysis', 'Core analytics dashboard', 'Monthly optimization reports', 'Email support'].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={onStart} className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-2xl border-2 border-blue-500 bg-white relative transform md:-translate-y-4 shadow-2xl shadow-blue-200/50 flex flex-col">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Growth</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-blue-600">$149</span>
                <span className="text-slate-500 ml-2">/month</span>
              </div>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">For startups ready to scale and accelerate growth.</p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Unlimited investor matches', 'Advanced content & sentiment analysis', 'Full analytics suite with forecasting', 'Competitive benchmarking', 'Weekly AI optimization suggestions', 'Priority support', 'Custom reports'].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={onStart} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col hover:border-slate-300 transition-colors">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Enterprise</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-blue-600">Custom</span>
              </div>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">For established startups with advanced needs.</p>
              <ul className="space-y-4 mb-8 flex-1">
                {['Everything in Growth, plus:', 'Dedicated account manager', 'Custom integrations', 'White-label options', 'Advanced API access', 'Custom AI model training', '24/7 premium support'].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="text-center mt-8 text-slate-500 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about StartupIQ</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors">
                <button 
                  className="w-full px-8 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6 text-slate-600 text-sm leading-relaxed animate-in slide-in-from-top-2 duration-200 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Button variant="outline" className="px-8">Contact Support</Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
         {/* Abstract Shapes */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
             <h2 className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-4">Ready to Accelerate Your Startup Growth?</h2>
             <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                 Join 500+ startups using StartupIQ to raise funds, acquire customers, and scale faster. Start your free trial today and see results within the first week.
             </h3>

             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                 <button onClick={onStart} className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center">
                    <Rocket className="w-5 h-5 mr-2" /> Start Free 14-Day Trial
                 </button>
                 <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 flex items-center">
                    <input type="email" placeholder="Enter your work email" className="bg-transparent border-none text-white placeholder-blue-200 focus:ring-0 w-full outline-none" />
                    <button className="text-white font-bold hover:text-blue-200">Get Started</button>
                 </div>
             </div>

             <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium text-blue-100">
                 <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-white" /> No credit card required</span>
                 <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-white" /> Cancel anytime</span>
                 <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-white" /> Setup in 5 minutes</span>
             </div>

             <div className="mt-16 pt-10 border-t border-white/10">
                 <p className="text-sm text-blue-200 mb-6 uppercase tracking-widest">Backed by leading venture capital firms</p>
                 <div className="flex flex-wrap justify-center gap-12 opacity-80 grayscale mix-blend-screen">
                     <span className="text-xl font-bold">Sequoia Capital</span>
                     <span className="text-xl font-bold">Andreessen Horowitz</span>
                     <span className="text-xl font-bold">Y Combinator</span>
                     <span className="text-xl font-bold">Accel</span>
                 </div>
             </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-slate-600 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">StartupIQ</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
                Accelerating the next generation of unicorns with AI-powered insights, connections, and growth tools.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                    <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
                    <Shield className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2025 StartupIQ. Accelerating startup growth with AI.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-slate-900">Privacy</a>
                <a href="#" className="hover:text-slate-900">Terms</a>
                <a href="#" className="hover:text-slate-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;