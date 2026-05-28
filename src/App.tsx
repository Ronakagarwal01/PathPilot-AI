import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { AIChatbot } from './components/AIChatbot';
import { Footer } from './components/Footer';

// Core Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { RoadmapPage } from './pages/RoadmapPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { CrtAptitudePage } from './pages/CrtAptitudePage';
import { MockTestPage } from './pages/MockTestPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { JobsInternshipsPage } from './pages/JobsInternshipsPage';
import { CodingPlatformPage } from './pages/CodingPlatformPage';
import { GamificationPage } from './pages/GamificationPage';
import { CompanyPrepPage } from './pages/CompanyPrepPage';
import { AdminPanelPage } from './pages/AdminPanelPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  // Sync hash with state routing to allow seamless browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('landing');
      }
    };

    // Initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render content based on current active view
  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'auth':
        return <AuthPage onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'skills':
        return <SkillGapPage onNavigate={navigateTo} />;
      case 'crt':
        return <CrtAptitudePage />;
      case 'tests':
        return <MockTestPage />;
      case 'interview':
        return <MockInterviewPage />;
      case 'resume':
        return <ResumeAnalyzerPage />;
      case 'jobs':
        return <JobsInternshipsPage />;
      case 'coding':
        return <CodingPlatformPage />;
      case 'gamification':
        return <GamificationPage />;
      case 'company':
        return <CompanyPrepPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminPanelPage />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  const isFullPage = currentPage === 'landing' || currentPage === 'auth';

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-600 selection:text-white">
        
        {/* Persistent Top Navbar */}
        <Navbar 
          onOpenChat={() => setIsChatbotOpen(true)} 
          onNavigate={navigateTo} 
          currentPage={currentPage}
        />

        {/* Dynamic App Layout */}
        {isFullPage ? (
          <main className="flex-1">
            {renderContent()}
          </main>
        ) : (
          <div className="flex flex-1">
            
            {/* Desktop / Tablet Core Sidebar */}
            <Sidebar 
              currentPage={currentPage} 
              onNavigate={navigateTo} 
            />

            {/* Main Application Body Container */}
            <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
              {renderContent()}
            </main>

          </div>
        )}

        {/* Global Hover / Inline Chatbot Overlay */}
        <AIChatbot 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />

        {/* Mobile quick bottom navigation tabs */}
        {!isFullPage && (
          <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around bg-slate-950/90 border-t border-slate-800 p-2 backdrop-blur-md lg:hidden">
            <button
              onClick={() => navigateTo('dashboard')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${
                currentPage === 'dashboard' ? 'text-purple-400 font-bold' : 'text-slate-400'
              }`}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigateTo('roadmap')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${
                currentPage === 'roadmap' ? 'text-purple-400 font-bold' : 'text-slate-400'
              }`}
            >
              <span>🗺️</span>
              <span>Roadmap</span>
            </button>
            <button
              onClick={() => navigateTo('interview')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${
                currentPage === 'interview' ? 'text-purple-400 font-bold' : 'text-slate-400'
              }`}
            >
              <span>🎙️</span>
              <span>Voice AI</span>
            </button>
            <button
              onClick={() => navigateTo('jobs')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${
                currentPage === 'jobs' ? 'text-purple-400 font-bold' : 'text-slate-400'
              }`}
            >
              <span>💼</span>
              <span>Jobs</span>
            </button>
            <button
              onClick={() => navigateTo('coding')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${
                currentPage === 'coding' ? 'text-purple-400 font-bold' : 'text-slate-400'
              }`}
            >
              <span>💻</span>
              <span>IDE</span>
            </button>
          </div>
        )}

        {/* Render premium footer only on Landing page to keep webapp clean */}
        {currentPage === 'landing' && (
          <Footer onNavigate={navigateTo} />
        )}

      </div>
    </AppProvider>
  );
}
