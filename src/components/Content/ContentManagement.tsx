import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List } from 'lucide-react';
import ContentList from './ContentList';
import ContentForm from './ContentForm';
import { ContentItem } from './types';

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Getting Started Guide',
    type: 'article',
    status: 'published',
    preview: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=500',
    lastModified: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Product Features',
    type: 'page',
    status: 'draft',
    preview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500',
    lastModified: '2024-03-14T15:45:00Z',
  },
  {
    id: '3',
    title: 'Premium Package',
    type: 'product',
    status: 'published',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
    lastModified: '2024-03-13T09:20:00Z',
  },
];

export default function ContentManagement() {
  const { id: websiteId } = useParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredContent = mockContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (content: ContentItem) => {
    setSelectedContent(content);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setSelectedContent(null);
    setIsEditing(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Content Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
            >
              <List size={20} />
            </button>
          </div>
          
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Content
          </button>
        </div>
      </div>

      <ContentList
        content={filteredContent}
        view={view}
        onEdit={handleEdit}
      />

      <ContentForm
        isOpen={isEditing}
        content={selectedContent}
        onClose={() => setIsEditing(false)}
      />
    </div>
  );
}