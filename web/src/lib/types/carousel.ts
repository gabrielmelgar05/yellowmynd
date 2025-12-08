export type ToneOfVoice =
  | 'educativo'
  | 'jornalistico'
  | 'dramatico'
  | 'intelectual'
  | 'casual'
  | 'intrigante';

export type CoverLayout =
  | 'photo_full'
  | 'photo_portal'
  | 'photo_split'
  | 'solid_manifesto';

export interface CarouselConfig {
  niche: string;
  topic: string;
  description: string;
  audience: string;
  tone: ToneOfVoice;
  slidesCount: number;
  primaryColor: string;
  secondaryColor: string;
  coverLayout: CoverLayout;
  userImages?: string[]; // urls/base64 das imagens que o usuário subir
}

export interface Slide {
  index: number;
  title: string;
  subtitle?: string;
  body?: string;
  imagePrompt?: string;
  userImageIndex?: number; // se usar alguma imagem enviada
}
