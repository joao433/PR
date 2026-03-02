export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

export interface ProfileData {
  name: string;
  description: string;
  photoUrl: string;
  whatsapp: string;
  showWhatsapp: boolean;
}

export interface PortfolioData {
  profile: ProfileData;
  videos: Video[];
}
