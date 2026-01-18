import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-white/50 bg-white/70 p-10 shadow-lg shadow-slate-200/40 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">
          Real Cost of Living Data for 2026
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-800">
          We track rent, food, and insurance prices across 50 US States to help
          you budget your move.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          Compare apartments, groceries, utilities, and essential monthly
          expenses with USD-first formatting and US locale standards.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/cost-of-living/${post.slug}`}
            className="group rounded-2xl border border-white/40 bg-white/60 p-6 shadow-lg shadow-slate-200/40 backdrop-blur transition hover:-translate-y-1 hover:shadow-emerald-200/40"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-emerald-700">Dataset</p>
              <span className="text-xs text-slate-500">{post.date}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-800">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {post.excerpt ??
                "Explore local pricing from rent to utilities with US-standard formatting and USD benchmarks."}
            </p>
            <span className="mt-4 inline-flex text-sm font-medium text-emerald-700">
              View dataset →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
