import { ButtonLink } from "@/components/ui/Button";
import { GraffitiLabel } from "@/components/ui/GraffitiLabel";
import { PunktownMap } from "@/components/punktown/PunktownMap";
import { locations } from "@/data/locations";

export function PunktownPreview() {
  return (
    <section className="scene-sky py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <GraffitiLabel className="text-magenta">no adults allowed</GraffitiLabel>
        <h2 className="page-title mt-2 text-[clamp(2.8rem,9vw,6.5rem)]">
          WELCOME TO PUNKTOWN
        </h2>
        <p className="mt-3 max-w-xl text-lg">
          Abandoned amusement park. New city. The rides still hum.
        </p>

        <div className="mt-10">
          <PunktownMap mode="preview" href="/punktown" />
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <ButtonLink href="/punktown" variant="tape" className="w-fit text-xl md:text-2xl">
            EXPLORE PUNKTOWN →
          </ButtonLink>

          <ul
            className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] tracking-[0.18em] text-ink/65 sm:justify-end sm:text-[11px]"
            aria-label="Punktown at a glance"
          >
            <li>{locations.length} LOCATIONS</li>
            <li className="text-ink/30" aria-hidden="true">
              /
            </li>
            <li>WALLED SETTLEMENT</li>
            <li className="text-ink/30" aria-hidden="true">
              /
            </li>
            <li>FORMER AMUSEMENT PARK</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
