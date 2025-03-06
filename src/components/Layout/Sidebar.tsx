import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, MessageSquare, FileText, Layout, MessageCircle, Settings } from 'lucide-react';

const menuItems = [
  { 
    icon: Globe, 
    label: 'Websites',
    href: '/websites',
    submenu: [
      { label: 'All Websites', href: '/websites' },
      { label: 'Create Website', href: '/websites/create' }
    ]
  },
  { 
    icon: MessageSquare, 
    label: 'Conversations',
    href: '/conversations',
    submenu: [
      { label: 'All Chats', href: '/conversations' },
      { label: 'Archived', href: '/conversations/archived' }
    ]
  },
  { 
    icon: FileText, 
    label: 'Content',
    href: '/content',
  },
  { 
    icon: Layout, 
    label: 'Pages',
    href: '/pages',
  },
  {
    icon: MessageCircle,
    label: 'Chat',
    href: '/chat',
  },
  {
    icon: Settings,
    label: 'Assistant Settings',
    href: '/assistant-settings',
  }
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-9.5rem)] w-60 bg-white border-r border-gray-200
      transform transition-transform duration-300 ease-in-out z-40
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="h-full overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 group
                  ${isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                `}
              >
                <item.icon size={20} className={`
                  ${isActive(item.href) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                `} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
              
              {item.submenu && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((subitem, subindex) => (
                    <Link
                      key={subindex}
                      to={subitem.href}
                      className={`
                        flex items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-100
                        ${isActive(subitem.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}
                      `}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}