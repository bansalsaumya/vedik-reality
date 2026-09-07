import React, { useState } from 'react';
import { Download, X, CheckCircle2, FileText, Lock, Sparkles, Building2, Phone, Mail, User } from 'lucide-react';

export default function BrochureDownloadModal({ isOpen, onClose, propertyOrProjectTitle = "Anandam Awaas Sector 19 Brochure & Price List" }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', project: propertyOrProjectTitle });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save lead to local submissions or backend API
    const existingLeads = JSON.parse(localStorage.getItem('vedik_leads') || '[]');
    const newLead = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      project: formData.project,
      type: 'Brochure Download Request',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    localStorage.setItem('vedik_leads', JSON.stringify([newLead, ...existingLeads]));

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger automatic sample PDF download after 1 second
      setTimeout(() => {
        const dummyPdfContent = `VEDIK REALITY - OFFICIAL BROCHURE & PRICE LIST\n\nProject: ${formData.project}\nLocation: Sector 19, Dharuhera, Haryana - 123106\nOwners: Deepak Lamba & Manish\nContact: +91 90538 48222 / +91 97282 95353\nEmail: info.vedikrealty@gmail.com\n\nThank you ${formData.name} for downloading! Our luxury plot specialists will contact you shortly with custom investment plans.`;
        
        const blob = new Blob([dummyPdfContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Vedik-Reality-Brochure-${formData.project.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-warm-ivory rounded-3xl shadow-2xl border border-amber-500/20 overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header decoration banner */}
        <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 p-6 text-cream-100 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-cream-300 hover:text-amber-400 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Instant Free Download
          </div>
          <h3 className="text-xl font-bold font-serif text-amber-300">Download E-Brochure & Detailed Rate List</h3>
          <p className="text-xs text-cream-300/80 mt-1">{propertyOrProjectTitle}</p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-charcoal-600 leading-relaxed font-sans mb-4">
                Enter your details to get the official high-resolution brochure, master layout plan, and current sector price list instantly.
              </p>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-charcoal-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">Phone / WhatsApp Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-charcoal-400" />
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-charcoal-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com (optional)"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-charcoal-200 rounded-xl text-charcoal-900 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-charcoal-950 font-bold text-sm rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Download Link...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                      <span>Download Brochure & Price Sheet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-500 pt-1">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>100% Privacy Protected. No Spam.</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif text-charcoal-900">Brochure Download Started!</h4>
              <p className="text-xs text-charcoal-600 leading-relaxed max-w-sm mx-auto">
                Thank you <strong className="text-charcoal-900">{formData.name}</strong>! Your download has commenced automatically. Our investment experts (Deepak Lamba & Manish) are also available on WhatsApp for instant inquiries.
              </p>
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-charcoal-900 text-cream-100 rounded-xl text-xs font-semibold hover:bg-charcoal-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
