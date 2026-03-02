import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, LogOut, Video as VideoIcon, User } from 'lucide-react';
import { PortfolioData, Video } from '../types';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedPass = localStorage.getItem('admin_pass');
    if (savedPass) {
      setPassword(savedPass);
      handleLogin(savedPass);
    }
  }, []);

  const handleLogin = async (pass: string) => {
    try {
      const res = await fetch('/api/config');
      const config = await res.json();
      setData(config);
      setIsLoggedIn(true);
      localStorage.setItem('admin_pass', pass);
    } catch (err) {
      alert('Erro ao carregar dados');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': password
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('Salvo com sucesso!');
      } else {
        alert('Erro ao salvar. Verifique a senha.');
      }
    } catch (err) {
      alert('Erro na requisição');
    } finally {
      setLoading(false);
    }
  };

  const addVideo = () => {
    if (!data) return;
    const newVideo: Video = {
      id: Date.now().toString(),
      title: 'Novo Vídeo',
      description: 'Descrição do vídeo',
      youtubeId: 'uelHwf8o7_U'
    };
    setData({ ...data, videos: [newVideo, ...data.videos] });
  };

  const removeVideo = (id: string) => {
    if (!data) return;
    setData({ ...data, videos: data.videos.filter(v => v.id !== id) });
  };

  const updateVideo = (id: string, field: keyof Video, value: string) => {
    if (!data) return;
    setData({
      ...data,
      videos: data.videos.map(v => v.id === id ? { ...v, [field]: value } : v)
    });
  };

  const updateProfile = (field: keyof PortfolioData['profile'], value: string | boolean) => {
    if (!data) return;
    setData({
      ...data,
      profile: { ...data.profile, [field]: value }
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main p-6">
        <div className="w-full max-w-md bg-card-bg p-10 rounded-3xl shadow-2xl border border-white/5">
          <h1 className="text-3xl font-serif font-semibold mb-8 text-center">Acesso Restrito</h1>
          <div className="space-y-6">
            <input
              type="password"
              placeholder="Senha de acesso"
              className="w-full bg-bg-main border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin(password)}
            />
            <button
              onClick={() => handleLogin(password)}
              className="w-full bg-white text-black hover:bg-white/90 py-4 rounded-2xl font-bold transition-all shadow-lg"
            >
              Entrar no Painel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-bg-main text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-4xl font-serif font-semibold">Painel de Controle</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 bg-white text-black hover:bg-white/90 px-8 py-3 rounded-2xl font-bold transition-all disabled:opacity-50 shadow-lg"
            >
              <Save size={20} />
              {loading ? 'Salvando...' : 'Publicar Alterações'}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('admin_pass');
                window.location.reload();
              }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors border border-white/5"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Perfil */}
        <section className="bg-card-bg p-10 rounded-3xl border border-white/5 mb-12 shadow-xl">
          <div className="flex items-center gap-3 mb-8 text-white/40">
            <User size={24} />
            <h2 className="text-2xl font-serif font-semibold text-white">Perfil</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-text-secondary mb-3 font-medium">Nome</label>
              <input
                type="text"
                className="w-full bg-bg-main border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-white transition-colors"
                value={data.profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-3 font-medium">WhatsApp</label>
              <input
                type="text"
                className="w-full bg-bg-main border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-white transition-colors"
                value={data.profile.whatsapp}
                onChange={(e) => updateProfile('whatsapp', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-text-secondary mb-3 font-medium">URL da Foto</label>
              <input
                type="text"
                className="w-full bg-bg-main border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-white transition-colors"
                value={data.profile.photoUrl}
                onChange={(e) => updateProfile('photoUrl', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-text-secondary mb-3 font-medium">Descrição</label>
              <textarea
                className="w-full bg-bg-main border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-white h-32 transition-colors"
                value={data.profile.description}
                onChange={(e) => updateProfile('description', e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
              <input
                type="checkbox"
                id="showWhatsapp"
                className="w-6 h-6 rounded-lg border-white/10 bg-bg-main text-white focus:ring-white cursor-pointer"
                checked={data.profile.showWhatsapp}
                onChange={(e) => updateProfile('showWhatsapp', e.target.checked)}
              />
              <label htmlFor="showWhatsapp" className="text-base font-medium cursor-pointer select-none">
                Exibir botão do WhatsApp no site
              </label>
            </div>
          </div>
        </section>

        {/* Vídeos */}
        <section className="bg-card-bg p-10 rounded-3xl border border-white/5 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3 text-white/40">
              <VideoIcon size={24} />
              <h2 className="text-2xl font-serif font-semibold text-white">Vídeos</h2>
            </div>
            <button
              onClick={addVideo}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-2 rounded-2xl transition-all text-sm font-medium border border-white/5"
            >
              <Plus size={18} />
              Adicionar Vídeo
            </button>
          </div>

          <div className="space-y-8">
            {data.videos.map((video) => (
              <div key={video.id} className="p-8 bg-bg-main rounded-2xl border border-white/5 relative group transition-all hover:border-white/20">
                <button
                  onClick={() => removeVideo(video.id)}
                  className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-all p-2 hover:bg-red-500/10 rounded-xl"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-text-secondary mb-2 uppercase tracking-widest font-bold">Título</label>
                    <input
                      type="text"
                      className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                      value={video.title}
                      onChange={(e) => updateVideo(video.id, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-2 uppercase tracking-widest font-bold">ID do YouTube</label>
                    <input
                      type="text"
                      className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                      value={video.youtubeId}
                      onChange={(e) => updateVideo(video.id, 'youtubeId', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-text-secondary mb-2 uppercase tracking-widest font-bold">Descrição</label>
                    <input
                      type="text"
                      className="w-full bg-card-bg border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-white transition-colors text-sm"
                      value={video.description}
                      onChange={(e) => updateVideo(video.id, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
