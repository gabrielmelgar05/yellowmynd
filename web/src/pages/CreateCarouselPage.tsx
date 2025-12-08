import { CarouselForm } from "@/components/carousel/CarouselForm";
import { CarouselPreview } from "@/components/carousel/CarouselPreview";
import { useState } from "react";
import type { CarouselConfig, Slide } from "@/lib/types/carousel";

const DEFAULT_CONFIG: CarouselConfig = {
  niche: "",
  topic: "",
  description: "",
  audience: "",
  tone: "educativo",
  slidesCount: 5,
  primaryColor: "#FFC700",
  secondaryColor: "#000000",
  coverLayout: "photo_full",
};

export function CreateCarouselPage() {
  const [config, setConfig] = useState<CarouselConfig>(DEFAULT_CONFIG);
  const [slides, setSlides] = useState<Slide[]>([]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <CarouselForm
        config={config}
        onChangeConfig={setConfig}
        onGenerateSlides={setSlides}
      />

      <CarouselPreview config={config} slides={slides} />
    </div>
  );
}
