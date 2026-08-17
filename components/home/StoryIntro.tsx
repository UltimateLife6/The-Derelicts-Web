import { ButtonLink } from "@/components/ui/Button";

const beats = [
  { text: "THEY CALLED THEM PROBLEMS.", color: "text-paper" },
  { text: "THEY CALLED THEM LOST.", color: "text-haze" },
  { text: "THEY WERE BUILDING.", color: "text-volt" },
];

export function StoryIntro() {
  return (
    <section className="relative overflow-hidden bg-char">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <div className="space-y-20 md:space-y-32">
          {beats.map((beat, index) => (
            <p
              key={beat.text}
              className={`page-title sticky top-24 text-[clamp(2.2rem,8vw,5.5rem)] ${beat.color}`}
              style={{ zIndex: index + 1 }}
            >
              {beat.text}
            </p>
          ))}
        </div>

        <div className="relative mt-20 max-w-3xl rotate-[-0.6deg] bg-[#efe4cc] p-6 text-ink shadow-[10px_12px_0_#000] md:p-10">
          <span className="absolute -left-2 top-8 h-16 w-4 rotate-[-8deg] bg-hazard" aria-hidden="true" />
          <p className="text-lg leading-8">
            For years, kids who didn&apos;t conform were categorized as
            difficult, disruptive, unstable, or incapable of fitting into
            conventional society.
          </p>
          <p className="mt-4 text-lg leading-8">
            Some possessed extraordinary abilities in engineering, chemistry,
            mathematics, computing, mechanics, spatial reasoning, and other
            disciplines.
          </p>
          <p className="mt-4 text-lg leading-8">
            Thousands disappeared. Adults assumed they were lost. They
            weren&apos;t. They were building something underneath the world that
            abandoned them.
          </p>
          <p className="display mt-8 text-4xl md:text-5xl">
            They became The Derelicts.
          </p>
          <ButtonLink href="/news/first-transmission" variant="ghost" className="mt-8 border-ink text-ink hover:border-hazard hover:text-hazard">
            DISCOVER THE STORY →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
