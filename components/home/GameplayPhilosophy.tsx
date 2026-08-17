const ideas = [
  {
    title: "HACK IT",
    copy: "Take control of doors, cameras and electronics.",
    rotate: "-2.4deg",
    color: "bg-arc text-ink",
    width: "sm:max-w-[18rem]",
  },
  {
    title: "BREAK IT",
    copy: "Dismantle the environment for useful components.",
    rotate: "1.8deg",
    color: "bg-hazard text-ink",
    width: "sm:max-w-[22rem]",
  },
  {
    title: "BUILD IT",
    copy: "Turn junk into weapons, gadgets and vehicles.",
    rotate: "-1.2deg",
    color: "bg-volt text-ink",
    width: "sm:max-w-[20rem]",
  },
  {
    title: "TRAP THEM",
    copy: "Use the environment and inventions strategically.",
    rotate: "2.2deg",
    color: "bg-acid text-ink",
    width: "sm:max-w-[19rem]",
  },
  {
    title: "GET OUT",
    copy: "Sometimes surviving is smarter than fighting.",
    rotate: "-0.8deg",
    color: "bg-paper text-ink",
    width: "sm:max-w-[24rem]",
  },
];

export function GameplayPhilosophy() {
  return (
    <section className="bg-[#f0e2c4] py-20 text-ink md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="page-title text-[clamp(3rem,9vw,6.5rem)]">
          OUTSMART THEM.
        </h2>
        <div className="mt-10 flex flex-wrap items-start gap-5 md:gap-8">
          {ideas.map((idea, index) => (
            <article
              key={idea.title}
              className={`w-full p-5 sticker-shadow ${idea.color} ${idea.width} ${index === 2 ? "md:mt-10" : ""} ${index === 4 ? "md:ml-10" : ""}`}
              style={{ transform: `rotate(${idea.rotate})` }}
            >
              <h3 className="display text-4xl">{idea.title}</h3>
              <p className="mt-3 text-base leading-6">{idea.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
