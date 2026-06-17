import React from 'react';
import { Sprout, Phone, Mail, MapPin, Award, CheckCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-slate-900 border-t border-slate-800 text-slate-300">
      
      {/* Top Value Bar */}
      <div className="bg-slate-950/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Award className="h-5 w-5 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">ACE AGROVET Consults - Certified Agricultural Partners</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Empowering Livestock Operations
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Smarter Feed Formulation
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="flex items-center justify-center p-1 bg-slate-800/60 border border-slate-700/50 rounded-xl h-10 w-10 shrink-0 overflow-hidden">
                <img 
                  src="https://i.ibb.co/ZR0n8bWt/slazzer-preview-zlpr6.png" 
                  alt="ACE AGROVET Logo" 
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-base font-bold tracking-tight">ACE AGROVET CONSULTS</span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-400">
              A professional agricultural consulting agency. We equip individuals, smallholders, and deep-pocketed agribusiness investors with rigorous training, technical nutrition formulations, and biosecurity plans that generate high yields.
            </p>
          </div>

          {/* Quick Links Nav */}
          <div className="md:col-span-1 lg:col-span-2 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest text-indigo-400">Quick Links</h4>
            <div className="space-y-1.5 text-xs">
              <button onClick={() => setActiveTab('home')} className="block hover:text-white transition-colors cursor-pointer text-left">Home Hub</button>
              <button onClick={() => setActiveTab('about')} className="block hover:text-white transition-colors cursor-pointer text-left">About Us</button>
              <button onClick={() => setActiveTab('services')} className="block hover:text-white transition-colors cursor-pointer text-left">Feed Optimizer</button>
              <button onClick={() => setActiveTab('training')} className="block hover:text-white transition-colors cursor-pointer text-left">Training Programs</button>
              <button onClick={() => setActiveTab('consulting')} className="block hover:text-white transition-colors cursor-pointer text-left">Expert Advisory</button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest text-indigo-400">Headquarters</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>ACE Agrovet Corporate Offices, Agribusiness Plaza, Makurdi, Benue State, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>08038986150</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>ace_vets@yahoo.com</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-1 lg:col-span-3 space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest text-indigo-400">Operational Hours</h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-sans leading-relaxed">
              <p><span className="font-bold text-white">Mondays – Fridays:</span> 8:00 AM – 5:00 PM</p>
              <p><span className="font-bold text-white">Saturdays:</span> 9:00 AM – 1:00 PM</p>
              <p><span className="font-bold text-white">Sunday Consultations:</span> Closed (Emergency Hotlines open)</p>
            </div>
          </div>

        </div>

        {/* Lower bar */}
        <div className="h-px bg-slate-800 my-8"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ACE AGROVET CONSULTS. All rights reserved.</p>
          <p className="font-medium text-[10px] tracking-wide uppercase text-indigo-400">Developed by Dovihster Technologies</p>
        </div>
      </div>

    </footer>
  );
}
