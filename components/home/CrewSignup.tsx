"use client";

import { Button } from "@/components/ui/Button";
import { isValidEmail } from "@/lib/crew";
import { track } from "@/lib/analytics";
import type { CrewFormState } from "@/types";
import { FormEvent, useState } from "react";

export function CrewSignup() {
  const [email, setEmail] = useState("");
  const [playtestInterest, setPlaytestInterest] = useState(false);
  const [state, setState] = useState<CrewFormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setState("invalid_email");
      setMessage("That does not look like an email address.");
      return;
    }

    setState("loading");
    track("join_crew_submit");

    try {
      const response = await fetch("/api/crew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, playtestInterest }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        code?: string;
      };

      if (data.ok) {
        setState("success");
        setMessage("We'll send word when Punktown needs you.");
        track("join_crew_success");
        return;
      }

      if (data.code === "invalid_email") {
        setState("invalid_email");
      } else {
        setState("server_error");
      }
      setMessage(data.message ?? "The radio coughed and died.");
    } catch {
      setState("server_error");
      setMessage("The radio coughed and died. Try again in a minute.");
    }
  }

  return (
    <section id="join-the-crew" className="hash-anchor bg-[#c45a28] py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.1fr] md:px-6">
        <div>
          <p className="font-mark text-2xl text-ink">stay on the radio</p>
          <h2 className="display mt-3 text-6xl text-paper md:text-8xl">
            JOIN THE CREW
          </h2>
          <p className="mt-5 max-w-md font-mark text-2xl text-ink">
            Updates. Reveals. Playtests. No fake signup.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="border-4 border-black bg-[#171310] p-6 paint-panel"
          noValidate
        >
          {state === "success" ? (
            <div role="status">
              <p className="display text-6xl text-volt">YOU&apos;RE IN.</p>
              <p className="mt-3 text-paper">{message}</p>
            </div>
          ) : (
            <>
              <label htmlFor="crew-email" className="font-mono text-xs tracking-[0.2em] text-paper">
                EMAIL ADDRESS
              </label>
              <input
                id="crew-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state === "invalid_email") setState("idle");
                }}
                className="mt-2 w-full border border-white/20 bg-ink px-4 py-3 text-paper outline-none focus:border-volt"
                aria-invalid={state === "invalid_email"}
                aria-describedby="crew-help"
                aria-errormessage={state === "invalid_email" ? "crew-error" : undefined}
              />
              <label className="mt-4 flex items-start gap-3 text-sm text-paper">
                <input
                  type="checkbox"
                  checked={playtestInterest}
                  onChange={(event) => setPlaytestInterest(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-volt"
                />
                I want playtest invitations.
              </label>
              <Button
                type="submit"
                variant="tape"
                className="mt-6 w-full"
                disabled={state === "loading"}
              >
                {state === "loading" ? "WIRING..." : "JOIN THE CREW"}
              </Button>
              <p
                id="crew-help"
                className="mt-4 font-mono text-xs tracking-[0.12em] text-haze"
              >
                No account required. We will not fake a signup.
              </p>
              {message ? (
                <p
                  id={state === "invalid_email" ? "crew-error" : "crew-status"}
                  role="alert"
                  className={`mt-2 font-mono text-xs tracking-[0.12em] ${
                    state === "server_error" || state === "invalid_email"
                      ? "text-hazard"
                      : "text-haze"
                  }`}
                >
                  {message}
                </p>
              ) : null}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
