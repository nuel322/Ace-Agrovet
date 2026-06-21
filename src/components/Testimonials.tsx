import React, { useState, useEffect, useRef } from 'react';
import { 
  Quote, ChevronLeft, ChevronRight, Star, TrendingUp, Play, Pause,
  ShieldCheck, Sprout, Award, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: number;
  ownerName: string;
  farmName: string;
  location: string;
  enterpriseType: string;
  metrics: {
    label: string;
    value: string;
  }[];
  avatarColor: string;
  rating: number;
  storyQuote: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    ownerName: "Mr. Mfon Ayara",
    farmName: "Meayar Farms (MD)",
    location: "Uyo, Akwa Ibom",
    enterpriseType: "Commercial Pig Farming & Restructuring",
    avatarColor: "bg-emerald-600 text-white",
    rating: 5,
    metrics: [
      { label: "Primary Growth Goal", value: "100kg Pig Weight at 6 Months" },
      { label: "Restructuring Scope", value: "Feed & Genetics Audit" },
      { label: "Key Infrastructure", value: "Creep Areas & Phased Feed Plans" }
    ],
    storyQuote: "The comprehensive pig farm audit conducted by Ace Agrovet Consults was a massive eye-opener for Meayar Farms. The consultant identified critical flaws in our operations, particularly our poor feed and genetic stock. Their tailored restructuring plan provided us with actionable solutions, from a phased feeding program to essential infrastructure upgrades like creep areas. We now have a clear path to achieving our goal of 100kg pigs at 6 months of age. I highly recommend their technical expertise to any farmer looking to achieve true profitability."
  },
  {
    id: 2,
    ownerName: "Mr. Akaasar Kuraiyol",
    farmName: "Farm Owner",
    location: "Nasarawa",
    enterpriseType: "Pig Farm Operation & Feeding Audit",
    avatarColor: "bg-sky-600 text-white",
    rating: 5,
    metrics: [
      { label: "Critical Identification", value: "Over-reliance on Maize Bran" },
      { label: "Core Restructuring", value: "Biosecurity & Clinical Health" },
      { label: "Strategic Pathway", value: "Balanced Feed & Record-keeping" }
    ],
    storyQuote: "The farm audit conducted by Ace Agrovet Consults was an eye-opener for us. They quickly identified critical problems that were stunting our pigs' growth, such as our over-reliance on maize bran and a complete lack of routine health management. With their expert recommendations on balanced feed formulations, biosecurity measures, and proper record-keeping, we are finally on the right path to profitability."
  },
  {
    id: 3,
    ownerName: "Halimat Dooyum Salifu",
    farmName: "Owner, Ojel Farm",
    location: "Abuja",
    enterpriseType: "Precision Nutrition & Layer Operations",
    avatarColor: "bg-amber-600 text-white",
    rating: 5,
    metrics: [
      { label: "Laying Rate Peak", value: "+75% Projected (Up from 14%)" },
      { label: "Milling Advantage", value: "Custom Milling Prescriptions" },
      { label: "Financial Turnaround", value: "+N88,000 Projected Daily Profit" }
    ],
    storyQuote: "Our flock of layers was severely underperforming at just a 14% laying rate at 23 weeks when we sought Dr. Senen's expertise. We were bleeding money on expensive feed. The custom feed formulation provided to us completely shifted our production model. By milling our own feed using their prescribed mixture, we targeted a minimum 75% laying rate. This technical support turned an unsustainable loss into a projected additional daily profit of NGN 88,000. I highly recommend their precision nutrition services."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    if (index > currentIndex) {
      setDirection('right');
    } else if (index < currentIndex) {
      setDirection('left');
    }
    setCurrentIndex(index);
  };

  // Swiping support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const active = TESTIMONIALS_DATA[currentIndex];

  const slideVariants = {
    initial: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 40 : -40
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -40 : 40,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  return (
    <section id="client-testimonials-section" className="py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            Verified Customer Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Real Impact on the Field
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-sans">
            Read success stories from farmers, breeders, and piggery setups utilizing our feed recipes, biosecurity reviews, and startup layouts.
          </p>
        </div>

        {/* Testimonials Main Framework Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Aggregated High-Level Performance Stats */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Aggregated Success Rates
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Our advisory is fueled by verified veterinary science, nutritional standards, and real crop-growing heuristics.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 font-bold shrink-0">
                    <Sprout className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">50+ Projects Complete</h5>
                    <p className="text-[10px] text-slate-400 font-sans">Operational plans designed nationwide</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 font-bold shrink-0">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Over 90% Client Renewal</h5>
                    <p className="text-[10px] text-slate-400 font-sans">Sustained productivity advisory contracts</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 font-bold shrink-0">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">25% Average Cost Savings</h5>
                    <p className="text-[10px] text-slate-400 font-sans">Gained on raw ingredient purchases</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Informational Box */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-emerald-500 text-slate-950 font-black text-[9px] uppercase px-2 py-0.5 rounded-md">
                Certified
              </div>
              <h4 className="text-xs font-black tracking-wider uppercase text-emerald-400">OUR BIOSECURITY PROGRAM</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                We provide advisory and install modern and functional biosecurity systems that safeguard your investments while protecting the environment.
              </p>
            </div>
          </div>

          {/* Right Column: Cyclable Cards Testimonial Area */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div 
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden flex-grow flex flex-col justify-between min-h-[380px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Backing Accent Quote Icon */}
              <div className="absolute top-6 right-8 text-slate-100 opacity-60">
                <Quote className="h-20 w-20 transform rotate-180" />
              </div>

              {/* Animate-supported content container */}
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6 flex-grow flex flex-col justify-between"
                  >
                    {/* Story Author Bio Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        {/* Custom visual avatar placeholder */}
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-black ${active.avatarColor} text-base shrink-0 shadow-inner`}>
                          {active.ownerName.split(' ').filter(n => n && !n.includes("Chief") && !n.includes("Alhaji") && !n.includes("Mr.") && !n.includes("Dr.")).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AM'}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base leading-tight">
                            {active.ownerName}
                          </h4>
                          <p className="text-xs text-slate-500 font-sans">
                            {active.farmName} &bull; <span className="text-emerald-600 font-medium">{active.location}</span>
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-bold tracking-wider uppercase text-slate-400">
                            {active.enterpriseType}
                          </span>
                        </div>
                      </div>

                      {/* Display Rating Stars */}
                      <div className="flex items-center gap-1 mb-4 text-amber-500">
                        {Array.from({ length: active.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-amber-500" />
                        ))}
                      </div>

                      {/* Narrative Text */}
                      <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed font-serif pt-1">
                        &ldquo;{active.storyQuote}&rdquo;
                      </p>
                    </div>

                    {/* Numeric achievements highlights */}
                    <div className="mt-6 border-t border-slate-100 pt-6">
                      <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-3 block">
                        Verified Project Highlights
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {active.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center sm:text-left">
                            <span className="block text-[9px] text-slate-400 uppercase tracking-tight leading-none font-sans">
                              {m.label}
                            </span>
                            <span className="block text-xs font-black text-rose-950 sm:text-sm mt-1">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lower Deck Controls */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                
                {/* Auto Cycle Controls */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 px-2.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 bg-white shadow-sm flex items-center justify-center gap-1.5 text-[11px] font-medium tracking-wide transition-all cursor-pointer hover:border-slate-300"
                    title={isPlaying ? "Pause auto-rotation" : "Enable auto-rotation"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3 w-3 text-red-500 fill-red-500" />
                        <span>PAUSE ROTATION</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 text-emerald-500 fill-emerald-500" />
                        <span>AUTO ROTATION</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bullets Pagination Navigation */}
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS_DATA.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index ? 'w-6 bg-emerald-600' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Show feedback card ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Left and Right Manual Clicks */}
                <div className="flex items-center gap-2">
                  <button
                    id="prev-testimonial-btn"
                    onClick={handlePrev}
                    className="h-10 w-10 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 transition-all cursor-pointer shadow-sm bg-white"
                    aria-label="Previous story"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    id="next-testimonial-btn"
                    onClick={handleNext}
                    className="h-10 w-10 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-950 transition-all cursor-pointer shadow-sm bg-white"
                    aria-label="Next story"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
