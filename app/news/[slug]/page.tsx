import { getNewsPost, newsPosts } from "@/data/news";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { GameImage } from "@/components/ui/GameImage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return createMetadata({ title: "Missing transmission", path: `/news/${slug}` });
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${slug}`,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-ink pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="font-mono text-xs tracking-[0.22em] text-volt">
          {post.category} {" / "} {formatDate(post.date)}
        </p>
        <h1 className="display mt-3 text-5xl text-paper md:text-7xl">{post.title}</h1>
        <div className="mt-8">
          <GameImage src={post.heroImage} alt={post.title} fit="wide" className="aspect-[16/8]" />
        </div>
        <div className="mt-10 space-y-6">
          {post.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="display text-3xl text-volt">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "terminal") {
              return (
                <TerminalPanel key={index}>
                  {block.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </TerminalPanel>
              );
            }
            return (
              <p key={index} className="text-lg leading-8 text-paper">
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
