import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Plus, RefreshCw } from 'lucide-react';
import PagesList from './PagesList';
import AddPageModal from './AddPageModal';

interface Page {
  id: string;
  title: string;
  url: string;
  status: 'indexed' | 'not_indexed' | 'error';
  lastScanned: string;
  qualityScore: number;
  details: {
    metaDescription: string;
    wordCount: number;
    loadTime: string;
    mobileOptimized: boolean;
  };
}

const mockPages: Page[] = [
  {
    id: '1',
    title: 'Home Page',
    url: '/',
    status: 'indexed',
    lastScanned: '2024-03-15T10:30:00Z',
    qualityScore: 95,
    details: {
      metaDescription: 'Welcome to our website - your one-stop solution for all needs',
      wordCount: 1500,
      loadTime: '0.8s',
      mobileOptimized: true,
    },
  },
  {
    id: '2',
    title: 'About Us',
    url: '/about',
    status: 'indexed',
    lastScanned: '2024-03-14T15:45:00Z',
    qualityScore: 88,
    details: {
      metaDescription: 'Learn about our company history and mission',
      wordCount: 800,
      loadTime: '1.2s',
      mobileOptimized: true,
    },
  },
  {
    id: '3',
    title: 'Contact',
    url: '/contact',
    status: 'error',
    lastScanned: '2024-03-13T09:20:00Z',
    qualityScore: 65,
    details: {
      metaDescription: '',
      wordCount: 300,
      loadTime: '2.5s',
      mobileOptimized: false,
    },
  },
];

export default function PagesManagement() {
  const { id: websiteId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredPages = mockPages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleAddPage = (url: string) => {
    console.log('Adding page:', url);
    // Here you would typically make an API call to add the page
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Pages Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`
              inline-flex items-center px-4 py-2 rounded-lg transition-colors
              ${isScanning
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'}
            `}
          >
            <RefreshCw className={`h-5 w-5 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Pages'}
          </button>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Page
          </button>
        </div>
      </div>

      {/* Scanning Progress */}
      {isScanning && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Scanning pages...</span>
            <span className="text-sm text-gray-500">{scanProgress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Pages List */}
      <PagesList
        pages={filteredPages}
        expandedRows={expandedRows}
        onToggleRow={toggleRow}
      />

      {/* Add Page Modal */}
      <AddPageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPage}
      />
    </div>
  );
}