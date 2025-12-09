// src/lib/types/carousel.ts

export type ToneOfVoice =
  | "educativo"
  | "jornalistico"
  | "dramatico"
  | "intelectual"
  | "casual"
  | "intrigante";

export type CoverLayout =
  | "photo_full"
  | "photo_portal"
  | "photo_split"
  | "solid_manifesto";

export interface Slide {
  index: number;
  title: string;
  subtitle?: string;
  body: string;
  imageUrl?: string;
}

export interface CarouselConfig {
  topic: string;
  description: string;

  niche: string;
  audience: string;
  tone: ToneOfVoice;

  slidesCount: number;
  coverLayout: CoverLayout;

  primaryColor: string;
  secondaryColor: string;

  userImages?: string[]; // imagens que o usuário subiu

  slides?: Slide[]; // <--- ESTA PROPRIEDADE FALTAVA
}
