import { Booking, FeedFormulation } from '../types';

// Default Seed Data for Bookings
const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'book-1',
    type: 'training',
    name: 'Oche Emmanuel',
    email: 'oche.emmanuel@gmail.com',
    phone: '08023456789',
    category: 'Broiler Production Mastery',
    details: 'Experience Level: Intermediate. Looking to expand to 2,000 birds.',
    date: '2026-06-25',
    status: 'Approved',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'book-2',
    type: 'consulting',
    name: 'Grace Alao',
    email: 'grace.alao@yahoo.com',
    phone: '07034567812',
    category: 'Farm Establishment',
    details: 'Looking to set up a brand new automated poultry farm layout in Benue.',
    date: '2026-06-28',
    status: 'Pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'book-3',
    type: 'consulting',
    name: 'Chinedu Okafor',
    email: 'chinedu.okafor@gmail.com',
    phone: '08145678912',
    category: 'Livestock Diagnostics',
    details: 'Completed professional bio-security audit and floor disinfectant checks.',
    date: '2026-06-12',
    status: 'Completed',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Default Seed Data for Feed Formulations
const DEFAULT_FORMULATIONS: FeedFormulation[] = [
  {
    id: 'form-1',
    name: 'Broiler Starter Premium Ratios',
    targetCP: 22,
    ingredient1Name: 'Maize (White)',
    ingredient1CP: 9,
    ingredient1Parts: 22,
    ingredient1Percent: 62.86,
    ingredient2Name: 'Soybean Meal',
    ingredient2CP: 44,
    ingredient2Parts: 13,
    ingredient2Percent: 37.14,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'form-2',
    name: 'Standard Layer Compound Feed',
    targetCP: 18,
    ingredient1Name: 'Yellow Maize',
    ingredient1CP: 9,
    ingredient1Parts: 26,
    ingredient1Percent: 74.29,
    ingredient2Name: 'Groundnut Cake (GNC)',
    ingredient2CP: 44,
    ingredient2Parts: 9,
    ingredient2Percent: 25.71,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Helper to initialize storage
const initStorage = () => {
  if (!localStorage.getItem('ace_bookings')) {
    localStorage.setItem('ace_bookings', JSON.stringify(DEFAULT_BOOKINGS));
  }
  if (!localStorage.getItem('ace_formulations')) {
    localStorage.setItem('ace_formulations', JSON.stringify(DEFAULT_FORMULATIONS));
  }
};

export const getBookings = (): Booking[] => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem('ace_bookings') || '[]');
  } catch (e) {
    return [];
  }
};

export const addBooking = (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking => {
  initStorage();
  const bookings = getBookings();
  const newBooking: Booking = {
    ...bookingData,
    id: 'book-' + Math.random().toString(36).substr(2, 9),
    status: 'Pending',
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  localStorage.setItem('ace_bookings', JSON.stringify(bookings));
  return newBooking;
};

export const updateBookingStatus = (id: string, status: Booking['status']): Booking | null => {
  initStorage();
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    localStorage.setItem('ace_bookings', JSON.stringify(bookings));
    return bookings[idx];
  }
  return null;
};

export const deleteBooking = (id: string): boolean => {
  initStorage();
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  if (filtered.length !== bookings.length) {
    localStorage.setItem('ace_bookings', JSON.stringify(filtered));
    return true;
  }
  return false;
};

export const getFormulations = (): FeedFormulation[] => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem('ace_formulations') || '[]');
  } catch (e) {
    return [];
  }
};

export const addFormulation = (formulationData: Omit<FeedFormulation, 'id' | 'createdAt'>): FeedFormulation => {
  initStorage();
  const formulations = getFormulations();
  const newFormulation: FeedFormulation = {
    ...formulationData,
    id: 'form-' + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  formulations.push(newFormulation);
  localStorage.setItem('ace_formulations', JSON.stringify(formulations));
  return newFormulation;
};

export const deleteFormulation = (id: string): boolean => {
  initStorage();
  const formulations = getFormulations();
  const filtered = formulations.filter(f => f.id !== id);
  if (filtered.length !== formulations.length) {
    localStorage.setItem('ace_formulations', JSON.stringify(filtered));
    return true;
  }
  return false;
};

// Returns a synthetic SQL file string representing standard insert queries
export const getDatabaseExportSQL = (): string => {
  const bookings = getBookings();
  const formulations = getFormulations();
  
  let sql = `-- ACE Agrovet Consults Local Database Schema & Backup Dump\n`;
  sql += `-- Export Date: ${new Date().toISOString()}\n\n`;
  
  sql += `CREATE TABLE IF NOT EXISTS bookings (\n`;
  sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
  sql += `  type VARCHAR(50),\n`;
  sql += `  name VARCHAR(255),\n`;
  sql += `  email VARCHAR(255),\n`;
  sql += `  phone VARCHAR(100),\n`;
  sql += `  category VARCHAR(255),\n`;
  sql += `  details TEXT,\n`;
  sql += `  date VARCHAR(100),\n`;
  sql += `  status VARCHAR(50),\n`;
  sql += `  created_at TIMESTAMP\n`;
  sql += `);\n\n`;
  
  bookings.forEach(b => {
    sql += `INSERT INTO bookings (id, type, name, email, phone, category, details, date, status, created_at) VALUES (\n`;
    sql += `  '${b.id}', '${b.type}', '${b.name.replace(/'/g, "''")}', '${b.email}', '${b.phone}', `;
    sql += `'${b.category.replace(/'/g, "''")}', '${b.details.replace(/'/g, "''")}', '${b.date}', '${b.status}', '${b.createdAt}'\n`;
    sql += `);\n`;
  });
  
  sql += `\nCREATE TABLE IF NOT EXISTS formulations (\n`;
  sql += `  id VARCHAR(255) PRIMARY KEY,\n`;
  sql += `  name VARCHAR(255),\n`;
  sql += `  target_cp NUMERIC,\n`;
  sql += `  ingredient1_name VARCHAR(255),\n`;
  sql += `  ingredient1_cp NUMERIC,\n`;
  sql += `  ingredient1_parts NUMERIC,\n`;
  sql += `  ingredient1_percent NUMERIC,\n`;
  sql += `  ingredient2_name VARCHAR(255),\n`;
  sql += `  ingredient2_cp NUMERIC,\n`;
  sql += `  ingredient2_parts NUMERIC,\n`;
  sql += `  ingredient2_percent NUMERIC,\n`;
  sql += `  created_at TIMESTAMP\n`;
  sql += `);\n\n`;
  
  formulations.forEach(f => {
    sql += `INSERT INTO formulations (id, name, target_cp, ingredient1_name, ingredient1_cp, ingredient1_parts, ingredient1_percent, ingredient2_name, ingredient2_cp, ingredient2_parts, ingredient2_percent, created_at) VALUES (\n`;
    sql += `  '${f.id}', '${f.name.replace(/'/g, "''")}', ${f.targetCP}, '${f.ingredient1Name.replace(/'/g, "''")}', ${f.ingredient1CP}, ${f.ingredient1Parts}, ${f.ingredient1Percent}, `;
    sql += `'${f.ingredient2Name.replace(/'/g, "''")}', ${f.ingredient2CP}, ${f.ingredient2Parts}, ${f.ingredient2Percent}, '${f.createdAt}'\n`;
    sql += `);\n`;
  });
  
  return sql;
};
