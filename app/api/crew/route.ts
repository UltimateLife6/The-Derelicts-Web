import { isValidEmail, submitCrewSignup } from "@/lib/crew";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "server_error",
        message: "The radio coughed and died. Try again in a minute.",
      },
      { status: 400 },
    );
  }

  const email =
    typeof body === "object" && body && "email" in body
      ? String((body as { email: unknown }).email)
      : "";
  const playtestInterest =
    typeof body === "object" && body && "playtestInterest" in body
      ? Boolean((body as { playtestInterest: unknown }).playtestInterest)
      : false;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        ok: false,
        code: "invalid_email",
        message: "That does not look like an email address.",
      },
      { status: 400 },
    );
  }

  const result = await submitCrewSignup({ email, playtestInterest });

  if (!result.ok) {
    const status = result.code === "invalid_email" ? 400 : 503;
    return NextResponse.json(result, { status });
  }

  return NextResponse.json(result);
}
