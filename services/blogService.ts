import { BlogPost } from '../types';

const BLOG_POSTS: BlogPost[] = [
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
    content: `
      <p class="lead">TikTok has become the go-to platform for viral content, but sharing those videos on other platforms like Instagram Reels or YouTube Shorts is often hindered by the bouncing watermark. Here is how you can remove it safely and easily.</p>
      
      <h2>Why Remove the Watermark?</h2>
      <p>If you are a content creator, repurposing your content is key to growth. Algorithms on platforms like Instagram explicitly state that they deprioritize content with visible watermarks from other apps. By using a tool like <strong>TikSave Pro</strong>, you ensure your content looks native to every platform you post on.</p>

      <h2>Step-by-Step Guide</h2>
      <ul>
        <li><strong>Step 1:</strong> Open the TikTok app and find the video you want to save.</li>
        <li><strong>Step 2:</strong> Tap the "Share" button (the arrow icon).</li>
        <li><strong>Step 3:</strong> Select "Copy Link" from the row of icons.</li>
        <li><strong>Step 4:</strong> Paste the link into TikSave Pro and hit Download.</li>
      </ul>

      <h2>Is it Legal?</h2>
      <p>Downloading videos for personal use is generally acceptable. However, always respect copyright laws. Do not repost content claiming it as your own if you didn't create it. Always credit the original creator.</p>
    `
  },
  {
    id: '2',
    slug: 'top-10-tiktok-trends-october-2025',
    title: 'Top 10 TikTok Trends You Need to Watch This Month',
    excerpt: 'Stay ahead of the curve with our curated list of the hottest viral trends taking over the platform right now.',
    coverImage: 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Social Media Analyst'
    },
    category: 'Trends',
    date: 'Oct 10, 2025',
    readTime: '4 min read',
    content: `
      <p>The TikTok landscape changes faster than any other social platform. Keeping up with trends is essential for growth. Here are the top trends for October 2025.</p>
      
      <h2>1. The "Neon Night" Challenge</h2>
      <p>Creators are using UV lights and neon makeup to create stunning transitions. This trend has seen a 300% spike in engagement over the last week.</p>

      <h2>2. AI Voiceovers</h2>
      <p>With the new realistic AI voice features, storytelling has taken a new turn. Users are creating mini-movies using generated narration.</p>

      <h2>3. Micro-Vlogs</h2>
      <p>The 15-second vlog is back. Fast cuts, high energy, and day-in-the-life content are performing exceptionally well.</p>
      
      <blockquote>"Trends are the waves; you just need to learn how to surf them." - Sarah Chen</blockquote>
    `
  },
  {
    id: '3',
    slug: 'growing-your-tiktok-account-from-zero',
    title: 'The Ultimate Guide to Growing Your TikTok Account',
    excerpt: 'Starting from scratch? Here are the proven strategies to get your first 10,000 followers in record time.',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    author: {
      name: 'Marcus Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      role: 'Growth Hacker'
    },
    category: 'Growth',
    date: 'Oct 05, 2025',
    readTime: '8 min read',
    content: `
      <p>Growing on TikTok in 2025 requires a mix of consistency, quality, and community engagement. The "post anything" days are over.</p>

      <h2>Niche Down</h2>
      <p>Don't try to be everything to everyone. Pick a specific niche (e.g., vegan cooking, retro gaming, financial tips) and stick to it. The algorithm rewards topical authority.</p>

      <h2>Hook Your Audience</h2>
      <p>You have exactly 2 seconds to stop the scroll. Use visual hooks, text overlays, or intriguing questions immediately.</p>

      <h2>Consistency is King</h2>
      <p>Aim for 1-3 videos per day. It sounds like a lot, but quantity leads to quality on TikTok. Use tools to batch produce your content on weekends.</p>
    `
  },
  {
    id: '4',
    slug: 'tiktok-seo-ranking-your-videos',
    title: 'TikTok SEO: How to Rank Your Videos in Search',
    excerpt: 'TikTok is being used as a search engine more than ever. Learn how to optimize your captions and hashtags.',
    coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    author: {
      name: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      role: 'SEO Specialist'
    },
    category: 'Marketing',
    date: 'Oct 01, 2025',
    readTime: '6 min read',
    content: `
      <p>Gen Z uses TikTok as their primary search engine. If you aren't optimizing for search, you are leaving views on the table.</p>

      <h2>Keywords in Captions</h2>
      <p>Gone are the days of short, vague captions. Describe your video using keywords that people might search for. If you are making a pasta recipe, ensure "easy pasta recipe" is in the text.</p>

      <h2>Text-to-Speech</h2>
      <p>The algorithm reads the text on your screen. Use it to reinforce your keywords.</p>

      <h2>Hashtag Strategy</h2>
      <p>Use a mix of broad (e.g., #food) and specific (e.g., #veganpastarecipe) hashtags. 3-5 highly relevant hashtags work better than 30 random ones.</p>
    `
  }
];

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(BLOG_POSTS), 500);
  });
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(BLOG_POSTS.find(post => post.slug === slug)), 500);
  });
};