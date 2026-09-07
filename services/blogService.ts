import { BlogPost } from '../types';
import initialSiteConfig from '../public/data/site_config.json';

const HARDCODED_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-download-tiktok-videos-without-watermark-2025',
    title: 'How to Download TikTok Videos Without Watermark in 2025',
    excerpt: 'The ultimate guide to saving your favorite TikTok content in high quality without the annoying logo overlay.',
    coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Content Creator'
    },
    category: 'Tutorials',
    date: 'Oct 12, 2025',
    readTime: '5 min read',
    content: '<p class="lead">TikTok has become the go-to platform for viral content...</p>'
  }
];

const INITIAL_BLOG_POSTS: BlogPost[] = (initialSiteConfig.blogPosts && Array.isArray(initialSiteConfig.blogPosts) && initialSiteConfig.blogPosts.length > 0)
  ? (initialSiteConfig.blogPosts as BlogPost[])
  : HARDCODED_POSTS;
export const getAllStoredPosts = (): BlogPost[] => {
  const customPostsStr = localStorage.getItem('custom_blog_posts');
  let customPosts: BlogPost[] = [];
  if (customPostsStr) {
    try {
      customPosts = JSON.parse(customPostsStr);
    } catch (e) {
      console.error('Failed to parse custom blog posts', e);
    }
  }

  // Merge custom posts ahead of default posts, avoiding ID collisions
  const customIds = new Set(customPosts.map(p => p.id));
  const filteredInitial = INITIAL_BLOG_POSTS.filter(p => !customIds.has(p.id));
  return [...customPosts, ...filteredInitial];
};

import { getMasterGlobalStore, saveMasterGlobalStore } from './cloudSyncService';

export const saveBlogPost = (post: BlogPost): void => {
  const currentCustom = localStorage.getItem('custom_blog_posts');
  let posts: BlogPost[] = [];
  if (currentCustom) {
    try {
      posts = JSON.parse(currentCustom);
    } catch (e) {}
  }

  const existingIdx = posts.findIndex(p => p.id === post.id);
  if (existingIdx >= 0) {
    posts[existingIdx] = post;
  } else {
    posts.unshift(post);
  }

  localStorage.setItem('custom_blog_posts', JSON.stringify(posts));

  const store = getMasterGlobalStore();
  store.blogPosts = getAllStoredPosts();
  saveMasterGlobalStore(store);
};

export const deleteBlogPost = (id: string): void => {
  const currentCustom = localStorage.getItem('custom_blog_posts');
  let posts: BlogPost[] = [];
  if (currentCustom) {
    try {
      posts = JSON.parse(currentCustom);
    } catch (e) {}
  }

  const filtered = posts.filter(p => p.id !== id);
  localStorage.setItem('custom_blog_posts', JSON.stringify(filtered));

  const store = getMasterGlobalStore();
  store.blogPosts = getAllStoredPosts();
  saveMasterGlobalStore(store);
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getAllStoredPosts()), 200);
  });
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    const allPosts = getAllStoredPosts();
    setTimeout(() => resolve(allPosts.find(post => post.slug === slug)), 200);
  });
};