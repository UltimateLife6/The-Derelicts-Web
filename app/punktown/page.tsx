import { PunktownWorld } from "@/components/punktown/PunktownWorld";
import { createMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Punktown",
  description:
    "A lawless sprawl of junk and rebellion built inside the shell of a long-dead amusement park. Explore the Punktown map.",
  path: "/punktown",
});

export default function PunktownPage() {
  return (
    <div className="punktown-page relative overflow-hidden bg-[#efe6d4] pt-24 pb-16 text-ink md:pt-28 md:pb-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] tracking-[0.18em] text-ink/55">
          <Link href="/" className="hover:text-magenta">
            HOME
          </Link>
          <span className="mx-2 text-ink/35" aria-hidden="true">
            &gt;
          </span>
          <span className="text-ink">PUNKTOWN</span>
        </nav>

        <p className="mt-4 font-mark text-2xl text-magenta md:text-3xl">NO ADULTS ALLOWED</p>
        <h1 className="page-title mt-1 text-[clamp(3.2rem,11vw,7.5rem)] text-ink">
          PUNKTOWN
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/85 md:text-lg">
          A lawless sprawl of junk and rebellion built inside the shell of a long-dead amusement
          park. It&apos;s loud, it&apos;s dangerous, and it&apos;s ours.
        </p>

        <div className="mt-8 md:mt-10">
          <PunktownWorld />
        </div>
      </div>
    </div>
  );
}
