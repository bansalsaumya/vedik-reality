import React, { useState } from 'react';
import { X, Star, CheckCircle2, MessageSquare, User, MapPin, Building, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewSubmissionModal({ isOpen, onClose, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    client_name: '',
    location: 'Dharuhera, Haryana',
    property_purchased: 'Residential Plot / Flat',
    rating: 5,
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.client_name.trim() || !formData.content.trim()) {
      setError('Please fill in your name and review details.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        setError('Failed to submit review. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-white p-6 md:p-8 rounded-3xl border border-borderlight shadow-2xl overflow-hidden text-charcoal-800"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-charcoal-800 hover:bg-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-charcoal-800">Thank You!</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
              Your valuable feedback has been submitted to Vedik Reality team. We appreciate your trust!
            </p>
            <button
              onClick={onClose}
              className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-cream border border-borderlight text-gold-700">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal-800">Leave a Client Review</h3>
                <p className="text-xs text-slate-500 font-medium">Share your experience with Vedik Reality.</p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold text-center border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-white border border-borderlight rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Sector 19 Dharuhera"
                  className="w-full bg-white border border-borderlight rounded-xl px-3 py-2 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1">Property Type</label>
                <input
                  type="text"
                  value={formData.property_purchased}
                  onChange={(e) => setFormData({ ...formData, property_purchased: e.target.value })}
                  placeholder="e.g. 150 Sq.Yd Plot"
                  className="w-full bg-white border border-borderlight rounded-xl px-3 py-2 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1">Rating</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= formData.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-800 uppercase tracking-wider mb-1">Your Feedback / Review *</label>
              <textarea
                rows="3"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Describe your property buying or selling experience with Vedik Reality..."
                className="w-full bg-white border border-borderlight rounded-xl p-3 text-xs text-charcoal-800 focus:border-gold-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit Verified Review'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
