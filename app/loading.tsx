import { TerminalPanel } from "@/components/ui/TerminalPanel";

export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-ink px-4 pt-24">
      <TerminalPanel title="BOOT / PUNKTOWN" className="w-full max-w-lg">
        <p className="motion-safe:animate-flicker">WIRING PUNKTOWN...</p>
        <p>LOADING CREW FILES</p>
        <p>MAP FRAGMENTS / PARTIAL</p>
      </TerminalPanel>
    </div>
  );
}
