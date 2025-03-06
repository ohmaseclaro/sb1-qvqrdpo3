import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'maintenance';
  visitors: number;
  preview: string;
}

const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'E-Commerce Store',
    url: 'store.example.com',
    status: 'online',
    visitors: 1234,
    preview: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '2',
    name: 'Company Blog',
    url: 'blog.example.com',
    status: 'online',
    visitors: 567,
    preview: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=500',
  },
  {
    id: '3',
    name: 'Support Portal',
    url: 'support.example.com',
    status: 'maintenance',
    visitors: 89,
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
  },
];

export default function WebsiteList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const websitesPerPage = 6;

  const filteredWebsites = mockWebsites.filter(website =>
    website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    website.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWebsites.length / websitesPerPage);
  const startIndex = (currentPage - 1) * websitesPerPage;
  const displayedWebsites = filteredWebsites.slice(startIndex, startIndex + websitesPerPage);

  const getStatusColor = (status: Website['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Websites</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search websites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => navigate('/websites/create')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Website
          </button>
        </div>
      </div>

      {displayedWebsites.length === 0 ? (
        <div className="text-center py-12">
          <Globe className="mx-auto h-16 w-16 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No websites found</h3>
          <p className="mt-2 text-gray-500">Get started by creating your first website.</p>
          <button
            onClick={() => navigate('/websites/create')}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Website
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedWebsites.map((website) => (
              <div key={website.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={website.preview}
                    alt={website.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex items-center">
                    <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(website.status)} mr-2`}></span>
                    <span className="text-sm font-medium text-white bg-black bg-opacity-50 px-2 py-1 rounded capitalize">
                      {website.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{website.name}</h3>
                  <p className="text-sm text-gray-500">{website.url}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active visitors</p>
                      <p className="text-lg font-semibold text-gray-900">{website.visitors}</p>
                    </div>
                    
                    <button
                      onClick={() => navigate(`/websites/${website.id}`)}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      Manage
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}