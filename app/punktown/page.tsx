import { PunktownMap } from "@/components/punktown/PunktownMap";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Punktown",
  description:
    "An abandoned amusement park transformed into one of the Derelicts' settlements. Explore the map.",
  path: "/punktown",
});

export default function PunktownPage() {
  return (
    <div className="bg-ink pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="font-mark text-3xl text-hazard">settlement fragment</p>
        <h1 className="page-title mt-2 text-[clamp(3.4rem,12vw,8rem)] text-paper">
          PUNKTOWN
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-haze">
          An abandoned amusement park that learned how to be a city. Every booth,
          ride, and flooded path is a pile of parts if you know where to rip.
        </p>
        <div className="mt-10">
          <PunktownMap />
        </div>
      </div>
    </div>
  );
}
