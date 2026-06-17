import React, { useState } from 'react';
import { Scale, RotateCcw, Save, Trash2, PlusCircle, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { FeedFormulation } from '../types';
import { addFormulation } from '../lib/storage';

interface InteractiveFeedCalculatorProps {
  onSaveSuccess: () => void;
}

const templates = [
  {
    name: "Broiler Starter Mash (Poultry)",
    targetCP: 22,
    ingredient1Name: "Yellow Maize",
    ingredient1CP: 9,
    ingredient2Name: "Soybean Meal (Concentrate)",
    ingredient2CP: 44,
  },
  {
    name: "Standard Layers Mash (Poultry)",
    targetCP: 16.5,
    ingredient1Name: "White Corn",
    ingredient1CP: 8.8,
    ingredient2Name: "High-Protein Fishmeal",
    ingredient2CP: 62,
  },
  {
    name: "Pigs Grower Feed (Swine)",
    targetCP: 15,
    ingredient1Name: "Sorghum Grains",
    ingredient1CP: 10,
    ingredient2Name: "Peanut (Groundnut) Cake",
    ingredient2CP: 45,
  },
  {
    name: "Rabbit Grower Pellets",
    targetCP: 17,
    ingredient1Name: "Wheat Offal",
    ingredient1CP: 14.5,
    ingredient2Name: "Soybean Concentrate",
    ingredient2CP: 48,
  }
];

export default function InteractiveFeedCalculator({ onSaveSuccess }: InteractiveFeedCalculatorProps) {
  // Input states
  const [formName, setFormName] = useState('My Custom Feed Formulation');
  const [targetCP, setTargetCP] = useState<number>(20);
  const [ing1Name, setIng1Name] = useState('Yellow Maize');
  const [ing1CP, setIng1CP] = useState<number>(9);
  const [ing2Name, setIng2Name] = useState('Soybean Meal');
  const [ing2CP, setIng2CP] = useState<number>(44);
  const [batchWeight, setBatchWeight] = useState<number>(100);

  // Success states
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Pearson's Square Calculation values
  let isValid = false;
  let validationError = '';
  let parts1 = 0;
  let parts2 = 0;
  let totalParts = 0;
  let percent1 = 0;
  let percent2 = 0;
  let weight1 = 0;
  let weight2 = 0;

  // Let's validate
  if (targetCP <= 0 || ing1CP <= 0 || ing2CP <= 0) {
    validationError = "Crude Protein values must be positive, non-zero values.";
  } else if (ing1CP === ing2CP) {
    validationError = "Ingredients must have different crude protein values to mix successfully.";
  } else {
    const minCP = Math.min(ing1CP, ing2CP);
    const maxCP = Math.max(ing1CP, ing2CP);
    
    if (targetCP < minCP || targetCP > maxCP) {
      validationError = `The Target Protein (${targetCP}%) must lie between the protein strengths of your ingredients: ${ing1Name} (${ing1CP}%) and ${ing2Name} (${ing2CP}%). You cannot synthesize a protein strength stronger than your maximum ingredient or weaker than your minimum!`;
    } else {
      isValid = true;
      // pearson formula
      parts1 = Math.abs(ing2CP - targetCP); // diagonally opposite
      parts2 = Math.abs(ing1CP - targetCP);
      totalParts = parts1 + parts2;
      
      if (totalParts > 0) {
        percent1 = (parts1 / totalParts) * 100;
        percent2 = (parts2 / totalParts) * 100;
        weight1 = (percent1 / 100) * batchWeight;
        weight2 = (percent2 / 100) * batchWeight;
      }
    }
  }

  const applyTemplate = (tpl: typeof templates[0]) => {
    setFormName(`${tpl.name} Formulation`);
    setTargetCP(tpl.targetCP);
    setIng1Name(tpl.ingredient1Name);
    setIng1CP(tpl.ingredient1CP);
    setIng2Name(tpl.ingredient2Name);
    setIng2CP(tpl.ingredient2CP);
    setSaveStatus('idle');
  };

  const handleReset = () => {
    setFormName('My Custom Feed Formulation');
    setTargetCP(20);
    setIng1Name('Yellow Maize');
    setIng1CP(9);
    setIng2Name('Soybean Meal');
    setIng2CP(44);
    setBatchWeight(100);
    setSaveStatus('idle');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setSaveStatus('saving');
    try {
      addFormulation({
        name: formName,
        targetCP,
        ingredient1Name: ing1Name,
        ingredient1CP: ing1CP,
        ingredient1Parts: parts1,
        ingredient1Percent: percent1,
        ingredient2Name: ing2Name,
        ingredient2CP: ing2CP,
        ingredient2Parts: parts2,
        ingredient2Percent: percent2
      });
      
      setSaveStatus('success');
      onSaveSuccess();
      setTimeout(() => setSaveStatus('idle'), 4000);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(err.message || 'Error occurred while saving feed formulation guidelines.');
    }
  };

  return (
    <div id="feed-calculator-panel" className="bg-white rounded-2xl border border-slate-150 shadow-md p-6 lg:p-8">
      {/* Overview Intro */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="h-6 w-6 text-emerald-600" />
          Interactive Animal Feed Mixer (Pearson Square Tool)
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Proper feeding is essential for livestock health. Select a feed template below or key in custom materials to solve the exact proportions of energy and booster feedstuffs needed to achieve your target Crude Protein percentage.
        </p>
      </div>

      {/* Templates Row */}
      <div className="mb-6">
        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Select Standard Livestock Feed Template:
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {templates.map((tpl, idx) => (
            <button
              key={idx}
              id={`template-btn-${idx}`}
              onClick={() => applyTemplate(tpl)}
              className="px-3 py-2 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-medium rounded-lg text-left border border-slate-200 hover:border-emerald-200 transition-colors cursor-pointer"
            >
              {tpl.name}
              <span className="block font-semibold text-[10px] text-slate-400 mt-0.5">
                Target: {tpl.targetCP}% CP
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-5 space-y-4 border-r border-slate-100 lg:pr-8">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Formulation Name
            </label>
            <input
              type="text"
              id="calc-form-name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              placeholder="e.g. Broiler Finisher"
            />
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/30">
            <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              Desired Target Crude Protein (%)
            </label>
            <input
              type="number"
              id="calc-target-cp"
              value={targetCP}
              onChange={(e) => setTargetCP(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-emerald-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-900"
              step="0.1"
              min="1"
              max="99"
            />
          </div>

          {/* Ingredient 1 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Ingredient 1 (Energy Feedstuff, e.g. Maize)
            </h4>
            <div className="grid grid-cols-12 gap-2">
              <input
                type="text"
                id="calc-ing1-name"
                value={ing1Name}
                onChange={(e) => setIng1Name(e.target.value)}
                className="col-span-8 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500 bg-white"
                placeholder="Ingredient 1 Name"
              />
              <div className="col-span-4 flex items-center bg-white border border-slate-300 rounded-lg px-2">
                <input
                  type="number"
                  id="calc-ing1-cp"
                  value={ing1CP}
                  onChange={(e) => setIng1CP(parseFloat(e.target.value) || 0)}
                  className="w-full text-center text-sm font-medium focus:outline-none"
                  placeholder="CP%"
                  step="0.1"
                />
                <span className="text-xs text-slate-400 font-semibold">%</span>
              </div>
            </div>
          </div>

          {/* Ingredient 2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Ingredient 2 (Protein Supplement, e.g. Soya)
            </h4>
            <div className="grid grid-cols-12 gap-2">
              <input
                type="text"
                id="calc-ing2-name"
                value={ing2Name}
                onChange={(e) => setIng2Name(e.target.value)}
                className="col-span-8 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-emerald-500 bg-white"
                placeholder="Ingredient 2 Name"
              />
              <div className="col-span-4 flex items-center bg-white border border-slate-300 rounded-lg px-2">
                <input
                  type="number"
                  id="calc-ing2-cp"
                  value={ing2CP}
                  onChange={(e) => setIng2CP(parseFloat(e.target.value) || 0)}
                  className="w-full text-center text-sm font-medium focus:outline-none"
                  placeholder="CP%"
                  step="0.1"
                />
                <span className="text-xs text-slate-400 font-semibold">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Desired Total Batch Weight (Kg)
            </label>
            <input
              type="number"
              id="calc-batch-weight"
              value={batchWeight}
              onChange={(e) => setBatchWeight(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              placeholder="e.g. 100"
              min="1"
            />
          </div>

          {/* Action Row */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              id="calc-btn-reset"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Form
            </button>
            <button
              id="calc-btn-save"
              onClick={handleSave}
              disabled={!isValid || saveStatus === 'saving'}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-white font-semibold rounded-lg text-sm transition-colors cursor-pointer ${
                isValid && saveStatus !== 'saving'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-sm'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <Save className="h-4 w-4" />
              {saveStatus === 'saving' ? 'Saving...' : 'Save Formula'}
            </button>
          </div>

          {saveStatus === 'success' && (
            <div id="calc-save-success-banner" className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs">
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Formulation compiled and saved successfully to database! See it in the Admin Portal.</span>
            </div>
          )}

          {saveStatus === 'error' && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-lg flex items-center gap-2 text-xs">
              <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
              <span>Failed to save: {errorMessage}</span>
            </div>
          )}
        </div>

        {/* Right Side: Algebraic Resolution & Visual Pearson Square */}
        <div id="calc-resolution-area" className="lg:col-span-7 flex flex-col justify-between">
          {!isValid ? (
            <div id="calc-invalid-notice" className="bg-amber-50 text-amber-950 p-6 rounded-xl border border-amber-200 flex flex-col items-center justify-center text-center h-full">
              <AlertTriangle className="h-10 w-10 text-amber-600 mb-3" />
              <h4 className="font-bold text-base mb-2">Formulation Limits Enforced</h4>
              <p className="text-xs leading-relaxed text-slate-700 max-w-sm">
                {validationError || "Ensure protein percentages are complete."}
              </p>
            </div>
          ) : (
            <div id="calc-valid-solution" className="space-y-6">
              {/* Pearson Diagonal Visual Chart */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Pearson Square Diagonals Resolution
                </span>
                
                {/* Visual Square Grid Layout */}
                <div className="grid grid-cols-7 gap-y-4 w-full max-w-md items-center">
                  
                  {/* Row 1 */}
                  <div className="col-span-2 text-right">
                    <span className="block font-bold text-xs text-slate-900">{ing1Name}</span>
                    <span className="block text-[11px] text-slate-500 font-semibold">{ing1CP}% CP</span>
                  </div>
                  <div className="col-span-3 h-0.5 border-t border-dashed border-slate-300 relative">
                    <div className="absolute top-0 right-0 h-4 border-r border-slate-300 transform translate-y-[-50%] rotate-45 origin-top"></div>
                  </div>
                  <div className="col-span-2 text-left">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">Parts of Ing. 2</span>
                    <span className="block font-bold text-sm text-indigo-700">{parts1.toFixed(1)} parts</span>
                  </div>

                  {/* Row 2 (Middle Gate) */}
                  <div className="col-span-2"></div>
                  <div className="col-span-3 flex justify-center py-2">
                    <div className="bg-emerald-600 border border-emerald-500 text-white font-bold text-xs shadow-md p-3 rounded-xl flex flex-col items-center justify-center w-20 h-20 transition-transform duration-300 hover:scale-105">
                      <span className="text-[9px] uppercase tracking-wider text-emerald-100 opacity-90">Target</span>
                      <span className="text-sm font-black">{targetCP}%</span>
                      <span className="text-[9px] uppercase font-mono text-emerald-200 opacity-80">CP MIX</span>
                    </div>
                  </div>
                  <div className="col-span-2"></div>

                  {/* Row 3 */}
                  <div className="col-span-2 text-right">
                    <span className="block font-bold text-xs text-slate-900">{ing2Name}</span>
                    <span className="block text-[11px] text-slate-500 font-semibold">{ing2CP}% CP</span>
                  </div>
                  <div className="col-span-3 h-0.5 border-t border-dashed border-slate-300 relative">
                    <div className="absolute bottom-0 right-0 h-4 border-r border-slate-300 transform translate-y-[50%] -rotate-45 origin-bottom"></div>
                  </div>
                  <div className="col-span-2 text-left">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">Parts of Ing. 1</span>
                    <span className="block font-bold text-sm text-indigo-700">{parts2.toFixed(1)} parts</span>
                  </div>

                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 w-full text-center text-xs text-slate-500">
                  Total diagonal parts: <span className="font-bold text-slate-900">{totalParts.toFixed(1)}</span> units.
                </div>
              </div>

              {/* Feed composition breakdown */}
              <div id="recipe-composition-breakdown" className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Feed Formula Composition</span>
                  <span className="font-mono text-[10px] text-indigo-500">Total Desired Batch: {batchWeight} kg</span>
                </h4>

                <div className="space-y-4">
                  {/* Ingredient 1 Breakdown */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-semibold text-slate-800">{ing1Name} (Energy source)</span>
                      <span className="text-xs font-bold text-slate-900">
                        {percent1.toFixed(1)}% <span className="text-slate-400">/</span> {weight1.toFixed(1)} kg
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent1}%` }}></div>
                    </div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase mt-1">
                      Calculation: ({parts1.toFixed(1)} parts / {totalParts.toFixed(1)} total parts) × 100
                    </span>
                  </div>

                  {/* Ingredient 2 Breakdown */}
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-sm font-semibold text-slate-800">{ing2Name} (Protein booster)</span>
                      <span className="text-xs font-bold text-slate-900">
                        {percent2.toFixed(1)}% <span className="text-slate-400">/</span> {weight2.toFixed(1)} kg
                      </span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent2}%` }}></div>
                    </div>
                    <span className="block text-[10px] text-slate-500 font-semibold uppercase mt-1">
                      Calculation: ({parts2.toFixed(1)} parts / {totalParts.toFixed(1)} total parts) × 100
                    </span>
                  </div>
                </div>

                {/* Self-Correction Check */}
                <div className="bg-indigo-50/50 rounded-lg p-3 border border-indigo-100/40 text-[11px] text-indigo-950 leading-relaxed font-semibold flex items-center gap-2 mt-4">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Validation: Based on nutrient parameters, ({percent1.toFixed(1)}% × {ing1CP}% CP) + ({percent2.toFixed(1)}% × {ing2CP}% CP) yields exactly <span className="text-emerald-700 font-bold">{targetCP.toFixed(1)}% CP</span> mix composition!
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
