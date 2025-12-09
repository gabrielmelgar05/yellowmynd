// src/pages/CreateCarouselPage.tsx

import { useState } from "react";
import type { CarouselConfig, Slide } from "../lib/types/carousel";
import { CarouselForm } from "../components/carousel/CarouselForm";
import { CarouselPreview } from "../components/carousel/CarouselPreview";

export default function CreateCarouselPage() {
  const [config, setConfig] = useState<CarouselConfig>({
    topic: "",
    description: "",
    niche: "",
    audience: "",
    tone: "educativo",
    slidesCount: 5,
    coverLayout: "photo_full",
    primaryColor: "#ffcc00",
    secondaryColor: "#ffffff",
    userImages: [],
    slides: [],
  });

  const [slides, setSlides] = useState<Slide[]>([]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-8">
      <CarouselForm
        config={config}
        onChangeConfig={setConfig}
        onGenerateSlides={setSlides}
      />

      {slides.length > 0 && (
        <CarouselPreview config={config} slides={slides} />
      )}
    </div>
  );
}
