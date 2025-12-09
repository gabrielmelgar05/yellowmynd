// src/components/carousel/CoverLayoutPreview.tsx

import type { CoverLayout } from "../../lib/types/carousel";

interface LayoutPreviewProps {
  selected: CoverLayout;
  primaryColor: string;
}

const layouts: CoverLayout[] = [
  "photo_full",
  "photo_portal",
  "photo_split",
  "solid_manifesto",
];

export function CoverLayoutPreview({ selected, primaryColor }: LayoutPreviewProps) {
  return (
    <div className="mt-2 grid grid-cols-4 gap-2">
      {layouts.map((layout) => {
        const isSelected = layout === selected;

        return (
          <div key={layout} className="flex flex-col gap-1">
            <div
              className="aspect-[4/5] w-full rounded-md border bg-neutral-950 p-1"
              style={{
                borderColor: isSelected ? primaryColor : "#27272a",
              }}
            >
              <div className="relative flex h-full w-full items-center justify-center rounded-sm bg-neutral-900 overflow-hidden">
                {layout === "photo_full" && (
                  <div className="h-full w-full bg-neutral-700 rounded-sm" />
                )}

                {layout === "photo_portal" && (
                  <>
                    <div className="absolute inset-0 rounded-sm bg-neutral-700" />
                    <div className="relative h-10 w-10 rounded-full border border-neutral-100/50 bg-neutral-300/70" />
                  </>
                )}

                {layout === "photo_split" && (
                  <div className="flex h-full w-full gap-0.5">
                    <div className="flex-1 bg-neutral-700 rounded-sm" />
                    <div className="flex-1 bg-neutral-600 rounded-sm" />
                  </div>
                )}

                {layout === "solid_manifesto" && (
                  <div className="flex flex-col justify-center gap-1 px-2 bg-neutral-800 rounded-sm h-full w-full">
                    <div className="h-2 w-4/5 bg-neutral-300 rounded-sm" />
                    <div className="h-2 w-3/4 bg-neutral-400 rounded-sm" />
                    <div className="h-2 w-1/2 bg-neutral-500 rounded-sm" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-[10px] text-neutral-200 leading-tight capitalize">
              {layout.replace("_", " ")}
            </p>
          </div>
        );
      })}
    </div>
  );
}
