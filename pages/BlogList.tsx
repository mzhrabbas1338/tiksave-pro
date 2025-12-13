import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { getBlogPosts } from '../services/blogService';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Blog Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-brand-cyan font-bold tracking-wider uppercase text-sm mb-4 block">Our Blog</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Latest News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink">Insights</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover tips, trends, and guides to master TikTok and social media growth.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-3xl h-96 animate-pulse" />
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
    className="group glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-brand-cyan/30 transition-all duration-500 hover:-translate-y-2"
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
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors line-clamp-2">
        {post.title}
      </h2>
      
      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
        {post.excerpt}
      </p>
      
      <div className="flex items-center gap-3">
        <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-white/10" />
        <span className="text-sm text-gray-300 font-medium">{post.author.name}</span>
      </div>
    </div>
  </Link>
);

export default BlogList;