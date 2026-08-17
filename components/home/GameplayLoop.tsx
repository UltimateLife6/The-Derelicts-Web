const steps = [
  "SCAVENGE",
  "DISMANTLE",
  "COMBINE",
  "INVENT",
  "FIGHT",
  "SURVIVE",
];

export function GameplayLoop() {
  return (
    <section id="game" className="hash-anchor relative bg-ink py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[1.05fr_0.95fr] md:items-end md:px-6">
        <div>
          <p className="font-mono text-xs tracking-[0.28em] text-hazard">CORE LOOP</p>
          <h2 className="page-title mt-3 text-[clamp(2.3rem,6.5vw,4.5rem)] text-paper">
            YOUR BEST WEAPON ISN&apos;T WHAT YOU FIND.
          </h2>
          <p className="page-title mt-4 text-[clamp(1.8rem,5vw,3.4rem)] text-volt">
            IT&apos;S WHAT YOU BUILD.
          </p>
          <p className="mt-8 max-w-xl text-lg leading-8 text-haze">
            The environment itself acts as the loot system. Players don&apos;t
            simply search for increasingly powerful guns. They search for useful
            components, rip them out of the world, and invent something worse.
          </p>
        </div>
        <ol className="relative">
          {steps.map((step, index) => (
            <li
              key={step}
              className="relative flex items-center gap-3 border-b border-volt/30 py-3"
              style={{ paddingLeft: `${Math.min(index, 4) * 0.7}rem` }}
            >
              <span className="font-mono text-[11px] text-arc">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display text-3xl text-paper md:text-4xl">{step}</span>
              {index < steps.length - 1 ? (
                <span className="ml-auto text-volt" aria-hidden="true">
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
