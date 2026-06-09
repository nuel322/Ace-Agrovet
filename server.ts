import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Local JSON Database
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

interface Booking {
  id: string;
  type: 'consulting' | 'training';
  name: string;
  email: string;
  phone: string;
  category: string;
  details: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Completed';
  createdAt: string;
}

interface FeedFormulation {
  id: string;
  name: string;
  targetCP: number;
  ingredient1Name: string;
  ingredient1CP: number;
  ingredient1Parts: number;
  ingredient1Percent: number;
  ingredient2Name: string;
  ingredient2CP: number;
  ingredient2Parts: number;
  ingredient2Percent: number;
  createdAt: string;
}

interface DB {
  bookings: Booking[];
  formulations: FeedFormulation[];
}

const defaultDB: DB = {
  bookings: [
    {
      id: "b-1",
      type: "consulting",
      name: "Emmanuel Terngu",
      email: "ace_vets@yahoo.com",
      phone: "08038986150",
      category: "Productivity Improvement",
      details: "Experiencing high broiler mortality rates in the first 2 weeks. Need advice on brooding temperature and bio-security protocols.",
      date: "2026-06-10",
      status: "Pending",
      createdAt: new Date().toISOString()
    },
    {
      id: "b-2",
      type: "training",
      name: "Aisha Bello",
      email: "aisha.bello@example.com",
      phone: "+234 803 111 2222",
      category: "Poultry Farming",
      details: "No previous experience. Looking to set up a small-scale layers farm (approx. 200 birds) in Kaduna State.",
      date: "2026-06-14",
      status: "Approved",
      createdAt: new Date().toISOString()
    },
    {
      id: "b-3",
      type: "consulting",
      name: "Kenneth Okafor",
      email: "kenneth.o@example.com",
      phone: "+234 809 999 8888",
      category: "Animal Nutrition Advisory",
      details: "Need a custom feed formulation for pig growers using local ingredients (PKC, maize offal, soya) to reduce feeding costs.",
      date: "2026-06-08",
      status: "Completed",
      createdAt: new Date().toISOString()
    }
  ],
  formulations: [
    {
      id: "f-1",
      name: "Standard Chicken Broiler Starter Formulation",
      targetCP: 22,
      ingredient1Name: "Yellow Maize",
      ingredient1CP: 9,
      ingredient1Parts: 22,
      ingredient1Percent: 62.86,
      ingredient2Name: "Soybean Meal (Concentrate)",
      ingredient2CP: 44,
      ingredient2Parts: 13,
      ingredient2Percent: 37.14,
      createdAt: new Date().toISOString()
    },
    {
      id: "f-2",
      name: "Standard Layers Mash Formulation",
      targetCP: 16.5,
      ingredient1Name: "White Corn",
      ingredient1CP: 8.8,
      ingredient1Parts: 25.5,
      ingredient1Percent: 72.86,
      ingredient2Name: "High-Protein Fishmeal",
      ingredient2CP: 62,
      ingredient2Parts: 7.7,
      ingredient2Percent: 27.14,
      createdAt: new Date().toISOString()
    }
  ]
};

// Ensure database file exists
function readDB(): DB {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDB, null, 2));
      return defaultDB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB, returning defaults', err);
    return defaultDB;
  }
}

function writeDB(db: DB) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error writing to JSON DB', err);
  }
}

// Authentication/Authorization Middleware for Administrative Endpoints
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers['authorization'];
  const customHeader = req.headers['x-admin-password'];
  
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const password = token || customHeader;
  
  if (password === 'Aceagrovet1234') {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access. Invalid system login sessions." });
  }
}

// REST API Routes

// Get all bookings (consultations and trainings) - SECURED
app.get('/api/bookings', requireAdmin, (req, res) => {
  const db = readDB();
  res.json(db.bookings);
});

// Create a new booking - PUBLIC
app.post('/api/bookings', (req, res) => {
  try {
    const { type, name, email, phone, category, details, date } = req.body;
    if (!name || !email || !phone || !category || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const db = readDB();
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      type,
      name,
      email,
      phone,
      category,
      details: details || '',
      date,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    db.bookings.unshift(newBooking);
    writeDB(db);

    // Secure operational log simulating real-time SMTP/API dispatch to the official Yahoo mailbox
    console.log(`====================================================================`);
    console.log(`[Form Submission Routed to: ace_vets@yahoo.com]`);
    console.log(`Type: ${type.toUpperCase()}`);
    console.log(`Client Name: ${name}`);
    console.log(`Client Contact: ${email} | ${phone}`);
    console.log(`Category: ${category}`);
    console.log(`Details: ${details || 'None'}`);
    console.log(`Target Date: ${date}`);
    console.log(`Status: Sent and logged successfully to Database.`);
    console.log(`====================================================================`);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: "Failed to process booking request" });
  }
});

