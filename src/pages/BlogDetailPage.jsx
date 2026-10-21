import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar, Clock, User, Share2, CheckCircle2,
  MapPin, PhoneCall, MessageCircle, ExternalLink, ChevronRight,
  BookOpen, Sparkles, Building2, ShieldCheck, FileCheck, Award
} from 'lucide-react';
import SEO from '../components/SEO';
import EnquiryModal from '../components/EnquiryModal';
import { BLOG_POSTS } from '../data/blogData';
import { useSettings } from '../context/SettingsContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { settings } = useSettings();
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Match blog by slug, alternate_slugs or default to matching
  const post = BLOG_POSTS.find(
    (p) => p.slug === slug || (p.alternate_slugs && p.alternate_slugs.includes(slug))
  ) || (slug?.includes('plot') ? BLOG_POSTS[1] : BLOG_POSTS[0]);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : post.canonicalUrl;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: shareUrl
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-ivory text-charcoal-800 font-sans min-h-screen pt-24 sm:pt-28 pb-20">
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.secondaryKeywords ? `${post.primaryKeyword}, ${post.secondaryKeywords.join(', ')}` : post.primaryKeyword}
        url={post.canonicalUrl}
        image={post.coverImage}
      />

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.metaDescription,
            "image": [`https://vedikrealty.com${post.coverImage}`],
            "datePublished": post.publishedDate,
            "dateModified": post.publishedDate,
            "author": {
              "@type": "Organization",
              "name": post.author,
              "url": "https://vedikrealty.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Vedik Realty",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vedikrealty.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": post.canonicalUrl
            },
            "keywords": post.secondaryKeywords ? post.secondaryKeywords.join(', ') : post.primaryKeyword
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
        <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-gold-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/blog" className="hover:text-gold-700 transition">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-charcoal-800 line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <header className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800 leading-tight">
            {post.id === 2 ? (
              <>
                Residential Plots in Dharuhera: <span className="gold-gradient-text font-serif">What Buyers Should Check Before Buying</span>
              </>
            ) : (
              <>
                Property in Dharuhera: <span className="gold-gradient-text font-serif">A Complete Guide for Buyers in 2026</span>
              </>
            )}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 pb-6 border-b border-borderlight text-xs text-slate-600 font-medium">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gold-700" />
                <span className="font-bold text-charcoal-800">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold-700" />
                <span>October 22, 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold-700" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-borderlight bg-white hover:border-gold-500 text-charcoal-800 transition text-xs font-semibold shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5 text-gold-700" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden border border-borderlight shadow-md mb-10 aspect-[16/9] sm:aspect-[21/9] bg-cream">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold tracking-wider uppercase text-gold-400 block">
              {post.id === 2 ? 'Residential Plots Checklist' : 'Dharuhera Real Estate Guide'}
            </span>
            <p className="text-xs sm:text-sm font-medium text-slate-200">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Table of Contents Box */}
        <div className="p-6 rounded-2xl bg-cream border border-borderlight mb-10 shadow-xs">
          <div className="flex items-center gap-2 font-serif text-base font-bold text-charcoal-800 mb-3">
            <BookOpen className="w-4 h-4 text-gold-700" />
            <span>Table of Contents</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            {post.tableOfContents.map((item, idx) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-gold-700 transition py-1"
                >
                  <span className="w-5 h-5 rounded-full bg-white border border-borderlight text-gold-700 text-[10px] flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="line-clamp-1">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* POST 2 CONTENT: Residential Plots in Dharuhera */}
        {post.id === 2 ? (
          <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            
            {/* Intro Lead */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-charcoal-800 font-medium leading-relaxed bg-white p-5 rounded-2xl border-l-4 border-gold-500 shadow-xs">
                If you are searching for <strong>residential plots in Dharuhera</strong>, choosing the right plot requires careful consideration. Location, connectivity, documentation, project details and your future requirements should all be checked before making a decision.
              </p>

              <p>
                Dharuhera, Haryana offers different residential plotted developments and property opportunities for buyers looking to purchase land for residential purposes.
              </p>

              <p>
                At <strong>Vedik Realty</strong>, we help buyers explore{' '}
                <Link to="/properties?type=Residential%20Plot" className="font-semibold text-gold-700 hover:underline">
                  residential plots
                </Link>{' '}
                and other property opportunities in Dharuhera based on their requirements.
              </p>
            </div>

            {/* Section 1: Why Consider Residential Plots */}
            <section id="why-consider-plots" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Why Consider Residential Plots in Dharuhera?
              </h2>
              <p>
                Residential plots can give buyers flexibility to plan and construct a property according to their requirements, subject to applicable rules and approvals.
              </p>
              <p>
                When exploring{' '}
                <Link to="/properties" className="font-semibold text-gold-700 hover:underline">
                  plots for sale in Dharuhera
                </Link>
                , buyers should consider the location, surrounding development, road connectivity and available infrastructure before selecting a property.
              </p>
            </section>

            {/* Section 2: 6 Things to Check Before Buying a Residential Plot */}
            <section id="6-things-to-check" className="space-y-6 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                6 Things to Check Before Buying a Residential Plot
              </h2>

              <div className="space-y-4 pt-2">
                
                {/* 1. Check Location */}
                <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight shrink-0">
                      1
                    </span>
                    Check the Location
                  </h3>
                  <p>
                    Location is one of the most important factors when buying a plot.
                  </p>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block mb-2">
                      Key factors to consider:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      {[
                        'Road connectivity',
                        'Nearby schools and daily facilities',
                        'Accessibility to major roads',
                        'Surrounding development',
                        'Future requirements'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-slate-600 pt-1">
                    A suitable location should match your personal or investment objective.
                  </p>
                </div>

                {/* 2. Verify Property Documents */}
                <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight shrink-0">
                      2
                    </span>
                    Verify Property Documents
                  </h3>
                  <p>
                    Before purchasing a residential plot, carefully review the relevant property documents.
                  </p>
                  <p>
                    Depending on the project and transaction, buyers should verify applicable ownership documents, approvals, title-related documents and other legal records.
                  </p>
                  <div className="p-3.5 rounded-xl bg-cream border border-borderlight text-xs text-slate-700 font-medium">
                    ⚠️ <strong>Professional Guidance:</strong> Always verify the documents with the appropriate professional before making a final decision.
                  </div>
                </div>

                {/* 3. Check RERA Registration Details */}
                <div id="rera-details" className="bg-white p-6 rounded-2xl border-2 border-gold-500/40 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-gold-500 text-charcoal-950 text-xs font-bold flex items-center justify-center shrink-0">
                        3
                      </span>
                      Check RERA Registration Details
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shrink-0">
                      Verified Agent
                    </span>
                  </div>

                  <p>
                    Vedik Realty is registered as a Real Estate Agent under the <strong>Rajasthan Real Estate Regulatory Authority (RERA)</strong>.
                  </p>

                  <div className="p-4 rounded-xl bg-cream border border-borderlight space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderlight/60 pb-2">
                      <span className="text-slate-600 font-medium">RERA Registration No.:</span>
                      <span className="font-mono font-bold text-charcoal-900 text-sm">RAJ/A/2026/23972</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderlight/60 pb-2">
                      <span className="text-slate-600 font-medium">Registration Validity:</span>
                      <span className="font-semibold text-charcoal-800">25 August 2026 to 24 August 2031</span>
                    </div>
                    <div className="pt-1 text-slate-600 text-xs leading-relaxed">
                      The registration authorizes Vedik Realty to facilitate the sale or purchase of plots, apartments or buildings in real estate projects registered in Rajasthan, subject to the applicable Act, rules and regulations.
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    For any specific property project, buyers should separately verify the project's applicable RERA registration details before proceeding.
                  </p>
                </div>

                {/* 4. Understand the Plot Details */}
                <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight shrink-0">
                      4
                    </span>
                    Understand the Plot Details
                  </h3>
                  <p>
                    Before making a decision, understand the actual property details, including:
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                    {['Plot size', 'Dimensions', 'Facing', 'Road access', 'Location within project', 'Development details'].map((detail, idx) => (
                      <li key={idx} className="p-2.5 rounded-lg bg-cream border border-borderlight text-center font-medium text-charcoal-800">
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-600 pt-1">
                    Make sure the information provided matches the relevant property and project documents.
                  </p>
                </div>

                {/* 5. Consider Connectivity & Surroundings */}
                <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight shrink-0">
                      5
                    </span>
                    Consider Connectivity & Surroundings
                  </h3>
                  <p>
                    A plot's surroundings can be important for both personal use and long-term suitability.
                  </p>
                  <p>
                    Look at nearby roads, residential development, schools, markets and other facilities that are relevant to your requirement.
                  </p>
                </div>

                {/* 6. Know Your Budget & Requirement */}
                <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight shrink-0">
                      6
                    </span>
                    Know Your Budget & Requirement
                  </h3>
                  <p>
                    Don't consider only the advertised plot price. Understand your overall budget and account for applicable costs associated with the purchase and future construction, wherever relevant.
                  </p>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block mb-2">
                      Also decide whether the plot is intended for:
                    </span>
                    <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                      {['Personal residence', 'Future construction', 'Long-term holding', 'Investment purpose'].map((purpose, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                          <span>{purpose}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 3: Residential Plot vs Ready Property */}
            <section id="plots-vs-ready" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Residential Plot vs Ready Property
              </h2>
              <p>
                A residential plot and a ready residential property serve different requirements.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-borderlight shadow-xs space-y-2">
                  <h4 className="font-serif text-base font-bold text-charcoal-800">Residential Plot</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    A plot may provide flexibility for future construction, custom floor designs, and boundary demarcation according to your schedule.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-borderlight shadow-xs space-y-2">
                  <h4 className="font-serif text-base font-bold text-charcoal-800">Ready Residential Property</h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    A ready property may be more suitable for buyers who want an existing structure for immediate family living or immediate rental yield.
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                The right choice depends on your budget, purpose, timeline and long-term requirement.
              </p>
            </section>

            {/* Section 4: How to Choose */}
            <section id="how-to-choose-plot" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                How to Choose the Right Residential Plot in Dharuhera?
              </h2>
              <p>
                Before purchasing a residential plot, don't rush the decision.
              </p>
              <p>
                Compare different locations, verify the relevant documents, understand project details and make sure the property matches your requirement.
              </p>

              {/* Step Pipeline */}
              <div className="p-5 rounded-2xl bg-cream border border-borderlight my-4">
                <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider block mb-3 text-center sm:text-left">
                  Simple Step-by-Step Decision Framework:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-charcoal-800">
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Requirement</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Location</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Budget</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Property Details</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Document Verification</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-gold-500 text-charcoal-950 shadow-xs">Decision</span>
                </div>
              </div>

              <p>
                Taking these steps can help buyers make a more informed property decision.
              </p>
            </section>

            {/* Section 5: Flagship Plotted Projects in Dharuhera (Internal Links) */}
            <section id="featured-projects" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Flagship Plotted Developments in Dharuhera
              </h2>
              <p>
                Buyers exploring residential plots in Dharuhera often consider key residential developments across prime sectors:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <Link
                  to="/properties/anandam-awaas-dharuhera"
                  className="p-5 rounded-2xl border border-borderlight bg-white hover:border-gold-500 hover:shadow-md transition text-center space-y-1.5 block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Sector 19 Dharuhera</span>
                  <h4 className="font-serif text-base font-bold text-charcoal-800 group-hover:text-gold-700 transition">Anandam Awaas</h4>
                  <p className="text-xs text-slate-500">Residential plots (72 – 177 Sq.Yd)</p>
                  <span className="inline-block text-xs font-bold text-gold-700 pt-1">Explore Project &rarr;</span>
                </Link>

                <Link
                  to="/properties/anandam-estate-dharuhera"
                  className="p-5 rounded-2xl border border-borderlight bg-white hover:border-gold-500 hover:shadow-md transition text-center space-y-1.5 block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Sector 24 Dharuhera</span>
                  <h4 className="font-serif text-base font-bold text-charcoal-800 group-hover:text-gold-700 transition">Anandam Estate</h4>
                  <p className="text-xs text-slate-500">Residential plots (150 – 519 Sq.Yd)</p>
                  <span className="inline-block text-xs font-bold text-gold-700 pt-1">Explore Project &rarr;</span>
                </Link>

                <Link
                  to="/properties/tulip-city-sector-3-dharuhera"
                  className="p-5 rounded-2xl border border-borderlight bg-white hover:border-gold-500 hover:shadow-md transition text-center space-y-1.5 block group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Sector 3 Dharuhera</span>
                  <h4 className="font-serif text-base font-bold text-charcoal-800 group-hover:text-gold-700 transition">Tulip City</h4>
                  <p className="text-xs text-slate-500">Residential plots (88 – 141 Sq.Yd)</p>
                  <span className="inline-block text-xs font-bold text-gold-700 pt-1">Explore Project &rarr;</span>
                </Link>
              </div>

              {/* Also link back to Blog 1 */}
              <div className="mt-4 p-4 rounded-xl bg-cream border border-borderlight text-xs flex items-center justify-between">
                <span>Also read our comprehensive overview:</span>
                <Link
                  to="/blog/property-in-dharuhera-buyers-guide-2026"
                  className="font-bold text-gold-700 hover:underline"
                >
                  Property in Dharuhera (2026 Buyer's Guide) &rarr;
                </Link>
              </div>
            </section>

            {/* Section 6: Explore with Vedik Realty */}
            <section id="explore-with-vedik" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Explore Residential Plots with Vedik Realty
              </h2>
              <p>
                <strong>Vedik Realty</strong> is a real estate and property consultancy in Dharuhera, Haryana.
              </p>
              <div className="pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block mb-2">
                  We help buyers explore:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {[
                    'Residential Plots',
                    'Residential Properties',
                    'Commercial Properties',
                    'Property Opportunities',
                    'Property Buying Assistance'
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="pt-2">
                If you are searching for residential plots in Dharuhera, explore available property opportunities and connect with Vedik Realty for further information.
              </p>

              {/* Internal Link to /properties */}
              <div className="p-6 rounded-2xl bg-white border-2 border-gold-500/40 shadow-sm text-center my-6 space-y-3">
                <h3 className="font-serif text-lg font-bold text-charcoal-800">
                  Explore Properties in Dharuhera
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  View verified plots, residential developments, and commercial listings.
                </p>
                <div>
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal-800 hover:bg-gold-500 text-white hover:text-charcoal-900 font-bold text-xs uppercase tracking-wider transition shadow-md"
                  >
                    <span>Explore Properties in Dharuhera</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Contact Information Desk */}
              <div className="bg-cream p-6 rounded-2xl border border-borderlight space-y-3 text-xs sm:text-sm">
                <p className="font-bold text-charcoal-800">
                  Looking for residential plots in Dharuhera? Connect with Vedik Realty for property enquiries and project details.
                </p>
                <div className="space-y-1.5 text-slate-700">
                  <div className="font-serif font-bold text-charcoal-800 text-sm">Vedik Realty</div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
                    <span>First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana 123106</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-gold-700 shrink-0" />
                    <a href="tel:+919053848222" className="hover:text-gold-700 font-semibold">90538 48222</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gold-700">🌐</span>
                    <a href="https://vedikrealty.com" className="hover:text-gold-700 font-semibold">www.vedikrealty.com</a>
                  </div>
                </div>
                <p className="pt-2 italic text-slate-500 font-serif text-xs">
                  Finding Spaces, Building Futures.
                </p>
              </div>
            </section>

          </div>
        ) : (
          /* POST 1 CONTENT: Property in Dharuhera (2026 Guide) */
          <div className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-charcoal-800 font-medium leading-relaxed bg-white p-5 rounded-2xl border-l-4 border-gold-500 shadow-xs">
                If you are looking for <strong>property in Dharuhera</strong>, choosing the right property requires more than simply comparing prices. Location, connectivity, property type, documentation and your long-term requirement are all important factors to consider before making a decision.
              </p>

              <p>
                Dharuhera has a growing residential and commercial property market, with options including{' '}
                <Link to="/properties" className="font-semibold text-gold-700 hover:underline">
                  residential plots
                </Link>
                , residential properties and commercial opportunities across different sectors and developing areas. Current property portals show active listings for both plots and other property types in Dharuhera.{' '}
                <a
                  href="https://housing.com/in/buy/dharuhera/plots-fid/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gold-700 hover:underline"
                >
                  <span>Housing</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>

              <p>
                At <strong>Vedik Realty</strong>, we help buyers explore suitable property opportunities in Dharuhera, Haryana and understand their options before making a property decision.
              </p>
            </div>

            {/* Section 1: Why Consider Property in Dharuhera */}
            <section id="overview" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Why Consider Property in Dharuhera?
              </h2>
              <p>
                Dharuhera is an important location in Haryana with connectivity towards the Delhi-NCR region and nearby cities. The area includes multiple residential sectors as well as developing property locations.
              </p>
              <p>
                For buyers, this means there are different types of property opportunities depending on their budget, purpose and future plans.
              </p>
              <p>
                Some buyers may be looking for a home, while others may be interested in residential plots or property for investment.
              </p>
            </section>

            {/* Section 2: Types of Property Available in Dharuhera */}
            <section id="types-of-property" className="space-y-6 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Types of Property Available in Dharuhera
              </h2>

              {/* Type 1 */}
              <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight">
                    1
                  </span>
                  Residential Property in Dharuhera
                </h3>
                <p>
                  Residential properties can be suitable for buyers looking for a home for personal use or for a long-term property investment.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 block mb-2">
                    Before selecting a residential property, buyers should consider:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {[
                      'Location and connectivity',
                      'Nearby schools and daily facilities',
                      'Development of the surrounding area',
                      'Property condition',
                      'Documentation',
                      'Overall budget'
                    ].map((factor, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Type 2 */}
              <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight">
                    2
                  </span>
                  Residential Plots in Dharuhera
                </h3>
                <p>
                  Residential plots in Dharuhera are another option for buyers who want to construct a property according to their requirements.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 bg-cream p-4 rounded-xl border border-borderlight">
                  <strong>Important note:</strong> Plot buyers should carefully check ownership, approvals, location, dimensions, road access and other relevant documents before proceeding.
                </p>
                <div className="pt-2">
                  <Link
                    to="/blog/residential-plots-in-dharuhera-buyers-checklist"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-charcoal-800 uppercase tracking-wider"
                  >
                    <span>Read our Plot Buyer's Checklist &rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Type 3 */}
              <div className="bg-white p-6 rounded-2xl border border-borderlight shadow-xs space-y-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-charcoal-800 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-cream text-gold-700 text-xs font-bold flex items-center justify-center border border-borderlight">
                    3
                  </span>
                  Commercial Property in Dharuhera
                </h3>
                <p>
                  Commercial properties may be considered by businesses and investors looking for suitable commercial locations.
                </p>
                <p>
                  The right commercial property can depend heavily on factors such as accessibility, surrounding development, visibility and the intended business use.
                </p>
                <div className="pt-2">
                  <Link
                    to="/properties?type=Commercial"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-700 hover:text-charcoal-800 uppercase tracking-wider"
                  >
                    <span>View Commercial Opportunities &rarr;</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 3: Important Areas to Explore */}
            <section id="important-areas" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Important Areas to Explore in Dharuhera
              </h2>
              <p>
                Dharuhera has several sectors and developing locations where residential and property opportunities can be found.
              </p>
              <p>
                Depending on the property requirement, buyers may explore areas such as <strong>Sector 3</strong>, <strong>Sector 19</strong>, <strong>Sector 24</strong> and other suitable locations.
              </p>
              <p>
                For example,{' '}
                <Link
                  to="/properties/anandam-estate-dharuhera"
                  className="font-semibold text-gold-700 hover:underline"
                >
                  Anandam Estate
                </Link>{' '}
                is a plotted township associated with Sectors 19 and 24, while Dharuhera also has residential plot opportunities in other sectors.{' '}
                <a
                  href="https://www.mghousing.com/pdfs/anandam-estate.pdf"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-gold-700 hover:underline"
                >
                  <span>MG Housing</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <p>
                The right location ultimately depends on the buyer's purpose, budget and preferred connectivity.
              </p>

              {/* Quick Project Showcase Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <Link
                  to="/properties/anandam-awaas-dharuhera"
                  className="p-4 rounded-xl border border-borderlight bg-white hover:border-gold-500 hover:shadow-md transition text-center space-y-1 block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Sector 19</span>
                  <h4 className="font-serif text-sm font-bold text-charcoal-800">Anandam Awaas</h4>
                  <p className="text-[11px] text-slate-500">View project details &rarr;</p>
                </Link>

                <Link
                  to="/properties/anandam-estate-dharuhera"
                  className="p-4 rounded-xl border border-borderlight bg-white hover:border-gold-500 hover:shadow-md transition text-center space-y-1 block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Sector 24</span>
                  <h4 className="font-serif text-sm font-bold text-charcoal-800">Anandam Estate</h4>
                  <p className="text-[11px] text-slate-500">View project details &rarr;</p>
                </Link>

                <Link
                  to="/properties/tulip-city-sector-3-dharuhera"
                  className="p-4 rounded-xl border border-borderlight bg-white hover:border-gold-500 hover:shadow-md transition text-center space-y-1 block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 block">Sector 3</span>
                  <h4 className="font-serif text-sm font-bold text-charcoal-800">Tulip City</h4>
                  <p className="text-[11px] text-slate-500">View project details &rarr;</p>
                </Link>
              </div>
            </section>

            {/* Section 4: 5 Things to Check Before Buying */}
            <section id="5-things-to-check" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                5 Things to Check Before Buying Property in Dharuhera
              </h2>

              <div className="space-y-3 pt-2">
                {[
                  {
                    step: '1',
                    title: 'Location',
                    desc: "Check the property's connectivity, surrounding development, roads and nearby facilities."
                  },
                  {
                    step: '2',
                    title: 'Property Documents',
                    desc: 'Ownership, approvals and other relevant documents should be reviewed carefully before proceeding.'
                  },
                  {
                    step: '3',
                    title: 'Property Details',
                    desc: 'Understand the property type, size, location, facing, access and other applicable details.'
                  },
                  {
                    step: '4',
                    title: 'Future Requirement',
                    desc: 'Think about whether the property is suitable for your personal use, construction plans, business requirement or investment objective.'
                  },
                  {
                    step: '5',
                    title: 'Your Budget',
                    desc: "Don't look only at the property price. Consider other applicable costs and make sure the property fits within your overall budget."
                  }
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-borderlight shadow-2xs"
                  >
                    <span className="w-8 h-8 rounded-full bg-cream text-gold-700 font-bold text-sm flex items-center justify-center shrink-0 border border-borderlight">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-serif text-base font-bold text-charcoal-800">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: How to Choose */}
            <section id="how-to-choose" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                How to Choose the Right Property in Dharuhera?
              </h2>
              <p>
                There is no single property that is right for every buyer.
              </p>
              <p>
                The best approach is to first define your requirement:
              </p>

              {/* Workflow Pipeline */}
              <div className="p-5 rounded-2xl bg-cream border border-borderlight my-4">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-charcoal-800">
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Purpose</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Location</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Property Type</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Budget</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-borderlight shadow-2xs">Verification</span>
                  <span className="text-gold-700">&rarr;</span>
                  <span className="px-3 py-1.5 rounded-lg bg-gold-500 text-charcoal-950 shadow-xs">Decision</span>
                </div>
              </div>

              <p>
                Once these factors are clear, it becomes easier to compare available property options and shortlist suitable opportunities.
              </p>
            </section>

            {/* Section 6: Explore Property Opportunities with Vedik Realty */}
            <section id="vedik-realty" className="space-y-4 pt-6 border-t border-borderlight">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
                Explore Property Opportunities with Vedik Realty
              </h2>
              <p>
                If you are searching for property in Dharuhera, <strong>Vedik Realty</strong> can help you explore residential plots, residential properties and commercial property opportunities based on your requirement.
              </p>
              <p>
                You can explore available properties and projects on our website and connect with our team for further information.
              </p>

              {/* Internal Link to /properties */}
              <div className="p-6 rounded-2xl bg-white border-2 border-gold-500/40 shadow-sm text-center my-6 space-y-3">
                <h3 className="font-serif text-lg font-bold text-charcoal-800">
                  Explore Properties in Dharuhera
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Browse our curated catalogue of verified residential plots, apartments, and commercial real estate.
                </p>
                <div>
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal-800 hover:bg-gold-500 text-white hover:text-charcoal-900 font-bold text-xs uppercase tracking-wider transition shadow-md"
                  >
                    <span>Explore Properties in Dharuhera</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="bg-cream p-6 rounded-2xl border border-borderlight space-y-3 text-xs sm:text-sm">
                <p className="font-bold text-charcoal-800">
                  Looking for property in Dharuhera? Connect with Vedik Realty for genuine property enquiries.
                </p>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-700 shrink-0" />
                    <span>Dharuhera, Haryana</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-gold-700 shrink-0" />
                    <a href="tel:+919053848222" className="hover:text-gold-700 font-semibold">90538 48222</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-gold-700">🌐</span>
                    <a href="https://vedikrealty.com" className="hover:text-gold-700 font-semibold">www.vedikrealty.com</a>
                  </li>
                </ul>
                <p className="pt-2 italic text-slate-500 font-serif text-xs">
                  Vedik Realty — Finding Spaces, Building Futures.
                </p>
              </div>
            </section>

          </div>
        )}

        {/* BOTTOM CTA: Always present on all articles */}
        <section className="mt-14 py-12 px-6 rounded-3xl bg-cream border border-borderlight text-center relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-800">
              Looking for a Property in <span className="gold-gradient-text font-serif">Dharuhera?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-medium">
              Talk to Vedik Realty for genuine property enquiries.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/919053848222?text=Hi%20Vedik%20Realty,%20I%20am%20looking%20for%20property%20in%20Dharuhera.%20Please%20guide%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+919053848222"
                className="gold-button px-6 py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </section>

      </article>

      {/* Global Quick Enquiry Modal */}
      {modalOpen && (
        <EnquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          source={`Blog Post: ${post.title}`}
        />
      )}
    </div>
  );
}
