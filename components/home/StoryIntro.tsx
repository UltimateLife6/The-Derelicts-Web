import { ButtonLink } from "@/components/ui/Button";

const beats = [
  { text: "THEY CALLED THEM PROBLEMS.", color: "text-ink" },
  { text: "THEY CALLED THEM LOST.", color: "text-rust" },
  { text: "THEY WERE BUILDING.", color: "text-magenta" },
];

export function StoryIntro() {
  return (
    <section className="relative overflow-hidden bg-[#f0e2c4] text-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="space-y-16 md:space-y-24">
          {beats.map((beat, index) => (
            <p
              key={beat.text}
              className={`font-mark sticky top-24 text-[clamp(2rem,7vw,4.4rem)] leading-none ${beat.color}`}
              style={{ zIndex: index + 1 }}
            >
              {beat.text}
            </p>
          ))}
        </div>

        <div className="relative mt-16 max-w-xl rotate-[-0.6deg] bg-paper p-6 text-ink shadow-[10px_12px_0_#000] md:p-8">
          <span className="absolute -left-2 top-8 h-16 w-4 rotate-[-8deg] bg-hazard" aria-hidden="true" />
          <p className="font-mark text-3xl leading-tight">
            They weren&apos;t lost. They were building.
          </p>
          <p className="display mt-6 text-4xl">They became The Derelicts.</p>
          <ButtonLink href="/news/first-transmission" variant="ghost" className="mt-8 border-ink text-ink hover:border-hazard hover:text-hazard">
            DISCOVER THE STORY →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
