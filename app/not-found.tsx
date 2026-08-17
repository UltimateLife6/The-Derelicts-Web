import { ButtonLink } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You went too far underground",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center bg-ink px-4 pt-24 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-flare">404 / DEAD END</p>
      <h1 className="page-title mt-4 max-w-3xl text-[clamp(2.4rem,8vw,5rem)] text-paper">
        YOU WENT TOO FAR UNDERGROUND.
      </h1>
      <p className="mt-4 max-w-md text-haze">
        Whatever you were looking for isn&apos;t here.
      </p>
      <ButtonLink href="/punktown" variant="arcade" className="mt-8">
        BACK TO PUNKTOWN
      </ButtonLink>
    </div>
  );
}
