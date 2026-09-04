import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Contact Us Page' })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-ivory text-charcoal-800 font-sans">
      <SEO
        title="Contact Vedik Reality | Property Dealer in Sector 19 Dharuhera"
        description="Contact Vedik Reality at First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana – 123106. Expert property consultation for plots, flats & commercial properties."
        keywords="Contact Property Dealer Dharuhera, Real Estate Agent Near Anandam Awaas, Sector 19 Dharuhera, Property Consultant Near Sector 19 Dharuhera, Dharuhera Haryana"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <Phone className="w-3.5 h-3.5" /> Real Estate Desk Dharuhera
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Contact Real Estate Consultant in <span className="gold-gradient-text font-serif">Dharuhera</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium max-w-xl">
            Schedule a site visit, inquire about residential plots, 2 BHK / 3 BHK flats, or commercial property investment with Vedik Reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details Card */}
          <div className="glass-card p-8 rounded-3xl border border-borderlight bg-white shadow-md space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-800 mb-2">Corporate Office</h3>
              <p className="text-xs text-slate-600 font-medium">Visit our luxury experience center in Gurgaon.</p>
            </div>

            <div className="space-y-6 text-sm font-medium">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Address</h4>
                  <p className="text-slate-600 text-xs leading-relaxed mt-0.5">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Phone / WhatsApp</h4>
                  <p className="text-slate-700 text-xs font-bold mt-0.5">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Email Inquiry</h4>
                  <p className="text-slate-600 text-xs mt-0.5">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Office Hours</h4>
                  <p className="text-slate-600 text-xs mt-0.5">{settings.working_hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 rounded-3xl border border-borderlight bg-white shadow-md">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-charcoal-800">Message Sent</h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                  Thank you for reaching out to Vedik Reality. Our senior advisor will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-charcoal-800 mb-4">Send a Direct Inquiry</h3>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Roy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Your Inquiry / Requirement</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your requirement, budget, or preferred site visit dates..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
