import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogPosts } from '../services/blogService';
import { useSeoSettings } from '../utils/seoManager';

const BlogList: React.FC = () => {
  const seo = useSeoSettings();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (seo.blogPageTitle) {
      document.title = seo.blogPageTitle;
    }
    if (seo.blogPageMetaDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seo.blogPageMetaDescription);
      }
    }
  }, [seo.blogPageTitle, seo.blogPageMetaDescription]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();

    window.addEventListener('blog_posts_updated', fetchPosts);
    window.addEventListener('tiksave_global_store_updated', fetchPosts);
    return () => {
      window.removeEventListener('blog_posts_updated', fetchPosts);
      window.removeEventListener('tiksave_global_store_updated', fetchPosts);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Blog Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-brand-cyan font-bold tracking-wider uppercase text-sm mb-4 block">
            {seo.blogBadge || 'Our Blog'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold dark:text-white text-gray-900 mb-6">
            {seo.blogH1Line1 || 'Latest News &'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">{seo.blogH1Gradient || 'Insights'}</span>
          </h1>
          <p className="dark:text-gray-400 text-gray-600 text-lg max-w-2xl mx-auto">
            {seo.blogSubtitle || 'Discover tips, trends, and guides to master TikTok and social media growth.'}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="dark:bg-white/5 bg-gray-200 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="group glass-card rounded-3xl overflow-hidden dark:border-white/5 border-gray-200 dark:bg-brand-surface bg-white shadow-sm hover:shadow-xl hover:border-brand-cyan/30 transition-all duration-500 hover:-translate-y-2"
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img 
        src={post.coverImage} 
        alt={post.title} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-brand-cyan text-xs font-bold uppercase tracking-wider rounded-full">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-500 mb-3">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>
      
      <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-brand-cyan transition-colors line-clamp-2">
        {post.title}
      </h2>
      
      <p className="dark:text-gray-400 text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
        {post.excerpt}
      </p>
      
      <div className="flex items-center gap-3">
        <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-white/10" />
        <span className="text-sm dark:text-gray-300 text-gray-700 font-medium">{post.author.name}</span>
      </div>
    </div>
  </Link>
);

export default BlogList;