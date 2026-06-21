import React, { useState } from 'react';
import { Sprout, Menu, X, Landmark, User, Settings2, Facebook, Linkedin } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Our Services & Feed Formulator', id: 'services' },
    { name: 'Training Programs', id: 'training' },
    { name: 'Expert Consulting', id: 'consulting' },
    { name: 'Resources Center', id: 'resources' },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center">
            <button 
              id="logo-button"
              onClick={() => { setActiveTab('home'); setIsOpen(false); }}
              className="flex items-center space-x-3 group text-left cursor-pointer"
            >
              <div className="flex items-center justify-center p-1 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-300 h-12 w-12 shrink-0 overflow-hidden">
                <img 
                  src="https://i.ibb.co/ZR0n8bWt/slazzer-preview-zlpr6.png" 
                  alt="ACE AGROVET Logo" 
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center whitespace-nowrap">
                <span className="block text-base font-bold tracking-tight text-slate-900 leading-none">
                  ACE AGROVET
                </span>
                <span className="block text-[11px] font-semibold tracking-widest text-emerald-600 uppercase mt-0.5">
                  CONSULTS
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center lg:space-x-0.5 xl:space-x-1.5 flex-nowrap shrink-0">
            {navigation.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-2 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <div className="h-6 w-px bg-slate-200 mx-1.5 xl:mx-2 shrink-0"></div>

            <button
              id="nav-admin"
              onClick={() => setActiveTab('admin')}
              title="Admin Portal"
              aria-label="Admin Portal"
              className={`flex items-center justify-center p-2 rounded-xl transition-all duration-150 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-550 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Settings2 className="h-5 w-5 shrink-0" />
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2 shrink-0"></div>

            <a
              href="https://www.facebook.com/share/1DtckFd3Qs/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-150 cursor-pointer"
              title="Facebook Profile"
              aria-label="Facebook Profile"
            >
              <Facebook className="h-5 w-5 shrink-0" />
            </a>

            <a
              href="https://www.linkedin.com/company/ace-agrovet-consults/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-150 cursor-pointer"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 shrink-0" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden border-t border-slate-100 bg-white">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <div className="border-t border-slate-100 my-2 pt-2 col-span-full">
              <button
                id="mobile-nav-admin"
                onClick={() => {
                  setActiveTab('admin');
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-2 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings2 className="h-5 w-5" />
                <span>Admin Portal</span>
              </button>
            </div>

            <div className="border-t border-slate-100 mt-2 pt-4 px-4 flex items-center space-x-4">
              <span className="text-xs font-semibold text-slate-450 text-slate-450/80 uppercase tracking-wider">Follow Us:</span>
              <a 
                href="https://www.facebook.com/share/1DtckFd3Qs/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                title="Facebook Profile"
                aria-label="Facebook Profile"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/ace-agrovet-consults/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
