import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description: "Press and collaboration contact for The Derelicts. A public address is not published yet.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h1 className="display text-6xl text-paper">CONTACT</h1>
        <p className="mt-6 text-lg leading-8 text-haze">
          Press and collaboration contact will live here. Until a public address
          is published, treat this channel as{" "}
          <span className="text-volt">TRANSMISSION PENDING</span>.
        </p>
      </div>
    </div>
  );
}
