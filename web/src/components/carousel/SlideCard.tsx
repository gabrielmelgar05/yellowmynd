import type { CarouselConfig, Slide } from "../../lib/types/carousel";

interface SlideCardProps {
  slide: Slide;
  config: CarouselConfig;
}

export function SlideCard({ slide, config }: SlideCardProps) {
  return (
    <div className="flex gap-3 rounded-lg bg-neutral-950/70 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 text-xs font-semibold text-neutral-200">
        {slide.index}
      </div>

      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-semibold leading-snug">
          {slide.title}
        </h4>

        {slide.subtitle && (
          <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: config.primaryColor }}>
            {slide.subtitle}
          </p>
        )}

        {slide.body && (
          <p className="text-xs text-neutral-300">
            {slide.body}
          </p>
        )}

        {typeof slide.userImageIndex === "number" && config.userImages && (
          <div className="mt-2">
            <div className="h-20 w-full overflow-hidden rounded-md border border-neutral-700 bg-neutral-900">
              <img
                src={config.userImages[slide.userImageIndex]}
                alt={`Imagem do slide ${slide.index}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
