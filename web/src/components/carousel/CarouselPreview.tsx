// src/components/carousel/CarouselPreview.tsx

import { SlideCard } from "./SlideCard";
import type { CarouselConfig, Slide } from "../../lib/types/carousel";
import { CoverLayoutPreview } from "./CoverLayoutPreview";

interface Props {
  config: CarouselConfig;
  slides: Slide[];
}

export function CarouselPreview({ config, slides }: Props) {
  return (
    <div className="space-y-6 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
      <h2 className="text-lg font-semibold">Pré-visualização</h2>

      <div className="grid grid-cols-3 gap-4">
        
        {/* RESUMO */}
        <div className="col-span-3 md:col-span-1 bg-neutral-950 border border-neutral-800 p-3 rounded-lg">
          <p className="text-sm">
            Tema: <b>{config.topic || "Sem título"}</b>
          </p>
          <p className="text-xs opacity-70">Tom: {config.tone}</p>
          <p className="text-xs opacity-70">Público: {config.audience}</p>
          <p className="text-xs opacity-70">{config.slidesCount} slides</p>

          <div className="mt-3">
            <CoverLayoutPreview
              selected={config.coverLayout}
              primaryColor={config.primaryColor}
            />
          </div>
        </div>

        {/* SLIDES */}
        <div className="col-span-3 md:col-span-2 grid gap-3">
          {slides.map((slide) => (
            <SlideCard key={slide.index} slide={slide} />
          ))}
        </div>
      </div>
    </div>
  );
}
