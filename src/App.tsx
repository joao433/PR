import Profile from './components/Profile';
import VideoGrid from './components/VideoGrid';
import { portfolioData } from './data';

export default function App() {
  return (
    <main className="min-h-screen selection:bg-white/10">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-from),_transparent_40%)] from-white/5" />
      
      <Profile data={portfolioData.profile} />
      <VideoGrid videos={portfolioData.videos} />
      
      <footer className="py-12 text-center text-text-secondary/50 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} {portfolioData.profile.name} — Editor de Vídeos</p>
      </footer>
    </main>
  );
}
