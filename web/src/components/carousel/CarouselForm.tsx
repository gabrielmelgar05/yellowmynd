// ARQUIVO DO FORM QUE ESTÁ BOM, EU SÓ PRECISO DA ESTRUTURA DO USUARIO
// PODER VISUALIZAR AS MOLDURAS PARA VER COMO FICA NA CAPA DO CARROSSEL:

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type {
  CarouselConfig,
  CoverLayout,
  Slide,
  ToneOfVoice,
} from "../../lib/types/carousel";

interface CarouselFormProps {
  config: CarouselConfig;
  onChangeConfig: (config: CarouselConfig) => void;
  onGenerateSlides: (slides: Slide[]) => void;
}

// --------- opções de tom de voz ----------
const tones: { value: ToneOfVoice; label: string }[] = [
  { value: "educativo", label: "Educativo" },
  { value: "jornalistico", label: "Jornalístico" },
  { value: "dramatico", label: "Dramático" },
  { value: "intelectual", label: "Intelectual" },
  { value: "casual", label: "Casual" },
  { value: "intrigante", label: "Intrigante" },
];

// --------- opções de layout de capa ----------
const coverLayouts: { value: CoverLayout; label: string; description: string }[] =
  [
    {
      value: "photo_full",
      label: "Foto cheia",
      description: "Foto de fundo + texto forte embaixo",
    },
    {
      value: "photo_portal",
      label: "Foto + moldura circular",
      description: "Foto de fundo + círculo com outra imagem",
    },
    {
      value: "photo_split",
      label: "Duas imagens divididas",
      description: "Tela dividida em duas fotos lado a lado",
    },
    {
      value: "solid_manifesto",
      label: "Manifesto sólido",
      description: "Fundo sólido com tipografia dominante",
    },
  ];

// --------- opções de nicho ----------
const nicheOptions: { value: string; label: string }[] = [
  { value: "marketing-digital", label: "Marketing digital" },
  { value: "negocios", label: "Negócios / empreendedorismo" },
  { value: "financas", label: "Finanças / investimentos" },
  { value: "saude-bem-estar", label: "Saúde e bem-estar" },
  { value: "fitness", label: "Fitness / performance" },
  { value: "psicologia", label: "Psicologia / comportamento" },
  { value: "relacionamentos", label: "Relacionamentos" },
  { value: "tecnologia", label: "Tecnologia / IA" },
  { value: "curiosidades", label: "Curiosidades / cultura geral" },
  { value: "news", label: "Notícias / atualidades" },
  { value: "educacao", label: "Educação / estudos" },
  { value: "estetica-beleza", label: "Estética / beleza / moda" },
  { value: "autoridade-pessoal", label: "Autoridade pessoal / branding" },
  { value: "outro", label: "Outro (especificar)" },
];

// --------- opções de público ----------
const audienceOptions: { value: string; label: string }[] = [
  { value: "criadores", label: "Criadores de conteúdo" },
  { value: "empreendedores", label: "Empreendedores / negócios locais" },
  { value: "infoprodutores", label: "Infoprodutores / lançadores" },
  { value: "profissionais-liberais", label: "Profissionais liberais" },
  { value: "estudantes", label: "Estudantes" },
  { value: "publico-geral", label: "Público geral" },
  { value: "mulheres", label: "Mulheres (18–35)" },
  { value: "homens", label: "Homens (18–35)" },
  { value: "gestores", label: "Gestores / líderes" },
  { value: "outro", label: "Outro (especificar)" },
];

// ---------- helper: mock de geração de slides (depois vira chamada de IA) ----------
function generateSlidesMock(config: CarouselConfig): Slide[] {
  const slides: Slide[] = [];

  for (let i = 0; i < config.slidesCount; i++) {
    const index = i + 1;

    if (index === 1) {
      slides.push({
        index,
        title:
          config.topic.trim().length > 0
            ? config.topic
            : "Título principal do carrossel",
        subtitle: "Introdução",
        body:
          "Apresente o contexto geral do tema e provoque a curiosidade do leitor com uma frase de impacto.",
      });
    } else if (index === 2) {
      slides.push({
        index,
        title: "O problema central",
        body:
          "Mostre a dor, a contradição ou o conflito por trás do tema, conectando com a realidade do seu público.",
      });
    } else if (index === config.slidesCount) {
      slides.push({
        index,
        title: "Fechamento e chamada para ação",
        body:
          "Resuma a ideia principal, destaque o insight final e feche com um CTA para salvar, comentar ou compartilhar.",
      });
    } else {
      slides.push({
        index,
        title: `Ponto ${index - 1} da narrativa`,
        body:
          "Desenvolva um argumento, exemplo ou insight específico que avance a lógica do carrossel.",
      });
    }
  }

  return slides;
}

