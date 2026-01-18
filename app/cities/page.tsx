import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function CitiesPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-800">Cities</h1>
        <p className="max-w-2xl text-slate-600">
          Browse US city datasets with rent, grocery, and insurance benchmarks.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/cost-of-living/${post.slug}`}
            className="rounded-2xl border border-white/40 bg-white/70 p-5 shadow-sm shadow-slate-200/40 transition hover:-translate-y-0.5 hover:shadow-emerald-200/40"
          >
            <p className="text-sm text-emerald-700">Dataset</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-800">
              {post.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Updated {post.date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
