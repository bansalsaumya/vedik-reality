import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building, Users, PhoneCall, TrendingUp, ShieldCheck, Plus, Trash2, Edit,
  CheckCircle2, XCircle, LogOut, Settings, MapPin, Eye, FileText, Layers, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { admin, token, logout } = useAuth();
  const { settings, fetchSettings } = useSettings();

  const [activeTab, setActiveTab] = useState('overview'); // overview, properties, projects, leads, locations, settings
  const [metrics, setMetrics] = useState(null);
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Property Form Modal state
  const [propertyModal, setPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [propForm, setPropForm] = useState({
    title: '', type: 'Apartment', category: 'Sale', price: '', price_numeric: 0,
    location: '', address: '', bhk: '', area: '', status: 'Available', is_featured: false,
    description: '', rera_number: '', builder_name: '', images: '', amenities: ''
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({});

  useEffect(() => {
    if (!loading && (!token || !admin)) {
      navigate('/admin/login', { replace: true });
      return;
    }
    if (token) {
      loadDashboardData();
    }
  }, [token, admin, loading]);


  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [mRes, pRes, prRes, lRes, locRes] = await Promise.all([
        fetch('/api/analytics/metrics', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/properties?limit=100'),
        fetch('/api/projects'),
        fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/locations')
      ]);

      const mData = await mRes.json();
      const pData = await pRes.json();
      const prData = await prRes.json();
      const lData = await lRes.json();
      const locData = await locRes.json();

      if (mData.metrics) setMetrics(mData);
      if (pData.properties) setProperties(pData.properties);
      if (prData.projects) setProjects(prData.projects);
      if (lData.leads) setLeads(lData.leads);
      if (locData.locations) setLocations(locData.locations);

      setSettingsForm(settings);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Property CRUD handlers
  const handleOpenAddProperty = () => {
    setEditingProperty(null);
    setPropForm({
      title: '', type: 'Apartment', category: 'Sale', price: '₹ ', price_numeric: 0,
      location: 'Golf Course Road, Gurgaon', address: '', bhk: '4 BHK', area: '3,500 Sq.Ft.',
      status: 'Available', is_featured: false, description: '', rera_number: '', builder_name: '',
      images: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Swimming Pool, Gym, Clubhouse, Private Elevator, 24x7 Security'
    });
    setPropertyModal(true);
  };

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    const imagesArr = propForm.images.split(',').map(s => s.trim()).filter(Boolean);
    const amenArr = propForm.amenities.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      ...propForm,
      images: imagesArr,
      amenities: amenArr
    };

    const url = editingProperty ? `/api/properties/${editingProperty.id}` : '/api/properties';
    const method = editingProperty ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setPropertyModal(false);
        loadDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;
    try {
      await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Lead status update
  const handleUpdateLeadStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        alert('Website Settings updated successfully!');
        fetchSettings();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-charcoal-950 text-slate-100">
      
      {/* Top Header Bar */}
      <div className="bg-charcoal-900 border-b border-gold-500/20 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 font-bold">
              V
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold">Vedik Management Console</h2>
              <p className="text-[11px] text-slate-400">Logged in as {admin?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={loadDashboardData}
              className="p-2 rounded-xl bg-charcoal-800 text-slate-300 hover:text-gold-400 border border-slate-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 text-red-300 border border-red-500/30 text-xs font-semibold hover:bg-red-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
          {[
            { id: 'overview', label: 'Analytics Overview', icon: TrendingUp },
            { id: 'properties', label: `Properties (${properties.length})`, icon: Building },
            { id: 'leads', label: `Leads CRM (${leads.length})`, icon: Users },
            { id: 'projects', label: `Projects (${projects.length})`, icon: Layers },
            { id: 'settings', label: 'Website Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-colors shrink-0 ${
                  isActive
                    ? 'bg-gold-500 text-charcoal-950 shadow-lg font-bold'
                    : 'bg-charcoal-900 text-slate-300 hover:bg-charcoal-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview Analytics */}
        {activeTab === 'overview' && metrics && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Total Properties</span>
                <span className="font-serif text-3xl font-bold text-gold-400">{metrics.metrics.totalProperties}</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Total Enquiries</span>
                <span className="font-serif text-3xl font-bold text-emerald-400">{metrics.metrics.totalLeads}</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">New Unread Leads</span>
                <span className="font-serif text-3xl font-bold text-amber-400">{metrics.metrics.newLeads}</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">WhatsApp Clicks</span>
                <span className="font-serif text-3xl font-bold text-teal-400">{metrics.metrics.whatsappClicks}</span>
              </div>
            </div>

            {/* Most Viewed Properties Table */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <h3 className="font-serif text-lg font-bold mb-4">Most Viewed Properties</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-slate-400 border-b border-slate-800 uppercase">
                    <tr>
                      <th className="py-2.5">Title</th>
                      <th className="py-2.5">Location</th>
                      <th className="py-2.5">Price</th>
                      <th className="py-2.5 text-right">Views</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {metrics.mostViewed.map(item => (
                      <tr key={item.id} className="hover:bg-charcoal-900/50">
                        <td className="py-3 font-semibold text-slate-200">{item.title}</td>
                        <td className="py-3 text-slate-400">{item.location}</td>
                        <td className="py-3 text-gold-400 font-serif font-bold">{item.price}</td>
                        <td className="py-3 text-right text-slate-200 font-bold">{item.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Properties Management */}
        {activeTab === 'properties' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold">Property Listings ({properties.length})</h3>
              <button
                onClick={handleOpenAddProperty}
                className="gold-button px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="glass-card rounded-2xl border border-slate-800 overflow-x-auto shadow-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-charcoal-900 text-slate-400 border-b border-slate-800 uppercase">
                  <tr>
                    <th className="p-4">Property</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {properties.map(p => (
                    <tr key={p.id} className="hover:bg-charcoal-900/40">
                      <td className="p-4 font-semibold text-slate-100">{p.title}</td>
                      <td className="p-4 text-slate-400">{p.location}</td>
                      <td className="p-4 text-gold-400">{p.type}</td>
                      <td className="p-4 font-serif font-bold text-slate-200">{p.price}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleDeleteProperty(p.id)}
                          className="p-1.5 rounded-lg bg-red-950 text-red-400 border border-red-500/30 hover:bg-red-900"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Leads Management CRM Pipeline */}
        {activeTab === 'leads' && (
          <div className="mt-8 space-y-6">
            <h3 className="font-serif text-xl font-bold">Enquiry Lead Pipeline ({leads.length})</h3>

            <div className="glass-card rounded-2xl border border-slate-800 overflow-x-auto shadow-2xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-charcoal-900 text-slate-400 border-b border-slate-800 uppercase">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Phone / WhatsApp</th>
                    <th className="p-4">Property Interest</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Status Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-charcoal-900/40">
                      <td className="p-4 text-slate-400">{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td className="p-4 font-bold text-slate-100">{lead.name}</td>
                      <td className="p-4 font-mono text-gold-400">
                        <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                      </td>
                      <td className="p-4 text-slate-300">{lead.property_title || 'General'}</td>
                      <td className="p-4 text-slate-400">{lead.source}</td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                          className="bg-charcoal-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="INTERESTED">INTERESTED</option>
                          <option value="FOLLOW-UP">FOLLOW-UP</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="NOT INTERESTED">NOT INTERESTED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Website Settings */}
        {activeTab === 'settings' && (
          <div className="mt-8 max-w-3xl glass-panel p-8 rounded-3xl border border-gold-500/30 space-y-6">
            <h3 className="font-serif text-2xl font-bold">Manage Business Info & Social Links</h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  value={settingsForm.business_name || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, business_name: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.phone || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number (e.g. 919876543210)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Office Address</label>
                <input
                  type="text"
                  value={settingsForm.address || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 focus:border-gold-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="gold-button px-6 py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg mt-4"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Property Modal */}
      {propertyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold-500/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="font-serif text-2xl font-bold">Add Luxury Property</h3>

            <form onSubmit={handleSaveProperty} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={propForm.title}
                  onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Asset Type</label>
                  <select
                    value={propForm.type}
                    onChange={(e) => setPropForm({ ...propForm, type: e.target.value })}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Price Text *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹ 4.50 Cr"
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location Corridor</label>
                  <input
                    type="text"
                    value={propForm.location}
                    onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Super Area</label>
                  <input
                    type="text"
                    value={propForm.area}
                    onChange={(e) => setPropForm({ ...propForm, area: e.target.value })}
                    className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows="3"
                  value={propForm.description}
                  onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URLs (comma separated)</label>
                <textarea
                  rows="2"
                  value={propForm.images}
                  onChange={(e) => setPropForm({ ...propForm, images: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button type="submit" className="gold-button px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider">
                  Save Property
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-charcoal-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
