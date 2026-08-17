"use client";

import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export default function ErrorState({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center bg-ink px-4 pt-24 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-hazard">
        SIGNAL LOST
      </p>
      <h1 className="display mt-4 text-5xl text-paper md:text-7xl">
        THE RADIO COUGHED.
      </h1>
      <p className="mt-4 max-w-md text-haze">
        Something on this page broke. The crew can try wiring it again.
      </p>
      <Button variant="tape" className="mt-8" onClick={retry}>
        TRY AGAIN
      </Button>
    </div>
  );
}
