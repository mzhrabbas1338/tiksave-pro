export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
export interface VideoFormat {
  id: string;
  label: string;
  quality?: string;
  extension: string;
}
export interface MockVideoResult {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  cover: string;
  downloads: string;
  likes: string;
  formats?: VideoFormat[]; // Add formats array
  download_url?: string; // Add download URL
}

export enum DownloadStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  date: string;
  readTime: string;
}

export interface BlogComment {
  id: string;
  name: string;
  content: string;
  date: string;
}