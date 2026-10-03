import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const { blogPosts, openBlogPost, setActiveTab, language } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5865F2] tracking-wider uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Expert Knowledge</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#111A4A] tracking-tight">
              Local Service Tips & Guides
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xl">
              {language === 'ur'
                ? 'گھریلو دیکھ بھال، سولر انورٹر اور کاریگروں کے انتخاب کے لیے مفید مضامین۔'
                : 'Practical home maintenance advice, solar preservation tips, and local trade guides.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#5865F2] hover:text-[#4752c4] transition group"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => openBlogPost(post)}
              className="group cursor-pointer rounded-3xl bg-[#F7F8FC] border border-gray-100 hover:border-[#5865F2]/40 overflow-hidden flex flex-col justify-between card-hover"
            >
              <div>
                
                {/* Article Image */}
                <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#111A4A]/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#111A4A] group-hover:text-[#5865F2] transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                </div>

              </div>

              {/* Read More Footer */}
              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-[#5865F2]">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
