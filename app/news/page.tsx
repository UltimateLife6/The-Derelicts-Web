import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { newsPosts } from "@/data/news";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = createMetadata({
  title: "News",
  description: "Punktown transmissions, development notes, and Derelict reveals.",
  path: "/news",
});

export default function NewsPage() {
  const [featured, ...rest] = [...newsPosts].sort((a, b) =>
    a.featured === b.featured ? b.date.localeCompare(a.date) : a.featured ? -1 : 1,
  );

  return (
    <div className="bg-ink pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <p className="font-mono text-xs tracking-[0.28em] text-arc">SIGNAL LOG</p>
        <h1 className="page-title mt-2 text-[clamp(3.5rem,12vw,8rem)] text-paper">
          NEWS
        </h1>
        <p className="mt-4 max-w-xl text-haze">
          Transmissions only. No fake patch notes. No invented launch calendar.
        </p>
        {featured ? (
          <div className="mt-10">
            <TerminalPanel title={`TX / ${featured.category} / ${formatDate(featured.date)}`}>
              <p className="display text-4xl text-volt">{featured.title}</p>
              <p className="mt-4 text-paper">{featured.excerpt}</p>
              <Link
                href={`/news/${featured.slug}`}
                className="mt-5 inline-block font-mono text-xs tracking-[0.18em] text-arc underline-offset-4 hover:underline"
              >
                OPEN TRANSMISSION →
              </Link>
            </TerminalPanel>
          </div>
        ) : null}
        <div className="mt-10 space-y-6">
          {rest.map((post, index) => (
            <article
              key={post.slug}
              className={`max-w-xl bg-paper p-5 text-ink sticker-shadow ${index % 2 === 0 ? "-rotate-1" : "rotate-1 md:ml-16"}`}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] opacity-70">
                {post.category} {" / "} {formatDate(post.date)}
              </p>
              <h2 className="display mt-2 text-3xl">
                <Link href={`/news/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-6">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
