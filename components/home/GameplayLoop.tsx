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
    <section id="game" className="hash-anchor relative bg-[#171310] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-[1.05fr_0.95fr] md:items-end md:px-6">
        <div>
          <p className="font-mark text-2xl text-hazard">the loop</p>
          <h2 className="page-title mt-2 text-[clamp(2.3rem,6.5vw,4.5rem)] text-paper">
            THE MAP IS YOUR INVENTORY.
          </h2>
          <p className="mt-4 font-mark text-3xl text-volt">RIP IT APART.</p>
          <p className="mt-3 font-mark text-3xl text-magenta">MAKE SOMETHING BETTER.</p>
        </div>
        <ol className="relative paint-panel p-5">
          {steps.map((step, index) => (
            <li
              key={step}
              className="relative flex items-center gap-3 border-b border-white/15 py-3 last:border-b-0"
            >
              <span className="font-display text-xl text-arc">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display text-3xl text-paper md:text-4xl">{step}</span>
              {index < steps.length - 1 ? (
                <span className="eq-mark ml-auto text-2xl" aria-hidden="true">
                  +
                </span>
              ) : (
                <span className="eq-mark ml-auto text-2xl" aria-hidden="true">
                  =
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
