import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, CheckCircle, Zap, BarChart3, Users, ArrowRight, Star, 
  ChevronDown, ChevronUp, Shield, Globe, Menu, X, Lock, Eye, Search, Sparkles 
} from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Handle scroll effect for navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => {
    navigate('/dashboard');
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
      <motion.nav 
        className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 border-slate-200 shadow-lg' 
            : 'bg-white/90 border-slate-100'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={handleStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="bg-blue-600 p-2 rounded-lg shadow-md shadow-blue-600/20"
                whileHover={{ 
                  rotate: 360,
                  boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)"
                }}
                transition={{ duration: 0.6 }}
              >
                <Rocket className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">StartupIQ</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['features', 'how-it-works', 'pricing'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
              <motion.button 
                onClick={handleStart} 
                className="text-slate-900 font-semibold text-sm hover:text-blue-600 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                Sign In
              </motion.button>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button 
                  onClick={handleStart} 
                  className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Start Free Trial</span>
                </Button>
              </motion.div>
            </div>

            <div className="md:hidden">
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-slate-600 p-2"
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 absolute w-full shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {['features', 'how-it-works', 'pricing'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                className="block text-slate-600 font-medium p-2 hover:bg-slate-50 rounded" 
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.a>
            ))}
            <motion.button 
              onClick={handleStart} 
              className="block w-full text-left text-slate-900 font-bold p-2 hover:bg-slate-50 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Sign In
            </motion.button>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button onClick={handleStart} className="w-full bg-slate-900 mt-4">Start Free Trial</Button>
            </motion.div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 bg-gradient-to-b from-blue-50/40 via-white to-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8 border border-blue-100 shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-3 h-3 mr-2" />
            </motion.div>
            Trusted by 500+ Early-Stage Startups
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-4"
          >
            AI-Powered Analysis Tool for Startups
          </motion.h2>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-tight"
          >
            A smart platform designed to help early-stage startups{' '}
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
              style={{ backgroundSize: '200% auto' }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              accelerate funding
            </motion.span>
            {', '}
            <motion.span 
              className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent inline-block"
              style={{ backgroundSize: '200% auto' }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
            >
              acquire customers
            </motion.span>
            {', and '}
            <motion.span 
              className="bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent inline-block"
              style={{ backgroundSize: '200% auto' }}
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
            >
              dominate their market
            </motion.span>
            {' '}with AI-driven insights.
          </motion.h1>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <motion.button 
              onClick={handleStart} 
              className="group px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold transition-all flex items-center justify-center min-w-[180px] relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                boxShadow: [
                  "0 10px 30px rgba(0,0,0,0.1)",
                  "0 15px 40px rgba(59, 130, 246, 0.2)",
                  "0 10px 30px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket className="w-4 h-4 mr-2 relative z-10" />
              </motion.div>
              <span className="relative z-10">Get Started Free</span>
            </motion.button>
            <motion.button 
              className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-lg font-semibold transition-all flex items-center justify-center min-w-[180px] backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "#3b82f6", color: "#3b82f6" }}
              whileTap={{ scale: 0.98 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-4 h-4 mr-2" />
              </motion.div>
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-2"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05, color: "#10b981" }}
              >
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Accelerate fundraising with targeted investor matching
              </motion.span>
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05, color: "#10b981" }}
              >
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Increase customer acquisition by 3x with content insights
              </motion.span>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500">
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05, color: "#10b981" }}
              >
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Real-time analytics dashboard for data-driven decisions
              </motion.span>
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05, color: "#10b981" }}
              >
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Competitive intelligence to stay ahead of the market
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Highlights Cards */}
      <section id="features" className="py-12 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px", amount: 0.3 }}
          variants={staggerContainer}
        >
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Orange Card */}
             <motion.div 
               variants={fadeInLeft}
               whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(249, 115, 22, 0.15)" }}
               animate={{ 
                 y: [0, -10, 0],
               }}
               transition={{ 
                 y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
               }}
               className="p-10 rounded-2xl border border-slate-100 shadow-lg transition-all duration-300 bg-white group relative overflow-hidden"
             >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div 
                  className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-orange-500/20 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Zap className="w-7 h-7" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Competitive Benchmarking</h3>
                <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                  Compare your online presence against competitors and industry leaders to identify gaps and opportunities.
                </p>
             </motion.div>

             {/* Pink Card */}
             <motion.div 
               variants={fadeInRight}
               whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(236, 72, 153, 0.15)" }}
               animate={{ 
                 y: [0, -10, 0],
               }}
               transition={{ 
                 y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
               }}
               className="p-10 rounded-2xl border border-slate-100 shadow-lg transition-all duration-300 bg-white group relative overflow-hidden"
             >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div 
                  className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-pink-500/20 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity, delay: 0.3 }
                  }}
                >
                  <Eye className="w-7 h-7" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Smart Optimization</h3>
                <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                  Get AI-powered quick wins to boost visibility and accelerate growth with actionable content suggestions.
                </p>
             </motion.div>
           </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white">
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={scaleIn}
        >
          <motion.div 
            className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-10 relative overflow-hidden"
            whileHover={{ boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
          >
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100 relative z-10">
              {[
                { value: "500+", label: "Active Startups" },
                { value: "$2.5B+", label: "Funds Raised" },
                { value: "10k+", label: "Investor Matches" },
                { value: "3x", label: "Avg. Growth Rate" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={index === 3 ? "border-none" : ""}
                >
                  <motion.div 
                    className="text-4xl font-bold text-blue-600 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-blue-50/30 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">How StartupIQ Works</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get started in minutes and see results in days</h3>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative">
             {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-blue-200 -z-10"></div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={staggerContainer}
            >
              {[
                { title: "Sign Up & Connect", desc: "Create your account and connect your startup data sources in under 5 minutes", step: 1, icon: <Rocket className="w-6 h-6"/>, color: "blue" },
                { title: "AI Analysis", desc: "Our AI analyzes your market, competitors, content, and identifies growth opportunities", step: 2, icon: <Zap className="w-6 h-6"/>, color: "purple" },
                { title: "Get Insights", desc: "Receive personalized recommendations, investor matches, and actionable strategies", step: 3, icon: <Eye className="w-6 h-6"/>, color: "pink" },
                { title: "Grow & Scale", desc: "Implement AI-powered strategies and track your progress with real-time analytics", step: 4, icon: <BarChart3 className="w-6 h-6"/>, color: "green" },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center text-center group"
                  variants={fadeInUp}
                >
                  <motion.div 
                    className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-8 shadow-xl shadow-blue-600/20 border-4 border-white z-10 relative"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)"
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.step}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{ scale: 1.5, opacity: 0.3 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                  <motion.div 
                    className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm w-full h-full relative overflow-hidden"
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                  >
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                    <motion.div 
                      className={`mb-4 inline-block p-3 bg-${item.color}-50 rounded-lg text-${item.color}-600 relative z-10`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 relative z-10">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <motion.button 
              onClick={handleStart} 
              className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Scale Section (Accordion) */}
      <section className="py-24 bg-white relative overflow-hidden">
         {/* Background decoration */}
         <motion.div 
           className="absolute top-20 right-0 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"
           animate={{
             scale: [1, 1.2, 1],
             x: [0, -50, 0],
           }}
           transition={{
             duration: 15,
             repeat: Infinity,
           }}
         />
         
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={fadeInUp}
            >
                <motion.h2 
                  className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3"
                  variants={fadeInUp}
                >
                  Everything You Need to Scale
                </motion.h2>
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-slate-900"
                  variants={fadeInUp}
                >
                  Comprehensive tools for every stage of your startup journey
                </motion.h3>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={staggerContainer}
            >
                {scaleFeatures.map((feature, index) => (
                    <motion.div 
                        key={index}
                        variants={fadeInUp}
                        className={`border rounded-2xl transition-all duration-300 overflow-hidden relative group ${activeFeature === index ? 'border-slate-300 shadow-lg bg-white' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                        }}
                    >
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity ${
                            index === 0 ? 'from-blue-500 to-purple-500' :
                            index === 1 ? 'from-purple-500 to-pink-500' :
                            'from-green-500 to-teal-500'
                          }`}
                        />
                        <motion.button 
                            className="w-full px-8 py-6 flex items-center justify-between text-left relative z-10"
                            onClick={() => setActiveFeature(index)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex items-center gap-6">
                                <motion.div 
                                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${feature.color}`}
                                  whileHover={{ 
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: 1.1
                                  }}
                                  transition={{ duration: 0.5 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">{feature.title}</h4>
                                    <motion.p 
                                      className={`text-slate-500 mt-1 transition-all duration-300 ${activeFeature === index ? 'opacity-100' : 'opacity-0 h-0 md:opacity-100 md:h-auto'}`}
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ 
                                        opacity: activeFeature === index ? 1 : 0,
                                        height: activeFeature === index ? 'auto' : 0
                                      }}
                                    >
                                        {activeFeature === index || window.innerWidth >= 768 ? feature.description : ''}
                                    </motion.p>
                                </div>
                            </div>
                            <motion.div
                              animate={{ 
                                rotate: activeFeature === index ? 180 : 0 
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                ))}
            </motion.div>
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
          >
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Simple, Transparent Pricing</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Choose the perfect plan for your startup</h3>
            <p className="text-xl text-slate-600">Start free, scale as you grow. No hidden fees.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={staggerContainer}
          >
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                description: "Perfect for early-stage startups testing the waters",
                features: [
                  "Up to 3 team members",
                  "Basic AI insights",
                  "5 investor matches/month",
                  "Community support",
                  "Content analysis",
                ],
                cta: "Start Free",
                popular: false,
                gradient: "from-slate-600 to-slate-700"
              },
              {
                name: "Growth",
                price: "$99",
                period: "per month",
                description: "For startups ready to scale and raise funding",
                features: [
                  "Up to 10 team members",
                  "Advanced AI analytics",
                  "Unlimited investor matches",
                  "Priority support",
                  "Competitive intelligence",
                  "Custom integrations",
                  "Fundraising dashboard",
                ],
                cta: "Start 14-Day Trial",
                popular: true,
                gradient: "from-blue-600 to-purple-600"
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "contact us",
                description: "For established startups with complex needs",
                features: [
                  "Unlimited team members",
                  "White-label solution",
                  "Dedicated success manager",
                  "Custom AI models",
                  "API access",
                  "SLA guarantee",
                  "Advanced security",
                ],
                cta: "Contact Sales",
                popular: false,
                gradient: "from-purple-600 to-pink-600"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative rounded-3xl p-8 bg-white border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                    : 'border-slate-200 shadow-lg hover:shadow-xl'
                }`}
                whileHover={{ 
                  y: -10,
                  boxShadow: plan.popular 
                    ? "0 30px 60px rgba(59, 130, 246, 0.3)" 
                    : "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg"
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      ⭐ MOST POPULAR
                    </motion.span>
                  </motion.div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h4>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-slate-900">{plan.price}</span>
                    {plan.price !== "Free" && plan.price !== "Custom" && (
                      <span className="text-slate-500 text-lg">/{plan.period}</span>
                    )}
                    {plan.price === "Custom" && (
                      <span className="text-slate-500 text-lg block mt-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-slate-600">{plan.description}</p>
                </div>

                <motion.button
                  onClick={handleStart}
                  className={`w-full py-3 px-6 rounded-xl font-bold mb-6 relative overflow-hidden group ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <span className="relative z-10">{plan.cta}</span>
                </motion.button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-blue-600' : 'text-green-500'
                      }`} />
                      <span className="text-slate-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-slate-600 text-lg mb-4">All plans include a 14-day money-back guarantee</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required for trial
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Upgrade or downgrade freely
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
       <section className="py-24 bg-blue-50/50 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={fadeInUp}
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Enterprise-Grade Security & Compliance</h2>
            <h3 className="text-2xl text-slate-600 mb-16">Your data is protected with industry-leading security standards</h3>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={staggerContainer}
          >
            {[
                { icon: <Shield className="w-8 h-8 text-blue-600"/>, title: "SOC 2 Certified", desc: "Type II compliance ensuring highest security standards", color: "blue" },
                { icon: <Lock className="w-8 h-8 text-purple-600"/>, title: "256-bit SSL", desc: "Bank-level encryption for all data in transit", color: "purple" },
                { icon: <Globe className="w-8 h-8 text-green-600"/>, title: "GDPR Compliant", desc: "Full compliance with data privacy regulations", color: "green" },
                { icon: <CheckCircle className="w-8 h-8 text-orange-600"/>, title: "99.9% Uptime", desc: "Reliable service with guaranteed availability", color: "orange" },
            ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center group"
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                >
                    <motion.div 
                      className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mb-4 relative overflow-hidden`}
                      whileHover={{ 
                        scale: 1.1,
                        boxShadow: `0 10px 30px rgba(59, 130, 246, 0.2)`
                      }}
                    >
                        <motion.div
                          className={`absolute inset-0 bg-${item.color}-200`}
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 2, opacity: 0.5 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="relative z-10"
                        >
                          {item.icon}
                        </motion.div>
                    </motion.div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-500 max-w-[200px]">{item.desc}</p>
                </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl border border-slate-200 inline-block w-full max-w-4xl shadow-sm relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
              boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
              y: -5
            }}
          >
             <motion.div 
               className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             />
             <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 relative z-10">Trusted by Industry Leaders</h4>
             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 transition-all duration-500 relative z-10">
                 <motion.p 
                   className="text-lg font-bold text-slate-800"
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: false }}
                   transition={{ delay: 0.2 }}
                 >
                   Join hundreds of startups and venture capital firms who trust StartupIQ with their most sensitive business data.
                 </motion.p>
                 <motion.div 
                   className="flex gap-4"
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: false }}
                   variants={staggerContainer}
                 >
                    {["ISO 27001", "PCI DSS", "Privacy Shield", "CCPA Compliant"].map((badge, i) => (
                      <motion.span 
                        key={i}
                        variants={scaleIn}
                        className="px-3 py-1 border rounded text-xs font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {badge}
                      </motion.span>
                    ))}
                 </motion.div>
                 <motion.div 
                   className="flex gap-4 ml-auto"
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: false }}
                   variants={staggerContainer}
                 >
                     <motion.div 
                       variants={scaleIn}
                       className="bg-white border rounded-lg p-2 shadow-sm flex flex-col items-center w-20 hover:shadow-md transition-shadow"
                       whileHover={{ y: -5, borderColor: "#3b82f6" }}
                     >
                         <Shield className="w-6 h-6 text-blue-600 mb-1" />
                         <span className="text-[10px] font-bold text-slate-700">Verified</span>
                     </motion.div>
                     <motion.div 
                       variants={scaleIn}
                       className="bg-white border rounded-lg p-2 shadow-sm flex flex-col items-center w-20 hover:shadow-md transition-shadow"
                       whileHover={{ y: -5, borderColor: "#10b981" }}
                     >
                         <Lock className="w-6 h-6 text-green-600 mb-1" />
                         <span className="text-[10px] font-bold text-slate-700">Certified</span>
                     </motion.div>
                 </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section 
        className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
         {/* Animated Abstract Shapes */}
         <motion.div 
           className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
           animate={{
             x: [-100, 100, -100],
             y: [-50, 50, -50],
             scale: [1, 1.2, 1],
           }}
           transition={{
             duration: 20,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
         <motion.div 
           className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
           animate={{
             x: [100, -100, 100],
             y: [50, -50, 50],
             scale: [1, 1.3, 1],
           }}
           transition={{
             duration: 25,
             repeat: Infinity,
             ease: "easeInOut"
           }}
         />
         <motion.div 
           className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"
           animate={{
             scale: [1, 1.5, 1],
             rotate: [0, 180, 360],
           }}
           transition={{
             duration: 30,
             repeat: Infinity,
             ease: "linear"
           }}
         />

         <motion.div 
           className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
           variants={staggerContainer}
         >
             <motion.h2 
               variants={fadeInUp}
               className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-4"
             >
               Ready to Accelerate Your Startup Growth?
             </motion.h2>
             <motion.h3 
               variants={fadeInUp}
               className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
             >
                 Join{' '}
                 <motion.span
                   className="inline-block"
                   animate={{
                     scale: [1, 1.1, 1],
                   }}
                   transition={{
                     duration: 2,
                     repeat: Infinity,
                   }}
                 >
                   500+ startups
                 </motion.span>
                 {' '}using StartupIQ to raise funds, acquire customers, and scale faster. Start your free trial today and see results within the first week.
             </motion.h3>

             <motion.div 
               variants={fadeInUp}
               className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
             >
                 <motion.button 
                   onClick={handleStart} 
                   className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold flex items-center justify-center relative overflow-hidden group"
                   whileHover={{ scale: 1.05, y: -5 }}
                   whileTap={{ scale: 0.95 }}
                 >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Sparkles className="w-5 h-5 mr-2 relative z-10" /> 
                    <span className="relative z-10">Start Free 14-Day Trial</span>
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl" />
                    </motion.div>
                 </motion.button>
                 <motion.div 
                   className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 flex items-center"
                   whileHover={{ 
                     backgroundColor: "rgba(255,255,255,0.15)",
                     borderColor: "rgba(255,255,255,0.3)"
                   }}
                 >
                    <input 
                      type="email" 
                      placeholder="Enter your work email" 
                      className="bg-transparent border-none text-white placeholder-blue-200 focus:ring-0 w-full outline-none" 
                    />
                    <motion.button 
                      className="text-white font-bold"
                      whileHover={{ scale: 1.1, color: "#bfdbfe" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Get Started
                    </motion.button>
                 </motion.div>
             </motion.div>

             <motion.div 
               variants={staggerContainer}
               className="flex flex-wrap justify-center gap-6 mt-8 text-sm font-medium text-blue-100"
             >
                 {["No credit card required", "Cancel anytime", "Setup in 5 minutes"].map((text, i) => (
                   <motion.span 
                     key={i}
                     variants={fadeInUp}
                     className="flex items-center"
                     whileHover={{ scale: 1.1, color: "#ffffff" }}
                   >
                     <CheckCircle className="w-4 h-4 mr-2 text-white" /> {text}
                   </motion.span>
                 ))}
             </motion.div>
         </motion.div>
      </motion.section>
    </div>
  );
};

export default HomePage;
