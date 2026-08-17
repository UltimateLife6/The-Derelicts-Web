import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Terms",
  description: "Terms for the official The Derelicts website. Concept content is not a shipping promise.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="display text-6xl text-paper">TERMS</h1>
        <p className="mt-6 text-lg leading-8 text-haze">
          Placeholder terms for the official The Derelicts website. Game features,
          store links, and community tools are not live. Do not treat concept
          content as a shipping promise.
        </p>
      </div>
    </div>
  );
}