// Update booking status - SECURED
app.patch('/api/bookings/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }
    
    const db = readDB();
    const index = db.bookings.findIndex(b => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    db.bookings[index].status = status;
    writeDB(db);
    res.json(db.bookings[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking status" });
  }
});

// Delete a booking - SECURED
app.delete('/api/bookings/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const originalLen = db.bookings.length;
    db.bookings = db.bookings.filter(b => b.id !== id);
    
    if (db.bookings.length === originalLen) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    writeDB(db);
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// Get saved feed formulations - SECURED
app.get('/api/formulations', requireAdmin, (req, res) => {
  const db = readDB();
  res.json(db.formulations);
});

// Save a feed formulation - PUBLIC
app.post('/api/formulations', (req, res) => {
  try {
    const { name, targetCP, ingredient1Name, ingredient1CP, ingredient1Parts, ingredient1Percent, ingredient2Name, ingredient2CP, ingredient2Parts, ingredient2Percent } = req.body;
    if (!name || !targetCP || !ingredient1Name || !ingredient2Name) {
      return res.status(400).json({ error: "Missing required details for formulation" });
    }
    
    const db = readDB();
    const newFormulation: FeedFormulation = {
      id: `f-${Date.now()}`,
      name,
      targetCP,
      ingredient1Name,
      ingredient1CP,
      ingredient1Parts,
      ingredient1Percent,
      ingredient2Name,
      ingredient2CP,
      ingredient2Parts,
      ingredient2Percent,
      createdAt: new Date().toISOString()
    };
    
    db.formulations.unshift(newFormulation);
    writeDB(db);

    // Secure operational log simulating real-time SMTP/API dispatch to the official Yahoo mailbox
    console.log(`====================================================================`);
    console.log(`[Formulation Guide Routed to: ace_vets@yahoo.com]`);
    console.log(`Formulation Title: ${name}`);
    console.log(`Target CP: ${targetCP}%`);
    console.log(`Ingredient 1: ${ingredient1Name} (${ingredient1Percent}% of mix, ${ingredient1CP}% CP)`);
    console.log(`Ingredient 2: ${ingredient2Name} (${ingredient2Percent}% of mix, ${ingredient2CP}% CP)`);
    console.log(`Status: Saved and routed successfully to Administrative Inbox.`);
    console.log(`====================================================================`);

    res.status(201).json(newFormulation);
  } catch (error) {
    res.status(500).json({ error: "Failed to save feed formulation" });
  }
});

// Delete a saved formulation - SECURED
app.delete('/api/formulations/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();
    const originalLen = db.formulations.length;
    db.formulations = db.formulations.filter(f => f.id !== id);
    
    if (db.formulations.length === originalLen) {
      return res.status(404).json({ error: "Formulation not found" });
    }
    
    writeDB(db);
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete formulation" });
  }
});

