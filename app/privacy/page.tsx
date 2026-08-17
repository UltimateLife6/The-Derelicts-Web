import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy",
  description: "How The Derelicts site treats visitor data. Join the Crew does not store emails until a provider is connected.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="display text-6xl text-paper">PRIVACY</h1>
        <p className="mt-6 text-lg leading-8 text-haze">
          This page is a placeholder. When Join the Crew is connected to an email
          provider, this policy will describe what is collected and why. No
          visitor emails are stored until that radio is wired.
        </p>
      </div>
    </div>
  );
}
