import React from 'react';
import { Edit2, Eye, Trash2 } from 'lucide-react';
import { ContentItem } from './types';

interface ContentCardProps {
  content: ContentItem;
  onEdit: (content: ContentItem) => void;
}

export default function ContentCard({ content, onEdit }: ContentCardProps) {
  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={content.preview}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
            {content.status}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
            <p className="text-sm text-gray-500 capitalize">{content.type}</p>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(content.lastModified).toLocaleDateString()}
          </span>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onEdit(content)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}