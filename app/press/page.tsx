import { PressAssets } from "@/components/press/PressAssets";
import { site } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Press",
  description:
    "Press, publisher, and collaborator overview for The Derelicts. Fact sheet and brand assets.",
  path: "/press",
});

const facts = [
  { label: "Game", value: site.name },
  { label: "Genre", value: site.press.genre },
  { label: "Platform", value: site.press.platform },
  { label: "Engine", value: site.press.engine },
  { label: "Development Status", value: site.press.status },
];

export default function PressPage() {
  return (
    <div className="bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <p className="font-mono text-xs tracking-[0.28em] text-volt">DOSSIER</p>
        <h1 className="display mt-3 text-6xl text-paper md:text-8xl">PRESS</h1>
        <p className="mt-4 max-w-2xl text-haze">
          A professional reference for press, publishers, creators and
          collaborators. Nothing here is invented to look further along than we
          are.
        </p>

        <dl className="mt-12 border-4 border-black bg-[#efe4cc] text-ink shadow-[8px_10px_0_#000]">
          {facts.map((fact) => (
            <div key={fact.label} className="grid gap-2 border-b border-black/20 px-5 py-4 last:border-b-0 md:grid-cols-[220px_1fr]">
              <dt className="font-mono text-[11px] tracking-[0.2em] text-black/60">
                {fact.label.toUpperCase()}
              </dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-12">
          <h2 className="display text-4xl text-paper">SHORT DESCRIPTION</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-haze">
            {site.press.shortDescription}
          </p>
        </section>
        <section className="mt-10">
          <h2 className="display text-4xl text-paper">LONG DESCRIPTION</h2>
          <div className="mt-4 space-y-4 max-w-3xl text-lg leading-8 text-haze">
            {site.press.longDescription.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="display text-4xl text-paper">BRAND ASSETS</h2>
          <p className="mt-3 text-sm text-haze">
            Placeholder SVGs are not offered as a press kit. A slot becomes a
            download when a production file is dropped into{" "}
            <span className="text-paper">public/</span>.
          </p>
          <PressAssets />
        </section>
      </div>
    </div>
  );
}
