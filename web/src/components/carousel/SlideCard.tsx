// src/components/carousel/SlideCard.tsx

import type { Slide } from "../../lib/types/carousel";

export function SlideCard({ slide }: { slide: Slide }) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-neutral-200 space-y-2">
      <p className="text-xs opacity-70">#{slide.index}</p>
      <h3 className="text-sm font-semibold">{slide.title}</h3>
      {slide.subtitle && <p className="text-xs opacity-80">{slide.subtitle}</p>}
      <p className="text-xs leading-relaxed">{slide.body}</p>
    </div>
  );
}
