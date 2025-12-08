import { FormEvent, useState } from "react";
import type { CarouselConfig, Slide, ToneOfVoice, CoverLayout } from "../../lib/types/carousel";

interface CarouselFormProps {
  config: CarouselConfig;
  onChangeConfig: (config: CarouselConfig) => void;
  onGenerateSlides: (slides: Slide[]) => void;
}

const tones: { value: ToneOfVoice; label: string }[] = [
  { value: "educativo", label: "Educativo" },
  { value: "jornalistico", label: "Jornalístico" },
  { value: "dramatico", label: "Dramático" },
  { value: "intelectual", label: "Intelectual" },
  { value: "casual", label: "Casual" },
  { value: "intrigante", label: "Intrigante" },
];

const coverLayouts: { value: CoverLayout; label: string }[] = [
  { value: "photo_full", label: "Foto cheia" },
  { value: "photo_portal", label: "Foto + portal" },
  { value: "photo_split", label: "Duas imagens (split)" },
  { value: "solid_manifesto", label: "Manifesto sólido" },
];

function generateSlidesMock(config: CarouselConfig): Slide[] {
  // Apenas para teste de interface. Depois vamos substituir por chamada ao SERVER.
  const slides: Slide[] = [];

  for (let i = 0; i < config.slidesCount; i++) {
    const index = i + 1;

    if (index === 1) {
      slides.push({
        index,
        title: `Por que ${config.topic} importa para ${config.audience}?`,
        subtitle: `Introdução · Tom ${config.tone}`,
        body:
          "Apresente o contexto geral do tema e provoque a curiosidade do leitor. Use uma frase de impacto que conecte com o público.",
      });
    } else if (index === 2) {
      slides.push({
        index,
        title: "O problema por trás do tema",
        body:
          "Mostre o conflito central, a dor ou a contradição que faz esse assunto ser relevante hoje.",
      });
    } else if (index === config.slidesCount) {
      slides.push({
        index,
        title: "Fechamento e chamada para ação",
        body:
          "Faça uma síntese do raciocínio e finalize com uma pergunta ou CTA para salvar e compartilhar o carrossel.",
      });
    } else {
      slides.push({
        index,
        title: `Ponto ${index - 1} da narrativa`,
        body:
          "Explique um insight específico, conectando com exemplos e linguagem que o seu público reconhece.",
      });
    }
  }

  return slides;
}

export function CarouselForm({
  config,
  onChangeConfig,
  onGenerateSlides,
}: CarouselFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  function handleChange<K extends keyof CarouselConfig>(
    key: K,
    value: CarouselConfig[K]
  ) {
    onChangeConfig({
      ...config,
      [key]: value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsGenerating(true);

    // Mock de geração imediata
    const slides = generateSlidesMock(config);
    onGenerateSlides(slides);

    setIsGenerating(false);
  }

  function handleImagesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    handleChange("userImages", urls);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4"
    >
      <h2 className="text-lg font-semibold tracking-tight">
        Configuração do carrossel
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Nicho
          </label>
          <input
            value={config.niche}
            onChange={(e) => handleChange("niche", e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
            placeholder="Ex.: marketing, curiosidades, cultura pop..."
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Público
          </label>
          <input
            value={config.audience}
            onChange={(e) => handleChange("audience", e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
            placeholder="Ex.: jovens criadores, empreendedores..."
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-neutral-300">
            Tema / Título do assunto
          </label>
          <input
            value={config.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
            placeholder='Ex.: "Por que nada parece novo na cultura pop"'
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-neutral-300">
            Sobre o que precisa ser falado
          </label>
          <textarea
            value={config.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="min-h-[80px] w-full resize-y rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
            placeholder="Explique para a IA o que esse carrossel precisa ensinar, provar ou provocar."
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Tom de voz
          </label>
          <select
            value={config.tone}
            onChange={(e) => handleChange("tone", e.target.value as ToneOfVoice)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
          >
            {tones.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Nº de slides
          </label>
          <input
            type="number"
            min={3}
            max={10}
            value={config.slidesCount}
            onChange={(e) =>
              handleChange("slidesCount", Number(e.target.value) || 3)
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Layout da capa
          </label>
          <select
            value={config.coverLayout}
            onChange={(e) =>
              handleChange("coverLayout", e.target.value as CoverLayout)
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-400"
          >
            {coverLayouts.map((layout) => (
              <option key={layout.value} value={layout.value}>
                {layout.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Cor primária
          </label>
          <input
            type="color"
            value={config.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
            className="h-9 w-full rounded-md border border-neutral-700 bg-neutral-900 px-1 py-1"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Cor secundária
          </label>
          <input
            type="color"
            value={config.secondaryColor}
            onChange={(e) => handleChange("secondaryColor", e.target.value)}
            className="h-9 w-full rounded-md border border-neutral-700 bg-neutral-900 px-1 py-1"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300">
            Imagens do usuário (opcional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="block w-full cursor-pointer text-xs text-neutral-300 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-amber-500/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-amber-400 hover:file:bg-amber-500/20"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className="inline-flex items-center rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? "Gerando carrossel..." : "Gerar carrossel (mock)"}
      </button>
    </form>
  );
}
