"use client";

import { pressDownloadSlots } from "@/data/media";
import { track } from "@/lib/analytics";
import { isDownloadableAsset, resolvePublicAsset } from "@/lib/assets";

export function PressAssets() {
  return (
    <div className="mt-8 flex flex-wrap gap-5">
      {pressDownloadSlots.map((slot, index) => {
        const file = resolvePublicAsset(slot.path);
        const ready = isDownloadableAsset(slot.path);
        const className = `min-h-36 w-full border-4 border-black bg-steel p-4 text-left shadow-[5px_5px_0_#000] sm:w-[calc(50%-0.65rem)] ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`;

        if (ready && file) {
          return (
            <a
              key={slot.id}
              href={file.src}
              download
              className={className}
              onClick={() => track("press_asset_click", { slot: slot.label })}
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-acid">READY</p>
              <p className="display mt-6 text-3xl text-paper">{slot.label}</p>
            </a>
          );
        }

        return (
          <button
            key={slot.id}
            type="button"
            className={className}
            onClick={() => track("press_asset_click", { slot: slot.label })}
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-volt">COMING SOON</p>
            <p className="display mt-6 text-3xl text-paper">{slot.label}</p>
          </button>
        );
      })}
    </div>
  );
}
