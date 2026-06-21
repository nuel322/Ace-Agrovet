import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: 'shows' | 'training' | 'advisory';
  categoryLabel: string;
  location: string;
  event: string;
  description: string;
  imageUrl: string;
  date: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Keynote Paper Presentation: NPS 2024",
    category: "shows",
    categoryLabel: "Trade Shows & Expos",
    location: "Abeokuta, Nigeria",
    event: "Nigeria Poultry Show (NPS 24)",
    description: "Dr. Senen delivering the primary professional lecture on adapting to economic realities by utilizing innovative compound formulations and local alternatives during material scarcities.",
    imageUrl: "https://i.ibb.co/DDbjmsy4/Whats-App-Image-2026-06-18-at-3-41-21-PM.jpg",
    date: "November 2024"
  },
  {
    id: 2,
    title: "m2 MIX Premium Premix Consultations",
    category: "shows",
    categoryLabel: "Trade Shows & Expos",
    location: "Exhibition Center",
    event: "m2 MIX Agribusiness Exhibition",
    description: "Dr. Senen and technical partners consultation on high-quality livestock premixes and balanced veterinary micro-ingredients with prominent poultry operators.",
    imageUrl: "https://i.ibb.co/KxTb1VTx/Whats-App-Image-2026-06-18-at-3-41-13-PM.jpg",
    date: "September 2024"
  },
  {
    id: 3,
    title: "Farrowing & Swine Value Chain Presentation",
    category: "training",
    categoryLabel: "Seminars & Classes",
    location: "Public Service Institute, Abuja",
    event: "PFAN National Congress",
    description: "Dr. Senen demonstrating sow gestation timelines, creep feeding milestones, and swine value-chain integration strategies for pig breeding cooperatives.",
    imageUrl: "https://i.ibb.co/Sw4d1yCq/Whats-App-Image-2026-06-18-at-3-24-04-PM.jpg",
    date: "May 2021"
  },
  {
    id: 4,
    title: "TechnoServe Agribusiness Field Auditing Session",
    category: "training",
    categoryLabel: "Seminars & Classes",
    location: "Socio-Economic Development Hub",
    event: "TechnoServe Specialist Training",
    description: "Dr. Senen providing technical veterinary feedback and lecturing commercial agricultural graduates on structured community feed-mill development models.",
    imageUrl: "https://i.ibb.co/wZQ6rCKQ/Whats-App-Image-2026-06-18-at-3-24-02-PM.jpg",
    date: "October 2023"
  },
  {
    id: 5,
    title: "Interactive Swine Nutrition Lecture",
    category: "training",
    categoryLabel: "Seminars & Classes",
    location: "Agricultural Resource Center",
    event: "Feed Avenue Farmer Seminar",
    description: "Dr. Senen conducting an open classroom training workshop on swine diets, piglet weaning ratios, and simple on-farm record spreadsheet tracking.",
    imageUrl: "https://i.ibb.co/BHjvgFRB/Whats-App-Image-2026-06-18-at-3-24-03-PM-1.jpg",
    date: "July 2023"
  },
  {
    id: 6,
    title: "Species-Specific Concentrate Program",
    category: "training",
    categoryLabel: "Seminars & Classes",
    location: "Agribusiness Training Pavilion",
    event: "Advanced Feed Technology Symposium",
    description: "Dr. Senen presenting Rubitrix solutions on Species-Specific Swine and Cattle concentrates. Focusing on gut health, mitigating local heat stress, and farrowing yield parameters.",
    imageUrl: "https://i.ibb.co/zh7S3rYG/Whats-App-Image-2026-06-18-at-3-24-01-PM-3.jpg",
    date: "June 2024"
  },
  {
    id: 7,
    title: "Feed Avenue Agribusiness Strategy Briefing",
    category: "training",
    categoryLabel: "Seminars & Classes",
    location: "Cooperative Advisory Room",
    event: "Agribusiness Investment Round",
    description: "Dr. Senen demonstrating self-milling profitability models. Mapping custom ingredient pricing, dry season feeding logistics, and milling margins on a laptop setup.",
    imageUrl: "https://i.ibb.co/m57gYFqw/Whats-App-Image-2026-06-18-at-3-24-01-PM-2.jpg",
    date: "August 2023"
  },
  {
    id: 8,
    title: "Rubitrix Agri-Tech Advisory Service",
    category: "shows",
    categoryLabel: "Trade Shows & Expos",
    location: "Agri-Tech Expo Canopy",
    event: "Rubitrix Interactive Launch",
    description: "Presenting custom computerized feed calculation tools and commercial formulation software protocols directly to animal farmers and compound millers.",
    imageUrl: "https://i.ibb.co/sXFNyr6/Whats-App-Image-2026-06-18-at-3-24-01-PM-4.jpg",
    date: "January 2024"
  },
  {
    id: 9,
    title: "One-on-One Formula Auditing Desk",
    category: "shows",
    categoryLabel: "Trade Shows & Expos",
    location: "Commercial Machinery Stand",
    event: "Agribusiness Trade Fair",
    description: "Interactive advisory desk. Recalculating local ingredient ratios, digestible lysine values, and cost-saving substitutes for visiting livestock farmers.",
    imageUrl: "https://i.ibb.co/8gftV979/Whats-App-Image-2026-06-18-at-3-24-03-PM.jpg",
    date: "August 2023"
  },
  {
    id: 10,
    title: "Livestock Cooperative Consultations",
    category: "shows",
    categoryLabel: "Trade Shows & Expos",
    location: "Rubitrix Advisory Desk",
    event: "National Livestock Feed Summit",
    description: "Guiding animal science investors and dairy farm managers in formulating specialized concentrates to reduce wastage and secure year-round feed sources.",
    imageUrl: "https://i.ibb.co/mCGxdBJQ/Whats-App-Image-2026-06-18-at-3-24-01-PM-1.jpg",
    date: "April 2024"
  },
  {
    id: 11,
    title: "Commercial Cowshed Layout & Feed Audit",
    category: "advisory",
    categoryLabel: "On-Farm Audits",
    location: "Dairy Farming District, France",
    event: "Dairy Facility Technical Exchange",
    description: "Dr. Senen conducting a modern cowshed inspection. Auditing silage quality, dry roughage ratios, stall comfort indices, and daily lactation parameters with local herdsmen.",
    imageUrl: "https://i.ibb.co/23N6j2cH/Whats-App-Image-2026-06-18-at-3-24-01-PM.jpg",
    date: "April 2021"
  },
  {
    id: 12,
    title: "Commercial Herd Paddock Diagnostics",
    category: "advisory",
    categoryLabel: "On-Farm Audits",
    location: "Nasarawa, Nigeria",
    event: "Operational & Biosecurity Farm Audit",
    description: "ACE Agrovet technical team in full protective wear, sterile boots, and caps inspecting soil conditions, water troughs, crowd densities, and herd safety metrics.",
    imageUrl: "https://i.ibb.co/PZ8fXs6L/Whats-App-Image-2026-06-18-at-3-24-00-PM-1.jpg",
    date: "July 2022"
  },
  {
    id: 13,
    title: "Biosecurity & Layer Handling Collection Tutorial",
    category: "advisory",
    categoryLabel: "On-Farm Audits",
    location: "Commercial Layer Cooperatives",
    event: "On-Farm Battery Cage Demostration",
    description: "Dr. Senen demonstrating sterile, gentle collection and sorting of farm fresh table eggs, emphasizing hand hygiene discipline, cage density, and records logging.",
    imageUrl: "https://i.ibb.co/cKHqrBsp/Whats-App-Image-2026-06-18-at-3-24-00-PM.jpg",
    date: "December 2023"
  }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'shows' | 'training' | 'advisory'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    
    let nextIndex = direction === 'next' ? lightboxIndex + 1 : lightboxIndex - 1;
    if (nextIndex >= filteredItems.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = filteredItems.length - 1;
    }
    setLightboxIndex(nextIndex);
  };

  return (
    <section id="homepage-gallery" className="py-20 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      {/* Background radial alignment to fit the clean, dark, tech-forward theme */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase rounded-full tracking-wider mb-4">
            <Camera className="h-3.5 w-3.5" />
            ACE Agrovet in Action
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight font-sans">
            Our Event & Consultancy Gallery
          </h2>
          <p className="text-slate-400 text-sm mt-3.5 font-sans leading-relaxed max-w-2xl mx-auto">
            Authentic, real consulting highlights. Browse live photos of Dr. Senen and the ACE Agrovet team conducting veterinary audits, trade show exhibitions, national swine/poultry speeches, and local community seminars.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'View All Images' },
            { id: 'shows', label: 'Trade Shows & Expos' },
            { id: 'training', label: 'Seminars & Classes' },
            { id: 'advisory', label: 'On-Farm Audits' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id as any);
                setLightboxIndex(null);
              }}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Immersive Responsive Image Grid (Direct, beautiful thumbnail links with lightbox engagement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-950 border border-slate-800/80 aspect-square shadow-md hover:shadow-2xl hover:shadow-emerald-950/20 hover:border-emerald-500/25 transition-all duration-300"
            >
              {/* Actual direct URL image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500 ease-out opacity-85 group-hover:opacity-100"
              />

              {/* Informational overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase mb-1">
                  {item.categoryLabel}
                </span>
                <h3 className="font-extrabold text-white text-sm sm:text-base leading-snug tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-slate-800/80 pt-2.5">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span className="truncate max-w-[110px]">{item.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px]">
                    <Eye className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span className="uppercase tracking-wide text-emerald-400">View Details</span>
                  </div>
                </div>
              </div>

              {/* Mobile Device Always-On text context strip */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-slate-950/80 backdrop-blur-xs border-t border-slate-800/80 flex items-center justify-between sm:hidden">
                <span className="font-bold text-white text-xs truncate max-w-[150px]">{item.title}</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                  <Eye className="h-3 w-3" /> Details
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal overlay stage */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-center select-none">
            
            {/* Modal Navigation Control Bar */}
            <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-10 text-white bg-slate-950/40">
              <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-emerald-400">
                Photo {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-white"
                aria-label="Close Lightbox"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Immersive Modal View Frame */}
            <div className="max-w-6xl mx-auto px-4 w-full flex flex-col lg:flex-row items-center gap-8 select-text">
              
              {/* Image Frame with Navigation triggers */}
              <div className="relative w-full lg:w-3/5 flex items-center justify-center aspect-video group/lightbox rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/60 shadow-2xl">
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] max-w-full object-contain"
                />

                {/* Left arrow controls */}
                <button
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-4 p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-lg hover:scale-105"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right arrow controls */}
                <button
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-4 p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-lg hover:scale-105"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Informational details sidebar */}
              <div className="w-full lg:w-2/5 text-left bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl self-stretch flex flex-col justify-center font-sans">
                
                {/* Event Category Badge */}
                <span className="self-start inline-block px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-emerald-500/30 mb-4">
                  {filteredItems[lightboxIndex].categoryLabel}
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2 font-sans">
                  {filteredItems[lightboxIndex].title}
                </h3>
                
                <div className="inline-flex items-center gap-1.5 text-emerald-500 text-xs font-extrabold uppercase mb-4 tracking-wider">
                  <Tag className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{filteredItems[lightboxIndex].event}</span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-medium font-sans">
                  {filteredItems[lightboxIndex].description}
                </p>

                {/* Metadata key-value details */}
                <div className="space-y-3.5 pt-5 border-t border-slate-800 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <MapPin className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span><strong className="text-slate-200 font-sans">Location:</strong> {filteredItems[lightboxIndex].location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span><strong className="text-slate-200 font-sans">Date Logged:</strong> {filteredItems[lightboxIndex].date}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Lightbox Bottom instruction strip */}
            <div className="absolute bottom-4 inset-x-0 text-center text-slate-500 text-[10px] font-semibold tracking-wide">
              Click side arrows to toggle or X to exit.
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
