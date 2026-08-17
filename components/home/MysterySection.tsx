import { GlitchText } from "@/components/ui/GlitchText";
import { TerminalPanel } from "@/components/ui/TerminalPanel";

export function MysterySection() {
  return (
    <section className="scene-tunnel relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-15 scanlines" />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <p className="font-mono text-xs tracking-[0.3em] text-flare">
          FILE / REDACTED
        </p>
        <h2 className="page-title mt-4 text-[clamp(2.3rem,7vw,4.6rem)] text-paper">
          THOUSANDS OF KIDS DISAPPEARED.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-haze">
          Everyone assumed they were lost. They weren&apos;t.
        </p>
        <p className="mt-10 font-mark text-3xl text-flare md:text-4xl">
          BUT WHAT IF DISAPPEARING WAS NEVER THEIR IDEA?
        </p>
        <GlitchText
          as="p"
          className="display mt-12 text-5xl text-volt md:text-7xl"
        >
          WHO STARTED THE GREAT DISCARD?
        </GlitchText>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <TerminalPanel title="LOG // UNKNOWN">
            <p>SUBJECTS: █████</p>
            <p>ORIGIN: ████████████</p>
            <p>DIRECTIVE: REMOVE / RELOCATE / ██████</p>
            <p>NOTE: Do not answer this here.</p>
          </TerminalPanel>
          <div className="border border-flare/40 bg-[#14080c] p-5">
            <p className="font-mono text-xs tracking-[0.2em] text-flare">
              SURVEILLANCE STILL
            </p>
            <p className="mt-4 text-sm leading-7 text-paper/80">
              A symbol repeats in maintenance tunnels, on carnival tickets, and
              in files that should not have survived. The Derelicts built
              Punktown. That does not mean they started the disappearing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
