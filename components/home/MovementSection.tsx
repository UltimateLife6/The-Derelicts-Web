import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { movementClips } from "@/data/media";

function Strip({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex" aria-hidden={hidden || undefined}>
      {movementClips.map((clip) => (
        <div key={clip.id} className="w-52 shrink-0 border-r-4 border-black p-3 md:w-56">
          <MediaPlaceholder
            label="CLIP SLOT"
            caption={clip.caption}
            imagePath={`/images/media/movement/${clip.id}`}
            videoPath={`/video/gameplay/${clip.id}`}
            className="aspect-[3/4]"
          />
        </div>
      ))}
    </div>
  );
}

export function MovementSection() {
  return (
    <section className="bg-char py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="page-title max-w-4xl text-[clamp(2.3rem,7vw,4.6rem)] text-paper">
          MOVE LIKE YOU BUILT THE PLACE.
        </h2>
        <div className="mt-10 overflow-hidden border-y-4 border-black bg-ink">
          <div className="flex min-w-max motion-safe:animate-ticker">
            <Strip />
            <Strip hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
