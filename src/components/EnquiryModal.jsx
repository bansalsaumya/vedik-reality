import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, User, Building, MessageSquare, Loader2, ShieldCheck } from 'lucide-react';

export default function EnquiryModal({
  isOpen,
  onClose,
  propertyTitle = '',
  propertyId = null,
  source = 'Website Enquiry Form'
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    property_title: propertyTitle || '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide both your Name and Phone Number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          property_id: propertyId,
          source
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      setError('Network connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel p-6 md:p-8 rounded-3xl border border-gold-500/40 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-gold-400 p-1.5 rounded-full hover:bg-charcoal-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 px-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-100">Enquiry Received</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong className="text-gold-400">{formData.name}</strong>. Our senior luxury real estate advisor will contact you within 30 minutes.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="gold-button px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900 border border-gold-500/30 text-[11px] text-gold-400 font-semibold tracking-wider uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Advisory
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-100">
                {propertyTitle ? `Enquire: ${propertyTitle}` : 'Schedule Luxury Consultation'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill in your details below for private floor plans, pricing sheets, and site visits.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gold-500" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Roy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gold-500" /> Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gold-500" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Interested Property */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-gold-500" /> Interested Property / Requirement
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 BHK Golf Course Road / Villa"
                  value={formData.property_title}
                  onChange={(e) => setFormData({ ...formData, property_title: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-gold-500" /> Additional Requirements / Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Specify budget, preferred site visit date, or financing inquiries..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-4 shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <span>Submit Instant Request</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