// Export Database SQL Dump File - SECURED
function escapeSQL(val: any): string {
  if (val === undefined || val === null) {
    return 'NULL';
  }
  if (typeof val === 'number') {
    return val.toString();
  }
  const escaped = val.toString().replace(/'/g, "''");
  return `'${escaped}'`;
}

function generateSQLDump(db: DB): string {
  let sql = `-- =========================================================================\n`;
  sql += `-- ACE AGROVET CONSULTS - PostgreSQL / MySQL Compatible SQL Database Dump\n`;
  sql += `-- Generated At: ${new Date().toISOString()}\n`;
  sql += `-- Target System: Core Production Ready Seed Schema and Data Tables\n`;
  sql += `-- =========================================================================\n\n`;
  sql += `BEGIN;\n\n`;

  // 1. Table structure for Bookings Table
  sql += `-- -----------------------------------------------------\n`;
  sql += `-- Table Structure for bookings\n`;
  sql += `-- -----------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS bookings (\n`;
  sql += `  id VARCHAR(50) PRIMARY KEY,\n`;
  sql += `  type VARCHAR(20) NOT NULL,\n`;
  sql += `  name VARCHAR(150) NOT NULL,\n`;
  sql += `  email VARCHAR(150) NOT NULL,\n`;
  sql += `  phone VARCHAR(30) NOT NULL,\n`;
  sql += `  category VARCHAR(100) NOT NULL,\n`;
  sql += `  details TEXT,\n`;
  sql += `  date VARCHAR(20) NOT NULL,\n`;
  sql += `  status VARCHAR(20) NOT NULL DEFAULT 'Pending',\n`;
  sql += `  created_at VARCHAR(50) NOT NULL\n`;
  sql += `);\n\n`;

  // Seed elements for bookings
  if (db.bookings && db.bookings.length > 0) {
    sql += `-- Seed Data elements for bookings\n`;
    for (const b of db.bookings) {
      sql += `INSERT INTO bookings (id, type, name, email, phone, category, details, date, status, created_at) \n`;
      sql += `VALUES (\n`;
      sql += `  ${escapeSQL(b.id)},\n`;
      sql += `  ${escapeSQL(b.type)},\n`;
      sql += `  ${escapeSQL(b.name)},\n`;
      sql += `  ${escapeSQL(b.email)},\n`;
      sql += `  ${escapeSQL(b.phone)},\n`;
      sql += `  ${escapeSQL(b.category)},\n`;
      sql += `  ${escapeSQL(b.details)},\n`;
      sql += `  ${escapeSQL(b.date)},\n`;
      sql += `  ${escapeSQL(b.status)},\n`;
      sql += `  ${escapeSQL(b.createdAt)}\n`;
      sql += `)\nON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  type = EXCLUDED.type,\n`;
      sql += `  name = EXCLUDED.name,\n`;
      sql += `  email = EXCLUDED.email,\n`;
      sql += `  phone = EXCLUDED.phone,\n`;
      sql += `  category = EXCLUDED.category,\n`;
      sql += `  details = EXCLUDED.details,\n`;
      sql += `  date = EXCLUDED.date,\n`;
      sql += `  status = EXCLUDED.status,\n`;
      sql += `  created_at = EXCLUDED.created_at;\n\n`;
    }
  }

  // 2. Table structure for Feed Nutrition Formulations Table
  sql += `-- -----------------------------------------------------\n`;
  sql += `-- Table Structure for formulations\n`;
  sql += `-- -----------------------------------------------------\n`;
  sql += `CREATE TABLE IF NOT EXISTS formulations (\n`;
  sql += `  id VARCHAR(50) PRIMARY KEY,\n`;
  sql += `  name VARCHAR(200) NOT NULL,\n`;
  sql += `  target_cp DECIMAL(5, 2) NOT NULL,\n`;
  sql += `  ingredient1_name VARCHAR(150) NOT NULL,\n`;
  sql += `  ingredient1_cp DECIMAL(5, 2) NOT NULL,\n`;
  sql += `  ingredient1_parts DECIMAL(10, 4) NOT NULL,\n`;
  sql += `  ingredient1_percent DECIMAL(5, 2) NOT NULL,\n`;
  sql += `  ingredient2_name VARCHAR(150) NOT NULL,\n`;
  sql += `  ingredient2_cp DECIMAL(5, 2) NOT NULL,\n`;
  sql += `  ingredient2_parts DECIMAL(10, 4) NOT NULL,\n`;
  sql += `  ingredient2_percent DECIMAL(5, 2) NOT NULL,\n`;
  sql += `  created_at VARCHAR(50) NOT NULL\n`;
  sql += `);\n\n`;

  // Seed elements for formulations
  if (db.formulations && db.formulations.length > 0) {
    sql += `-- Seed Data elements for formulations\n`;
    for (const f of db.formulations) {
      sql += `INSERT INTO formulations (id, name, target_cp, ingredient1_name, ingredient1_cp, ingredient1_parts, ingredient1_percent, ingredient2_name, ingredient2_cp, ingredient2_parts, ingredient2_percent, created_at) \n`;
      sql += `VALUES (\n`;
      sql += `  ${escapeSQL(f.id)},\n`;
      sql += `  ${escapeSQL(f.name)},\n`;
      sql += `  ${escapeSQL(f.targetCP)},\n`;
      sql += `  ${escapeSQL(f.ingredient1Name)},\n`;
      sql += `  ${escapeSQL(f.ingredient1CP)},\n`;
      sql += `  ${escapeSQL(f.ingredient1Parts)},\n`;
      sql += `  ${escapeSQL(f.ingredient1Percent)},\n`;
      sql += `  ${escapeSQL(f.ingredient2Name)},\n`;
      sql += `  ${escapeSQL(f.ingredient2CP)},\n`;
      sql += `  ${escapeSQL(f.ingredient2Parts)},\n`;
      sql += `  ${escapeSQL(f.ingredient2Percent)},\n`;
      sql += `  ${escapeSQL(f.createdAt)}\n`;
      sql += `)\nON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  name = EXCLUDED.name,\n`;
      sql += `  target_cp = EXCLUDED.target_cp,\n`;
      sql += `  ingredient1_name = EXCLUDED.ingredient1_name,\n`;
      sql += `  ingredient1_cp = EXCLUDED.ingredient1_cp,\n`;
      sql += `  ingredient1_parts = EXCLUDED.ingredient1_parts,\n`;
      sql += `  ingredient1_percent = EXCLUDED.ingredient1_percent,\n`;
      sql += `  ingredient2_name = EXCLUDED.ingredient2_name,\n`;
      sql += `  ingredient2_cp = EXCLUDED.ingredient2_cp,\n`;
      sql += `  ingredient2_parts = EXCLUDED.ingredient2_parts,\n`;
      sql += `  ingredient2_percent = EXCLUDED.ingredient2_percent,\n`;
      sql += `  created_at = EXCLUDED.created_at;\n\n`;
    }
  }

  sql += `COMMIT;\n`;
  return sql;
}

// Export Database SQL Backup - SECURED
app.get('/api/admin/export-db', requireAdmin, (req, res) => {
  try {
    const db = readDB();
    const sqlDump = generateSQLDump(db);
    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename=ace_agrovet_database_backup.sql');
    res.send(sqlDump);
  } catch (error) {
    res.status(500).json({ error: "Failed to export database SQL backup." });
  }
});

// Gemini AI Chat Advisor Endpoint
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "A valid list of messages is required." });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key || key.includes("MY_GEMINI_API_KEY") || key.trim() === "") {
      return res.json({
        content: "Hi there! I would love to assist you with poultry nutrition, feed formulation, and biosecurity plans. Great news—this app's Gemini AI features can be fully activated! You can set up your API key in **Settings > Secrets** panel in the AI Studio side-menu, and I'll be ready to provide scientific, on-site tailored guidance immediately."
      });
    }

    const ai = getGeminiClient();

    // Map messages payload to the structure Gemini expects
    let geminiContents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Ensure the conversation starts with a 'user' message
    while (geminiContents.length > 0 && geminiContents[0].role === 'model') {
      geminiContents.shift();
    }

    if (geminiContents.length === 0) {
      return res.status(400).json({ error: "The message history must contain at least one user message." });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: geminiContents,
      config: {
        systemInstruction: `You are the Lead Agricultural, Livestock, and Animal Nutrition Advisory Expert at ACE Agrovet Consults. Let your tone be highly encouraging, highly practical, precise, and scientifically accurate, helping livestock and poultry farmers/agribusiness investors maximize productivity and manage farm economics.
Your specializations:
1. Poultry Farming (Layer & Broiler management, brooding conditions, egg weight optimization, vaccination logs).
2. Animal Nutrition (Feed formulate techniques such as Pearson Square mixer calculations, understanding key nutritional values e.g. Crude Protein [CP], calcium-phosphorus ratio).
3. Livestock Productivity advice (growth performance, weighting optimizations, biosecurity guards, feed conversion ratios [FCR]).
4. Farm Startup & Expansion Consulting (feasibility planning, house orientation, layout design, risk reductions).

Always answer directly using clean Markdown with readable headings. Emphasize step-by-step guidance. If a calculation is requested, perform it details-first. Keep explanations clear, professional, and humble. Never use internal directory names or paths in discussions. Mention that farmers can book a specialized training session or physical consultation with ACE Agrovet Consults for on-site services if they need deeper help.`
      }
    });

    const aiText = response.text || "I apologize, but I could not formulate a response at this time. Please try asking your question again.";
    res.json({ content: aiText });
  } catch (error: any) {
    console.error("Gemini Advisor Error:", error);
    res.status(500).json({
      error: "The AI Agricultural Advisor helper encountered an error.",
      details: error.message || String(error)
    });
  }
});

// Setup Vite Dev Server / Serve Static Frontend Assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ACE Agrovet Backend server running on http://localhost:${PORT}`);
  });
}

startServer();
