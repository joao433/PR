import { useState, useEffect } from 'react';
import Profile from './components/Profile';
import VideoGrid from './components/VideoGrid';
import Admin from './pages/Admin';
import { PortfolioData } from './types';

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if we are on the admin route
    if (window.location.pathname === '/admin') {
      setIsAdmin(true);
    }

    // Fetch initial data
    fetch('/api/config')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen selection:bg-white/10">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_40%)] from-white/5" />
      
      <Profile data={data.profile} />
      <VideoGrid videos={data.videos} />
      
      <footer className="py-12 text-center text-text-secondary/50 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} {data.profile.name} — Editor de Vídeos</p>
      </footer>
    </main>
  );
}
