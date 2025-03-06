import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import RightPanel from './components/Layout/RightPanel';
import AuthLayout from './components/Auth/AuthLayout';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import WebsiteList from './components/Website/WebsiteList';
import WebsiteCreation from './components/Website/WebsiteCreation';
import WebsiteManagement from './components/Website/WebsiteManagement';
import ContentManagement from './components/Content/ContentManagement';
import PagesManagement from './components/Pages/PagesManagement';
import ChatInterface from './components/Chat/ChatInterface';
import AssistantSettings from './components/Assistant/AssistantSettings';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthLayout>
        {isSignup ? (
          <SignupForm onSwitchToLogin={() => setIsSignup(false)} />
        ) : (
          <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
        )}
      </AuthLayout>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`
          pt-16 pb-[60px] min-h-screen
          transition-all duration-300
          ${isSidebarOpen ? 'lg:pl-60' : ''}
        `}>
          <Routes>
            <Route path="/" element={<Navigate to="/websites" replace />} />
            <Route path="/websites" element={<WebsiteList />} />
            <Route path="/websites/create" element={<WebsiteCreation />} />
            <Route path="/websites/:id" element={<WebsiteManagement />} />
            <Route path="/websites/:id/content" element={<ContentManagement />} />
            <Route path="/websites/:id/pages" element={<PagesManagement />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/pages" element={<PagesManagement />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/assistant-settings" element={<AssistantSettings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <RightPanel 
          isOpen={isRightPanelOpen} 
          onClose={() => setIsRightPanelOpen(false)}
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Right Panel Content</h3>
            <p className="text-gray-600">
              This is a sliding panel that can contain any content you want to display.
            </p>
          </div>
        </RightPanel>

        <Footer />
      </div>
    </Router>
  );
}

export default App