export interface BlogSettings {
  style_prompt: string
  images_style_prompt: string
  images_per_paragraph: number
}

export interface GeneratedContent {
  title: string
  content: string
  excerpt: string
  imagePrompts: string[]
}

export interface ImageMetadata {
  url: string
  storage_path: string
  width: number
  height: number
  size_bytes: number
  mime_type: string
}