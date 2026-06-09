<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACE AGROVET CONSULTS</title>
    <link rel="icon" type="image/png" href="https://i.ibb.co/ZR0n8bWt/slazzer-preview-zlpr6.png" />
    
    <!-- Google Fonts: Inter and JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    }
                }
            }
        }
    </script>

    <!-- Lucide Icons CDN -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        .active-tab {
            background-color: #ecfdf5; /* emerald-50 */
            color: #047857; /* emerald-700 */
            font-weight: 600;
        }
        .active-admin-tab {
            background-color: #eef2ff; /* indigo-50 */
            color: #4338ca; /* indigo-700 */
            font-weight: 600;
        }
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
            font-weight: 600;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            color: #0f172a;
        }
        .markdown-body h3 { font-size: 1.1rem; }
        .markdown-body h2 { font-size: 1.25rem; border-b: 1px solid #e2e8f0; padding-bottom: 0.25rem; }
        .markdown-body p { margin-bottom: 0.75rem; line-height: 1.6; }
        .markdown-body ul, .markdown-body ol { margin-left: 1.5rem; margin-bottom: 0.75rem; list-style-type: disc; }
        .markdown-body li { margin-bottom: 0.25rem; }
        .markdown-body str, .markdown-body bold { font-weight: 600; }
    </style>
</head>
<body class="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">

    <!-- ==================== MAIN HEADER ==================== -->
    <header id="main-header" class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-20">
                <!-- Logo Brand -->
                <div class="flex items-center">
                    <button onclick="switchTab('home')" class="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none">
                        <div class="flex items-center justify-center p-1 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-300 h-12 w-12 shrink-0 overflow-hidden">
                            <img src="https://i.ibb.co/ZR0n8bWt/slazzer-preview-zlpr6.png" alt="ACE AGROVET Logo" class="h-full w-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                            <span class="block text-lg font-bold tracking-tight text-slate-900">ACE AGROVET</span>
                            <span class="block text-xs font-semibold tracking-wider text-emerald-600 uppercase -mt-1">CONSULTS</span>
                        </div>
                    </button>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden lg:flex items-center lg:space-x-1 flex-nowrap shrink-0">
                    <button id="nav-home" onclick="switchTab('home')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900 active-tab">Home</button>
                    <button id="nav-about" onclick="switchTab('about')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900">About Us</button>
                    <button id="nav-services" onclick="switchTab('services')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900">Services & Feed Formulator</button>
                    <button id="nav-training" onclick="switchTab('training')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900">Training Programs</button>
                    <button id="nav-consulting" onclick="switchTab('consulting')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900">Expert Consulting</button>
                    <button id="nav-ai" onclick="switchTab('ai')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-slate-600 hover:bg-slate-50 hover:text-slate-900">AI Farm Advisor</button>
                    
                    <div class="h-6 w-px bg-slate-200 mx-2 shrink-0"></div>

                    <!-- Admin Portal Trigger Button -->
                    <button id="nav-admin" onclick="switchTab('admin')" class="flex items-center justify-center p-2 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150" title="Admin Portal">
                        <i data-lucide="settings-2" class="h-5 w-5"></i>
                    </button>
                </nav>

                <!-- Mobile Menu Button -->
                <div class="flex items-center lg:hidden">
                    <button onclick="toggleMobileMenu()" class="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none">
                        <i data-lucide="menu" id="mobile-menu-icon" class="block h-6 w-6"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div id="mobile-menu-drawer" class="hidden lg:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-1">
            <button onclick="switchTab('home')" class="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">Home</button>
            <button onclick="switchTab('about')" class="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">About Us</button>
            <button onclick="switchTab('services')" class="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">Services & Feed Formulator</button>
            <button onclick="switchTab('training')" class="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">Training Programs</button>
            <button onclick="switchTab('consulting')" class="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">Expert Consulting</button>
            <button onclick="switchTab('ai')" class="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">AI Farm Advisor</button>
            <div class="h-px bg-slate-100 my-2"></div>
            <button onclick="switchTab('admin')" class="flex items-center gap-2 w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-900">
                <i data-lucide="settings-2" class="h-5 w-5"></i>
                Admin Dashboard
            </button>
        </div>
    </header>

    <!-- ==================== MAIN CONTENT AREA ==================== -->
    <main class="flex-grow">

        <!-- ==================== SECTION: HOME ==================== -->
        <section id="tab-home" class="tab-content block">
            <!-- Hero Banner -->
            <div class="relative py-20 lg:py-28 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white overflow-hidden">
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div class="lg:col-span-7 space-y-6">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
                                <i data-lucide="sparkles" class="h-3.5 w-3.5"></i> Professional Livestock Advisory
                            </div>
                            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                Empowering Farmers with <br/>
                                <span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Professional Insights</span>
                            </h1>
                            <p class="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
                                ACE AGROVET CONSULTS is an agricultural authority providing custom feed formulation services, poultry diagnostics, on-field agribusiness assessments, and practical farmer incubation courses.
                            </p>
                            <div class="flex flex-wrap gap-4 pt-2">
                                <button onclick="switchTab('services')" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition duration-150 inline-flex items-center gap-2 shadow-lg shadow-emerald-950/20">
                                    Launch Feed Formulator <i data-lucide="arrow-right" class="h-4 w-4"></i>
                                </button>
                                <button onclick="switchTab('ai')" class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl border border-slate-700/60 transition duration-150">
                                    Ask AI Advisor
                                </button>
                            </div>
                        </div>
                        <div class="lg:col-span-5 relative mt-6 lg:mt-0">
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div class="relative bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl">
                                <img src="https://i.ibb.co/ZR0n8bWt/slazzer-preview-zlpr6.png" alt="ACE AGROVET Logo Art" class="w-full h-64 object-contain opacity-95">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Spotlight Cards -->
            <div class="py-16 bg-white border-b border-slate-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center max-w-2xl mx-auto mb-12">
                        <h2 class="text-3xl font-bold tracking-tight text-slate-900">Why Partner with Us?</h2>
                        <p class="text-slate-500 mt-2">Integrating animal medical expertise with technical farm diagnostics.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Spot 1 -->
                        <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                            <div class="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                                <i data-lucide="shield" class="h-6 w-6"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-slate-950">Bio-Security Protocols</h3>
                            <p class="text-sm text-slate-500 leading-relaxed">
                                Prevent broiler and layer losses by applying modern farm sanitation, vaccines scheduling, and disease management guidelines.
                            </p>
                        </div>
                        <!-- Spot 2 -->
                        <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                            <div class="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                                <i data-lucide="scale" class="h-6 w-6"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-slate-950">Precision Feed Science</h3>
                            <p class="text-sm text-slate-500 leading-relaxed">
                                Calculate optimal nutrition blends with correct Crude Protein ratios using our integrated Pearson Square Formulation software.
                            </p>
                        </div>
                        <!-- Spot 3 -->
                        <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                            <div class="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                                <i data-lucide="graduation-cap" class="h-6 w-6"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-slate-950">Farmer Training</h3>
                            <p class="text-sm text-slate-500 leading-relaxed">
                                Join our active on-field classes and master the tools to operate sustainable, high-yield agribusiness projects.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==================== SECTION: ABOUT US ==================== -->
        <section id="tab-about" class="tab-content hidden py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                <!-- Row 1: Intro -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-6">
                        <h2 class="text-3xl font-bold tracking-tight text-slate-900 border-l-4 border-emerald-500 pl-4">Company Overview</h2>
                        <p class="text-slate-600 leading-relaxed">
                            <strong>ACE AGROVET CONSULTS</strong> is a registered livestock advisory and training company focused on resolving complex modern farm problems. We bring together a specialized team of animal nutritionists, experienced veterinarians, and veterinary technicians to guide producers toward financial safety.
                        </p>
                        <p class="text-slate-600 leading-relaxed">
                            Through structured feed diagnostics, microclimatic poultry house engineering reviews, and scientific brooding parameters, we help crop-livestock operators slash extreme commercial expenses and maximize productivity.
                        </p>
                    </div>
                    <div class="bg-indigo-950 border border-slate-800 rounded-3xl p-8 text-white relative">
                        <div class="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                        <h3 class="text-xl font-bold mb-4">Our Core Mission</h3>
                        <p class="text-indigo-200 mb-6 text-sm leading-relaxed">
                            To equip modern agriculture operators with elite technical competence, innovative feed formulation systems, and veterinary supervision to drive profitability across sub-Saharan farm networks.
                        </p>
                        <hr class="border-indigo-800 mb-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <h4 class="text-emerald-400 font-semibold font-mono text-xl">100%</h4>
                                <p class="text-xs text-slate-300">Practical Field Demos</p>
                            </div>
                            <div>
                                <h4 class="text-emerald-400 font-semibold font-mono text-xl">MySQL</h4>
                                <p class="text-xs text-slate-300">Data Persistent Engine</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Values Grid -->
                <div class="bg-slate-100 rounded-3xl p-8 md:p-12">
                    <div class="text-center max-w-xl mx-auto mb-10">
                        <h3 class="text-2xl font-bold text-slate-900">Foundational Principles</h3>
                        <p class="text-slate-500 text-sm mt-1">Our day-to-day operations align with professional veterinarian code ethics.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-white p-6 rounded-2xl border border-slate-200/50">
                            <h4 class="font-semibold text-slate-900 mb-2">Technical Integrity</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">We provide objective feed matrix, weight monitoring, and biological reviews backed strictly by agricultural evidence.</p>
                        </div>
                        <div class="bg-white p-6 rounded-2xl border border-slate-200/50">
                            <h4 class="font-semibold text-slate-900 mb-2">Sustainable Innovation</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">Sourcing high-protein local alternative ingredients e.g., PKC, groundnut cake, to bypass predatory commercial feed costs.</p>
                        </div>
                        <div class="bg-white p-6 rounded-2xl border border-slate-200/50">
                            <h4 class="font-semibold text-slate-900 mb-2">Agribusiness Incubator</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">Assisting starting operators in establishing standard biosecurity controls, poultry housing orientations, and vaccination records.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==================== SECTION: SERVICES & CALCULATOR ==================== -->
        <section id="tab-services" class="tab-content hidden py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                <!-- Section Intro -->
                <div class="text-center max-w-2xl mx-auto space-y-3">
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900">Pearson Square Feed Formulator</h2>
                    <p class="text-slate-500 text-sm leading-relaxed">
                        A scientifically verified matrix tool. Enter your target Crude Protein (CP) strength and choose two ingredients of known protein levels. The Pearson's Square mathematical model computes the precise weight parts and percentages needed to blend them successfully!
                    </p>
                </div>

                <!-- Feed Calculator Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <!-- Left: Inputs -->
                    <div class="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                        <div class="flex items-center gap-2 pb-4 border-b border-slate-100">
                            <i data-lucide="scale" class="h-5 w-5 text-emerald-600"></i>
                            <h3 class="text-lg font-semibold text-slate-950">Nutrient Parameters</h3>
                        </div>

                        <!-- Template Selection -->
                        <div>
                            <span class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Apply Template Setup</span>
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="loadTemplate('Broiler Starter Mash (Poultry)', 22, 'Yellow Maize', 9, 'Soybean Meal (Concentrate)', 44)" class="px-3 py-2 text-left bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition text-xs font-medium text-slate-700">
                                    🐣 Broiler Starter (22% CP)
                                </button>
                                <button onclick="loadTemplate('Standard Layers Mash (Poultry)', 16.5, 'White Corn', 8.8, 'High-Protein Fishmeal', 62)" class="px-3 py-2 text-left bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition text-xs font-medium text-slate-700">
                                    🥚 Layers Mash (16.5% CP)
                                </button>
                                <button onclick="loadTemplate('Pigs Grower Feed (Swine)', 15, 'Sorghum Grains', 10, 'Peanut (Groundnut) Cake', 45)" class="px-3 py-2 text-left bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition text-xs font-medium text-slate-700">
                                    🐖 Pig Grower (15% CP)
                                </button>
                                <button onclick="loadTemplate('Rabbit Grower Pellets', 17, 'Wheat Offal', 14.5, 'Soybean Concentrate', 48)" class="px-3 py-2 text-left bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition text-xs font-medium text-slate-700">
                                    🐇 Rabbit Grower (17% CP)
                                </button>
                            </div>
                        </div>

                        <form id="calculator-form" onsubmit="saveFormulation(event)" class="space-y-4">
                            <!-- Title -->
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="calc_name">Formulation Title</label>
                                <input type="text" id="calc_name" required value="Custom Broiler Supplement" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                            </div>

                            <!-- Target CP -->
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" id="label_target_cp">Target Crude Protein (CP) %</label>
                                <input type="number" step="0.1" id="calc_target_cp" required value="20" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500" oninput="runPearsonSquare()">
                            </div>

                            <!-- Ingredient 1 (Energy Source / Low CP) -->
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                <span class="block text-xs font-bold text-emerald-700 uppercase tracking-wide">Ingredient 1 (Low Protein)</span>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <label class="block text-[10px] uppercase font-bold text-slate-500 mb-0.5" for="calc_ing1_name">Name</label>
                                        <input type="text" id="calc_ing1_name" value="Yellow Maize" required class="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs focus:outline-none" oninput="runPearsonSquare()">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] uppercase font-bold text-slate-500 mb-0.5" for="calc_ing1_cp">Protein (CP) %</label>
                                        <input type="number" step="0.1" id="calc_ing1_cp" value="9" required class="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs focus:outline-none" oninput="runPearsonSquare()">
                                    </div>
                                </div>
                            </div>

                            <!-- Ingredient 2 (Protein Source / High CP) -->
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                <span class="block text-xs font-bold text-emerald-700 uppercase tracking-wide">Ingredient 2 (High Protein)</span>
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <label class="block text-[10px] uppercase font-bold text-slate-500 mb-0.5" for="calc_ing2_name">Name</label>
                                        <input type="text" id="calc_ing2_name" value="Soybean Meal" required class="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs focus:outline-none" oninput="runPearsonSquare()">
                                    </div>
                                    <div>
                                        <label class="block text-[10px] uppercase font-bold text-slate-500 mb-0.5" for="calc_ing2_cp">Protein (CP) %</label>
                                        <input type="number" step="0.1" id="calc_ing2_cp" value="44" required class="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs focus:outline-none" oninput="runPearsonSquare()">
                                    </div>
                                </div>
                            </div>

                            <!-- Batch Weight -->
                            <div>
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="calc_batch_weight">Target Batch Weight (kg)</label>
                                <input type="number" id="calc_batch_weight" value="100" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500" oninput="runPearsonSquare()">
                            </div>

                            <div class="pt-2 flex gap-3">
                                <button type="button" onclick="resetFormulator()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer">
                                    <i data-lucide="rotate-ccw" class="h-4 w-4"></i> Reset
                                </button>
                                <button type="submit" id="btn-save-formulation" class="flex-grow px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl tracking-wide transition shadow-lg shadow-emerald-900/10 inline-flex items-center justify-center gap-1.5 cursor-pointer">
                                    <i data-lucide="save" class="h-4 w-4"></i> Save Formulation
                                </button>
                            </div>

                            <!-- Success/Error Notification -->
                            <div id="calc-status-box" class="hidden p-3.5 rounded-xl text-xs font-medium border"></div>
                        </form>
                    </div>

                    <!-- Right: Matrix Report -->
                    <div class="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-200 space-y-6 flex flex-col justify-between">
                        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                            <span class="text-xs uppercase font-mono tracking-widest text-slate-400">Nutrients Composition Board</span>
                            <span class="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded bg-slate-800 border border-slate-700 text-emerald-400">
                                STATUS: RUNNING
                            </span>
                        </div>

                        <!-- Calculation Error Message State -->
                        <div id="calc-error-display" class="hidden p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300 text-sm space-y-2">
                            <div class="flex items-center gap-2 font-semibold">
                                <i data-lucide="alert-triangle" class="h-5 w-5 text-amber-400 shrink-0"></i> Mathematical Parameter Out of Bounds
                            </div>
                            <p id="calc-error-text" class="text-xs leading-relaxed text-amber-300/80"></p>
                        </div>

                        <!-- Matrix calculation graphics (The Cross Model / Pearson's Square) -->
                        <div id="pearson-visual-box" class="block space-y-4">
                            <!-- Visual Graphic representing Pearson's traditional square layout -->
                            <div class="bg-slate-950/55 rounded-2xl p-6 border border-slate-800/40 relative">
                                <span class="absolute top-2.5 left-3 text-[9px] uppercase font-mono tracking-wider text-slate-500">Traditional Pearson Diagonal Calculation</span>
                                
                                <div class="grid grid-cols-3 gap-4 items-center pt-4 text-center">
                                    <!-- Ing 1 CP -->
                                    <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
                                        <span id="p-ing1-lbl" class="block text-xs font-mono text-slate-400 truncate">Ingredient 1</span>
                                        <span id="p-ing1-cp" class="block text-base font-bold font-mono text-white">9% CP</span>
                                    </div>
                                    <!-- Blank/Diagonal graphic lines -->
                                    <div class="relative h-12 flex items-center justify-center pointer-events-none">
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div class="h-px w-full bg-slate-800/50"></div>
                                        </div>
                                        <span class="relative px-2.5 py-1 bg-slate-950 border border-slate-800 text-[10px] text-slate-400 rounded-full font-mono">X-Matrix</span>
                                    </div>
                                    <!-- Ing 1 Output Parts -->
                                    <div class="bg-indigo-950/40 border border-indigo-900/40 rounded-xl p-3.5 space-y-1">
                                        <span class="block text-xs font-mono text-slate-300">Parts of Ing1</span>
                                        <span id="p-ing1-parts" class="block text-base font-bold font-mono text-slate-100">24.0 Parts</span>
                                    </div>

                                    <!-- Middle Target Row -->
                                    <div class="col-span-3 py-1.5 flex justify-center">
                                        <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 inline-flex items-center gap-1.5 tracking-wide shadow-inner">
                                            <span class="text-xs font-mono text-emerald-400 uppercase">Target Strength</span>
                                            <span id="p-target-cp" class="text-base font-bold font-mono text-emerald-300">20.0% CP</span>
                                        </div>
                                    </div>

                                    <!-- Ing 2 CP -->
                                    <div class="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-1">
                                        <span id="p-ing2-lbl" class="block text-xs font-mono text-slate-400 truncate">Ingredient 2</span>
                                        <span id="p-ing2-cp" class="block text-base font-bold font-mono text-white">44% CP</span>
                                    </div>
                                    <!-- Diagonal graphic lines -->
                                    <div class="relative h-12 flex items-center justify-center pointer-events-none">
                                        <div class="absolute inset-0 flex items-center justify-center">
                                            <div class="h-px w-full bg-slate-800/50"></div>
                                        </div>
                                        <span class="relative px-2.5 py-1 bg-slate-950 border border-slate-800 text-[10px] text-slate-400 rounded-full font-mono">Diagonal</span>
                                    </div>
                                    <!-- Ing 2 Output Parts -->
                                    <div class="bg-indigo-950/40 border border-indigo-900/40 rounded-xl p-3.5 space-y-1">
                                        <span class="block text-xs font-mono text-slate-300">Parts of Ing2</span>
                                        <span id="p-ing2-parts" class="block text-base font-bold font-mono text-slate-100">11.0 Parts</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Weight calculations output breakdown -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Card 1 -->
                                <div class="bg-slate-950/30 border border-slate-800 rounded-2xl p-4 space-y-2">
                                    <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                                        <span id="breakdown-ing1-title">Yellow Maize</span>
                                        <span id="breakdown-ing1-pct" class="font-bold text-white">68.6%</span>
                                    </div>
                                    <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div id="breakdown-ing1-progress" class="h-full bg-emerald-500 rounded-full" style="width: 68%;"></div>
                                    </div>
                                    <div class="flex justify-between items-baseline pt-1">
                                        <span class="text-[10px] text-slate-500 font-mono">Weight Allocation:</span>
                                        <span id="breakdown-ing1-wt" class="text-sm font-semibold font-mono text-emerald-400">68.57 kg</span>
                                    </div>
                                </div>
                                <!-- Card 2 -->
                                <div class="bg-slate-950/30 border border-slate-800 rounded-2xl p-4 space-y-2">
                                    <div class="flex items-center justify-between text-xs font-mono text-slate-400">
                                        <span id="breakdown-ing2-title">Soybean Meal</span>
                                        <span id="breakdown-ing2-pct" class="font-bold text-white">31.4%</span>
                                    </div>
                                    <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div id="breakdown-ing2-progress" class="h-full bg-indigo-500 rounded-full" style="width: 31%;"></div>
                                    </div>
                                    <div class="flex justify-between items-baseline pt-1">
                                        <span class="text-[10px] text-slate-500 font-mono">Weight Allocation:</span>
                                        <span id="breakdown-ing2-wt" class="text-sm font-semibold font-mono text-indigo-400">31.43 kg</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Mathematically verified label -->
                            <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center gap-3 text-xs">
                                <div class="h-8 w-[2px] bg-emerald-500 rounded shrink-0"></div>
                                <div class="text-slate-400 leading-normal">
                                    <strong>Validation Statement:</strong> Based on the Pearson square, combining <span id="val-pct1" class="text-emerald-400 font-bold font-mono">68.6%</span> Yellow Maize with <span id="val-pct2" class="text-indigo-400 font-bold font-mono">31.4%</span> Soybean Meal yields exactly <span id="val-target" class="text-white font-bold font-mono">20% CP</span>.
                                </div>
                            </div>
                        </div>

                        <!-- Panel bottom instructions -->
                        <div class="pt-4 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-500 leading-relaxed">
                            <i data-lucide="help-circle" class="h-4 w-4 shrink-0 text-slate-600"></i>
                            <span>Formulation guides are securely indexed inside your local administrative database for future analysis. Export.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==================== SECTION: TRAINING PROGRAMS ==================== -->
        <section id="tab-training" class="tab-content hidden py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <!-- Left: Course options list -->
                    <div class="lg:col-span-7 space-y-8">
                        <div>
                            <h2 class="text-3xl font-bold tracking-tight text-slate-900">Practical Farm Training</h2>
                            <p class="text-slate-500 mt-1 max-w-lg">Incubating farmers with technical skill translations in animal husbandry.</p>
                        </div>

                        <div class="space-y-4">
                            <!-- Prog 1 -->
                            <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start transition hover:shadow-md">
                                <div class="p-3 bg-emerald-50 text-emerald-700 rounded-2xl shrink-0">
                                    <i data-lucide="sprout" class="h-7 w-7"></i>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h3 class="text-lg font-bold text-slate-900">Broiler Mastery Class</h3>
                                        <span class="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">Duration: 2 Weeks</span>
                                    </div>
                                    <p class="text-sm text-slate-500 leading-relaxed">
                                        Covers professional poultry brooding setups, ambient housing temperature profiles, weight optimizations, feeding schedules, and bio-security diagnostics.
                                    </p>
                                </div>
                            </div>
                            <!-- Prog 2 -->
                            <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start transition hover:shadow-md">
                                <div class="p-3 bg-emerald-50 text-emerald-700 rounded-2xl shrink-0">
                                    <i data-lucide="clipboard-list" class="h-7 w-7"></i>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h3 class="text-lg font-bold text-slate-900">Commercial Egg Program</h3>
                                        <span class="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">Duration: 3 Weeks</span>
                                    </div>
                                    <p class="text-sm text-slate-500 leading-relaxed">
                                        Learn standard layer poultry husbandry, managing high egg production rates, light stimulation rules, calcium nutrient buffers, and vaccine log parameters.
                                    </p>
                                </div>
                            </div>
                            <!-- Prog 3 -->
                            <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start transition hover:shadow-md">
                                <div class="p-3 bg-emerald-50 text-emerald-700 rounded-2xl shrink-0">
                                    <i data-lucide="calculator" class="h-7 w-7"></i>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h3 class="text-lg font-bold text-slate-900">Custom Feed Formulation Workshop</h3>
                                        <span class="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">Duration: 1 Week</span>
                                    </div>
                                    <p class="text-sm text-slate-500 leading-relaxed">
                                        Hands-on workshop targeting raw ingredient testing, standard diagnostic calculations, understanding amino-acid limits, calcium ratios, and local ingredient pairings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Enrollment Form -->
                    <div class="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                        <div class="flex items-center gap-2 pb-4 border-b border-slate-100">
                            <i data-lucide="graduation-cap" class="h-5 w-5 text-emerald-600"></i>
                            <h3 class="text-lg font-semibold text-slate-950">Enrollment Portal</h3>
                        </div>

                        <form id="enrollment-form" onsubmit="submitForm(event, 'training')">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="enroll_name">FullName</label>
                                    <input type="text" id="enroll_name" required placeholder="Adejoh Emmanuel" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="enroll_email">Primary Email Address</label>
                                    <input type="email" id="enroll_email" required placeholder="name@example.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="enroll_phone">WhatsApp Phone Number</label>
                                    <input type="text" id="enroll_phone" required placeholder="e.g. 08038986150" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="enroll_program">Select Program Module</label>
                                    <select id="enroll_program" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none">
                                        <option value="Broiler Mastery Class">Broiler Mastery Class</option>
                                        <option value="Commercial Egg Program">Commercial Egg Program</option>
                                        <option value="Custom Feed Formulation Workshop">Custom Feed Formulation Workshop</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="enroll_experience">Experience Level</label>
                                    <select id="enroll_experience" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none">
                                        <option value="Beginner">Beginner / Aspiring Farmer</option>
                                        <option value="Intermediate">Active Small-Scale Farmer</option>
                                        <option value="Advanced">Commercial Operator</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="enroll_date">Proposed Resumption Date</label>
                                    <input type="date" id="enroll_date" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                </div>

                                <button type="submit" id="btn-submit-enroll" class="w-full mt-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-center shadow-lg shadow-emerald-900/10 tracking-wide transition cursor-pointer">
                                    Submit Registration
                                </button>
                            </div>
                        </form>

                        <div id="enroll-status-box" class="hidden p-4 rounded-xl text-xs font-semibold border"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==================== SECTION: EXPERT CONSULTING ==================== -->
        <section id="tab-consulting" class="tab-content hidden py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <!-- Left Copy: Consulting domains -->
                    <div class="lg:col-span-6 space-y-8">
                        <div>
                            <h2 class="text-3xl font-bold tracking-tight text-slate-900">Custom Consulting Services</h2>
                            <p class="text-slate-500 mt-1 max-w-lg">Resolve farm problems directly with specialized veterinary agronomists.</p>
                        </div>

                        <!-- Core Service Blocks -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                                <h3 class="font-bold text-slate-900 flex items-center gap-2">
                                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span> Live Diagnostics
                                </h3>
                                <p class="text-xs text-slate-500 leading-relaxed">Poultry flock health checkups, necropsies, vaccine optimization mapping, mortality analysis logs.</p>
                            </div>
                            <div class="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                                <h3 class="font-bold text-slate-900 flex items-center gap-2">
                                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span> Feed Quality Checks
                                </h3>
                                <p class="text-xs text-slate-500 leading-relaxed">Pearson square feed formulation evaluations, mycotoxin toxicological screening, and crude protein validation reviews.</p>
                            </div>
                            <div class="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                                <h3 class="font-bold text-slate-900 flex items-center gap-2">
                                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span> Facility Assessments
                                </h3>
                                <p class="text-xs text-slate-500 leading-relaxed">Structural orientation of chicken pens, cross-ventilation analysis, deep litter setups, and feed trough elevations.</p>
                            </div>
                            <div class="p-5 bg-white border border-slate-200 rounded-2xl space-y-2">
                                <h3 class="font-bold text-slate-900 flex items-center gap-2">
                                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span> Financial Forecasts
                                </h3>
                                <p class="text-xs text-slate-500 leading-relaxed">Feasibility audits for new livestock, layer brooding margins projections, and Feed Conversion Ratio optimization calculations.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Form: Consulting form -->
                    <div class="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
                        <div class="flex items-center gap-2 pb-4 border-b border-slate-100">
                            <i data-lucide="clipboard-list" class="h-5 w-5 text-emerald-600"></i>
                            <h3 class="text-lg font-semibold text-slate-950">Book Consulting Session</h3>
                        </div>

                        <form id="consulting-form" onsubmit="submitForm(event, 'consulting')">
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="consult_name">FullName</label>
                                    <input type="text" id="consult_name" required placeholder="Aisha Bello" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="consult_email">Email Address</label>
                                        <input type="email" id="consult_email" required placeholder="aisha@example.com" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="consult_phone">Mobile Number</label>
                                        <input type="text" id="consult_phone" required placeholder="e.g. 08038986150" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="consult_area">Consulting Core Area</label>
                                    <select id="consult_area" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none">
                                        <option value="Farm Establishment">Farm Establishment & Layout Planning</option>
                                        <option value="Live Diagnostics Session">Poultry Diseases & Diagnostics</option>
                                        <option value="Feed Quality Verification">Feed Nutrition Matrices Analysis</option>
                                        <option value="Financial Feasibility Review">Agribusiness Profitability Projections</option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="consult_details">Tell us about your farm challenge</label>
                                    <textarea id="consult_details" placeholder="Describe layer production drops, extreme feed waste, sickness, or other veterinary concerns..." rows="4" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500"></textarea>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="consult_date">Proposed Date</label>
                                    <input type="date" id="consult_date" required class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                                </div>

                                <button type="submit" id="btn-submit-consult" class="w-full mt-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-center shadow-lg shadow-emerald-900/10 tracking-wide transition cursor-pointer">
                                    Book Consulting Session
                                </button>
                            </div>
                        </form>

                        <div id="consult-status-box" class="hidden p-4 rounded-xl text-xs font-semibold border"></div>
                    </div>
                </div>

            </div>
        </section>

        <!-- ==================== SECTION: AI FARM ADVISOR ==================== -->
        <section id="tab-ai" class="tab-content hidden py-16">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <!-- Advisor Header -->
                <div class="text-center space-y-2">
                    <div class="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-700 rounded-3xl">
                        <i data-lucide="bot" class="h-10 w-10"></i>
                    </div>
                    <h2 class="text-2xl font-bold tracking-tight text-slate-900">AI Agricultural Advisor</h2>
                    <p class="text-xs text-slate-500 max-w-lg mx-auto">
                        Trained extensively on animal husbandry, brooding guidelines, vaccination logs, Pearson's Square calculations, and cost optimization matrices.
                    </p>
                </div>

                <!-- Chat Canvas box -->
                <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col h-[520px]">
                    <!-- Top Info bar -->
                    <div class="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span class="text-xs font-semibold text-slate-700">Advisory Feed Active</span>
                        </div>
                        <button onclick="clearChat()" class="text-xs text-slate-400 hover:text-slate-600 font-medium inline-flex items-center gap-1">
                            <i data-lucide="trash-2" class="h-3.5 w-3.5"></i> Clear Loop
                        </button>
                    </div>

                    <!-- Chat Bubbles Thread -->
                    <div id="chat-thread-box" class="flex-grow p-6 overflow-y-auto space-y-4 text-sm scroll-smooth">
                        <!-- AI greeting bubble -->
                        <div class="flex items-start gap-3">
                            <div class="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                                <i data-lucide="bot" class="h-5 w-5 shrink-0"></i>
                            </div>
                            <div class="bg-slate-50 rounded-2xl rounded-tl-sm p-4 text-slate-700 max-w-[85%] border border-slate-100 leading-relaxed">
                                Hello! I am your AI Farm Advisor. I am trained in poultry health scheduling, feed formulations (Pearson Square), and livestock agribusiness strategies. <br><br>
                                Feel free to describe any poultry, layer, pig growth, or animal nutrition problems you are facing, or click any template prompts below:
                            </div>
                        </div>
                    </div>

                    <!-- Suggestion Buttons -->
                    <div class="p-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
                        <button onclick="sendQuickPrompt('Help form vaccination schedule for layer birds.')" class="px-3 py-1.5 bg-white hover:bg-slate-100 text-xs text-slate-600 rounded-lg border border-slate-200 transition font-medium cursor-pointer">
                            🛡️ Layers Vaccines schedule
                        </button>
                        <button onclick="sendQuickPrompt('Explain how to reduce broiler feed costs with cheap local alternative grain matrices.')" class="px-3 py-1.5 bg-white hover:bg-slate-100 text-xs text-slate-600 rounded-lg border border-slate-200 transition font-medium cursor-pointer">
                            🌽 Slashing Feed Costs
                        </button>
                    </div>

                    <!-- Chat inputs action bar -->
                    <div class="p-4 border-t border-slate-100 bg-white">
                        <form id="chat-composer-form" onsubmit="handleChatSubmit(event)" class="flex gap-2">
                            <input type="text" id="chat-composer-input" required placeholder="Type your poultry or livestock question here..." class="flex-grow px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                            <button type="submit" id="btn-chat-send" class="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl inline-flex items-center justify-center transition cursor-pointer shadow-lg shadow-emerald-950/10 shrink-0">
                                <i data-lucide="arrow-right" class="h-5 w-5"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- ==================== SECTION: ADMIN DASHBOARD ==================== -->
        <section id="tab-admin" class="tab-content hidden py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                
                <!-- If NOT authenticated: Show Login Prompt -->
                <div id="admin-login-shield" class="block max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                    <div class="text-center space-y-2">
                        <div class="inline-flex items-center justify-center p-3 bg-slate-100 text-slate-700 rounded-2xl">
                            <i data-lucide="lock" class="h-8 w-8"></i>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900">Protected Administrative Area</h3>
                        <p class="text-xs text-slate-500">Access requires system credential verification. Check your configuration values.</p>
                    </div>

                    <form onsubmit="handleAdminLogin(event)" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1" for="admin_pwd_field">System Password</label>
                            <input type="password" id="admin_pwd_field" required placeholder="Enter primary token" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500">
                        </div>
                        <button type="submit" class="w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-wrap font-semibold rounded-xl text-white tracking-wide transition cursor-pointer">
                            Authenticate and Open Panel
                        </button>
                    </form>
                    <div id="login-error-text" class="hidden text-xs text-center font-semibold text-rose-600">
                        Authentication Failed. Invalid Administrative credentials!
                    </div>
                </div>

                <!-- If Authenticated: Show Control Panel -->
                <div id="admin-secured-workspace" class="hidden space-y-8">
                    
                    <!-- Workspace Header Bar -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 border border-slate-200 rounded-3xl gap-4">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
                                <h2 class="text-xl font-bold text-slate-900">Administrative Terminal</h2>
                            </div>
                            <p class="text-xs text-slate-500 mt-0.5">Admin logged in successfully. Review database records below.</p>
                        </div>
                        <div class="flex gap-2 shrink-0">
                            <button onclick="handleDbBackup()" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl inline-flex items-center gap-1.5 transition shadow-lg shadow-indigo-900/10 cursor-pointer">
                                <i data-lucide="download" class="h-4 w-4"></i> Export MySQL Dump
                            </button>
                            <button onclick="logoutAdmin()" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer">
                                Log Out
                            </button>
                        </div>
                    </div>

                    <!-- Inner sub-tab buttons bookings vs formulations -->
                    <div class="flex gap-2 border-b border-slate-200 pb-px">
                        <button id="sub-nav-bookings" onclick="switchAdminTab('bookings')" class="px-4 py-2.5 text-xs font-semibold text-indigo-700 border-b-2 border-indigo-600 transition">
                            Bookings & Enlistments
                        </button>
                        <button id="sub-nav-formulations" onclick="switchAdminTab('formulations')" class="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
                            Nutrition Records Archive
                        </button>
                    </div>

                    <!-- Loading Loader state -->
                    <div id="admin-loading-indicator" class="hidden py-16 text-center text-slate-400 text-sm space-y-2">
                        <svg class="animate-spin h-8 w-8 text-indigo-600 mx-auto" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Retrieving database entries from MySQL server...</span>
                    </div>

                    <!-- LIST: BOOKINGS TAB -->
                    <div id="admin-list-bookings" class="block bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr class="bg-indigo-50/50 border-b border-slate-200 text-slate-600 font-semibold">
                                        <th class="p-4">Type</th>
                                        <th class="p-4">Name</th>
                                        <th class="p-4">Contact</th>
                                        <th class="p-4">Category</th>
                                        <th class="p-4">Date</th>
                                        <th class="p-4">Status</th>
                                        <th class="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="bookings-rows-body" class="divide-y divide-slate-100 text-slate-700">
                                    <!-- Dynamic rows from PHP API -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- LIST: FORMULATIONS TAB -->
                    <div id="admin-list-formulations" class="hidden bg-white border border-slate-200 rounded-3xl overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr class="bg-indigo-50/50 border-b border-slate-200 text-slate-600 font-semibold">
                                        <th class="p-4">Title</th>
                                        <th class="p-4 font-mono">Target Protein</th>
                                        <th class="p-4">Ingredient 1 (Low Protein)</th>
                                        <th class="p-4">Ingredient 2 (High Protein)</th>
                                        <th class="p-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="formulations-rows-body" class="divide-y divide-slate-100 text-slate-700">
                                    <!-- Dynamic rows from PHP API -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </section>

    </main>

    <!-- ==================== MAIN FOOTER ==================== -->
    <footer id="main-footer" class="border-t border-slate-100 bg-white py-12 text-slate-600">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div class="md:col-span-5 space-y-4">
                    <div class="flex items-center space-x-3">
                        <div class="p-1 bg-slate-50 border border-slate-100 rounded-xl h-10 w-10 shrink-0 overflow-hidden">
                            <img src="https://i.ibb.co/ZR0n8bWt/slazzer-preview-zlpr6.png" alt="ACE AGROVET Logo" class="h-full w-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                            <span class="block text-base font-bold tracking-tight text-slate-900">ACE AGROVET</span>
                            <span class="block text-[10px] font-semibold text-emerald-600 uppercase tracking-wider -mt-1">CONSULTS</span>
                        </div>
                    </div>
                    <p class="text-xs text-slate-400 leading-normal max-w-sm">
                        Integrating qualified veterinary guidance with precise nutrition formulation calculations. Overcoming diagnostic and feeding hurdles to protect farm outputs.
                    </p>
                </div>
                <div class="md:col-span-3 space-y-2">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900">Quick Links</h4>
                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-400">
                        <button onclick="switchTab('home')" class="text-left hover:text-emerald-600">Home</button>
                        <button onclick="switchTab('about')" class="text-left hover:text-emerald-600">About Us</button>
                        <button onclick="switchTab('services')" class="text-left hover:text-emerald-600">Formulator</button>
                        <button onclick="switchTab('training')" class="text-left hover:text-emerald-600">Incubator</button>
                    </div>
                </div>
                <div class="md:col-span-4 space-y-3">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-slate-900">Official Channels</h4>
                    <div class="space-y-2 text-xs font-medium text-slate-500">
                        <div class="flex items-center gap-2">
                            <i data-lucide="phone" class="h-4 w-4 text-emerald-500 shrink-0"></i> <span>08038986150</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-lucide="mail" class="h-4 w-4 text-emerald-500 shrink-0"></i> <span>ace_vets@yahoo.com</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-lucide="map-pin" class="h-4 w-4 text-emerald-500 shrink-0"></i> <span class="text-[10px] text-slate-400">Benue State, Nigeria / Virtual Advisory Globally</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="border-slate-100 my-8">
            <p class="text-center text-[10px] text-slate-400 font-mono">
                Copyright &copy; 2026 ACE AGROVET CONSULTS &bull; All Rights Reserved. Fully Organized for MySQL and Laravel 11.
            </p>
        </div>
    </footer>

    <!-- ==================== MASTER CUSTOM SCRIPTS ==================== -->
    <script>
        // Init Lucide Icon graphics
        lucide.createIcons();

        // Mobile drawer panel toggle variables
        function toggleMobileMenu() {
            const el = document.getElementById('mobile-menu-drawer');
            el.classList.toggle('hidden');
        }

        // NAVIGATION SWITCHER CONTROLLER
        function switchTab(tabId) {
            // Hide all tab containers
            document.querySelectorAll('.tab-content').forEach(container => {
                container.classList.add('hidden');
                container.classList.remove('block');
            });
            // Show requested container
            const activeEl = document.getElementById(`tab-${tabId}`);
            if (activeEl) {
                activeEl.classList.remove('hidden');
                activeEl.classList.add('block');
            }

            // Sync Header navigation highlights
            document.querySelectorAll('#desktop-nav button').forEach(btn => {
                btn.classList.remove('active-tab');
                btn.classList.remove('active-admin-tab');
            });

            const activeBtn = document.getElementById(`nav-${tabId}`);
            if (activeBtn) {
                if (tabId === 'admin') {
                    activeBtn.classList.add('active-admin-tab');
                } else {
                    activeBtn.classList.add('active-tab');
                }
            }

            // Close mobile menu drawer automatically
            document.getElementById('mobile-menu-drawer').classList.add('hidden');

            // Scroll target to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Trigger admin initial load if tab is selected and authenticated
            if (tabId === 'admin' && checkIsAdminAuthenticated()) {
                fetchAdminRecords();
            }
        }

        // ==========================================
        //  PEARSON'S SQUARE FEED FORMULATION SYSTEM
        // ==========================================
        var parts1 = 0;
        var parts2 = 0;
        var percent1 = 0;
        var percent2 = 0;
        var weight1 = 0;
        var weight2 = 0;
        var isFormulationValid = false;

        function loadTemplate(title, target, ing1Name, ing1CP, ing2Name, ing2CP) {
            document.getElementById('calc_name').value = title;
            document.getElementById('calc_target_cp').value = target;
            document.getElementById('calc_ing1_name').value = ing1Name;
            document.getElementById('calc_ing1_cp').value = ing1CP;
            document.getElementById('calc_ing2_name').value = ing2Name;
            document.getElementById('calc_ing2_cp').value = ing2CP;
            runPearsonSquare();
        }

        function resetFormulator() {
            document.getElementById('calc_name').value = 'My Custom Feed Formulation';
            document.getElementById('calc_target_cp').value = '20';
            document.getElementById('calc_ing1_name').value = 'Yellow Maize';
            document.getElementById('calc_ing1_cp').value = '9';
            document.getElementById('calc_ing2_name').value = 'Soybean Meal';
            document.getElementById('calc_ing2_cp').value = '44';
            document.getElementById('calc_batch_weight').value = '100';
            runPearsonSquare();
            
            const msgBox = document.getElementById('calc-status-box');
            msgBox.classList.add('hidden');
        }

        function runPearsonSquare() {
            const nameField = document.getElementById('calc_name').value;
            const targetCP = parseFloat(document.getElementById('calc_target_cp').value) || 0;
            const ing1Name = document.getElementById('calc_ing1_name').value || "Ingredient 1";
            const ing1CP = parseFloat(document.getElementById('calc_ing1_cp').value) || 0;
            const ing2Name = document.getElementById('calc_ing2_name').value || "Ingredient 2";
            const ing2CP = parseFloat(document.getElementById('calc_ing2_cp').value) || 0;
            const batchWeight = parseFloat(document.getElementById('calc_batch_weight').value) || 0;

            const errBox = document.getElementById('calc-error-display');
            const errText = document.getElementById('calc-error-text');
            const validBox = document.getElementById('pearson-visual-box');

            // Reset flags
            isFormulationValid = false;

            if (targetCP <= 0 || ing1CP <= 0 || ing2CP <= 0) {
                errText.innerText = "Crude Protein (CP) percentages must be positive, non-zero values.";
                errBox.classList.remove('hidden');
                validBox.classList.add('hidden');
                return;
            }

            if (ing1CP === ing2CP) {
                errText.innerText = "Ingredients must have distinct Crude Protein strengths to combine effectively.";
                errBox.classList.remove('hidden');
                validBox.classList.add('hidden');
                return;
            }

            const minCP = Math.min(ing1CP, ing2CP);
            const maxCP = Math.max(ing1CP, ing2CP);

            if (targetCP < minCP || targetCP > maxCP) {
                errText.innerText = `Target Strength of ${targetCP}% CP must fall between the nutrient values of your inputs: ${ing1Name} (${ing1CP}% CP) and ${ing2Name} (${ing2CP}% CP). You cannot combine weak components to reach an impossible high or low value.`;
                errBox.classList.remove('hidden');
                validBox.classList.add('hidden');
                return;
            }

            // Calculation Core Pearson
            errBox.classList.add('hidden');
            validBox.classList.remove('hidden');
            isFormulationValid = true;

            // Diagonals
            parts1 = Math.abs(ing2CP - targetCP);
            parts2 = Math.abs(ing1CP - targetCP);
            const totalParts = parts1 + parts2;

            percent1 = (parts1 / totalParts) * 100;
            percent2 = (parts2 / totalParts) * 100;

            weight1 = (percent1 / 100) * batchWeight;
            weight2 = (percent2 / 100) * batchWeight;

            // Fill visual board
            document.getElementById('p-ing1-lbl').innerText = ing1Name;
            document.getElementById('p-ing1-cp').innerText = ing1CP + '% CP';
            document.getElementById('p-ing2-lbl').innerText = ing2Name;
            document.getElementById('p-ing2-cp').innerText = ing2CP + '% CP';
            document.getElementById('p-target-cp').innerText = targetCP + '% CP';

            document.getElementById('p-ing1-parts').innerText = parts1.toFixed(1) + ' Parts';
            document.getElementById('p-ing2-parts').innerText = parts2.toFixed(1) + ' Parts';

            // Fill breakdown cards
            document.getElementById('breakdown-ing1-title').innerText = ing1Name;
            document.getElementById('breakdown-ing1-pct').innerText = percent1.toFixed(1) + '%';
            document.getElementById('breakdown-ing1-progress').style.width = percent1.toFixed(0) + '%';
            document.getElementById('breakdown-ing1-wt').innerText = weight1.toFixed(2) + ' kg';

            document.getElementById('breakdown-ing2-title').innerText = ing2Name;
            document.getElementById('breakdown-ing2-pct').innerText = percent2.toFixed(1) + '%';
            document.getElementById('breakdown-ing2-progress').style.width = percent2.toFixed(0) + '%';
            document.getElementById('breakdown-ing2-wt').innerText = weight2.toFixed(2) + ' kg';

            // Fill verification label
            document.getElementById('val-pct1').innerText = percent1.toFixed(1) + '%';
            document.getElementById('val-pct2').innerText = percent2.toFixed(1) + '%';
            document.getElementById('val-target').innerText = targetCP + '%';
        }

        // Hook initial Pearson loop calculation
        document.addEventListener('DOMContentLoaded', () => {
            runPearsonSquare();
        });

        // Save Formulation in database using standard Laravel API Calls
        async function saveFormulation(event) {
            event.preventDefault();
            if (!isFormulationValid) return;

            const name = document.getElementById('calc_name').value;
            const targetCP = parseFloat(document.getElementById('calc_target_cp').value);
            const ingredient1Name = document.getElementById('calc_ing1_name').value;
            const ingredient1CP = parseFloat(document.getElementById('calc_ing1_cp').value);
            const ingredient2Name = document.getElementById('calc_ing2_name').value;
            const ingredient2CP = parseFloat(document.getElementById('calc_ing2_cp').value);

            const statusBox = document.getElementById('calc-status-box');
            const submitBtn = document.getElementById('btn-save-formulation');

            statusBox.classList.add('hidden');
            submitBtn.disabled = true;
            submitBtn.innerText = "Indexing Formulation...";

            try {
                const response = await fetch('/api/formulations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        targetCP,
                        ingredient1Name,
                        ingredient1CP,
                        ingredient1Parts: parts1,
                        ingredient1Percent: percent1,
                        ingredient2Name,
                        ingredient2CP,
                        ingredient2Parts: parts2,
                        ingredient2Percent: percent2
                    })
                });

                if (response.ok) {
                    statusBox.className = "p-3.5 rounded-xl text-xs font-semibold border bg-emerald-50 border-emerald-200 text-emerald-800";
                    statusBox.innerText = "✓ Formulation compiled and indexed successfully! Available on Admin Dashboard.";
                    statusBox.classList.remove('hidden');
                } else {
                    const err = await response.json();
                    statusBox.className = "p-3.5 rounded-xl text-xs font-semibold border bg-rose-50 border-rose-200 text-rose-800";
                    statusBox.innerText = `✗ Database Save Error: ${err.error || 'Failed to persist records'}`;
                    statusBox.classList.remove('hidden');
                }
            } catch (err) {
                statusBox.className = "p-3.5 rounded-xl text-xs font-semibold border bg-rose-50 border-rose-200 text-rose-800";
                statusBox.innerText = "✗ Technical error reaching API pipeline. Confirm server status.";
                statusBox.classList.remove('hidden');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i data-lucide="save" class="h-4 w-4"></i> Save Formulation';
                lucide.createIcons();
            }
        }


        // ==========================================
        //  RESERVATIONS AND ENROLLMENTS FLOW (AJAX)
        // ==========================================
        async function submitForm(event, context) {
            event.preventDefault();
            
            let payload = {};
            let btnID = '';
            let statusBoxID = '';
            let defaultBtnText = '';

            if (context === 'training') {
                payload = {
                    type: 'training',
                    name: document.getElementById('enroll_name').value,
                    email: document.getElementById('enroll_email').value,
                    phone: document.getElementById('enroll_phone').value,
                    category: document.getElementById('enroll_program').value,
                    details: 'Experience: ' + document.getElementById('enroll_experience').value,
                    date: document.getElementById('enroll_date').value
                };
                btnID = 'btn-submit-enroll';
                statusBoxID = 'enroll-status-box';
                defaultBtnText = 'Submit Registration';
            } else {
                payload = {
                    type: 'consulting',
                    name: document.getElementById('consult_name').value,
                    email: document.getElementById('consult_email').value,
                    phone: document.getElementById('consult_phone').value,
                    category: document.getElementById('consult_area').value,
                    details: document.getElementById('consult_details').value,
                    date: document.getElementById('consult_date').value
                };
                btnID = 'btn-submit-consult';
                statusBoxID = 'consult-status-box';
                defaultBtnText = 'Book Consulting Session';
            }

            const btn = document.getElementById(btnID);
            const statusBox = document.getElementById(statusBoxID);

            statusBox.classList.add('hidden');
            btn.disabled = true;
            btn.innerText = "Routing details safely...";

            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    statusBox.className = "p-4 rounded-xl text-xs font-semibold border bg-emerald-50 border-emerald-200 text-emerald-800 space-y-1";
                    statusBox.innerHTML = `<div>✓ Submission successful! Outgoing parameters logged.</div><div class="text-[10px] text-emerald-700/80 font-normal">Details routed to official operational mailbox target: <strong>ace_vets@yahoo.com</strong></div>`;
                    statusBox.classList.remove('hidden');

                    // Reset form inputs
                    if (context === 'training') {
                        document.getElementById('enrollment-form').reset();
                    } else {
                        document.getElementById('consulting-form').reset();
                    }
                } else {
                    const err = await response.json();
                    statusBox.className = "p-4 rounded-xl text-xs font-semibold border bg-rose-50 border-rose-200 text-rose-800";
                    statusBox.innerText = `✗ Server validation error: ${err.error || 'Check configuration settings'}`;
                    statusBox.classList.remove('hidden');
                }
            } catch (err) {
                statusBox.className = "p-4 rounded-xl text-xs font-semibold border bg-rose-50 border-rose-200 text-rose-800";
                statusBox.innerText = `✗ Connection Timeout. Unable to submit to route API.`;
                statusBox.classList.remove('hidden');
            } finally {
                btn.disabled = false;
                btn.innerText = defaultBtnText;
            }
        }


        // ==========================================
        //  AI CHAMBER: CHAT CONVERSATIONS CONTROLLER
        // ==========================================
        var chatLoopMessages = [];

        function clearChat() {
            chatLoopMessages = [];
            const thread = document.getElementById('chat-thread-box');
            thread.innerHTML = `
                <div class="flex items-start gap-3">
                    <div class="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                        <i data-lucide="bot" class="h-5 w-5 shrink-0"></i>
                    </div>
                    <div class="bg-slate-50 rounded-2xl rounded-tl-sm p-4 text-slate-700 max-w-[85%] border border-slate-100 leading-relaxed">
                        Hello! Chat log cleared. I am ready for any animal husbandry, nutrition formulation, or farm diagnostic questions. Type below or select helper buttons!
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        async function sendQuickPrompt(promptText) {
            document.getElementById('chat-composer-input').value = promptText;
            handleChatSubmit(new Event('submit'));
        }

        async function handleChatSubmit(event) {
            if (event) event.preventDefault();

            const inputEl = document.getElementById('chat-composer-input');
            const prompt = inputEl.value.trim();
            if (!prompt) return;

            // Append User prompt locally
            appendChatBubble('user', prompt);
            inputEl.value = '';

            // Loading state bubble
            const loadingBubbleId = appendLoadingBubble();

            try {
                const response = await fetch('/api/gemini/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: chatLoopMessages })
                });

                removeLoadingBubble(loadingBubbleId);

                if (response.ok) {
                    const data = await response.json();
                    appendChatBubble('assistant', data.content);
                } else {
                    const err = await response.json();
                    appendChatBubble('assistant', `⚠️ Advisor error: ${err.error || 'The model core experienced issues. Check GEMINI_API_KEY settings.'}`);
                }
            } catch (err) {
                removeLoadingBubble(loadingBubbleId);
                appendChatBubble('assistant', "⚠️ System error connecting to the advisory server. Ensure your internet connection is active.");
            }
        }

        function appendChatBubble(role, str) {
            const thread = document.getElementById('chat-thread-box');
            chatLoopMessages.push({ role: role, content: str });

            const bubbleOuter = document.createElement('div');
            bubbleOuter.className = "flex items-start gap-3 transition duration-150 animate-fade";

            if (role === 'user') {
                bubbleOuter.className += " flex-row-reverse";
                bubbleOuter.innerHTML = `
                    <div class="p-2 bg-indigo-50 text-indigo-700 rounded-xl shrink-0">
                        <i data-lucide="user" class="h-5 w-5 shrink-0"></i>
                    </div>
                    <div class="bg-indigo-600 rounded-2xl rounded-tr-sm p-4 text-white max-w-[85%] leading-relaxed font-medium">
                        ${str}
                    </div>
                `;
            } else {
                // Convert simple Markdown structure manually for display comfort
                const formattedHtml = parseMockMarkdown(str);
                bubbleOuter.innerHTML = `
                    <div class="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                        <i data-lucide="bot" class="h-5 w-5 shrink-0"></i>
                    </div>
                    <div class="bg-slate-50 rounded-2xl rounded-tl-sm p-4 text-slate-700 max-w-[85%] border border-slate-100 leading-relaxed markdown-body">
                        ${formattedHtml}
                    </div>
                `;
            }

            thread.appendChild(bubbleOuter);
            lucide.createIcons();
            thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
        }

        function appendLoadingBubble() {
            const thread = document.getElementById('chat-thread-box');
            const bubbleID = 'loading-' + Date.now();

            const bubbleOuter = document.createElement('div');
            bubbleOuter.id = bubbleID;
            bubbleOuter.className = "flex items-start gap-3 transition animate-pulse";
            bubbleOuter.innerHTML = `
                <div class="p-2 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 animate-bounce">
                    <i data-lucide="bot" class="h-5 w-5 shrink-0"></i>
                </div>
                <div class="bg-slate-50 rounded-2xl rounded-tl-sm p-3.5 text-slate-400 font-medium max-w-[85%] border border-slate-100 flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Formulating professional veterinary calculations...</span>
                </div>
            `;
            thread.appendChild(bubbleOuter);
            lucide.createIcons();
            thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
            return bubbleID;
        }

        function removeLoadingBubble(id) {
            const target = document.getElementById(id);
            if (target) target.remove();
        }

        function parseMockMarkdown(str) {
            // High-Performance custom Regex replacing simple Markdown tags to elegant HTML for Blade views
            let h = str;
            h = h.replace(/### (.*?)\n/g, '<h3>$1</h3>');
            h = h.replace(/## (.*?)\n/g, '<h2>$1</h2>');
            h = h.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            h = h.replace(/\*(.*?)\*/g, '<em>$1</em>');
            h = h.replace(/• (.*?)\n/g, '<li>$1</li>');
            h = h.replace(/- (.*?)\n/g, '<li>$1</li>');
            h = h.replace(/\n\n/g, '</p><p>');
            return '<p>' + h + '</p>';
        }


        // ==========================================
        //  ADMIN PANEL SYSTEM SECURED CAPABILITIES
        // ==========================================
        var activeAdminSubTab = 'bookings';

        function checkIsAdminAuthenticated() {
            return localStorage.getItem('ace_admin_authenticated') === 'true';
        }

        if (checkIsAdminAuthenticated()) {
            document.getElementById('admin-login-shield').classList.add('hidden');
            document.getElementById('admin-secured-workspace').classList.remove('hidden');
        }

        function handleAdminLogin(event) {
            event.preventDefault();
            const pwd = document.getElementById('admin_pwd_field').value;
            const errEl = document.getElementById('login-error-text');

            if (pwd === 'Aceagrovet1234') {
                localStorage.setItem('ace_admin_authenticated', 'true');
                errEl.classList.add('hidden');
                document.getElementById('admin_pwd_field').value = '';
                
                document.getElementById('admin-login-shield').classList.add('hidden');
                document.getElementById('admin-secured-workspace').classList.remove('hidden');

                fetchAdminRecords();
            } else {
                errEl.classList.remove('hidden');
            }
        }

        function logoutAdmin() {
            localStorage.removeItem('ace_admin_authenticated');
            document.getElementById('admin-login-shield').classList.remove('hidden');
            document.getElementById('admin-secured-workspace').classList.add('hidden');
        }

        function switchAdminTab(subTab) {
            activeAdminSubTab = subTab;
            
            const btnB = document.getElementById('sub-nav-bookings');
            const btnF = document.getElementById('sub-nav-formulations');

            const listB = document.getElementById('admin-list-bookings');
            const listF = document.getElementById('admin-list-formulations');

            if (subTab === 'bookings') {
                btnB.className = "px-4 py-2.5 text-xs font-semibold text-indigo-700 border-b-2 border-indigo-600 transition";
                btnF.className = "px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition";
                
                listB.classList.remove('hidden');
                listB.classList.add('block');
                
                listF.classList.remove('block');
                listF.classList.add('hidden');
            } else {
                btnF.className = "px-4 py-2.5 text-xs font-semibold text-indigo-700 border-b-2 border-indigo-600 transition";
                btnB.className = "px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition";
                
                listF.classList.remove('hidden');
                listF.classList.add('block');
                
                listB.classList.remove('block');
                listB.classList.add('hidden');
            }

            fetchAdminRecords();
        }

        async function fetchAdminRecords() {
            if (!checkIsAdminAuthenticated()) return;

            const loader = document.getElementById('admin-loading-indicator');
            loader.classList.remove('hidden');

            try {
                const responseBookings = await fetch('/api/bookings', {
                    headers: { 'x-admin-password': 'Aceagrovet1234' }
                });
                const responseFormulations = await fetch('/api/formulations', {
                    headers: { 'x-admin-password': 'Aceagrovet1234' }
                });

                loader.classList.add('hidden');

                if (responseBookings.ok && responseFormulations.ok) {
                    const bookings = await responseBookings.json();
                    const formulations = await responseFormulations.json();

                    renderBookings(bookings);
                    renderFormulations(formulations);
                }
            } catch (err) {
                loader.classList.add('hidden');
                console.error("Failed to fetch admin dashboard records", err);
            }
        }

        function renderBookings(list) {
            const body = document.getElementById('bookings-rows-body');
            if (list.length === 0) {
                body.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-400">No registrations found. Entries registered via frontend flows are saved inside MySQL automatically.</td></tr>`;
                return;
            }

            body.innerHTML = '';
            list.forEach(b => {
                const row = document.createElement('tr');
                row.className = "hover:bg-slate-50/55 transition border-b border-slate-100";
                
                let badgeClass = "bg-amber-100 text-amber-800";
                if (b.status === 'Approved') badgeClass = "bg-indigo-100 text-indigo-800";
                if (b.status === 'Completed') badgeClass = "bg-emerald-100 text-emerald-800";

                let typeLabel = (b.type === 'training') ? '🐣 Course Incubator' : '💼 Agro Consulting';

                row.innerHTML = `
                    <td class="p-4 font-semibold text-slate-900">${typeLabel}</td>
                    <td class="p-4 font-medium">${b.name}</td>
                    <td class="p-4">
                        <div class="space-y-0.5">
                            <div class="font-mono text-slate-900">${b.phone}</div>
                            <div class="text-slate-400 font-normal select-all">${b.email}</div>
                        </div>
                    </td>
                    <td class="p-4">
                        <div class="space-y-1 max-w-[200px]">
                            <span class="font-semibold text-slate-800 block">${b.category}</span>
                            <span class="text-[10px] text-slate-400 font-normal line-clamp-2">${b.details || 'None'}</span>
                        </div>
                    </td>
                    <td class="p-4 font-medium font-mono">${b.date}</td>
                    <td class="p-4">
                        <span class="px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${badgeClass}">${b.status}</span>
                    </td>
                    <td class="p-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            <button onclick="updateBookingStatus('${b.id}', 'Approved')" class="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[10px] cursor-pointer">Approved</button>
                            <button onclick="updateBookingStatus('${b.id}', 'Completed')" class="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded text-[10px] cursor-pointer">Completed</button>
                            <button onclick="deleteBooking('${b.id}')" class="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer" title="Delete record">
                                <i data-lucide="trash-2" class="h-4 w-4"></i>
                            </button>
                        </div>
                    </td>
                `;
                body.appendChild(row);
            });
            lucide.createIcons();
        }

        function renderFormulations(list) {
            const body = document.getElementById('formulations-rows-body');
            if (list.length === 0) {
                body.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-slate-400">No formula records recorded. Create some feed recipes in the Pearson Formulator panel!</td></tr>`;
                return;
            }

            body.innerHTML = '';
            list.forEach(f => {
                const row = document.createElement('tr');
                row.className = "hover:bg-slate-50/55 transition border-b border-slate-100";
                row.innerHTML = `
                    <td class="p-4 font-semibold text-slate-900">${f.name}</td>
                    <td class="p-4 font-mono font-bold text-slate-900">${f.target_cp || f.targetCP || 0}% CP</td>
                    <td class="p-4">
                        <div class="space-y-0.5">
                            <div class="font-medium text-slate-800">${f.ingredient1_name || f.ingredient1Name}</div>
                            <div class="text-[10px] text-slate-400 font-mono">CP: ${f.ingredient1_cp || f.ingredient1CP}% &bull; Percent in feed: <strong>${(f.ingredient1_percent || f.ingredient1Percent).toFixed(1)}%</strong></div>
                        </div>
                    </td>
                    <td class="p-4">
                        <div class="space-y-0.5">
                            <div class="font-medium text-slate-800">${f.ingredient2_name || f.ingredient2Name}</div>
                            <div class="text-[10px] text-slate-400 font-mono">CP: ${f.ingredient2_cp || f.ingredient2CP}% &bull; Percent in feed: <strong>${(f.ingredient2_percent || f.ingredient2Percent).toFixed(1)}%</strong></div>
                        </div>
                    </td>
                    <td class="p-4 text-right">
                        <button onclick="deleteFormulation('${f.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 transition cursor-pointer" title="Delete formulation">
                            <i data-lucide="trash-2" class="h-4 w-4"></i>
                        </button>
                    </td>
                `;
                body.appendChild(row);
            });
            lucide.createIcons();
        }

        async function updateBookingStatus(id, newStatus) {
            if (!confirm(`Are you sure you want to mark this record as ${newStatus}?`)) return;
            try {
                const response = await fetch(`/api/bookings/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-admin-password': 'Aceagrovet1234'
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (response.ok) {
                    fetchAdminRecords();
                }
            } catch (err) {
                console.error("Failed to update status", err);
            }
        }

        async function deleteBooking(id) {
            if (!confirm('Are you sure you want to permanently delete this registration record?')) return;
            try {
                const response = await fetch(`/api/bookings/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-admin-password': 'Aceagrovet1234' }
                });

                if (response.ok) {
                    fetchAdminRecords();
                }
            } catch (err) {
                console.error("Failed to delete booking", err);
            }
        }

        async function deleteFormulation(id) {
            if (!confirm('Are you sure you want to permanently delete this diagnostic feed formulation guide?')) return;
            try {
                const response = await fetch(`/api/formulations/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-admin-password': 'Aceagrovet1234' }
                });

                if (response.ok) {
                    fetchAdminRecords();
                }
            } catch (err) {
                console.error("Failed to delete formulation", err);
            }
        }

        // Trigger secure MySQL raw SQL dump download file
        async function handleDbBackup() {
            try {
                const response = await fetch('/api/admin/export-db', {
                    headers: { 'x-admin-password': 'Aceagrovet1234' }
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ace_agrovet_mysql_backup_${new Date().toISOString().split('T')[0]}.sql`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                } else {
                    alert('Could not download database SQL dump from MySQL backend. Verify authentication.');
                }
            } catch (err) {
                console.error(err);
                alert('Connection error exporting database.');
            }
        }
    </script>
</body>
</html>
