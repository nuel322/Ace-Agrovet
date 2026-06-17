import React, { useState, useEffect } from 'react';
import { Settings2, BookOpen, Calculator, Trash2, CheckCircle2, Loader2, RefreshCw, Eye, Calendar, Phone, Mail, HelpCircle, Download } from 'lucide-react';
import { Booking, FeedFormulation } from '../types';
import { getBookings, updateBookingStatus, deleteBooking, getFormulations, deleteFormulation, getDatabaseExportSQL } from '../lib/storage';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AdminPanel() {
  const [subTab, setSubTab] = useState<'bookings' | 'formulations'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formulations, setFormulations] = useState<FeedFormulation[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [downloadingDb, setDownloadingDb] = useState(false);

  // Expanded row details for notes
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const bData = await getBookings();
      const fData = await getFormulations();
      setBookings(bData);
      setFormulations(fData);
    } catch (error) {
      console.error("Error loaded administrative data", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Booking['status']) => {
    setActioningId(id);
    try {
      const updated = await updateBookingStatus(id, newStatus);
      if (updated) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        if (selectedBooking?.id === id) {
          setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActioningId(null);
    }
  };

  const handleDeleteBooking = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this enrollment/consultation record?')) return;
    setActioningId(id);
    try {
      const success = await deleteBooking(id);
      if (success) {
        setBookings(prev => prev.filter(b => b.id !== id));
        if (selectedBooking?.id === id) setSelectedBooking(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActioningId(null);
    }
  };

  const handleDeleteFormulation = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this nutrition formulation guide?')) return;
    setActioningId(id);
    try {
      const success = await deleteFormulation(id);
      if (success) {
        setFormulations(prev => prev.filter(f => f.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActioningId(null);
    }
  };

  const handleDownloadDatabase = async () => {
    setDownloadingDb(true);
    try {
      const sqlContent = getDatabaseExportSQL();
      const blob = new Blob([sqlContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ace_agrovet_database_backup_${new Date().toISOString().split('T')[0]}.sql`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Error downloading database file.');
    } finally {
      setDownloadingDb(false);
    }
  };

  return (
    <div id="admin-panel-container" className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Sidebar Control Deck */}
      <div className="xl:col-span-3 space-y-4">
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
          <h3 className="text-sm font-bold tracking-widest uppercase text-indigo-400 mb-1 flex items-center gap-1.5">
            <Settings2 className="h-4 w-4" />
            Control Center
          </h3>
          <p className="text-xs text-slate-400 leading-normal">
            Manage ACE AGROVET's consultation bookings and feed formulation recipes seamlessly.
          </p>

          {/* Database Connection Status Indicator */}
          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Database Engine
              </span>
              <p className="text-xs font-semibold text-white">
                {isSupabaseConfigured ? 'Supabase cloud db' : 'local storage backup'}
              </p>
            </div>
            {isSupabaseConfigured ? (
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Active and Connected
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-[9px] font-bold text-amber-400 uppercase tracking-widest">
                <span className="relative flex h-1.5 w-1.5 bg-amber-500 rounded-full"></span>
                Fallback Active
              </span>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <button
              id="admin-subtab-bookings"
              onClick={() => setSubTab('bookings')}
              className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                subTab === 'bookings'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Registrations
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${subTab === 'bookings' ? 'bg-emerald-850 text-emerald-100' : 'bg-slate-850 text-slate-400'}`}>
                {bookings.length}
              </span>
            </button>

            <button
              id="admin-subtab-formulations"
              onClick={() => setSubTab('formulations')}
              className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                subTab === 'formulations'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Saved Formulations
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${subTab === 'formulations' ? 'bg-emerald-850 text-emerald-100' : 'bg-slate-850 text-slate-400'}`}>
                {formulations.length}
              </span>
            </button>
          </div>

          <div className="h-px bg-slate-800 my-4"></div>

          <button
            id="admin-btn-refresh"
            onClick={fetchData}
            disabled={refreshing}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-white rounded-lg border border-slate-700/60 cursor-pointer transition-colors"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Reloading...' : 'Reload Server Data'}
          </button>

          <div className="h-px bg-slate-800 my-4"></div>

          <button
            id="admin-btn-export-db"
            onClick={handleDownloadDatabase}
            disabled={downloadingDb}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer transition-all border border-indigo-500 shadow-md active:scale-98"
          >
            {downloadingDb ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Downloading Core...</span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                <span>Download Database Backup</span>
              </>
            )}
          </button>
        </div>

        {/* Selected Row Detail Panel */}
        {subTab === 'bookings' && selectedBooking && (
          <div id="booking-detail-inspector" className="bg-white border border-indigo-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase rounded-md mb-2 ${
                selectedBooking.type === 'consulting' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                {selectedBooking.type === 'consulting' ? 'Expert Advisory' : 'Capacity Training'}
              </span>
              <h4 className="font-bold text-slate-900 text-base">{selectedBooking.name}</h4>
              <p className="text-slate-500 font-medium text-xs mt-0.5">{selectedBooking.category}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Date: {selectedBooking.date}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>Phone: {selectedBooking.phone}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>Email: {selectedBooking.email}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/50">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Client Farm Notes / Details
              </span>
              <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-wrap">{selectedBooking.details || 'No additional details provided.'}</p>
            </div>

            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Update Request Status
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['Pending', 'Approved', 'Completed'] as const).map((st) => (
                  <button
                    key={st}
                    id={`status-select-${st}`}
                    onClick={() => handleUpdateStatus(selectedBooking.id, st)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedBooking.status === st
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Table Display */}
      <div id="admin-main-table-panel" className="xl:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 h-96">
            <Loader2 className="h-10 w-10 text-emerald-600 animate-spin mb-3" />
            <span className="text-slate-500 text-sm font-semibold">Contacting ACE regional databases...</span>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 capitalize">
                  {subTab === 'bookings' ? 'Enrollment & Consultation Desk' : 'Animal Feed Recipe Guide Registry'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {subTab === 'bookings' ? bookings.length : formulations.length} total entries compiled locally.
                </p>
              </div>
            </div>

            {subTab === 'bookings' ? (
              /* Bookings Table */
              bookings.length === 0 ? (
                <div id="no-bookings-notice" className="text-center py-20 bg-slate-50 rounded-xl border border-slate-150">
                  <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm font-medium">No registrations received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider bg-slate-50/50">
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Category / program</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.map((booking) => {
                        const isSelected = selectedBooking?.id === booking.id;
                        return (
                          <tr
                            key={booking.id}
                            id={`booking-row-${booking.id}`}
                            onClick={() => setSelectedBooking(booking)}
                            className={`hover:bg-slate-50/70 transition-colors cursor-pointer ${
                              isSelected ? 'bg-indigo-50/40 hover:bg-indigo-50/40' : ''
                            }`}
                          >
                            <td className="py-3 px-4">
                              <span className="block font-bold text-slate-900 leading-tight">{booking.name}</span>
                              <span className="block text-[11px] text-slate-400 font-mono">{booking.phone}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                                booking.type === 'consulting' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {booking.type === 'consulting' ? 'Advisory' : 'Training'}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-700 text-xs">
                              {booking.category}
                            </td>
                            <td className="py-3 px-4 text-xs font-mono text-slate-500">
                              {booking.date}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                                booking.status === 'Completed'
                                  ? 'text-emerald-700'
                                  : booking.status === 'Approved'
                                    ? 'text-blue-700'
                                    : 'text-amber-700'
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${
                                  booking.status === 'Completed'
                                    ? 'bg-emerald-500'
                                    : booking.status === 'Approved'
                                      ? 'bg-blue-500'
                                      : 'bg-amber-500'
                                }`}></span>
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex justify-end gap-1.5">
                                <button
                                  type="button"
                                  id={`btn-view-${booking.id}`}
                                  onClick={() => setSelectedBooking(booking)}
                                  className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
                                  title="Inspect details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  id={`btn-delete-${booking.id}`}
                                  onClick={(e) => handleDeleteBooking(booking.id, e)}
                                  className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              /* Formulations Table */
              formulations.length === 0 ? (
                <div id="no-formulas-notice" className="text-center py-20 bg-slate-50 rounded-xl border border-slate-150">
                  <Calculator className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm font-medium">No saved feed mixes documented.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formulations.map((f) => (
                    <div
                      key={f.id}
                      id={`formulation-card-${f.id}`}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-950 text-sm leading-tight">{f.name}</h4>
                          <button
                            type="button"
                            id={`btn-del-formula-${f.id}`}
                            onClick={() => handleDeleteFormulation(f.id)}
                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-200/50 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold mb-4 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
                          <span>Target: {f.targetCP}% CP</span>
                        </div>

                        {/* Ratios block */}
                        <div className="space-y-3 text-xs">
                          {/* Ingredient 1 representation */}
                          <div>
                            <div className="flex justify-between font-medium text-slate-700">
                              <span>{f.ingredient1Name} ({f.ingredient1CP}% CP)</span>
                              <span className="font-bold">{f.ingredient1Percent.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-emerald-500 h-full" style={{ width: `${f.ingredient1Percent}%` }}></div>
                            </div>
                          </div>

                          {/* Ingredient 2 representation */}
                          <div>
                            <div className="flex justify-between font-medium text-slate-700">
                              <span>{f.ingredient2Name} ({f.ingredient2CP}% CP)</span>
                              <span className="font-bold">{f.ingredient2Percent.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                              <div className="bg-indigo-500 h-full" style={{ width: `${f.ingredient2Percent}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-slate-200 my-3"></div>
                      <span className="text-[9px] font-mono font-semibold text-slate-400">
                        Saved: {new Date(f.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
