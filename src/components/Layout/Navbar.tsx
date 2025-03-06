import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, User, Settings, Loader2, Plus, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

interface Website {
  id: string;
  name: string;
  url: string;
}

// Mock websites data
const mockWebsites: Website[] = [
  {
    id: '1',
    name: 'E-Commerce Store',
    url: 'store.example.com'
  },
  {
    id: '2',
    name: 'Company Blog',
    url: 'blog.example.com'
  },
  {
    id: '3',
    name: 'Support Portallllllll',
    url: 'support.example.com'
  }
];

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const [websites] = useState<Website[]>(mockWebsites);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (siteRef.current && !siteRef.current.contains(event.target as Node)) {
        setIsSiteOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsSigningOut(false);
      setIsProfileOpen(false);
    }
  };

  const handleWebsiteSelect = (websiteId: string) => {
    navigate(`/websites/${websiteId}`);
    setIsSiteOpen(false);
  };

  const handleProfileClick = (path: string) => {
    navigate(path);
    setIsProfileOpen(false);
  };

  return (
    <nav className="h-16 bg-white border-b border-gray-200 fixed w-full top-0 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
        >
          <Menu size={20} />
        </button>
        <span className="text-xl font-semibold text-gray-800">InstantChat</span>
      </div>

      <div className="flex items-center gap-4">
        {websites.length > 0 ? (
          <div className="flex items-center gap-2">
            {websites.slice(0, 3).map((website) => (
              <button
                key={website.id}
                onClick={() => handleWebsiteSelect(website.id)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700"
              >
                <Globe size={16} />
                {website.name}
              </button>
            ))}
            <div className="relative" ref={siteRef}>
              <button
                onClick={() => setIsSiteOpen(!isSiteOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <span className="text-sm font-medium">Manage Websites</span>
                <ChevronDown size={16} />
              </button>
              
              {isSiteOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-1">
                    <button 
                      onClick={() => handleWebsiteSelect('all')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      All Websites
                    </button>
                    <button 
                      onClick={() => navigate('/websites/create')}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Create Website
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/websites/create')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
            <Plus size={16} />
            Create Website
          </button>
        )}

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="py-1">
                <button
                  onClick={() => handleProfileClick('/profile')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    Profile
                  </div>
                </button>
                <button
                  onClick={() => handleProfileClick('/settings')}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </div>
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningOut ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing out...
                    </div>
                  ) : (
                    'Sign Out'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}