import type { CarouselConfig, Slide } from "../../lib/types/carousel";
import { SlideCard } from "./SlideCard";

interface CarouselPreviewProps {
  config: CarouselConfig;
  slides: Slide[];
}

export function CarouselPreview({ config, slides }: CarouselPreviewProps) {
  const hasSlides = slides.length > 0;

  return (
    <div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Preview do carrossel
      </h2>

      {/* Preview da capa */}
      <div className="rounded-xl bg-neutral-950 p-3">
        <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-900">
          {/* Esse bloco é só um mock visual da capa. Depois dá pra separar cada layout. */}
          <div className="relative flex h-full flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            {/* background mock */}
            <div className="absolute inset-0 bg-neutral-700/40" />

            <div className="relative z-10 space-y-2 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-200">
                {config.niche || "Nicho não definido"} · Estudo de caso
              </p>
              <h3
                className="text-xl font-black leading-tight"
                style={{ color: config.primaryColor }}
              >
                {config.topic || "Título do carrossel aparece aqui"}
              </h3>
              <p className="text-[11px] text-neutral-200">
                Tom {config.tone} · {config.slidesCount} slides · Público:{" "}
                {config.audience || "não informado"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview dos slides internos */}
      {!hasSlides ? (
        <p className="text-sm text-neutral-400">
          Configure o carrossel e clique em &quot;Gerar carrossel&quot; para
          visualizar a narrativa.
        </p>
      ) : (
        <div className="space-y-3">
          {slides.map((slide) => (
            <SlideCard key={slide.index} slide={slide} config={config} />
          ))}
        </div>
      )}
    </div>
  );
}
