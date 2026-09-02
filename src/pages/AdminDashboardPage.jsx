import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building, Settings, LogOut, Search, Plus, Trash2, Edit3,
  Phone, Mail, CheckCircle2, ShieldCheck, Eye, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { admin, token, logout, loading: authLoading } = useAuth();
  const { settings, fetchSettings } = useSettings();

  const [activeTab, setActiveTab] = useState('leads'); // leads | properties | settings
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!token || !admin)) {
      navigate('/admin/login');
    }
  }, [authLoading, token, admin, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsRes, propsRes] = await Promise.all([
        fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/properties')
      ]);

      const leadsData = await leadsRes.json();
      const propsData = await propsRes.json();

      if (leadsData.leads) setLeads(leadsData.leads);
      if (propsData.properties) setProperties(propsData.properties);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="glass-panel p-6 rounded-3xl border border-borderlight bg-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950">
                ADMIN CRM PORTAL
              </span>
              <span className="text-xs text-slate-500 font-medium">Logged in as {admin?.email}</span>
            </div>
            <h1 className="font-serif text-2xl font-bold text-charcoal-800">Vedik Reality Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-cream hover:bg-sand border border-borderlight text-charcoal-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-gold-700" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-3 border-b border-borderlight pb-3">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'leads' ? 'gold-button shadow-md' : 'bg-white border border-borderlight text-charcoal-800 hover:border-gold-500'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads CRM ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'properties' ? 'gold-button shadow-md' : 'bg-white border border-borderlight text-charcoal-800 hover:border-gold-500'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Properties ({properties.length})</span>
          </button>
        </div>

        {/* Leads CRM Table */}
        {activeTab === 'leads' && (
          <div className="glass-card rounded-2xl border border-borderlight bg-white overflow-hidden shadow-sm">
            <div className="p-5 border-b border-borderlight flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-charcoal-800">Inbound Inquiry Pipeline</h3>
              <span className="text-xs text-slate-500 font-semibold">{leads.length} Active Leads</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream border-b border-borderlight uppercase tracking-wider text-slate-600 font-bold">
                  <tr>
                    <th className="p-4">Lead Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Inquiry / Property</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Pipeline Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderlight text-charcoal-800 font-medium">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-ivory/50 transition-colors">
                      <td className="p-4 font-bold text-charcoal-800">
                        {lead.name}
                        {lead.source && <span className="block text-[10px] text-slate-500 font-normal">{lead.source}</span>}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-charcoal-800">{lead.phone}</div>
                        {lead.email && <div className="text-[11px] text-slate-500">{lead.email}</div>}
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="font-semibold text-gold-700">{lead.property_title || 'General Consultation'}</div>
                        {lead.message && <div className="text-[11px] text-slate-500 truncate">{lead.message}</div>}
                      </td>
                      <td className="p-4 text-slate-500 whitespace-nowrap">
                        {new Date(lead.created_at || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status || 'NEW'}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="bg-white border border-borderlight rounded-lg px-2.5 py-1 text-xs font-bold text-charcoal-800 focus:border-gold-500 focus:outline-none custom-select"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="INTERESTED">INTERESTED</option>
                          <option value="FOLLOW-UP">FOLLOW-UP</option>
                          <option value="CONVERTED">CONVERTED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Properties Table */}
        {activeTab === 'properties' && (
          <div className="glass-card rounded-2xl border border-borderlight bg-white overflow-hidden shadow-sm">
            <div className="p-5 border-b border-borderlight flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-charcoal-800">Live Inventory Listings</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cream border-b border-borderlight uppercase tracking-wider text-slate-600 font-bold">
                  <tr>
                    <th className="p-4">Property</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Type / BHK</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderlight text-charcoal-800 font-medium">
                  {properties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-ivory/50 transition-colors">
                      <td className="p-4 font-bold text-charcoal-800">{prop.title}</td>
                      <td className="p-4 text-slate-600">{prop.location}</td>
                      <td className="p-4 text-gold-700 font-semibold">{prop.type} - {prop.bhk}</td>
                      <td className="p-4 font-serif font-bold text-charcoal-800">{prop.price}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cream border border-borderlight text-charcoal-800">
                          {prop.status || 'Available'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
