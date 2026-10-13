import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import SEO from '../components/SEO';

export default function ContactPage() {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyRequirement: '',
    preferredLocation: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: `Requirement: ${formData.propertyRequirement} | Preferred Location: ${formData.preferredLocation} | Note: ${formData.message}`,
          source: 'Contact Page Form'
        })
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
        title="Contact Vedik Realty | Property Consultant in Dharuhera"
        description="Contact Vedik Realty for property enquiries in Dharuhera, Haryana. Explore residential plots, residential and commercial properties and investment opportunities."
        keywords="Contact Vedik Realty, Property Consultant in Dharuhera, Property Dealer in Dharuhera, Real Estate Agent in Dharuhera, Residential Plots in Dharuhera, Anandam Awaas Sector 19"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase mb-3">
            <Phone className="w-3.5 h-3.5" /> Property Consultant in Dharuhera
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Contact Vedik Realty – Property Consultant in Dharuhera
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-700 font-medium max-w-3xl leading-relaxed">
            Looking for property in Dharuhera, Haryana? Contact Vedik Realty for assistance with residential plots, residential properties, commercial properties and real estate opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details Card */}
          <div className="glass-card p-8 rounded-3xl border border-borderlight bg-white shadow-md space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-800 mb-1">Vedik Realty</h3>
              <p className="text-xs text-slate-600 font-medium">Genuine Property Consultation in Dharuhera, Haryana.</p>
            </div>

            <div className="space-y-6 text-sm font-medium">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Office Address</h4>
                  <p className="text-slate-800 text-xs font-bold mt-1 leading-relaxed">
                    First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana 123106
                  </p>
                  <a 
                    href={settings.google_map_link || "https://maps.app.goo.gl/bpCUi761odoyA34B7"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[11px] text-gold-700 font-bold mt-2 hover:underline inline-flex items-center gap-1"
                  >
                    📍 Open Location in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Call & WhatsApp</h4>
                  <div className="space-y-1.5 mt-1">
                    <p className="text-xs text-slate-800">
                      <strong className="text-slate-500 font-medium">Call: </strong>
                      <a href="tel:9053848222" className="text-gold-700 font-bold hover:underline">
                        90538 48222
                      </a>
                    </p>
                    <p className="text-xs text-slate-800">
                      <strong className="text-slate-500 font-medium">WhatsApp: </strong>
                      <a href="https://wa.me/919053848222" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                        90538 48222
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Email Inquiry</h4>
                  <a href={`mailto:${settings.email || 'contact@vedikrealty.com'}`} className="text-slate-700 text-xs font-semibold hover:text-gold-700 transition-colors mt-0.5 block">
                    {settings.email || 'contact@vedikrealty.com'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cream border border-borderlight text-gold-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-charcoal-800 text-xs uppercase tracking-wider">Office Hours</h4>
                  <p className="text-slate-600 text-xs mt-0.5">{settings.working_hours || 'Mon - Sun: 9:00 AM - 8:00 PM'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 rounded-3xl border border-borderlight bg-white shadow-md">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-charcoal-800">Enquiry Received</h3>
                <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                  Thank you for contacting Vedik Realty. Our property advisor will reach out to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest block mb-1">
                    Get In Touch
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-800">
                    Looking for a property in Dharuhera? Send us your requirement.
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
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
                    placeholder="+91 90538 48222"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Property Requirement</label>
                  <input
                    type="text"
                    placeholder="e.g. Residential Plot, Commercial SCO, 2/3 BHK Flat"
                    value={formData.propertyRequirement}
                    onChange={(e) => setFormData({ ...formData, propertyRequirement: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Preferred Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Anandam Awaas (Sector 19), Anandam Estate (Sector 24), Tulip City (Sector 3)"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 mb-1">Message</label>
                  <textarea
                    rows="3"
                    placeholder="Any specific plot size, budget, or preferred timing for site visit..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-borderlight rounded-xl px-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
