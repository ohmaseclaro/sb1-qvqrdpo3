export interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'page' | 'product';
  status: 'draft' | 'published' | 'archived';
  preview: string;
  lastModified: string;
}