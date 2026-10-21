import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, User } from 'lucide-react';
import SEO from '../components/SEO';
import { BLOG_POSTS } from '../data/blogData';

export default function BlogListPage() {
  return (
    <div className="bg-ivory text-charcoal-800 font-sans min-h-screen pt-24 sm:pt-28 pb-20">
      <SEO
        title="Dharuhera Real Estate Blog & Buyer Guides | Vedik Realty"
        description="Read insightful real estate guides, property investment advice, and plot buying tips in Dharuhera, Haryana by Vedik Realty."
        keywords="Property in Dharuhera, Dharuhera real estate blog, buy plot in Dharuhera, Anandam Awaas guide, Tulip City Dharuhera, property guide Dharuhera"
        url="https://vedikrealty.com/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream border border-borderlight text-xs font-bold text-gold-700 tracking-widest uppercase shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vedik Realty Knowledge Hub</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-800">
            Dharuhera Property & <span className="gold-gradient-text font-serif">Buyer Guides</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Genuine insights, structured checklists, and expert guidance for buying residential plots, homes, and commercial properties in Dharuhera, Haryana.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="glass-card rounded-3xl overflow-hidden border border-borderlight bg-white hover:border-gold-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-cream">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500 text-charcoal-950 shadow-md">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-700" />
                      Oct 22, 2026
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-700" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-charcoal-800 group-hover:text-gold-700 transition-colors line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-borderlight/60 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  By {post.author}
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-gold-700 hover:text-charcoal-800 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Quick Link to Properties */}
        <div className="mt-16 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream hover:bg-gold-500/20 text-charcoal-800 text-xs font-bold uppercase tracking-wider border border-borderlight transition"
          >
            <span>Explore Properties in Dharuhera &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
