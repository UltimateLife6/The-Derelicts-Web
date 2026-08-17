import { ButtonLink } from "@/components/ui/Button";
import { GraffitiLabel } from "@/components/ui/GraffitiLabel";
import { PunktownMap } from "@/components/punktown/PunktownMap";

export function PunktownPreview() {
  return (
    <section className="bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <GraffitiLabel>abandoned park / new city</GraffitiLabel>
        <h2 className="page-title mt-2 text-[clamp(2.8rem,9vw,6.5rem)] text-paper">
          WELCOME TO PUNKTOWN
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-haze">
          An abandoned amusement park transformed into one of the Derelicts&apos;
          settlements. The rides still hum. The junk still talks.
        </p>
        <div className="mt-10">
          <PunktownMap />
        </div>
        <ButtonLink href="/punktown" variant="ghost" className="mt-8">
          EXPLORE PUNKTOWN →
        </ButtonLink>
      </div>
    </section>
  );
}
