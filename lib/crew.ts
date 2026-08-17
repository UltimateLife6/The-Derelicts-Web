const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim());
}

export type CrewSignupInput = {
  email: string;
  playtestInterest: boolean;
};

export type CrewSignupResult =
  | { ok: true }
  | {
      ok: false;
      code: "invalid_email" | "unavailable" | "server_error";
      message: string;
    };

export async function submitCrewSignup(
  input: CrewSignupInput,
): Promise<CrewSignupResult> {
  const email = input.email.trim().toLowerCase();

  if (!isValidEmail(email)) {
    return {
      ok: false,
      code: "invalid_email",
      message: "That does not look like an email address.",
    };
  }

  const provider = process.env.CREW_PROVIDER;

  if (!provider) {
    return {
      ok: false,
      code: "unavailable",
      message:
        "Punktown radio is still being wired. Transmissions are not live yet — no email was stored.",
    };
  }

  switch (provider) {
    case "resend":
    case "sendgrid":
    case "mailchimp":
    case "convertkit":
    case "database":
      return {
        ok: false,
        code: "unavailable",
        message:
          "A crew provider is named, but not connected. No email was stored.",
      };
    default:
      return {
        ok: false,
        code: "server_error",
        message: "The radio coughed and died. Try again in a minute.",
      };
  }
}