// ---------- preview visual dos layouts ----------
interface LayoutPreviewProps {
  selected: CoverLayout;
  primaryColor: string;
}

function LayoutPreview({ selected, primaryColor }: LayoutPreviewProps) {
  return (
    <div className="mt-2 grid grid-cols-4 gap-2">
      {coverLayouts.map((layout) => {
        const isSelected = layout.value === selected;

        return (
          <div
            key={layout.value}
            className="flex flex-col gap-1"
          >
            <div
              className="aspect-[4/5] w-full rounded-md border bg-neutral-950 p-1"
              style={{
                borderColor: isSelected ? primaryColor : "#27272a", // neutral-800 fallback
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-sm bg-neutral-900 relative overflow-hidden">
                {layout.value === "photo_full" && (
                  <div className="h-full w-full rounded-sm bg-neutral-700" />
                )}

                {layout.value === "photo_portal" && (
                  <>
                    <div className="absolute inset-0 rounded-sm bg-neutral-700" />
                    <div className="relative h-10 w-10 rounded-full border border-neutral-100/50 bg-neutral-300/70" />
                  </>
                )}

                {layout.value === "photo_split" && (
                  <div className="flex h-full w-full gap-0.5">
                    <div className="flex-1 rounded-sm bg-neutral-700" />
                    <div className="flex-1 rounded-sm bg-neutral-600" />
                  </div>
                )}

                {layout.value === "solid_manifesto" && (
                  <div className="flex h-full w-full flex-col justify-center gap-1 rounded-sm bg-neutral-800 px-2">
                    <div className="h-2 w-4/5 rounded-sm bg-neutral-300" />
                    <div className="h-2 w-3/4 rounded-sm bg-neutral-400" />
                    <div className="h-2 w-1/2 rounded-sm bg-neutral-500" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-[10px] font-medium text-neutral-200 leading-tight">
              {layout.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ---------- componente principal ----------
export function CarouselForm({
  config,
  onChangeConfig,
  onGenerateSlides,
}: CarouselFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const [selectedNicheOption, setSelectedNicheOption] = useState<string>(() => {
    if (!config.niche) return "";
    const exists = nicheOptions.some((n) => n.value === config.niche);
    return exists ? config.niche : "outro";
  });

  const [selectedAudienceOption, setSelectedAudienceOption] =
    useState<string>(() => {
      if (!config.audience) return "";
      const exists = audienceOptions.some((a) => a.value === config.audience);
      return exists ? config.audience : "outro";
    });

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
    const slides = generateSlidesMock(config);
    onGenerateSlides(slides);
    setIsGenerating(false);
  }

  function handleImagesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    handleChange("userImages", urls);
  }

  function handleNicheSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedNicheOption(value);

    if (value === "outro") {
      // limpa para o usuário digitar o próprio
      handleChange("niche", "");
    } else {
      handleChange("niche", value);
    }
  }

  function handleAudienceSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedAudienceOption(value);

    if (value === "outro") {
      handleChange("audience", "");
    } else {
      handleChange("audience", value);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4"
    >
      <h2 className="text-lg font-semibold tracking-tight">
        Configuração do carrossel
      </h2>

      {/* NICHO + PÚBLICO */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* NICHO */}
        <div className="space-y-1.5">
          <label
            htmlFor="niche-select"
            className="text-xs font-medium text-neutral-300"
          >
            Nicho
          </label>
          <select
            id="niche-select"
            value={selectedNicheOption}
            onChange={handleNicheSelectChange}
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
          >
            <option value="">Selecione um nicho</option>
            {nicheOptions.map((niche) => (
              <option key={niche.value} value={niche.value}>
                {niche.label}
              </option>
            ))}
          </select>

          {selectedNicheOption === "outro" && (
            <input
              type="text"
              value={config.niche}
              onChange={(e) => handleChange("niche", e.target.value)}
              placeholder="Digite o nicho manualmente"
              className="mt-2 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
            />
          )}
        </div>

        {/* PÚBLICO */}
        <div className="space-y-1.5">
          <label
            htmlFor="audience-select"
            className="text-xs font-medium text-neutral-300"
          >
            Público
          </label>
          <select
            id="audience-select"
            value={selectedAudienceOption}
            onChange={handleAudienceSelectChange}
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
          >
            <option value="">Selecione o público</option>
            {audienceOptions.map((aud) => (
              <option key={aud.value} value={aud.value}>
                {aud.label}
              </option>
            ))}
          </select>

          {selectedAudienceOption === "outro" && (
            <input
              type="text"
              value={config.audience}
              onChange={(e) => handleChange("audience", e.target.value)}
              placeholder="Descreva o público alvo"
              className="mt-2 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
            />
          )}
        </div>

        {/* TEMA */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="topic-input"
            className="text-xs font-medium text-neutral-300"
          >
            Tema / Título do assunto
          </label>
          <input
            id="topic-input"
            value={config.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
            placeholder='Ex.: "Por que nada parece novo na cultura pop"'
          />
        </div>

        {/* DESCRIÇÃO */}
        <div className="space-y-1.5 md:col-span-2">
          <label
            htmlFor="description-input"
            className="text-xs font-medium text-neutral-300"
          >
            Sobre o que precisa ser falado
          </label>
          <textarea
            id="description-input"
            value={config.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="min-h-[80px] w-full resize-y rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
            placeholder="Explique em poucas linhas o que a IA precisa abordar nesse carrossel."
          />
        </div>
      </div>

      {/* TOM, SLIDES, LAYOUT */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* TOM */}
        <div className="space-y-1.5">
          <label
            htmlFor="tone-select"
            className="text-xs font-medium text-neutral-300"
          >
            Tom de voz
          </label>
          <select
            id="tone-select"
            value={config.tone}
            onChange={(e) =>
              handleChange("tone", e.target.value as ToneOfVoice)
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
          >
            {tones.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label}
              </option>
            ))}
          </select>
        </div>

        {/* Nº SLIDES */}
        <div className="space-y-1.5">
          <label
            htmlFor="slides-count-input"
            className="text-xs font-medium text-neutral-300"
          >
            Nº de slides
          </label>
          <input
            id="slides-count-input"
            type="number"
            min={3}
            max={10}
            value={config.slidesCount}
            onChange={(e) =>
              handleChange("slidesCount", Number(e.target.value) || 3)
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
          />
        </div>

        {/* LAYOUT + PREVIEW */}
        <div className="space-y-1.5">
          <label
            htmlFor="cover-layout-select"
            className="text-xs font-medium text-neutral-300"
          >
            Layout da capa
          </label>
          <select
            id="cover-layout-select"
            value={config.coverLayout}
            onChange={(e) =>
              handleChange("coverLayout", e.target.value as CoverLayout)
            }
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm outline-none focus:border-amber-400"
          >
            {coverLayouts.map((layout) => (
              <option key={layout.value} value={layout.value}>
                {layout.label}
              </option>
            ))}
          </select>

          <LayoutPreview
            selected={config.coverLayout}
            primaryColor={config.primaryColor}
          />
        </div>
      </div>

      {/* CORES + IMAGENS */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <label
            htmlFor="primary-color-input"
            className="text-xs font-medium text-neutral-300"
          >
            Cor primária
          </label>
          <input
            id="primary-color-input"
            type="color"
            value={config.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
            className="h-9 w-full rounded-md border border-neutral-700 bg-neutral-950 px-1 py-1"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="secondary-color-input"
            className="text-xs font-medium text-neutral-300"
          >
            Cor secundária
          </label>
          <input
            id="secondary-color-input"
            type="color"
            value={config.secondaryColor}
            onChange={(e) => handleChange("secondaryColor", e.target.value)}
            className="h-9 w-full rounded-md border border-neutral-700 bg-neutral-950 px-1 py-1"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="user-images-input"
            className="text-xs font-medium text-neutral-300"
          >
            Imagens do usuário (opcional)
          </label>
          <input
            id="user-images-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="block w-full cursor-pointer text-xs text-neutral-300 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-amber-500/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-amber-400 hover:file:bg-amber-500/20"
            aria-label="Enviar imagens para o carrossel (opcional)"
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
