import React from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

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

interface PagesListProps {
  pages: Page[];
  expandedRows: Set<string>;
  onToggleRow: (id: string) => void;
}

export default function PagesList({ pages, expandedRows, onToggleRow }: PagesListProps) {
  const getStatusIcon = (status: Page['status']) => {
    switch (status) {
      case 'indexed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'not_indexed':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getQualityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 px-6 py-3"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Page
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quality Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Scanned
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pages.map((page) => (
            <React.Fragment key={page.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleRow(page.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedRows.has(page.id) ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    <div className="text-sm text-gray-500">{page.url}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getStatusIcon(page.status)}
                    <span className="ml-2 text-sm capitalize">
                      {page.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${getQualityScoreColor(page.qualityScore)}
                  `}>
                    {page.qualityScore}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(page.lastScanned).toLocaleDateString()}
                </td>
              </tr>
              {expandedRows.has(page.id) && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Meta Description
                        </h4>
                        <p className="text-sm text-gray-500">
                          {page.details.metaDescription || 'No meta description'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Word Count</span>
                          <div className="text-sm font-medium">{page.details.wordCount}</div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Load Time</span>
                          <div className="text-sm font-medium">{page.details.loadTime}</div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Mobile Optimized</span>
                          <div className={`text-sm font-medium ${
                            page.details.mobileOptimized ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {page.details.mobileOptimized ? 'Yes' : 'No'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}