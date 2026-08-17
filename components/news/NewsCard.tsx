import { GameImage } from "@/components/ui/GameImage";
import { formatDate } from "@/lib/utils";
import type { NewsPost } from "@/types";
import Link from "next/link";

export function NewsCard({
  post,
  featured = false,
}: {
  post: NewsPost;
  featured?: boolean;
}) {
  return (
    <article className={`border border-white/10 bg-char ${featured ? "md:grid md:grid-cols-2" : ""}`}>
      <GameImage
        src={post.heroImage}
        alt={post.title}
        fit="wide"
        className={featured ? "aspect-[16/10] md:aspect-auto md:min-h-64" : "aspect-[16/9]"}
      />
      <div className="p-5">
        <p className="font-mono text-[11px] tracking-[0.2em] text-volt">
          {post.category} {" / "} {formatDate(post.date)}
        </p>
        <h2 className="display mt-2 text-3xl text-paper md:text-4xl">
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-haze">{post.excerpt}</p>
      </div>
    </article>
  );
}
