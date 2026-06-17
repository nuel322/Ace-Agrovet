import { createClient } from '@supabase/supabase-js';
import { Booking, FeedFormulation } from '../types';

// Read configuration from environment variables (with a VITE_ prefix for client side)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ezmwjwoallzcnihbqxvw.supabase.co/rest/v1/';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6bXdqd29hbGx6Y25paGJxeHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MTE2NjMsImV4cCI6MjA5NzI4NzY2M30.HAMTX2j4RdBvJSTor4HWQVaTVCaW2i2MpdlpykLqbAc';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Initialize Supabase Client if credentials are provided
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL Schema Script for Supabase Console Setup:
 * 
 * -- Create Bookings Table
 * create table if not exists bookings (
 *   id text primary key,
 *   type text not null,
 *   name text not null,
 *   email text not null,
 *   phone text not null,
 *   category text not null,
 *   details text,
 *   date text not null,
 *   status text not null check (status in ('Pending', 'Approved', 'Completed')) default 'Pending',
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Enable Row Level Security (RLS) for Bookings
 * alter table bookings enable row level security;
 * 
 * -- Allow public inserts (so users can book without logging in)
 * create policy "Allow public bookings inserts" on bookings
 *   for insert with check (true);
 * 
 * -- Allow public reads and administrative updates
 * create policy "Allow public bookings reads" on bookings
 *   for select using (true);
 * 
 * create policy "Allow bookings deletes" on bookings
 *   for delete using (true);
 * 
 * create policy "Allow bookings updates" on bookings
 *   for update using (true);
 * 
 * 
 * -- Create Formulations Table
 * create table if not exists formulations (
 *   id text primary key,
 *   name text not null,
 *   target_cp numeric not null,
 *   ingredient1_name text not null,
 *   ingredient1_cp numeric not null,
 *   ingredient1_parts numeric not null,
 *   ingredient1_percent numeric not null,
 *   ingredient2_name text not null,
 *   ingredient2_cp numeric not null,
 *   ingredient2_parts numeric not null,
 *   ingredient2_percent numeric not null,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Enable Row Level Security (RLS) for Formulations
 * alter table formulations enable row level security;
 * 
 * create policy "Allow public formulations select" on formulations
 *   for select using (true);
 * 
 * create policy "Allow public formulations insert" on formulations
 *   for insert with check (true);
 * 
 * create policy "Allow formulations deletes" on formulations
 *   for delete using (true);
 */

// Supabase helper functions for CRUD operations
export const supabaseService = {
  // --- Bookings Operations ---
  async getBookings(): Promise<Booking[]> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings from Supabase:', error);
      throw error;
    }

    return (data || []).map(b => ({
      id: b.id,
      type: b.type,
      name: b.name,
      email: b.email,
      phone: b.phone,
      category: b.category,
      details: b.details || '',
      date: b.date,
      status: b.status,
      createdAt: b.created_at
    }));
  },

  async insertBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const newBooking = {
      id: 'book-' + Math.random().toString(36).substr(2, 9),
      type: booking.type,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      category: booking.category,
      details: booking.details || '',
      date: booking.date,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([newBooking])
      .select();

    if (error) {
      console.error('Error inserting booking into Supabase:', error);
      throw error;
    }

    const inserted = data?.[0] || newBooking;
    return {
      id: inserted.id,
      type: inserted.type,
      name: inserted.name,
      email: inserted.email,
      phone: inserted.phone,
      category: inserted.category,
      details: inserted.details,
      date: inserted.date,
      status: inserted.status,
      createdAt: inserted.created_at
    };
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<boolean> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating booking status in Supabase:', error);
      return false;
    }
    return true;
  },

  async deleteBooking(id: string): Promise<boolean> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting booking from Supabase:', error);
      return false;
    }
    return true;
  },

  // --- Formulations Operations ---
  async getFormulations(): Promise<FeedFormulation[]> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const { data, error } = await supabase
      .from('formulations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching formulations from Supabase:', error);
      throw error;
    }

    return (data || []).map(f => ({
      id: f.id,
      name: f.name,
      targetCP: Number(f.target_cp),
      ingredient1Name: f.ingredient1_name,
      ingredient1CP: Number(f.ingredient1_cp),
      ingredient1Parts: Number(f.ingredient1_parts),
      ingredient1Percent: Number(f.ingredient1_percent),
      ingredient2Name: f.ingredient2_name,
      ingredient2CP: Number(f.ingredient2_cp),
      ingredient2Parts: Number(f.ingredient2_parts),
      ingredient2Percent: Number(f.ingredient2_percent),
      createdAt: f.created_at
    }));
  },

  async insertFormulation(formulation: Omit<FeedFormulation, 'id' | 'createdAt'>): Promise<FeedFormulation> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const newFormulation = {
      id: 'form-' + Math.random().toString(36).substr(2, 9),
      name: formulation.name,
      target_cp: formulation.targetCP,
      ingredient1_name: formulation.ingredient1Name,
      ingredient1_cp: formulation.ingredient1CP,
      ingredient1_parts: formulation.ingredient1Parts,
      ingredient1_percent: formulation.ingredient1Percent,
      ingredient2_name: formulation.ingredient2Name,
      ingredient2_cp: formulation.ingredient2CP,
      ingredient2_parts: formulation.ingredient2Parts,
      ingredient2_percent: formulation.ingredient2Percent,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('formulations')
      .insert([newFormulation])
      .select();

    if (error) {
      console.error('Error saving formulation to Supabase:', error);
      throw error;
    }

    const inserted = data?.[0] || newFormulation;
    return {
      id: inserted.id,
      name: inserted.name,
      targetCP: Number(inserted.target_cp),
      ingredient1Name: inserted.ingredient1_name,
      ingredient1CP: Number(inserted.ingredient1_cp),
      ingredient1Parts: Number(inserted.ingredient1_parts),
      ingredient1Percent: Number(inserted.ingredient1_percent),
      ingredient2Name: inserted.ingredient2_name,
      ingredient2CP: Number(inserted.ingredient2_cp),
      ingredient2Parts: Number(inserted.ingredient2_parts),
      ingredient2Percent: Number(inserted.ingredient2_percent),
      createdAt: inserted.created_at
    };
  },

  async deleteFormulation(id: string): Promise<boolean> {
    if (!supabase) throw new Error('Supabase client is not configured.');
    const { error } = await supabase
      .from('formulations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting formulation from Supabase:', error);
      return false;
    }
    return true;
  }
};
