import React, { useState } from 'react';
import { 
  Sprout, ArrowRight, Award, Shield, Lightbulb, Users, Leaf, HelpCircle, 
  MapPin, CheckCircle, Calendar, GraduationCap, FileCheck, ClipboardList, 
  ChevronRight, Sparkles, MessageSquareCode, Settings2, FileSpreadsheet, Bot,
  Scale, MessageCircle, Lock, Eye, EyeOff, Mail
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import InteractiveFeedCalculator from './components/InteractiveFeedCalculator';
import AdminPanel from './components/AdminPanel';
import Testimonials from './components/Testimonials';
import GallerySection from './components/GallerySection';
import ResourcesPanel from './components/ResourcesPanel';
import { addBooking } from './lib/storage';

import feedScienceImg from './assets/images/animal_feed_science_1780479694117.png';
import poultryHeritageImg from './assets/images/poultry_farming_heritage_1780479677140.png';
import smartAgriAiImg from './assets/images/smart_agriculture_ai_1780479708646.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Admin Authentication States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('ace_admin_authenticated') === 'true';
  });
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Interactive Form States
  // 1. Enrollment Form (Training)
  const [enrollName, setEnrollName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrollPhone, setEnrollPhone] = useState('');
  const [enrollProgram, setEnrollProgram] = useState('Poultry Farming');
  const [enrollExperience, setEnrollExperience] = useState('Beginner');
  const [enrollDate, setEnrollDate] = useState('');
  const [enrollIsSubmitting, setEnrollIsSubmitting] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [lastSubmittedEnroll, setLastSubmittedEnroll] = useState<{
    name: string;
    email: string;
    phone: string;
    program: string;
    experience: string;
    date: string;
  } | null>(null);

  // 2. Consulting Form
  const [consultName, setConsultName] = useState('');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultArea, setConsultArea] = useState('Farm Establishment');
  const [consultDetails, setConsultDetails] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [consultIsSubmitting, setConsultIsSubmitting] = useState(false);
  const [consultSuccess, setConsultSuccess] = useState(false);
  const [lastSubmittedConsult, setLastSubmittedConsult] = useState<{
    name: string;
    email: string;
    phone: string;
    area: string;
    details: string;
    date: string;
  } | null>(null);

  // Reload admin stats if a save or book is triggered
  const [adminReloadKey, setAdminReloadKey] = useState(0);

  const triggerAdminReload = () => {
    setAdminReloadKey(prev => prev + 1);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollName || !enrollEmail || !enrollPhone || !enrollDate) return;

    setEnrollIsSubmitting(true);
    try {
      await addBooking({
        type: 'training',
        name: enrollName,
        email: enrollEmail,
        phone: enrollPhone,
        category: enrollProgram,
        details: `Experience Level: ${enrollExperience}`,
        date: enrollDate
      });

      setLastSubmittedEnroll({
        name: enrollName,
        email: enrollEmail,
        phone: enrollPhone,
        program: enrollProgram,
        experience: enrollExperience,
        date: enrollDate
      });

      setEnrollSuccess(true);
      triggerAdminReload();
      // Clear fields
      setEnrollName('');
      setEnrollEmail('');
      setEnrollPhone('');
      setEnrollDate('');
      // Keep state showing success banner, don't clear immediately
    } catch (err) {
      console.error(err);
    } finally {
      setEnrollIsSubmitting(false);
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultEmail || !consultPhone || !consultDate) return;

    setConsultIsSubmitting(true);
    try {
      await addBooking({
        type: 'consulting',
        name: consultName,
        email: consultEmail,
        phone: consultPhone,
        category: consultArea,
        details: consultDetails,
        date: consultDate
      });

      setLastSubmittedConsult({
        name: consultName,
        email: consultEmail,
        phone: consultPhone,
        area: consultArea,
        details: consultDetails,
        date: consultDate
      });

      setConsultSuccess(true);
      triggerAdminReload();
      // Clear fields
      setConsultName('');
      setConsultEmail('');
      setConsultPhone('');
      setConsultDetails('');
      setConsultDate('');
      // Keep state showing success banner, don't clear immediately
    } catch (err) {
      console.error(err);
    } finally {
      setConsultIsSubmitting(false);
    }
  };

  return (
    <div id="app-root-layout" className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Branding and Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Grid */}
      <main className="flex-grow">
        
        {/* ==================== HOME TAB ==================== */}
        {activeTab === 'home' && (
          <div id="tab-home-content">
            {/* Hero Banner Section */}
            <section id="home-hero" className="relative py-20 lg:py-28 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Hero Left Copy */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-900/50 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Elite Agribusiness Consultancies</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight lg:leading-none text-white">
                      Empowering Farmers. <br className="hidden sm:inline" />
                      Improving Livestock. <br />
                      <span className="text-emerald-400">Growing Agribusiness.</span>
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                      ACE AGROVET CONSULTS is a professional agricultural consulting company dedicated to helping farmers, agribusiness owners, and aspiring farm entrepreneurs succeed through expert training, practical advisory services, and modern livestock management solutions.
                    </p>
                    <p className="text-slate-300 text-sm hidden sm:block leading-relaxed max-w-2xl font-medium">
                      Whether you are starting a farm, managing an existing operation, or seeking to improve productivity and profitability, we provide the guidance, knowledge, and technical support needed to achieve sustainable agricultural success.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        id="hero-btn-consult"
                        onClick={() => setActiveTab('consulting')}
                        className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        Get Expert Consultation
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        id="hero-btn-training"
                        onClick={() => setActiveTab('training')}
                        className="px-6 py-3.5 bg-slate-800 hover:bg-slate-755 text-white border border-slate-700 hover:border-slate-600 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Book a Practical Training
                      </button>
                    </div>
                  </div>

                  {/* Hero Right Card Frame */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full text-slate-100 shadow-2xl relative">
                      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-emerald-500 font-bold text-xs uppercase px-2.5 py-1 text-slate-950 rounded-lg shrink-0">
                        Interactive
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <Scale className="h-5 w-5 text-emerald-400" />
                        Feed Formulator Calculator
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Mix multiple ingredients and solve exact compound feed protein proportions using our live Excel Feed Calculator.
                      </p>

                      <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 mb-4 font-sans max-h-48 overflow-hidden">
                        <p className="text-emerald-400">📊 Formulator Features:</p>
                        <p>• Quick templates (Broiler, Layers, Pigs, Sheep)</p>
                        <p>• User-defined raw material crude protein percentages</p>
                        <p>• Batch weight calculations in kg or bags</p>
                      </div>

                      <button
                        onClick={() => setActiveTab('services')}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase rounded-xl tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-2"
                      >
                        Launch Interactive Formulator
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* About Preview Section */}
            <section id="about-preview" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Company Preview</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-6">
                      Building Smarter Farms for a Better Future
                    </h2>
                    
                    <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-sans">
                      <p>
                        At ACE AGROVET CONSULTS, we believe agriculture should be profitable, sustainable, and professionally managed. We work with individuals, organizations, cooperatives, and agribusiness investors to provide practical solutions that improve farm productivity and business performance.
                      </p>
                      <p>
                        Our expertise covers farmer training, livestock productivity management, animal nutrition advisory, and agricultural consulting for both startups and established farms.
                      </p>
                      <p>
                        We are committed to equipping farmers with the right knowledge, strategies, and modern practices that lead to long-term growth and food security.
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setActiveTab('about')}
                        className="text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        Learn more about our team and values
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Aesthetic grid representing core capabilities */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      <div className="h-10 w-10 text-emerald-600 bg-emerald-50 rounded-xl flex items-center justify-center font-bold mb-3">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Practical Trainings</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">Empowering farmers with hands-on technical capacity.</p>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      <div className="h-10 w-10 text-emerald-600 bg-emerald-50 rounded-xl flex items-center justify-center font-bold mb-3">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Startup Setup</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">Strategic advisory, housing builds and business plans.</p>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      <div className="h-10 w-10 text-emerald-600 bg-emerald-50 rounded-xl flex items-center justify-center font-bold mb-3">
                        <Scale className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Feed Formulations</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">Maximizing Crude Protein and FCR while cutting costs.</p>
                    </div>

                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                      <div className="h-10 w-10 text-emerald-600 bg-emerald-50 rounded-xl flex items-center justify-center font-bold mb-3">
                        <ClipboardList className="h-5 w-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Active Farm Reviews</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">Audits to curb mortality and boost daily weight gains.</p>
                    </div>
                  </div>
                </div>

                {/* Mission & Vision blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-12 border-t border-slate-100">
                  <div className="bg-emerald-950 text-white rounded-3xl p-8 border border-emerald-900 relative shadow-md">
                    <div className="h-10 w-10 bg-emerald-900/60 border border-emerald-800 text-emerald-400 rounded-xl flex items-center justify-center font-bold mb-4">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white mb-2">Our Mission</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                      To empower farmers and agribusinesses through practical agricultural training, professional consulting, and innovative livestock solutions that improve productivity and sustainability.
                    </p>
                  </div>

                  <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 relative shadow-md">
                    <div className="h-10 w-10 bg-slate-800 border border-slate-700 text-emerald-400 rounded-xl flex items-center justify-center font-bold mb-4">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white mb-2">Our Vision</h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                      To become a trusted leader in agricultural consulting and livestock advisory services, contributing to food security and sustainable agricultural development.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services At A Glance */}
            <section id="services-preview" className="py-20 bg-slate-50 border-t border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Expertise</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">What We Do</h2>
                  <p className="text-sm text-slate-500 mt-2 font-sans">
                    Guiding modern farmers using scientific agricultural methodologies.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Service Card 1 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Education</span>
                      <h4 className="font-bold text-slate-900 text-base mt-1 mb-3">Farmer Training Programs</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                        We provide hands-on and practical agricultural training programs for farmers and aspiring agribusiness owners to improve technical knowledge, operational efficiency, and farm profitability.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('training')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1.5 pt-4 cursor-pointer mt-auto border-t border-slate-50">
                      View Courses <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Service Card 2 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Startup Launch</span>
                      <h4 className="font-bold text-slate-900 text-base mt-1 mb-3">Farm Startup Consulting</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                        Starting a farm requires proper planning. We assist new farm investors and entrepreneurs with feasibility business planning, layout orientations, operational system checks, and initial flock selection.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('consulting')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1.5 pt-4 cursor-pointer mt-auto border-t border-slate-50">
                      Explore Consulting <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Service Card 3 */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-200 hover:shadow-md transition-all">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nutrition Advisory</span>
                      <h4 className="font-bold text-slate-900 text-base mt-1 mb-3">Animal Nutrition & Feeding</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                        Proper feeding is essential for livestock health. We offer expert recommendations on feed formulation matrices, nutrition calendars, and custom Excel feed formulations for multiple breeds.
                      </p>
                    </div>
                    <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1.5 pt-4 cursor-pointer mt-auto border-t border-slate-50">
                      Open Feed Formulator <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>

                </div>

                <div className="text-center mt-10">
                  <button
                    id="btn-goto-services"
                    onClick={() => setActiveTab('services')}
                    className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    View All Consulting & Technical Services
                  </button>
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section id="why-choose-us" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Edge</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Why Farmers Trust ACE AGROVET CONSULTS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  <div className="flex gap-4">
                    <div className="p-3 h-11 w-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Experienced Professionals</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Our core consulting team comprises crop specialists, poultry pathologists, and feed technicians with years of field history.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 h-11 w-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Result-Oriented Training</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        Our capacity classes combine technical theories with hands-on on-farm demonstrations for maximum skill translation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 h-11 w-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1 font-sans">Tailored Agribusiness Solutions</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        We avoid standard templates, constructing feed formulations and biosecurity plans calculated uniquely for your farm size and location.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Interactive Feedback & Testimonial Carousel Section */}
            <Testimonials />

            {/* Event & Consultancy Gallery Section */}
            <GallerySection />

            {/* Bottom Call to Action */}
            <section id="home-cta" className="py-16 bg-slate-900 text-white text-center relative overflow-hidden border-t border-slate-800">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-black">Ready to Build a Successful Farm?</h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Partner with ACE AGROVET CONSULTS for expert agricultural guidance, practical training, and professional farm solutions that help your agribusiness grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    onClick={() => setActiveTab('consulting')}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Request Consultation Request
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('main-header');
                      el?.scrollIntoView({ behavior: 'smooth' });
                      setActiveTab('consulting');
                    }}
                    className="px-6 py-3 bg-transparent hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Contact Office Now
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}


        {/* ==================== ABOUT US TAB ==================== */}
        {activeTab === 'about' && (
          <div id="tab-about-content">
            {/* Unified Crop Hero Header Block */}
            <section className="relative py-20 lg:py-28 bg-slate-950 overflow-hidden">
              <img 
                src={poultryHeritageImg} 
                alt="About Us Hero background" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                  <span>Get to Know Us</span>
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 text-white leading-tight">
                  About ACE AGROVET CONSULTS
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed font-sans font-medium">
                  We are on a mission to empower modern farmers, optimize livestock productivity, and grow sustainable agribusinesses globally through deep-rooted agronomic expertise.
                </p>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

              {/* Grid 1: Company Profile */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
                <div className="lg:col-span-12 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Company Introduction</h3>
                  <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-sans">
                    <p>
                      ACE AGROVET CONSULTS is an agricultural consulting company focused on empowering farmers and agribusiness owners through professional training, consulting, and livestock advisory services.
                    </p>
                    <p>
                      We work with small-scale farmers, commercial farms, cooperatives, agricultural investors, and aspiring entrepreneurs to provide practical solutions that improve productivity, profitability, and sustainability.
                    </p>
                    <p>
                      Our approach combines agricultural knowledge, modern farming practices, and hands-on support to help clients build efficient and successful agricultural businesses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission & Vision blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-emerald-950 text-white rounded-3xl p-8 border border-emerald-900 relative shadow-md">
                  <div className="h-10 w-10 bg-emerald-905 border border-emerald-800 text-emerald-400 rounded-xl flex items-center justify-center font-bold mb-4">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-2">Our Mission</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    To empower farmers and agribusinesses through practical agricultural training, professional consulting, and innovative livestock solutions that improve productivity and sustainability.
                  </p>
                </div>

                <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 relative shadow-md">
                  <div className="h-10 w-10 bg-slate-850 border border-slate-750 text-emerald-400 rounded-xl flex items-center justify-center font-bold mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-2">Our Vision</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                    To become a trusted leader in agricultural consulting and livestock advisory services, contributing to food security and sustainable agricultural development.
                  </p>
                </div>
              </div>

              {/* Core Values Section */}
              <div className="mb-16">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold mx-auto mb-3">
                      <Award className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">Excellence</h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                      Committed to high-quality agricultural solutions and professional services.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold mx-auto mb-3">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">Integrity</h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                      We operate with complete honesty, transparency, and high professionalism.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold mx-auto mb-3">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">Innovation</h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                      Promoting modern, practical farming technology that pushes efficiency.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold mx-auto mb-3">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">Sustainability</h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                      Safeguarding resources to ensure long-term, eco-friendly agribusiness growth.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold mx-auto mb-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs mb-1">Empowerment</h4>
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                      Equipping farmers with the critical competencies needed to succeed independently.
                    </p>
                  </div>

                </div>
              </div>

              {/* Why We Exist block */}
              <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200 leading-normal">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <HelpCircle className="h-5 w-5 text-emerald-600" />
                  Why We Exist
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed max-w-4xl font-sans">
                  Agriculture remains one of the most important sectors for economic growth and food security. However, many farmers face challenges such as poor farm management, low productivity, inadequate nutrition practices, and lack of professional guidance. 
                  ACE AGROVET CONSULTS was established to bridge this gap by providing practical agricultural support and expert advisory services that help farmers succeed.
                </p>
              </div>

            </div>
          </div>
        )}


        {/* ==================== SERVICES & FEED FORMULATOR TAB ==================== */}
        {activeTab === 'services' && (
          <div id="tab-services-content">
            {/* Unified Crop Hero Header Block */}
            <section className="relative py-20 lg:py-28 bg-slate-950 overflow-hidden">
              <img 
                src={feedScienceImg} 
                alt="Services Hero background" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <span className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                    <span>Our Domain Portfolios</span>
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 text-white leading-tight">
                    Our Services & Interactive Formulator
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed font-sans font-medium">
                    At ACE AGROVET CONSULTS, we provide practical agricultural solutions tailored to the needs of farmers, livestock producers, agribusiness owners, and agricultural investors.
                  </p>
                </div>
                <a
                  href="#feed-formulator-interactive"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:shadow shrink-0 transition-colors text-center inline-block cursor-pointer"
                >
                  Skip to Feed Formulator
                </a>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

              {/* Expanded Detailed Services list */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                
                {/* 1. Agricultural Trainings */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col h-full hover:border-emerald-200 transition-all">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Class Service 1</span>
                    <h3 className="font-extrabold text-slate-950 text-base mt-0.5">Agricultural Training Programs</h3>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed font-sans">
                      Our training programs are designed to equip farmers and intending farmers with practical knowledge and modern agricultural skills.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200/50">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Our Trainings Cover:</span>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-slate-700">
                      <li>• Poultry management</li>
                      <li>• Animal feeding & nutrition</li>
                      <li>• Farm business setup</li>
                      <li>• Farm biosecurity</li>
                      <li>• Record keeping</li>
                      <li>• Biosecurity frameworks</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('training')} className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-auto pt-2 cursor-pointer">
                    Book custom workshop classes <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 2. Farm Startup Setup */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col h-full hover:border-emerald-200 transition-all">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Consultancy Portfolio 2</span>
                    <h3 className="font-extrabold text-slate-950 text-base mt-0.5">Farm Startup Consulting</h3>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed font-sans">
                      Starting a successful farm requires proper planning and technical guidance. We assist aspiring farm owners and investors through every stage of farm establishment.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200/50">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Startup Consulting Includes:</span>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-slate-700">
                      <li>• Feasibility surveys</li>
                      <li>• Breed layout guidance</li>
                      <li>• Facility recommendation</li>
                      <li>• Business plans</li>
                      <li>• Feeding equipment setups</li>
                      <li>• Operational schedules</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('consulting')} className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-auto pt-2 cursor-pointer">
                    Request setup advisory <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 3. Existing Farm Diagnostics */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col h-full hover:border-emerald-200 transition-all">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Diagnostics Portfolio 3</span>
                    <h3 className="font-extrabold text-slate-950 text-base mt-0.5">Existing Farm Consulting</h3>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed font-sans">
                      We help existing farms improve operational efficiency and productivity through professional consulting, disease protection audits, and technical support.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200/50">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Our Support Includes:</span>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-slate-700">
                      <li>• Performance evaluation</li>
                      <li>• Disease prevention reviews</li>
                      <li>• FCR improvements</li>
                      <li>• Operations restructuring</li>
                      <li>• Weight tracking logs</li>
                      <li>• Cost-reduction diagnostics</li>
                    </ul>
                  </div>
                  <button onClick={() => setActiveTab('consulting')} className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-auto pt-2 cursor-pointer">
                    Book on-site farm audit <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* 4. Animal Nutrition */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col h-full hover:border-emerald-200 transition-all">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Nutrition Portfolio 4</span>
                    <h3 className="font-extrabold text-slate-950 text-base mt-0.5">Animal Nutrition Advisory</h3>
                    <p className="text-slate-600 text-xs mt-2 leading-relaxed font-sans">
                      Proper nutrition is essential for healthy and productive livestock. Our nutrition advisory services help farmers improve feed efficiency and animal performance.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200/50">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Nutrition Advisory Provides:</span>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs font-semibold text-slate-700">
                      <li>• Feed formulation support</li>
                      <li>• Growth performance boost</li>
                      <li>• Feeding calendar design</li>
                      <li>• Local raw feed substitute</li>
                      <li>• Excel formulation sheets</li>
                      <li>• Breed specific nutrition</li>
                    </ul>
                  </div>
                  <a href="#feed-formulator-interactive" className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-auto pt-2 cursor-pointer">
                    Go to Excel Feed Formulator <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

              </div>

              {/* Hanger for Excel Feed Formulator Embed */}
              <div id="feed-formulator-interactive" className="pt-8 border-t border-slate-200">
                <div className="mb-6 text-center max-w-2xl mx-auto">
                  <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
                    Interactive Feature
                  </span>
                  <p className="text-slate-550 text-xs mt-2 font-sans">
                    Utilize our interactive Excel formulation spreadsheet below to calculate exact raw feeding ratios for your desired target proteins.
                  </p>
                </div>
                
                {/* Embed Interactive Calculator */}
                <InteractiveFeedCalculator onSaveSuccess={triggerAdminReload} />
              </div>

            </div>
          </div>
        )}


        {/* ==================== TRAINING PAGE ==================== */}
        {activeTab === 'training' && (
          <div id="tab-training-content">
            {/* Unified Crop Hero Header Block */}
            <section className="relative py-20 lg:py-28 bg-slate-950 overflow-hidden">
              <img 
                src={poultryHeritageImg} 
                alt="Training Programs Hero background" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                  <span>Farmer Capacity Expansion</span>
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 text-white leading-tight">
                  Farmer Training & Capacity Development
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed font-sans font-medium">
                  ACE AGROVET CONSULTS provides practical and professional agricultural training programs designed to help farmers and agribusiness owners succeed.
                </p>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

              {/* Grid Layout of Courses & Signup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
                
                {/* Courses left side */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-extrabold text-slate-905 mb-4">Our Training Areas</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5">Poultry Farming</h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-sans">
                          Learn practical poultry production techniques, brooding layout logs, egg quality boosters, feed scales and biological security management.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-155 rounded-xl">
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5">Livestock Production</h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-sans">
                          Understand proper livestock care, sheep & goat fattening schedules, reproductive logs, cage structures, and yield monitoring.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-155 rounded-xl">
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5">Animal Nutrition</h4>
                        <p className="text-xs text-slate-555 leading-relaxed font-sans">
                          Gain critical competency in feed formulation matrices, feed substitute ratios, and nutrient absorption indices.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-155 rounded-xl">
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5 font-sans">Agribusiness Management</h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-sans font-sans">
                          Structure your farm as a high-profit enterprise. Master cost bookkeeping layouts, margins math, and market logistics.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-155 rounded-xl">
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5">Farm Biosecurity</h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-sans">
                          Curb disease incidences. Design chemical sanitization dips, isolation pens, foot bath cycles, and vaccination timetables.
                        </p>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-145 rounded-xl">
                        <h4 className="font-bold text-slate-900 text-sm mb-1.5">Farm Startup Training</h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-sans">
                          For aspiring farm owners. Transition securely from field theories into physical land acquisition, setups, and stocking.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Program Benefits */}
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md">
                    <h3 className="text-base font-bold text-white tracking-wider mb-4">Benefits of Our Trainings</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-xs">
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Practical and hands-on farm demonstrations</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Industry validated agricultural curriculums</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Expert veterinary and agronomy guidance</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Optimized FCR knowledge to drop feed wasted</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Certificate completions and mentorship access</li>
                      <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> Post-training advisory hotlines</li>
                    </ul>
                  </div>
                </div>

                {/* Practical signup form right side */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-250 shadow-md">
                  <h3 className="text-lg font-extrabold text-slate-950 mb-2">Book Training Session</h3>
                  <p className="text-xs text-slate-500 mb-6 font-sans">
                    Complete the short registration below. Our consultants will follow up within 24 hours to secure your placement ticket.
                  </p>

                  <form id="training-enrollment-form" onSubmit={handleEnrollSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        id="enroll-name"
                        required
                        value={enrollName}
                        onChange={(e) => setEnrollName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          id="enroll-email"
                          required
                          value={enrollEmail}
                          onChange={(e) => setEnrollEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          placeholder="name@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="enroll-phone"
                          required
                          value={enrollPhone}
                          onChange={(e) => setEnrollPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          placeholder="+234 803 000 0000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Target Course Selection</label>
                        <select
                          id="enroll-program-select"
                          value={enrollProgram}
                          onChange={(e) => setEnrollProgram(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-emerald-500"
                        >
                          <option>Poultry Farming</option>
                          <option>Livestock Production</option>
                          <option>Animal Nutrition</option>
                          <option>Agribusiness Management</option>
                          <option>Farm Biosecurity</option>
                          <option>Farm Startup Training</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Experience Tier</label>
                        <select
                          id="enroll-experience-select"
                          value={enrollExperience}
                          onChange={(e) => setEnrollExperience(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-emerald-500"
                        >
                          <option>Beginner (No farm yet)</option>
                          <option>Intermediate (Smallholder)</option>
                          <option>Commercial Enterprise</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Desired Intake Start Date</label>
                      <input
                        type="date"
                        id="enroll-date"
                        required
                        value={enrollDate}
                        onChange={(e) => setEnrollDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      id="enroll-submit-button"
                      disabled={enrollIsSubmitting}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm cursor-pointer transition-colors"
                    >
                      {enrollIsSubmitting ? 'Registering Placement...' : 'Verify Spot Ticket'}
                    </button>

                    {enrollSuccess && lastSubmittedEnroll && (
                      <div id="enroll-success-banner" className="p-4 bg-emerald-50 border border-emerald-200 text-slate-800 rounded-xl text-xs space-y-3 mt-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-emerald-900">Seat Registration Logged!</p>
                            <p className="text-emerald-800 text-[11px] mt-0.5">
                              Your details have been recorded in our database and successfully routed to <span className="font-bold">ace_vets@yahoo.com</span>.
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3 border border-emerald-100 text-slate-700 space-y-1 text-[11px]">
                          <p><strong>Program:</strong> {lastSubmittedEnroll.program}</p>
                          <p><strong>Student:</strong> {lastSubmittedEnroll.name}</p>
                          <p><strong>Email:</strong> {lastSubmittedEnroll.email}</p>
                          <p><strong>Phone:</strong> {lastSubmittedEnroll.phone}</p>
                          <p><strong>Experience:</strong> {lastSubmittedEnroll.experience}</p>
                          <p><strong>Intake Date:</strong> {lastSubmittedEnroll.date}</p>
                        </div>
                        <a
                          href={`mailto:ace_vets@yahoo.com?subject=${encodeURIComponent(`ACE Training Admission Request - ${lastSubmittedEnroll.program}`)}&body=${encodeURIComponent(
                            `Hello ACE Agrovet Expert Team,\n\nI want to register for your training program:\n\n• Program: ${lastSubmittedEnroll.program}\n• Student: ${lastSubmittedEnroll.name}\n• Contact Email: ${lastSubmittedEnroll.email}\n• Phone: ${lastSubmittedEnroll.phone}\n• Experience Level: ${lastSubmittedEnroll.experience}\n• Desired Intake Date: ${lastSubmittedEnroll.date}\n\nThank you!`
                          )}`}
                          className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-lg transition-colors text-center text-[11px] uppercase tracking-wider"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Send Direct Email copy
                        </a>
                      </div>
                    )}
                  </form>
                </div>

              </div>

            </div>
          </div>
        )}


        {/* ==================== CONSULTING PAGE TAB ==================== */}
        {activeTab === 'consulting' && (
          <div id="tab-consulting-content">
            {/* Unified Crop Hero Header Block */}
            <section className="relative py-20 lg:py-28 bg-slate-950 overflow-hidden">
              <img 
                src={poultryHeritageImg} 
                alt="Consulting Hero background" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-400">
                  <span>Core Advisory Portfolios</span>
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 text-white leading-tight">
                  Professional Agricultural Consulting Services
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed font-sans font-medium">
                  ACE AGROVET CONSULTS provides expert consulting services tailored to the needs of modern farmers and agribusiness investors.
                </p>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

              {/* Consulting info and Scheduler Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
                
                {/* Process and Cards side */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-250 shadow-sm space-y-6">
                    <h3 className="text-base font-bold text-slate-905">Areas We Consult In</h3>
                    
                    <div className="space-y-4">
                      
                      <div className="flex gap-4 border-b border-slate-100 pb-4">
                        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm">01</div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Farm Establishment SETUP</h4>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            We assist clients with planning, pen setup orientations, biosecurity layout setups, and deployment of agricultural equipment projects.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 border-b border-slate-100 pb-4">
                        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm">02</div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Livestock Performance Management</h4>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            Structured veterinary guidance on animal care indices, vaccine logbooks, feed scheduling calendars, and layout optimization.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 border-b border-slate-100 pb-4">
                        <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm">03</div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-1">Productivity Improvement Diagnosis</h4>
                          <p className="text-xs text-slate-500 font-sans leading-relaxed">
                            We trace and solve farm FCR and growth bottlenecks, auditing operations to cut bird mortality and protect margins.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Consultation Process checklist */}
                  <div className="bg-indigo-950 text-slate-100 rounded-3xl p-6 sm:p-8 border border-indigo-900 shadow-md">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4">How We Work</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans leading-relaxed">
                      <div>
                        <span className="block font-bold text-white text-sm mb-1">1. Initial Discussion</span>
                        <p className="text-indigo-200">We outline your farm footprint, budget envelopes, and livestock challenges.</p>
                      </div>
                      <div>
                        <span className="block font-bold text-white text-sm mb-1">2. On-Site Assessment</span>
                        <p className="text-indigo-200">Our agronomists audit environmental setups, feed quality parameters, and bird counts.</p>
                      </div>
                      <div>
                        <span className="block font-bold text-white text-sm mb-1">3. Strategic Plan</span>
                        <p className="text-indigo-200">We draft tailored feed formulas, bio-defense calendars, and stocking targets.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live scheduler right side */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-250 shadow-md">
                  <h3 className="text-lg font-extrabold text-slate-950 mb-2">Schedule Consultation</h3>
                  <p className="text-xs text-slate-500 mb-6 font-sans">
                    Complete the parameters below to book a physical or virtual session with our agronomists.
                  </p>

                  <form id="consultation-booking-form" onSubmit={handleConsultSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Your Full Name</label>
                      <input
                        type="text"
                        id="consult-name"
                        required
                        value={consultName}
                        onChange={(e) => setConsultName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                        placeholder="e.g. Emmanuel Terngu"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          id="consult-email"
                          required
                          value={consultEmail}
                          onChange={(e) => setConsultEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          placeholder="holder@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="consult-phone"
                          required
                          value={consultPhone}
                          onChange={(e) => setConsultPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                          placeholder="+234 812 000 0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Primary Advisory Area</label>
                      <select
                        id="consult-area-select"
                        value={consultArea}
                        onChange={(e) => setConsultArea(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-emerald-500"
                      >
                        <option>Farm Establishment</option>
                        <option>Livestock Management</option>
                        <option>Productivity Improvement</option>
                        <option>Operational Management</option>
                        <option>Agribusiness Development</option>
                        <option>Animal Nutrition Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Brief Farm Obstacle Notes</label>
                      <textarea
                        id="consult-details-field"
                        rows={3}
                        value={consultDetails}
                        onChange={(e) => setConsultDetails(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="e.g. My broiler birds have watery grey stool, let us know your diagnostics..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Preferred Consultation Date</label>
                      <input
                        type="date"
                        id="consult-date"
                        required
                        value={consultDate}
                        onChange={(e) => setConsultDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      id="consult-submit-button"
                      disabled={consultIsSubmitting}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm cursor-pointer transition-colors"
                    >
                      {consultIsSubmitting ? 'Securing Schedule Ticket...' : 'Request Consultation Ticket'}
                    </button>

                    {consultSuccess && lastSubmittedConsult && (
                      <div id="consult-success-banner" className="p-4 bg-indigo-50 border border-indigo-200 text-slate-800 rounded-xl text-xs space-y-3 mt-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-indigo-900">Consultation Scheduled!</p>
                            <p className="text-indigo-800 text-[11px] mt-0.5">
                              Your advisory request has been registered in our system and routed to <span className="font-bold">ace_vets@yahoo.com</span>.
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/80 rounded-lg p-3 border border-indigo-100 text-slate-700 space-y-1 text-[11px]">
                          <p><strong>Focus Area:</strong> {lastSubmittedConsult.area}</p>
                          <p><strong>Client:</strong> {lastSubmittedConsult.name}</p>
                          <p><strong>Email:</strong> {lastSubmittedConsult.email}</p>
                          <p><strong>Phone:</strong> {lastSubmittedConsult.phone}</p>
                          <p><strong>Preferred Date:</strong> {lastSubmittedConsult.date}</p>
                          {lastSubmittedConsult.details && (
                            <p className="line-clamp-2"><strong>Notes:</strong> {lastSubmittedConsult.details}</p>
                          )}
                        </div>
                        <a
                          href={`mailto:ace_vets@yahoo.com?subject=${encodeURIComponent(`ACE Advisory Consultation Request - ${lastSubmittedConsult.area}`)}&body=${encodeURIComponent(
                            `Hello ACE Agrovet Consulting Team,\n\nI would like to request an expert advisory consultation:\n\n• Portfolio: ${lastSubmittedConsult.area}\n• Client Name: ${lastSubmittedConsult.name}\n• Contact Email: ${lastSubmittedConsult.email}\n• Phone Number: ${lastSubmittedConsult.phone}\n• Preferred Date: ${lastSubmittedConsult.date}\n• Brief Farm Notes: ${lastSubmittedConsult.details || 'None'}\n\nThank you!`
                          )}`}
                          className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-center text-[11px] uppercase tracking-wider"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          Send Direct Email copy
                        </a>
                      </div>
                    )}
                  </form>
                </div>

              </div>

            </div>
          </div>
        )}





        {/* ==================== RESOURCES TAB ==================== */}
        {activeTab === 'resources' && (
          <div id="tab-resources-content" className="fade-in-section">
            <ResourcesPanel />
          </div>
        )}

        {/* ==================== ADMIN PORTAL TAB ==================== */}
        {activeTab === 'admin' && (
          <div id="tab-admin-content">
            {/* Unified Crop Hero Header Block */}
            <section className="relative py-20 lg:py-28 bg-slate-950 overflow-hidden">
              <img 
                src={smartAgriAiImg} 
                alt="Admin Hero background" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
                <span className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-950/60 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-400">
                  <span>Internal Operations</span>
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-4 text-white leading-tight">
                  ACE Agrovet Consulting Cockpit
                </h1>
                <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed font-sans font-medium">
                  Locally synced administrative control panel to inspect training bookings, review consultation diaries, and trace saved livestock feed formulation guides.
                </p>
              </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

              {!isAdminAuthenticated ? (
                <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600"></div>
                  
                  <div className="text-center mb-6">
                    <div className="mx-auto h-12 w-12 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                      <Lock className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admin Authorization Required</h2>
                    <p className="text-xs text-slate-500 mt-1 font-sans">
                      Please enter your credentials to inspect booked training cohorts, consult diaries, and customized nutrition logs.
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (adminPasswordInput === 'Aceagrovet1234') {
                        setIsAdminAuthenticated(true);
                        setAdminAuthError(false);
                        localStorage.setItem('ace_admin_authenticated', 'true');
                      } else {
                        setAdminAuthError(true);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="admin-pass" className="block text-xs font-bold uppercase text-slate-705 text-slate-750 text-slate-700 tracking-wider mb-2">
                        System Password
                      </label>
                      <div className="relative rounded-xl shadow-sm">
                        <input
                          id="admin-pass"
                          type={showAdminPassword ? "text" : "password"}
                          value={adminPasswordInput}
                          onChange={(e) => setAdminPasswordInput(e.target.value)}
                          placeholder="••••••••••••"
                          className="block w-full rounded-xl border border-slate-200 pl-4 pr-10 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-shadow text-slate-900 font-medium"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowAdminPassword(!showAdminPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                          {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {adminAuthError && (
                        <p className="mt-2 text-xs font-semibold text-red-650 flex items-center gap-1 animate-pulse">
                          ⚠️ Invalid password. Please try again.
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-98 transition-all shadow-md cursor-pointer hover:shadow-indigo-500/20"
                    >
                      Access Cockpit
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-150 border-emerald-100">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Authorized Session
                    </span>
                    <button
                      onClick={() => {
                        setIsAdminAuthenticated(false);
                        setAdminPasswordInput('');
                        localStorage.removeItem('ace_admin_authenticated');
                      }}
                      className="text-xs font-bold text-red-500 hover:text-red-650 bg-red-50 hover:bg-red-100/60 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Logout Session
                    </button>
                  </div>

                  {/* Core Admin Cockpit */}
                  <AdminPanel key={adminReloadKey} />
                </>
              )}

            </div>
          </div>
        )}

      </main>

      {/* Corporate footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Hovering WhatsApp Button */}
      <a
        href="https://wa.me/2348038986150?text=Hello%20ACE%20AGROVET%20CONSULTS%2C%20I%20would%20like%20to%20inquire%20about%20your%20services%20and%20consultancy."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        id="whatsapp-floating-button"
        title="Chat with us on WhatsApp"
      >
        <span className="absolute right-full mr-3 bg-slate-900/95 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-wide">
          Chat with Us
        </span>
        <MessageCircle className="h-6 w-6 fill-current" />
      </a>
    </div>
  );
}
