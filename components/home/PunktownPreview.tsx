import { ButtonLink } from "@/components/ui/Button";
import { GraffitiLabel } from "@/components/ui/GraffitiLabel";
import { PunktownMap } from "@/components/punktown/PunktownMap";

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
          <PunktownMap />
        </div>
        <ButtonLink href="/punktown" variant="ghost" className="mt-8 border-ink text-ink hover:border-magenta hover:text-magenta">
          EXPLORE PUNKTOWN →
        </ButtonLink>
      </div>
    </section>
  );
}
