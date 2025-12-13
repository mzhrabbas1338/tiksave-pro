import { MockVideoResult, VideoFormat } from '../types';

const API_BASE_URL = 'https://videodownloader-vslx.onrender.com';

export const fetchVideoData = async (url: string): Promise<MockVideoResult> => {
  try {
    console.log('Fetching video data for:', url);
    
    const response = await fetch(`${API_BASE_URL}/get_info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch video information`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Map API response to your format
    const formats: VideoFormat[] = data.info?.formats?.map((f: any) => ({
      id: f.format_id || f.id,
      label: f.label || f.format_name || `${f.quality || 'Medium'} - ${f.ext || 'mp4'}`,
      extension: f.ext || f.extension || 'mp4',
      quality: f.quality || f.resolution || 'Standard'
    })) || [];

    return {
      id: data.info?.id || data.id || 'unknown',
      title: data.info?.title || data.title || 'Unknown Title',
      author: data.info?.uploader || data.author || 'Unknown Creator',
      authorAvatar: data.info?.uploader_avatar || data.info?.avatar || data.authorAvatar || 'https://via.placeholder.com/150',
      cover: data.info?.thumbnail || data.cover || 'https://via.placeholder.com/500x280',
      downloads: String(data.info?.view_count || data.downloads || '0'),
      likes: String(data.info?.like_count || data.likes || '0'),
      formats: formats
    };
  } catch (error: any) {
    console.error('Fetch error:', error);
    throw new Error(`Failed to fetch video: ${error.message}`);
  }
};

export const downloadVideo = async (url: string, formatId: string): Promise<string> => {
  try {
    console.log('Downloading video:', { url, formatId });

    const response = await fetch(`${API_BASE_URL}/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url: url, 
        format_id: formatId 
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}: Download failed`);
    }

    // Check if response is a blob (direct file) or JSON (URL)
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      console.log('Download response:', data);
      
      if (data.download_url) {
        return data.download_url;
      } else if (data.url) {
        return data.url;
      } else {
        throw new Error('No download URL in response');
      }
    } else {
      // If it's a blob, create a blob URL
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
  } catch (error: any) {
    console.error('Download error:', error);
    throw new Error(`Download failed: ${error.message}`);
  }
};