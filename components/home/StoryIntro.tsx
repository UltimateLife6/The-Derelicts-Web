import { ButtonLink } from "@/components/ui/Button";
import { resolvePublicAsset } from "@/lib/assets";
import Image from "next/image";

const ORIGIN_ART = "/images/story/origin";

export function StoryIntro() {
  const art = resolvePublicAsset(ORIGIN_ART);

  return (
    <section
      aria-labelledby="origin-heading"
      className="relative overflow-hidden bg-paper py-14 text-ink md:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-8 px-4 md:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center xl:gap-x-12">
        <header className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="inline-flex items-center gap-2 bg-ink px-3 py-1 font-display text-sm tracking-[0.22em] text-volt shadow-[3px_3px_0_var(--magenta)]">
            THE ORIGIN STORY <span className="text-magenta">{"//"}</span> 001
          </p>

          <p className="mt-5 font-mark text-2xl leading-none text-ink/60 md:text-3xl" aria-hidden="true">
            they called them{" "}
            <span className="origin-strike relative inline-block">problems.</span>
          </p>

          <h2
            id="origin-heading"
            className="mt-2 font-mark text-[clamp(2.6rem,6.4vw,4.35rem)] leading-[0.95] text-ink"
          >
            <span className="sr-only">They called them problems. </span>
            THEY CALLED THEM <span className="text-rust">LOST.</span>{" "}
            <br />
            THEY WERE <span className="text-magenta">BUILDING.</span>
          </h2>
        </header>

        <figure className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-20 lg:self-start">
          <span
            className="absolute -left-3 -top-3 z-10 h-6 w-24 -rotate-6 bg-volt/90 shadow-[2px_2px_0_rgba(0,0,0,0.35)] sm:w-28"
            aria-hidden="true"
          />
          <span
            className="absolute -bottom-3 -right-3 z-10 h-6 w-24 -rotate-[8deg] bg-magenta/85 shadow-[2px_2px_0_rgba(0,0,0,0.35)] sm:w-28"
            aria-hidden="true"
          />
          <div className="relative aspect-video rotate-[0.6deg] overflow-hidden border-4 border-black bg-ink shadow-[10px_12px_0_#000]">
            {art?.kind === "raster" ? (
              <Image
                src={art.src}
                alt="The Derelicts welding, hammering, and wiring scrap at sunset as they build Punktown inside the old amusement park."
                fill
                sizes="(max-width: 1024px) 100vw, 740px"
                quality={82}
                className="object-cover object-center"
              />
            ) : (
              <div
                className="hazard-stripe flex h-full w-full items-center justify-center"
                role="img"
                aria-label="Origin story artwork pending"
              >
                <div className="border-4 border-black bg-paper px-5 py-4 text-center shadow-[5px_6px_0_#000]">
                  <p className="font-display text-sm tracking-[0.24em] text-magenta">ORIGIN ART PENDING</p>
                  <p className="mt-1 font-mono text-xs text-ink/70">{ORIGIN_ART}.webp</p>
                </div>
              </div>
            )}
          </div>
          <figcaption className="mt-4 font-display text-xs tracking-[0.24em] text-ink/55">
            FIG. 001 <span className="text-magenta">{"//"}</span> PUNKTOWN
          </figcaption>
        </figure>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="max-w-lg border-l-4 border-hazard pl-4 font-mark text-xl leading-snug md:text-2xl">
            Out of the wreckage, they built something of their own. A place for the forgotten, the unwanted,
            and anyone who refused to give up.
          </p>
          <p className="display mt-6 text-[clamp(2rem,4.2vw,3.25rem)]">
            THEY BECAME{" "}
            <span className="relative isolate inline-block whitespace-nowrap">
              THE DERELICTS.
              <span
                className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-1 bg-volt"
                aria-hidden="true"
              />
            </span>
          </p>
          <ButtonLink
            href="/news/first-transmission"
            variant="ghost"
            className="mt-7 min-h-14 !border-4 !border-black !bg-ink px-7 !text-xl !text-volt shadow-[5px_6px_0_var(--magenta)] hover:-translate-y-0.5 hover:shadow-[7px_8px_0_var(--magenta)] focus-visible:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
          >
            DISCOVER THE STORY →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
