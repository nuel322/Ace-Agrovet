import React, { useState } from 'react';
import { Scale, RotateCcw, Save, Trash2, PlusCircle, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { FeedFormulation } from '../types';
import { addFormulation } from '../lib/storage';

interface Ingredient {
  id: string;
  name: string;
  cp: number;
  inclusion: number; // in percentage, e.g. 50 meaning 50%
}

interface InteractiveFeedCalculatorProps {
  onSaveSuccess: () => void;
}

const templates = [
  {
    name: "Broiler Starter Mash (Poultry)",
    targetCP: 22,
    ingredients: [
      { id: 'tpl-bs-1', name: "Yellow Maize", cp: 9, inclusion: 54 },
      { id: 'tpl-bs-2', name: "Soybean Meal (44%)", cp: 44, inclusion: 32 },
      { id: 'tpl-bs-3', name: "High-Protein Fishmeal", cp: 65, inclusion: 5 },
      { id: 'tpl-bs-4', name: "Wheat Offal", cp: 14.5, inclusion: 5 },
      { id: 'tpl-bs-5', name: "Bone Meal", cp: 0, inclusion: 2.5 },
      { id: 'tpl-bs-6', name: "Limestone", cp: 0, inclusion: 1 },
      { id: 'tpl-bs-7', name: "Premix & Salt", cp: 0, inclusion: 0.5 }
    ]
  },
  {
    name: "Standard Layers Mash (Poultry)",
    targetCP: 16.5,
    ingredients: [
      { id: 'tpl-sl-1', name: "White Corn", cp: 8.8, inclusion: 50 },
      { id: 'tpl-sl-2', name: "Soybean Meal (44%)", cp: 44, inclusion: 18 },
      { id: 'tpl-sl-3', name: "Wheat Offal", cp: 14.5, inclusion: 18 },
      { id: 'tpl-sl-4', name: "High-Protein Fishmeal", cp: 60, inclusion: 2.5 },
      { id: 'tpl-sl-5', name: "Bone Meal", cp: 0, inclusion: 3.5 },
      { id: 'tpl-sl-6', name: "Limestone", cp: 0, inclusion: 7.5 },
      { id: 'tpl-sl-7', name: "Premix & Salt", cp: 0, inclusion: 0.5 }
    ]
  },
  {
    name: "Pigs Grower Feed (Swine)",
    targetCP: 15,
    ingredients: [
      { id: 'tpl-pg-1', name: "Sorghum Grains", cp: 10, inclusion: 55 },
      { id: 'tpl-pg-2', name: "Palm Kernel Cake (PKC)", cp: 18, inclusion: 15 },
      { id: 'tpl-pg-3', name: "Wheat Offal", cp: 14.5, inclusion: 15 },
      { id: 'tpl-pg-4', name: "Soybean Meal", cp: 44, inclusion: 10 },
      { id: 'tpl-pg-5', name: "Bone Meal", cp: 0, inclusion: 3 },
      { id: 'tpl-pg-6', name: "Limestone", cp: 0, inclusion: 1.5 },
      { id: 'tpl-pg-7', name: "Salt / Premix", cp: 0, inclusion: 0.5 }
    ]
  },
  {
    name: "Rabbit Grower Pellets",
    targetCP: 17,
    ingredients: [
      { id: 'tpl-rg-1', name: "Wheat Offal", cp: 14.5, inclusion: 35 },
      { id: 'tpl-rg-2', name: "Maize Grains", cp: 9, inclusion: 30 },
      { id: 'tpl-rg-3', name: "Soybean Meal", cp: 44, inclusion: 20 },
      { id: 'tpl-rg-4', name: "Rice Bran", cp: 12, inclusion: 10 },
      { id: 'tpl-rg-5', name: "Bone Meal", cp: 0, inclusion: 3 },
      { id: 'tpl-rg-6', name: "Limestone", cp: 0, inclusion: 1.5 },
      { id: 'tpl-rg-7', name: "Salt & Premix", cp: 0, inclusion: 0.5 }
    ]
  }
];

const PRESETS = [
  { name: "Yellow Maize", cp: 9.0 },
  { name: "Soybean Meal (44%)", cp: 44.0 },
  { name: "Peanut Cake (GNC)", cp: 45.0 },
  { name: "Wheat Offal", cp: 14.5 },
  { name: "Fishmeal (60%)", cp: 60.0 },
  { name: "Palm Kernel Cake (PKC)", cp: 18.0 },
  { name: "Bone Meal", cp: 0.0 },
  { name: "Limestone", cp: 0.0 },
  { name: "Oyster Shell", cp: 0.0 },
  { name: "Premix & Salt", cp: 0.0 }
];

export default function InteractiveFeedCalculator({ onSaveSuccess }: InteractiveFeedCalculatorProps) {
  const [formName, setFormName] = useState('My Custom Farm Formulation');
  const [targetCP, setTargetCP] = useState<number>(18);
  const [batchWeight, setBatchWeight] = useState<number>(100);
  
  // Starting state with realistic multi-ingredient formulation (Layers Mash)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 'ing-1', name: "Yellow Maize", cp: 9.0, inclusion: 52.0 },
    { id: 'ing-2', name: "Soybean Meal", cp: 44.0, inclusion: 20.0 },
    { id: 'ing-3', name: "Wheat Offal", cp: 14.5, inclusion: 16.0 },
    { id: 'ing-4', name: "Fishmeal (60%)", cp: 60.0, inclusion: 3.0 },
    { id: 'ing-5', name: "Bone Meal", cp: 0.0, inclusion: 4.0 },
    { id: 'ing-6', name: "Limestone", cp: 0.0, inclusion: 4.5 },
    { id: 'ing-7', name: "Premix & Salt", cp: 0.0, inclusion: 0.5 }
  ]);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const totalInclusion = ingredients.reduce((sum, item) => sum + item.inclusion, 0);
  const calculatedCP = ingredients.reduce((sum, item) => sum + (item.inclusion * item.cp) / 100, 0);
  const proteinDifference = calculatedCP - targetCP;

  // Validation
  // Allow a tiny margin of error for floating-point math (e.g. 99.9% to 100.1%)
  const isBalanced = Math.abs(totalInclusion - 100) < 0.1;
  const isValid = isBalanced && ingredients.length >= 2 && ingredients.every(i => i.name.trim() !== '' && i.cp >= 0 && i.inclusion >= 0);

  let validationError = '';
  if (ingredients.length < 2) {
    validationError = "Add at least two ingredients to mix your feed formulation successfully.";
  } else if (!isBalanced) {
    validationError = `Inclusion total is currently ${totalInclusion.toFixed(1)}%. It must equal exactly 100% to balance standard batch calculations.`;
  } else if (ingredients.some(i => i.name.trim() === '')) {
    validationError = "Please ensure all ingredients have valid names.";
  }

  const applyTemplate = (tpl: typeof templates[0]) => {
    setFormName(`${tpl.name} Formulation`);
    setTargetCP(tpl.targetCP);
    // Deep copy ingredients
    setIngredients(tpl.ingredients.map(ing => ({ ...ing, id: 'ing-' + Math.random().toString(36).substr(2, 9) })));
    setSaveStatus('idle');
  };

  const handleReset = () => {
    setFormName('My Custom Farm Formulation');
    setTargetCP(18);
    setBatchWeight(100);
    setIngredients([
      { id: 'ing-1', name: "Yellow Maize", cp: 9.0, inclusion: 52.0 },
      { id: 'ing-2', name: "Soybean Meal", cp: 44.0, inclusion: 20.0 },
      { id: 'ing-3', name: "Wheat Offal", cp: 14.5, inclusion: 16.0 },
      { id: 'ing-4', name: "Fishmeal (60%)", cp: 60.0, inclusion: 3.0 },
      { id: 'ing-5', name: "Bone Meal", cp: 0.0, inclusion: 4.0 },
      { id: 'ing-6', name: "Limestone", cp: 0.0, inclusion: 4.5 },
      { id: 'ing-7', name: "Premix & Salt", cp: 0.0, inclusion: 0.5 }
    ]);
    setSaveStatus('idle');
  };

  const addIngredient = (name = 'New Ingredient', cp = 10, inclusion = 0) => {
    setIngredients(prev => [
      ...prev,
      {
        id: 'ing-' + Math.random().toString(36).substr(2, 9),
        name,
        cp,
        inclusion
      }
    ]);
  };

  const deleteIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: any) => {
    setIngredients(prev => prev.map(ing => {
      if (ing.id === id) {
        return { ...ing, [field]: value };
      }
      return ing;
    }));
  };

  // Utility to quickly balance the mixture to hit exactly 100%
  const autoBalanceFirstIngredient = () => {
    if (ingredients.length === 0) return;
    const othersSum = ingredients.slice(1).reduce((sum, item) => sum + item.inclusion, 0);
    const balance = Math.max(0, 100 - othersSum);
    updateIngredient(ingredients[0].id, 'inclusion', parseFloat(balance.toFixed(1)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setSaveStatus('saving');

    // For compatibility with the rigid 2-ingredient database table schema in Supabase/localStorage,
    // we partition the ingredients list into Major Ingredients (energy/base carb sources) 
    // and booster/supplemental feedstuffs (proteins/micros).
    const sorted = [...ingredients].sort((a, b) => b.inclusion - a.inclusion);
    const half = Math.ceil(sorted.length / 2);
    const group1 = sorted.slice(0, half);
    const group2 = sorted.slice(half);

    const group1SumPercent = group1.reduce((sum, i) => sum + i.inclusion, 0);
    const group1CP = group1SumPercent > 0 ? group1.reduce((sum, i) => sum + (i.inclusion * i.cp), 0) / group1SumPercent : 0;

    const group2SumPercent = group2.reduce((sum, i) => sum + i.inclusion, 0);
    const group2CP = group2SumPercent > 0 ? group2.reduce((sum, i) => sum + (i.inclusion * i.cp), 0) / group2SumPercent : 0;

    const ingredient1Name = group1.map(i => `${i.name} (${i.inclusion.toFixed(0)}%)`).join(', ');
    const ingredient2Name = group2.map(i => `${i.name} (${i.inclusion.toFixed(0)}%)`).join(', ');

    try {
      await addFormulation({
        name: formName,
        targetCP,
        ingredient1Name,
        ingredient1CP: parseFloat(group1CP.toFixed(1)),
        ingredient1Parts: group1.length,
        ingredient1Percent: parseFloat(group1SumPercent.toFixed(1)),
        ingredient2Name,
        ingredient2CP: parseFloat(group2CP.toFixed(1)),
        ingredient2Parts: group2.length,
        ingredient2Percent: parseFloat(group2SumPercent.toFixed(1))
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
          Excel Livestock Feed Formulation Tool
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Nutritional requirements differ dynamically across livestock species. Use this Excel formulation grid to formulate feeds with multiple ingredients. The outdated Pearson Square method is restricted to exactly two ingredients; our Excel engine evaluates any custom recipe live.
        </p>
      </div>

      {/* Templates Row */}
      <div className="mb-6">
        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Load Standard Balanced Livestock Formulations:
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
                Balanced: {tpl.targetCP}% CP Target
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: General controls & Grid Spreadsheet */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Settings Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                Formulation Sheet Title
              </label>
              <input
                type="text"
                id="calc-form-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-250 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-slate-700"
                placeholder="e.g. Pig Grower Mash"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                Target Crude Protein (%)
              </label>
              <input
                type="number"
                id="calc-target-cp"
                value={targetCP}
                onChange={(e) => setTargetCP(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-250 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-emerald-800"
                step="0.1"
                min="1"
                max="99"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                Batch Weight (Kg)
              </label>
              <input
                type="number"
                id="calc-batch-weight"
                value={batchWeight}
                onChange={(e) => setBatchWeight(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-250 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-slate-700"
                min="1"
              />
            </div>
          </div>

          {/* Excel Spreadsheet Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 font-bold uppercase border-b border-slate-200 text-[10px]">
                  <th className="py-2.5 px-3">Feedstuff Ingredient</th>
                  <th className="py-2.5 px-3 text-center w-28">Crude Protein (CP %)</th>
                  <th className="py-2.5 px-3 text-center w-28">Inclusion Rate (%)</th>
                  <th className="py-2.5 px-3 text-right w-28">Weight (Kg)</th>
                  <th className="py-2.5 px-3 text-right w-28">CP Contribution</th>
                  <th className="py-2.5 px-2 text-center w-12">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-sans">
                {ingredients.map((item, idx) => {
                  const weightKg = (item.inclusion * batchWeight) / 100;
                  const contribution = (item.inclusion * item.cp) / 100;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateIngredient(item.id, 'name', e.target.value)}
                          className="w-full bg-transparent focus:bg-white border-0 focus:ring-1 focus:ring-emerald-500 rounded px-1.5 py-0.5 font-semibold text-slate-800 focus:outline-none"
                          placeholder="e.g. Maize Corn"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            value={item.cp}
                            onChange={(e) => updateIngredient(item.id, 'cp', Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-16 bg-transparent focus:bg-white text-center font-bold text-slate-700 border-0 focus:ring-1 focus:ring-emerald-500 rounded py-0.5 focus:outline-none"
                            step="0.1"
                          />
                          <span className="text-slate-400 font-medium">%</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 bg-slate-50/20">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            value={item.inclusion}
                            onChange={(e) => updateIngredient(item.id, 'inclusion', Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-16 bg-transparent focus:bg-white text-center font-bold text-slate-800 border-0 focus:ring-1 focus:ring-emerald-500 rounded py-0.5 focus:outline-none"
                            step="0.1"
                          />
                          <span className="text-slate-400 font-medium">%</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-medium text-slate-500">
                        {weightKg.toFixed(1)} kg
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                        {contribution.toFixed(2)}%
                      </td>
                      <td className="py-2 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => deleteIngredient(item.id)}
                          className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              
              {/* Table Summary Footer */}
              <tfoot>
                <tr className="bg-slate-50/80 font-bold border-t border-slate-200">
                  <td className="py-3 px-3 text-slate-600">Total Compound Mix</td>
                  <td className="py-3 px-3"></td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      isBalanced ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {totalInclusion.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">{batchWeight.toFixed(1)} kg</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-700 text-sm">
                    {calculatedCP.toFixed(2)}% CP
                  </td>
                  <td className="py-3 px-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Quick-Add Preset Ingredients bar */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              ⚡ Quick-Add Common Raw Materials to Formula Grid:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addIngredient(p.name, p.cp, 0)}
                  className="px-2 py-1 bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 rounded-md text-[10px] font-semibold transition-colors cursor-pointer select-none"
                >
                  + {p.name} ({p.cp}%)
                </button>
              ))}
              <button
                type="button"
                onClick={() => addIngredient("Custom Raw Material", 10, 0)}
                className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 rounded-md text-[10px] font-bold transition-colors cursor-pointer"
              >
                + Custom Ingredient
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Algebraic Resolution & Visual Diagnostics */}
        <div id="calc-resolution-area" className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Nutritional Diagnostics
            </h4>

            {/* Inclusion Rate Status */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">INCLUSION WEIGHT BALANCE</span>
              <div className="flex items-center gap-2">
                {isBalanced ? (
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-2 py-1 rounded-lg w-full">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Balanced at exactly 100%</span>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2.5 py-2 rounded-lg w-full">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>Unbalanced: {totalInclusion.toFixed(1)}%</span>
                    </div>
                    {ingredients.length > 0 && (
                      <button
                        type="button"
                        onClick={autoBalanceFirstIngredient}
                        className="mt-2 block w-full text-center bg-white border border-amber-300 hover:bg-amber-100 text-[10px] font-bold text-amber-900 rounded py-1 transition-colors cursor-pointer"
                      >
                        Adjust "{ingredients[0].name}" rate to balance
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Protein Analysis Meter */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">CRUDE PROTEIN ANALYSIS</span>
              <div className="bg-white p-3 rounded-lg border border-slate-200/50 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-slate-400">Target Demand:</span>
                  <span className="text-xs font-black text-slate-900">{targetCP}% CP</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-slate-400">Yield Content:</span>
                  <span className="text-xs font-black text-emerald-700">{calculatedCP.toFixed(1)}% CP</span>
                </div>

                <div className="h-px bg-slate-100 my-1"></div>

                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-slate-400">Status Gap:</span>
                  <span className={`text-xs font-black font-sans ${
                    Math.abs(proteinDifference) <= 0.5 
                      ? "text-emerald-600" 
                      : proteinDifference > 0.5 
                        ? "text-amber-600" 
                        : "text-red-500"
                  }`}>
                    {proteinDifference === 0 
                      ? "Perfect Match" 
                      : `${proteinDifference > 0 ? '+' : ''}${proteinDifference.toFixed(1)}% CP`}
                  </span>
                </div>
              </div>
              
              {/* Protein Diagnostic Advice */}
              <div className="text-[10px] text-slate-500 leading-relaxed font-sans">
                {Math.abs(proteinDifference) <= 0.5 ? (
                  <span className="text-emerald-700 font-semibold">✓ Excellent profile: Calculated CP meets target livestock standards. Safely formulate batch.</span>
                ) : proteinDifference > 0.5 ? (
                  <span className="text-amber-700 font-medium">⚠️ Excess Protein: Mix protein level exceeds demand. You can lower costly bean/fish meals to save feed costs.</span>
                ) : (
                  <span className="text-red-600 font-semibold">⚠️ Deficiency: Mix is below CP requirements. Boost soybean meal or high-CP grains to enrich composition.</span>
                )}
              </div>
            </div>

            {/* Ingredient Composition Breakdown visual stack */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">Recipe Mix Proportions</span>
              {ingredients.length === 0 ? (
                <div className="text-[11px] text-slate-400 italic">No ingredients configured.</div>
              ) : (
                <div className="space-y-2 pt-1 font-sans">
                  {ingredients.slice(0, 5).map((ing, idx) => {
                    const ratio = totalInclusion > 0 ? (ing.inclusion / totalInclusion) * 100 : 0;
                    return (
                      <div key={ing.id} className="text-[11px]">
                        <div className="flex justify-between text-slate-600 font-medium mb-0.5">
                          <span className="truncate max-w-[150px]">{ing.name || "Unnamed"}</span>
                          <span>{ing.inclusion.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              idx === 0 
                                ? 'bg-emerald-500' 
                                : idx === 1 
                                  ? 'bg-sky-500' 
                                  : idx === 2 
                                    ? 'bg-amber-500' 
                                    : 'bg-slate-400'
                            }`}
                            style={{ width: `${ratio}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  {ingredients.length > 5 && (
                    <div className="text-[10px] text-slate-400 italic text-right">
                      + {ingredients.length - 5} more trace materials in compound
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {/* Validation Notification */}
            {!isValid && (
              <div id="calc-invalid-notice" className="bg-amber-50 text-amber-950 p-4 rounded-xl border border-amber-200 text-left text-xs leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Validation Limit Checked</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  {validationError || "Ensure total inclusion is exactly 100% and ingredients have positive non-zero parameters."}
                </p>
              </div>
            )}

            {/* Actions Form */}
            <form onSubmit={handleSave} className="space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  id="calc-btn-reset"
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Sheet
                </button>
                <button
                  type="submit"
                  id="calc-btn-save"
                  disabled={!isValid || saveStatus === 'saving'}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-white font-bold rounded-lg text-xs transition-all cursor-pointer ${
                    isValid && saveStatus !== 'saving'
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md transform active:scale-95'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  <Save className="h-4 w-4" />
                  {saveStatus === 'saving' ? 'Saving Mix...' : 'Save Formulation'}
                </button>
              </div>

              {saveStatus === 'success' && (
                <div id="calc-save-success-banner" className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Excel Feed Recipe compiled and saved successfully to regional database!</span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-lg flex items-center gap-2 text-xs">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                  <span>Error saving mix: {errorMessage}</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
