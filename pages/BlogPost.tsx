import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost, BlogComment } from '../types';
import { getBlogPostBySlug } from '../services/blogService';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Comment state
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const data = await getBlogPostBySlug(slug);
      if (!data) {
        navigate('/blog'); 
        return;
      }
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug, navigate]);

  // Load comments from localStorage
  useEffect(() => {
    if (slug) {
      const savedComments = localStorage.getItem(`comments-${slug}`);
      if (savedComments) {
        try {
          setComments(JSON.parse(savedComments));
        } catch (e) {
          console.error('Failed to parse comments', e);
          setComments([]);
        }
      } else {
        setComments([]);
      }
    }
  }, [slug]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.content.trim() || !slug) return;

    const comment: BlogComment = {
      id: Date.now().toString(),
      name: newComment.name,
      content: newComment.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [comment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments-${slug}`, JSON.stringify(updated));
    setNewComment({ name: '', content: '' });
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-darker/50 to-brand-darker z-10" />
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-gray-300 hover:text-brand-cyan mb-6 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brand-pink/90 backdrop-blur text-white text-xs font-bold uppercase tracking-wider rounded-full">
                {post.category}
              </span>
              <span className="text-gray-300 text-sm">{post.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border-2 border-white/20" />
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-brand-cyan text-sm">{post.author.role}</p>
              </div>
              <div className="w-px h-8 bg-white/20 mx-2" />
              <p className="text-gray-400 text-sm">{post.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div 
          className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-brand-cyan prose-strong:text-white prose-blockquote:border-brand-pink prose-li:text-gray-300"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        {/* Share Section */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 font-medium">Share this article:</p>
          <div className="flex gap-4">
             <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1DA1F2] transition-colors text-white">
               <span className="sr-only">Twitter</span>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </button>
             <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#4267B2] transition-colors text-white">
               <span className="sr-only">Facebook</span>
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
             </button>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h3 className="text-2xl font-bold text-white mb-8">Comments ({comments.length})</h3>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12">
          <h4 className="text-lg font-semibold text-white mb-4">Leave a comment</h4>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan transition-colors"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Share your thoughts..."
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan transition-colors min-h-[100px]"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-brand-cyan text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors"
          >
            Post Comment
          </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold border border-white/10">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="text-white font-bold">{comment.name}</h5>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-gradient-to-r from-brand-cyan/10 to-brand-pink/10 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
           <h3 className="text-2xl font-bold text-white mb-4">Join 50,000+ Creators</h3>
           <p className="text-gray-400 mb-8">Get the latest TikTok trends and growth hacks delivered to your inbox.</p>
           <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="flex-grow px-6 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan transition-colors"
             />
             <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-brand-cyan transition-colors">
               Subscribe
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;