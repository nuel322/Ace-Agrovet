import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { 
  FileText, Download, Eye, CheckCircle, TrendingUp, Calendar, 
  Briefcase, ClipboardList, BookOpen, Printer, Sparkles, Plus, AlertCircle 
} from 'lucide-react';

interface ResourceTemplate {
  id: string;
  category: 'record' | 'planning';
  title: string;
  description: string;
  fileSize: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: string[];
  instructions: string[];
  tableHeaders: string[];
  sampleRows: string[][];
  generatePDF: (farmName?: string, flockId?: string) => jsPDF;
}

export default function ResourcesPanel() {
  const [farmName, setFarmName] = useState('');
  const [flockId, setFlockId] = useState('');
  const [activePreview, setActivePreview] = useState<string | null>('daily-egg-feed');
  const [customizerStatus, setCustomizerStatus] = useState<'idle' | 'generating' | 'success'>('idle');

  // Helper: Create professional PDF Header
  const applyBrandingHeader = (doc: jsPDF, title: string, subtitle: string, documentFarmName?: string, documentFlockId?: string) => {
    // Top colored banner
    doc.setFillColor(16, 185, 129); // Emerald-600
    doc.rect(0, 0, 210, 28, 'F');

    // Branding text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('ACE AGROVET CONSULTS', 15, 12);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('AGRICULTURAL TRAINING • FORMULATIONS • EXPERT ADVISORY', 15, 18);
    doc.text('Email: ace_vets@yahoo.com  |  Tel: 08038986150', 15, 23);

    // Document Title
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(title.toUpperCase(), 15, 42);

    // Document Metadata
    doc.setTextColor(71, 85, 105); // Slate-600
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.text(subtitle, 15, 48);

    // Optional Farm-Specific Metas
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42); // Slate-900
    
    if (documentFarmName) {
      doc.setFont('helvetica', 'bold');
      doc.text(`FARM: ${documentFarmName.toUpperCase()}`, 15, 56);
    } else {
      doc.text('FARMNAME: ________________________________', 15, 56);
    }

    if (documentFlockId) {
      doc.setFont('helvetica', 'bold');
      doc.text(`FLOCK/BATCH REF: ${documentFlockId.toUpperCase()}`, 130, 56);
    } else {
      doc.text('FLOCK ID: ______________________', 130, 56);
    }

    // Generated at Timestamp link
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate-400
    doc.text(`Official PDF template generated via ACE Resources portal on ${new Date().toLocaleDateString()}`, 15, 62);

    // Thin accent line
    doc.setFillColor(226, 232, 240); // Slate-200
    doc.rect(15, 65, 180, 0.5, 'F');
  };

  // Helper: Draw custom table grid
  const drawPDFGrid = (doc: jsPDF, yStart: number, headers: string[], rows: (string | number)[][], colWidths: number[]) => {
    let currentY = yStart;
    const rowHeight = 8;
    const paddingX = 3;

    // Header fill
    doc.setFillColor(30, 41, 59); // Slate-800
    doc.rect(15, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
    
    // Header text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    
    let currentX = 15;
    headers.forEach((header, index) => {
      doc.text(header, currentX + paddingX, currentY + 5.5);
      currentX += colWidths[index];
    });

    currentY += rowHeight;

    // Table rows
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85); // Slate-700

    rows.forEach((row, rowIndex) => {
      // Alternate row backgrounds
      if (rowIndex % 2 === 1) {
        doc.setFillColor(248, 250, 252); // Slate-50
        doc.rect(15, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F');
      }

      // Draw grid borders
      doc.setDrawColor(226, 232, 240); // Slate-200
      doc.rect(15, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'S');

      let itemX = 15;
      row.forEach((cell, cellIndex) => {
        // Vertical divider cell borders
        doc.line(itemX, currentY, itemX, currentY + rowHeight);
        doc.text(String(cell), itemX + paddingX, currentY + 5);
        itemX += colWidths[cellIndex];
      });

      // End of row vertical border
      doc.line(itemX, currentY, itemX, currentY + rowHeight);

      currentY += rowHeight;
    });

    return currentY;
  };

  // Helper: Draw Footnote
  const applyPDFDisclaimer = (doc: jsPDF, startY: number) => {
    let currentY = startY + 10;
    doc.setFillColor(241, 245, 249); // Slate-100
    doc.rect(15, currentY, 180, 20, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text('ACE STRATEGIC ADVISORY INSTRUCTIONS:', 18, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105); // Slate-600
    doc.text('1. File this printable sheet immediately into your farm archives binder for strict auditing.', 18, currentY + 11);
    doc.text('2. Review mortality rates weekly. Any spike exceeding 1.5% in 48 hours requires urgent expert veterinary diagnosis.', 18, currentY + 15);

    // Final signature lines
    currentY += 32;
    doc.setDrawColor(148, 163, 184); // Slate-400
    doc.line(15, currentY, 80, currentY);
    doc.line(130, currentY, 195, currentY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text('Farm Attendant / Recorder Signature', 15, currentY + 4);
    doc.text('Lead Advisory Veterinarian (ACE AGROVET)', 130, currentY + 4);
  };

  const templates: ResourceTemplate[] = [
    {
      id: 'daily-egg-feed',
      category: 'record',
      title: 'Daily Poultry Record-Keeping Ledger',
      description: 'The ultimate sheet for auditing daily feed intake, cumulative egg yields, mortality indexes, and bio-veterinary treatments across flocks.',
      fileSize: '124 KB (PDF Format)',
      icon: ClipboardList,
      fields: ['Date (Day 1 - 30)', 'Flock Count Balance', 'Feed Consumed (kg)', 'Egg Count (Trays/Singles)', 'Mortality Count', 'Bio-Vaccines Administered', 'General Comments'],
      instructions: [
        'Place this printable ledger directly on the door of the pen for immediate records entry.',
        'Always compute cumulative statistics at the end of every week to determine feed-to-egg conversion ratios (FCR).',
        'Input true feedback. Transparent records enable our veterinarians to diagnose any dropping production curves accurately.'
      ],
      tableHeaders: ['Day', 'Flock Vol.', 'Feed (Kg)', 'Eggs (Trays)', 'Egg Single', 'Mortality', 'Drugs / Treatment Done', 'Recorder'],
      sampleRows: [
        ['Day 1', '1,200', '135', '24', '12', '1', 'Gumboro Dose 1 Administered', 'Adebayo'],
        ['Day 2', '1,199', '135', '25', '8', '0', 'Standard floor bedding turned over', 'Adebayo'],
        ['Day 3', '1,199', '136', '26', '3', '0', 'Routine vitamin liquid supplements', 'Adebayo'],
        ['Day 4', '1,199', '135', '26', '16', '1', 'Observed alert posture and stable feed pull', 'Oche'],
        ['Day 5', '1,198', '137', '27', '2', '0', 'None - optimal climate conditions', 'Oche'],
      ],
      generatePDF: (name = '', flock = '') => {
        const doc = new jsPDF();
        applyBrandingHeader(doc, 'Daily Poultry Record-Keeping Ledger', 'Standard 30-Day Operational Pen Log Sheet for Layers & Breeders', name, flock);
        
        // Brief instructions box on PDF
        doc.setFillColor(252, 251, 247); 
        doc.setDrawColor(217, 119, 6); // Amber border
        doc.rect(15, 68, 180, 16, 'DF');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(146, 64, 14);
        doc.text('CRITICAL PROTOCOL:', 18, 73);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.text('Fill every row consistently at exactly 5:00 PM evening feeding. Note mortality instances immediately to contain outbreaks.', 18, 78);

        // Grid columns mapping widths
        const headers = ['Day', 'Flock Bal.', 'Feed (kg)', 'Eggs (Trays)', 'Singles', 'Mortality', 'Bio-Treatments Done / Medicines', 'Initials'];
        const widths = [12, 18, 18, 22, 15, 18, 62, 15];

        let rows = [
          ['Day 1', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 2', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 3', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 4', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 5', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 6', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 7', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Week 1 Total', '__________', '__________', '__________', '__________', '__________', 'Summary Review Check Done', 'Leader'],
          ['Day 8', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 9', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 10', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 11', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 12', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 13', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Day 14', '__________', '__________', '__________', '__________', '__________', '___________________________________', '______'],
          ['Week 2 Total', '__________', '__________', '__________', '__________', '__________', 'Summary Review Check Done', 'Leader'],
        ];

        const endY = drawPDFGrid(doc, 88, headers, rows, widths);
        applyPDFDisclaimer(doc, endY);
        return doc;
      },
    },
    {
      id: 'flock-mortality-health',
      category: 'record',
      title: 'Flock Health & Mortality Log Sheet',
      description: 'Trace individual disease symptoms, daily flock losses, and bio-security actions taken to maintain optimal flock health indexes.',
      fileSize: '115 KB (PDF Format)',
      icon: FileText,
      fields: ['Date of Incident', 'Pen Reference', 'Flock Age (Weeks)', 'Mortality count', 'Reported Symptoms', 'Veterinary intervention details', 'Post-Mortem Findings (if any)'],
      instructions: [
        'Any bird showing signs of somnolence, ocular/nasal discharges, or reduced water drive must be isolated immediately.',
        'Register deaths directly inside this index. If logs hit 5 deaths daily inside a pen of 1000 birds, isolate is deemed critical.',
        'File after physical signature confirmation of the lead clinical vet.'
      ],
      tableHeaders: ['Date', 'Pen Ref', 'Age (Wks)', 'Deaths Count', 'Symptoms Noted', 'Action Conducted', 'Vet Verdict'],
      sampleRows: [
        ['12-Jun-26', 'Pen #02', '14 Weeks', '4 Birds', 'Drooping wings, green loose stool', 'Quarantined and administered multi-vitamins', 'Pending Lab Output'],
        ['14-Jun-26', 'Pen #02', '14 Weeks', '1 Bird', 'Isolated bird recover, mild lethargy remaining', 'Injected broad spectrum antibiotic dose', 'Stable Recovery'],
        ['15-Jun-26', 'Pen #01', '32 Weeks', '0 Birds', 'Optimal state. Hard shell egg pull maintained', 'Routine calcium carbonate feed amendment', 'Perfect Clearance']
      ],
      generatePDF: (name = '', flock = '') => {
        const doc = new jsPDF();
        applyBrandingHeader(doc, 'Flock Health & Mortality Log Sheet', 'Bio-Security Clinical Compliance and Mortality Incidence Tracker', name, flock);
        
        doc.setFillColor(254, 242, 242); 
        doc.setDrawColor(239, 68, 68); // Red border
        doc.rect(15, 68, 180, 16, 'DF');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(153, 27, 27);
        doc.text('EMERGENCY THRESHOLD INDICATOR:', 18, 73);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.text('If cumulative loss exceeds 0.1% of entire stock size single-day, trigger immediate diagnostic isolation protocol.', 18, 78);

        const headers = ['Date', 'Pen #', 'Age', 'Deaths', 'Symptoms Observed', 'Bio-Security Action Initiated', 'Vet Sign'];
        const widths = [18, 15, 12, 15, 52, 53, 15];

        let rows = [
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
          ['__/__/__', '_____', '____ Wks', '_____', '____________________________', '____________________________', '______'],
        ];

        const endY = drawPDFGrid(doc, 88, headers, rows, widths);
        applyPDFDisclaimer(doc, endY);
        return doc;
      }
    },
    {
      id: 'poultry-business-budget',
      category: 'planning',
      title: 'Poultry Business Planning & Budget Matrix',
      description: 'Outline your farm establishment CAPEX, projected stock procurement costs, feed pricing factors, and yield margins to pitch for agricultural financing.',
      fileSize: '156 KB (PDF Format)',
      icon: Briefcase,
      fields: ['CAPEX (Housings, Water, Lighting Feeders)', 'OPEX (Day-old Chicks cost, Feed Bags, Bio-sec vaccines)', 'Assumed Mortality Margin (%)', 'Feed bags usage forecast', 'Harvest Profit Margin projections'],
      instructions: [
        'Always estimate raw materials pricing with a 15% local market inflation factor.',
        'Separate Fixed Capital Costs (long term structures) from Recurring Working capital needs (feed, vaccines) during accounting.',
        'Use these templates when reviewing micro-finance credit loans with agricultural cooperative banks.'
      ],
      tableHeaders: ['Budget Item Classification', 'Standard Description', 'Expected Unit Cost (Naira)', 'Required Quantity', 'Total CAPEX Needed', 'Priority Weight'],
      sampleRows: [
        ['Poultry Housing (Deep Litter)', 'Concrete floor + galvanised mesh grid structures', '1,200,000', '1 Housing Complex', '1,200,000', 'High (Critical)'],
        ['Day Old Chicks (DOCs)', 'Chunky cobb-500 premium broiler stocks', '850', '2,000 Birds', '1,700,000', 'High (Critical)'],
        ['Automated Bell Feeders', 'Suspended plastic bell feeding rigs with guards', '4,500', '40 Feeders', '180,000', 'Medium'],
        ['Initial Bio-Veterinary vaccine kit', 'Complete vaccine plan setup kit', '85,000', '2 sets', '170,000', 'High (Critical)']
      ],
      generatePDF: (name = '', flock = '') => {
        const doc = new jsPDF();
        applyBrandingHeader(doc, 'Poultry Business Planning & Budget Prep Matrix', 'Establishment Capital Expenditure (CAPEX) & Profit Projection Template', name, flock);
        
        doc.setFillColor(239, 246, 255); 
        doc.setDrawColor(59, 130, 246); // Blue border
        doc.rect(15, 68, 180, 16, 'DF');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 64, 175);
        doc.text('FINANCIAL SUSTAINABILITY CRITERIA:', 18, 73);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.text('Ensure that Feed allocation holds at minimum 65% - 70% of cumulative recurring operational expenditures.', 18, 78);

        const headers = ['Financial Item Category', 'Short Description', 'Unit Cost Estimate (N)', 'Qty', 'Cumulative Cost (N)', 'Review Status'];
        const widths = [42, 50, 32, 12, 29, 15];

        let rows = [
          ['Pen Construction / Cage', '____________________________', '___________', '____', '___________', '______'],
          ['Stock Purchase (DOCs)', '____________________________', '___________', '____', '___________', '______'],
          ['Feed Procurement (Starter)', '____________________________', '___________', '____', '___________', '______'],
          ['Feed Procurement (Finisher)', '____________________________', '___________', '____', '___________', '______'],
          ['Vitamins / Clinical Drugs', '____________________________', '___________', '____', '___________', '______'],
          ['Charcoal / Heating Setup', '____________________________', '___________', '____', '___________', '______'],
          ['Waterer & Feeding Rigs', '____________________________', '___________', '____', '___________', '______'],
          ['Labor Hire Allocation', '____________________________', '___________', '____', '___________', '______'],
          ['Power / Utility Supplies', '____________________________', '___________', '____', '___________', '______'],
          ['Contingency Buffer (15%)', 'Emergency margin backup buffer', '___________', '____', '___________', '______'],
          ['GRAND TOTAL CAPEX', 'Estimated initial setup capital requirement', '___________', '____', '___________', '______'],
        ];

        const endY = drawPDFGrid(doc, 88, headers, rows, widths);
        applyPDFDisclaimer(doc, endY);
        return doc;
      }
    }
  ];

  const handleDownload = (template: ResourceTemplate) => {
    try {
      const doc = template.generatePDF(farmName, flockId);
      doc.save(`ACE_AGROVET_${template.id.toUpperCase().replace(/-/g, '_')}_TEMPLATE.pdf`);
    } catch (error) {
      console.error('Error generating template:', error);
      alert('Could not compile PDF. Please check that Supabase configured attributes are aligned.');
    }
  };

  const handleCustomGeneration = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomizerStatus('generating');
    setTimeout(() => {
      try {
        const selectedId = activePreview || 'daily-egg-feed';
        const targetTemplate = templates.find(t => t.id === selectedId);
        if (targetTemplate) {
          const doc = targetTemplate.generatePDF(farmName, flockId);
          doc.save(`ACE_AGROVET_${farmName.trim().toUpperCase().replace(/ /g, '_') || 'CUSTOM'}_${targetTemplate.id.toUpperCase().replace(/-/g, '_')}_SHEET.pdf`);
          setCustomizerStatus('success');
          setTimeout(() => setCustomizerStatus('idle'), 4000);
        }
      } catch (err) {
        setCustomizerStatus('idle');
        alert('Failed generating tailored PDF. Please check input text format.');
      }
    }, 1200);
  };

  const selectedTemplate = templates.find(t => t.id === activePreview) || templates[0];

  return (
    <div id="resources-root" className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner header container */}
        <div id="resources-banner" className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-md text-white border border-slate-700/40">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 -mr-12 -mt-12 h-64 w-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              Empowering Livestock Operations
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Agribusiness Resource Center
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Unlock our professional suite of downloadable record-keeping ledgers, clinical mortality registers, and CAPEX budget templates. Designed by expert veterinarians to support structured farm audits and precise operational management.
            </p>
          </div>
        </div>

        {/* Dynamic customized panel builder */}
        <div id="farm-customizer-dock" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                <Printer className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Tailored Log Sheet PDF Instigator</h2>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Personalize any record-keeping document with your specific custom Farm Branding details and Flock ID before printing.
            </p>

            <form onSubmit={handleCustomGeneration} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Select Template Base
                </label>
                <select
                  value={selectedTemplate.id}
                  onChange={(e) => setActivePreview(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-xs font-semibold focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors cursor-pointer"
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Enforce Custom Farm Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Obasanjo Farms Ltd"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Enforce Flock / Batch ID Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. BATCH-L-2026A"
                  value={flockId}
                  onChange={(e) => setFlockId(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl text-xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={customizerStatus === 'generating'}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {customizerStatus === 'generating' ? (
                  <>
                    <span className="animate-spin h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full"></span>
                    Compiling Custom PDF...
                  </>
                ) : customizerStatus === 'success' ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Downloaded Successfully!
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 text-emerald-400" />
                    Build custom PDF
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Directory items listing */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => {
              const Icon = template.icon;
              const isActive = activePreview === template.id;

              return (
                <div 
                  key={template.id}
                  onClick={() => setActivePreview(template.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left ${
                    isActive 
                      ? 'bg-emerald-50/40 border-emerald-500/80 ring-1 ring-emerald-500/20 shadow-sm' 
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`p-2 rounded-xl shrink-0 ${
                        isActive ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-700 group-hover:bg-slate-100'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={`text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full ${
                        template.category === 'record' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {template.category === 'record' ? 'Farm Record' : 'Agribusiness plan'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100/80 mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-slate-500 space-x-2">
                    <span className="text-[10px] font-mono text-slate-400">{template.fileSize}</span>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActivePreview(template.id); }}
                        className="p-1 px-2 hover:bg-slate-100 text-slate-600 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleDownload(template); }}
                        className="p-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        Get PDF
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Tabular Document Preview Box */}
        {selectedTemplate && (
          <div id="live-resource-preview-board" className="bg-white rounded-3xl border border-slate-250 shadow-sm overflow-hidden">
            {/* Board Header decoration */}
            <div className="bg-slate-900 px-6 sm:px-8 py-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                  <Eye className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Interactive Printable Sheet Preview</h3>
                  <p className="text-[11px] text-slate-400">Inspecting layout matrix for {selectedTemplate.title}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(selectedTemplate)}
                className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                Download standard PDF Template
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Instructions Row */}
              <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-slate-700 text-xs">
                  <p className="font-bold text-amber-900">How to use this template:</p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px] leading-relaxed">
                    {selectedTemplate.instructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Table Data Preview mockup representation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Template Table Architecture (Sample Rows)
                  </p>
                  <span className="text-[10px] font-bold text-slate-400">Total Standard Columns: {selectedTemplate.tableHeaders.length}</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs text-slate-600 min-w-[700px]">
                    <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                      <tr>
                        {selectedTemplate.tableHeaders.map((hdr, idx) => (
                          <th key={idx} className="p-3 border-r border-slate-200 last:border-0">{hdr}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedTemplate.sampleRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/40">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 border-r border-slate-200 last:border-0 font-medium">{cell}</td>
                          ))}
                        </tr>
                      ))}
                      <tr className="bg-slate-50/40 text-[10px] italic text-slate-400">
                        {selectedTemplate.tableHeaders.map((_, idx) => (
                          <td key={idx} className="p-3 border-r border-slate-100 last:border-0 text-center">
                            {idx === 0 ? 'Day 6...' : idx === selectedTemplate.tableHeaders.length - 1 ? '______' : 'Blank Log Fill Row'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Preview Footer details */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-wrap justify-between items-center gap-3">
              <span className="text-[11px] font-mono">Bespoke branding matches your configuration if created with Tailored log builder (above).</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACE AGROVET CERTIFIED TOOL</span>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
