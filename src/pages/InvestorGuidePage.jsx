import React, { useState } from 'react';
import { Shield, TrendingUp, Compass, CheckCircle2, MapPin, Calculator, Building, Phone, ArrowRight, Star, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryModal from '../components/EnquiryModal';

export default function InvestorGuidePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plotSize, setPlotSize] = useState(150); // Sq Yards
  const [holdingYears, setHoldingYears] = useState(3);

  // Estimated ROI calculation (Hypothetical appreciation ~ 15% p.a.)
  const estimatedPricePerSqYd = 25000;
  const currentTotal = plotSize * estimatedPricePerSqYd;
  const projectedAppreciationRate = 0.16; 
  const projectedFutureValue = Math.round(currentTotal * Math.pow(1 + projectedAppreciationRate, holdingYears));
  const estimatedProfit = projectedFutureValue - currentTotal;

  // Rich FAQ items for Google snippet ranking
  const faqs = [
    {
      q: "Why is Dharuhera a hot property investment hub for Delhi NCR & Out-of-State Buyers?",
      a: "Dharuhera is strategically located on NH-48 (Delhi-Jaipur Highway), just 35-40 minutes drive from Rajiv Chowk, Gurugram and 50 minutes from IGI Airport Delhi. With rapid industrial expansion in Manesar, Bhiwadi, and Bawal, plus the upcoming Delhi-Alwar Rapid Rail (RRTS) and KMP Expressway, property values in Dharuhera offer high capital appreciation at a fraction of Gurugram property rates."
    },
    {
      q: "What types of plots are available in Dharuhera for out-of-state investors?",
      a: "Vedik Realty offers prime HUDA approved, RERA registered, and DTCP approved residential plots, commercial SCO plots, gated township plots (such as Sector 19 Dharuhera, Anandam Awaas), and industrial plots ranging from 100 sq. yds. to 500+ sq. yds."
    },
    {
      q: "How does property price in Dharuhera compare with Gurugram & Noida?",
      a: "Plots in Gurugram currently cost ₹1.2 Lakh to ₹2.5 Lakh per sq. yard. In contrast, premium residential plots in Dharuhera are available at ₹20,000 to ₹45,000 per sq. yard, offering 4x-5x higher growth upside and affordable entry capital for smart real estate investors."
    },
    {
      q: "Can investors from Delhi, Punjab, Rajasthan, or Gujarat easily buy property in Haryana?",
      a: "Yes! Any Indian citizen can freely buy, register, and own freehold residential or commercial land in Haryana. Vedik Realty provides 100% end-to-end assistance including title verification, registry, mutation ( दाखिल ख़ारिज ), and legal documentation."
    },
    {
      q: "What is the expected ROI for real estate investment near Delhi NCR in Dharuhera?",
      a: "Historically, well-located residential and commercial plots near NH-48 Dharuhera have delivered 12% to 18% annual capital growth. With upcoming infrastructure projects like RRTS metro stations and DMIC corridor, returns are projected to escalate significantly."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory text-charcoal-900">
      <SEO 
        title="Plots for Sale in Dharuhera for Investors | Property Investment near Delhi NCR & Gurugram"
        description="Looking for high ROI property investment near Delhi NCR? Explore verified residential & commercial plots in Dharuhera, Haryana. Prime location near NH-48, Bhiwadi & Gurugram. Free consultation for out-of-state buyers."
        keywords="Plots for Sale in Dharuhera for Investors, Property Investment in Dharuhera, Residential Plots in Dharuhera, Plots Near Delhi NCR, Property Investment Near Gurugram, Dharuhera Property for Delhi Buyers, Dharuhera Property for NCR Investors, Investment Property in Haryana, Plots Near Bhiwadi, Real Estate Investment in Dharuhera"
      />

      {/* Structured FAQ Schema for Google Search Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        })}
      </script>

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white overflow-hidden">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 text-gold-400" />
            <span>High Growth Real Estate Hub • Delhi NCR Region</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
            Property Investment in Dharuhera <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-200">
              For Delhi NCR & Out-of-State Investors
            </span>
          </h1>

          <p className="text-base sm:text-xl text-charcoal-200 max-w-3xl mb-8 leading-relaxed font-light">
            Discover high-appreciation residential plots, commercial SCO spaces, and prime freehold land in Dharuhera, Haryana—just 35 minutes from Gurugram. Capitalize on massive infrastructure growth at 1/4th the price of Cyber City properties.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold rounded-xl shadow-lg shadow-gold-500/20 transition duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>Download Investor Brochure & Rate List</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:+919053848222"
              className="px-6 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition duration-300 flex items-center space-x-2"
            >
              <Phone className="w-5 h-5 text-gold-400" />
              <span>Call Investor Desk: +91 90538 48222</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-serif">35 Mins</p>
              <p className="text-xs sm:text-sm text-charcoal-300">From Gurugram Rajiv Chowk</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-serif">15-18%</p>
              <p className="text-xs sm:text-sm text-charcoal-300">Expected Annual Growth</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-serif">1/4th Price</p>
              <p className="text-xs sm:text-sm text-charcoal-300">Compared to Gurugram Rates</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gold-400 font-serif">100% Legal</p>
              <p className="text-xs sm:text-sm text-charcoal-300">RERA & Title Clear Plots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Out-of-State Buyers are Investing in Dharuhera */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Strategic Investment Opportunity</h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">
              Why Smart Investors from Delhi, NCR & North India Choose Dharuhera
            </h3>
            <p className="text-charcoal-600 mt-4 text-base sm:text-lg">
              Located directly along National Highway 48 (NH-48), Dharuhera is rapidly emerging as the top property destination for high capital growth and rental returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-ivory border border-gold-200/60 shadow-sm hover:shadow-md transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-charcoal-900 mb-3 font-serif">Unrivaled Connectivity</h4>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                Direct expressway access via NH-48, KMP Expressway, Delhi-Mumbai Industrial Corridor (DMIC), and the proposed RRTS Rapid Rail Station connecting Delhi-Gurugram-Rewari-Alwar.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-ivory border border-gold-200/60 shadow-sm hover:shadow-md transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-6">
                <Building className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-charcoal-900 mb-3 font-serif">Industrial & Employment Growth</h4>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                Surrounded by major industrial clusters of Bhiwadi, Bawal, Manesar, and Dharuhera Hero MotoCorp hub—ensuring constant tenant demand and continuous population inflow.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-ivory border border-gold-200/60 shadow-sm hover:shadow-md transition duration-300">
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-charcoal-900 mb-3 font-serif">High Capital Appreciation</h4>
              <p className="text-charcoal-600 text-sm leading-relaxed">
                While Gurugram plot prices have saturated, Dharuhera plots are at an entry-level sweet spot. Real estate experts project 2x to 3x growth over the next 4-5 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table: Gurugram vs Dharuhera Real Estate */}
      <section className="py-16 bg-ivory border-y border-gold-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-charcoal-900">
              Real Estate Rate Comparison: Gurugram vs Dharuhera
            </h3>
            <p className="text-charcoal-600 mt-2 text-sm sm:text-base">
              See why Delhi NCR investors are shifting capital to Dharuhera plots for maximum appreciation potential.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gold-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-charcoal-900 text-white font-serif">
                    <th className="p-4 sm:p-5 text-sm sm:text-base">Feature / Parameter</th>
                    <th className="p-4 sm:p-5 text-sm sm:text-base text-gold-400">Dharuhera (Near NCR)</th>
                    <th className="p-4 sm:p-5 text-sm sm:text-base text-charcoal-300">Gurugram (Cyber City / Sohna Rd)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr className="hover:bg-gold-50/40">
                    <td className="p-4 font-semibold text-charcoal-900">Residential Plot Price / Sq. Yd</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">₹20,000 – ₹45,000</td>
                    <td className="p-4 text-charcoal-600">₹1,20,000 – ₹2,50,000+</td>
                  </tr>
                  <tr className="hover:bg-gold-50/40">
                    <td className="p-4 font-semibold text-charcoal-900">Minimum Capital Investment</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">₹25 Lakhs – ₹45 Lakhs</td>
                    <td className="p-4 text-charcoal-600">₹1.5 Crores – ₹4 Crores+</td>
                  </tr>
                  <tr className="hover:bg-gold-50/40">
                    <td className="p-4 font-semibold text-charcoal-900">Distance to IGI Airport Delhi</td>
                    <td className="p-4 font-medium text-charcoal-800">~50 mins via NH-48 Expressway</td>
                    <td className="p-4 text-charcoal-600">~30–45 mins</td>
                  </tr>
                  <tr className="hover:bg-gold-50/40">
                    <td className="p-4 font-semibold text-charcoal-900">Future Growth Potential (5 Yrs)</td>
                    <td className="p-4 font-bold text-gold-600 bg-gold-50/30">High (2x – 3x Appreciation)</td>
                    <td className="p-4 text-charcoal-600">Moderate (8–10% Steady)</td>
                  </tr>
                  <tr className="hover:bg-gold-50/40">
                    <td className="p-4 font-semibold text-charcoal-900">Rental Demand Source</td>
                    <td className="p-4 font-medium text-charcoal-800">Industrial Executives, Engineers & NCR Professionals</td>
                    <td className="p-4 text-charcoal-600">IT & Corporate Workforce</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Widget */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-semibold mb-4">
                <Calculator className="w-4 h-4" />
                <span>Estimate Your Growth</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900 mb-4">
                Property ROI Calculator for Out-of-State Investors
              </h3>
              <p className="text-charcoal-600 mb-6 text-base leading-relaxed">
                Estimate your projected returns on residential and commercial plots in Dharuhera based on current market trends and infrastructure expansion.
              </p>

              <div className="space-y-6 bg-ivory p-6 sm:p-8 rounded-2xl border border-gold-200">
                <div>
                  <div className="flex justify-between text-sm font-semibold text-charcoal-800 mb-2">
                    <span>Plot Size (Sq. Yards):</span>
                    <span className="text-gold-600 font-bold">{plotSize} Sq. Yd</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="25"
                    value={plotSize}
                    onChange={(e) => setPlotSize(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold text-charcoal-800 mb-2">
                    <span>Investment Horizon (Years):</span>
                    <span className="text-gold-600 font-bold">{holdingYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div className="pt-4 border-t border-gold-200 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white p-4 rounded-xl border border-gold-100">
                    <p className="text-xs text-charcoal-500 uppercase font-semibold">Estimated Current Value</p>
                    <p className="text-lg sm:text-xl font-bold text-charcoal-900 mt-1">₹{(currentTotal / 100000).toFixed(2)} Lakhs</p>
                  </div>
                  <div className="bg-gold-500/10 p-4 rounded-xl border border-gold-300">
                    <p className="text-xs text-gold-700 uppercase font-bold">Projected Value ({holdingYears} Yrs)</p>
                    <p className="text-lg sm:text-xl font-extrabold text-gold-600 mt-1">₹{(projectedFutureValue / 100000).toFixed(2)} Lakhs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Out-of-State Investor Assistance Card */}
            <div className="bg-charcoal-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl"></div>

              <h4 className="text-2xl font-serif font-bold text-gold-400 mb-4">
                Special Out-of-State Buyer Support
              </h4>
              <p className="text-charcoal-300 text-sm mb-6 leading-relaxed">
                Investing from Delhi, Noida, Punjab, Rajasthan, or abroad? Vedik Realty offers end-to-end transparent assistance without you needing to travel multiple times:
              </p>

              <ul className="space-y-3 text-sm text-charcoal-200 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>Live HD Video Site Visits & Drone Surveys of plots</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>Verified Legal Title Check & Revenue Record Verification</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>Hassle-Free Sub-Registrar Office Registry Assistance</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <span>Post-purchase Tenant & Property Management Support</span>
                </li>
              </ul>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold rounded-xl transition duration-300 shadow-lg text-center cursor-pointer"
              >
                Schedule Virtual Tour / Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQs) */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Investor Knowledge Base</h2>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal-900">
              Frequently Asked Questions (Out-of-State Buyers)
            </h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-gold-200/70 shadow-sm">
                <h4 className="text-lg font-bold text-charcoal-900 flex items-start space-x-3 mb-3 font-serif">
                  <HelpCircle className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-charcoal-600 text-sm sm:text-base leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white text-center border-t border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-gold-400 mb-4">
            Ready to Explore Prime Investment Plots in Dharuhera?
          </h3>
          <p className="text-charcoal-300 text-base sm:text-lg mb-8">
            Speak directly with our senior property advisors Deepak Lamba & Manish for expert guidance and verified site visits.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold rounded-xl shadow-lg transition duration-300 cursor-pointer"
            >
              Request Call Back & Rate Chart
            </button>
            <a
              href="https://wa.me/919053848222?text=Hi%20Vedik%20Realty,%20I%20am%20an%20investor%20interested%20in%20Dharuhera%20plots."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition duration-300 shadow-lg"
            >
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          source="Investor Guide Page (Out-of-State SEO)"
        />
      )}
    </div>
  );
}
