import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, ShieldCheck, Send } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function ContactPage() {
  const { settings } = useSettings();

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          source: 'Contact Page Form'
        })
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-charcoal-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Connect With Our <span className="gold-gradient-text">Advisory Team</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3">
            Visit our corporate headquarters or request an instant callback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-slate-100 border-l-2 border-gold-500 pl-3">
                Corporate Office
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-charcoal-900 border border-gold-500/30 text-gold-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block text-xs mb-0.5">Address</span>
                    <p className="text-slate-400 leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-charcoal-900 border border-gold-500/30 text-gold-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block text-xs mb-0.5">Phone Line</span>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-gold-400 font-bold hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-charcoal-900 border border-gold-500/30 text-gold-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block text-xs mb-0.5">Email Support</span>
                    <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-gold-400">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-charcoal-900 border border-gold-500/30 text-gold-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block text-xs mb-0.5">Advisory Hours</span>
                    <p className="text-slate-400">{settings.working_hours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hi%20Vedik%20Reality,%20I%20am%20reaching%20out%20via%20your%20contact%20page.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Connect</span>
                </a>
              </div>

            </div>
          </div>

          {/* Interactive Lead Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-gold-500/40 shadow-2xl space-y-6">
              <div>
                <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest block mb-1">
                  Enquiry Desk
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-100">
                  Send Us A Message
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4 bg-emerald-950/30 rounded-2xl p-6 border border-emerald-500/40">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold">Message Delivered</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out to Vedik Reality. Our senior real estate advisor will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Message / Requirements</label>
                    <textarea
                      rows="4"
                      placeholder="Specify property location preference, budget, or general inquiry..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-charcoal-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:border-gold-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full gold-button py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Message...' : 'Submit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Embedded Google Map */}
        {settings.google_map_embed && (
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <iframe
              title="Vedik Reality Google Map Location"
              src={settings.google_map_embed}
              className="w-full h-80 border-0 filter grayscale brightness-90 contrast-125"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        )}

      </div>
    </div>
  );
}
