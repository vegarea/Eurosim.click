export interface BlogSettings {
  is_active: boolean;
  style_prompt: string;
  generation_frequency: string;
  topics: string[];
  images_style_prompt: string;
  images_per_paragraph: number;
}

export interface GeneratedContent {
  title: string;
  excerpt: string;
  content: string;
  imagePrompts: string[];
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  size_bytes: number;
  mime_type: string;
  storage_path: string;
}