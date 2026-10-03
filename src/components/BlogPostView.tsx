import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';

export const BlogPostView: React.FC = () => {
  const { selectedBlogPost, setActiveTab, blogPosts, openBlogPost, showToast } = useApp();

  const post = selectedBlogPost || blogPosts[0];

  return (
    <div className="bg-[#F7F8FC] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setActiveTab('blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#5865F2] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Local Service Guides</span>
        </button>

        {/* Article Card */}
        <article className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm p-6 sm:p-10">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-[#5865F2] bg-[#F0EEFF] px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </span>
            <span className="text-xs text-gray-400">·</span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#111A4A] tracking-tight mb-3 leading-tight">
            {post.title}
          </h1>

          <div className="font-urdu text-base sm:text-lg text-[#18B88A] font-bold mb-6">
            {post.titleUrdu}
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 bg-gray-100 shadow-inner">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Body Content */}
          <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 mb-10">
            {post.content}
          </div>

          {/* Author Box & Share */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#111A4A] text-white font-bold flex items-center justify-center text-xs">
                {post.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-heading font-bold text-xs text-[#111A4A]">Written by {post.author}</p>
                <p className="text-[11px] text-gray-500">PakPattan Services Hub Certified Trade Contributor</p>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Article link copied to clipboard!');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Guide</span>
            </button>
          </div>

        </article>

        {/* More Articles */}
        <div className="mt-12">
          <h3 className="font-heading font-bold text-xl text-[#111A4A] mb-6">
            More Helpful Guides for Pakpattan & Arifwala Residents
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {blogPosts.filter(p => p.id !== post.id).map(other => (
              <div
                key={other.id}
                onClick={() => openBlogPost(other)}
                className="cursor-pointer p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#5865F2]/40 shadow-sm flex items-center gap-4 card-hover"
              >
                <img src={other.image} alt={other.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                <div>
                  <span className="text-[10px] text-[#5865F2] font-semibold">{other.category}</span>
                  <h4 className="font-heading font-bold text-xs text-[#111A4A] line-clamp-2 mt-0.5">{other.title}</h4>
                  <span className="text-[10px] text-gray-400 mt-1 block">{other.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
