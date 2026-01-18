"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostData } from "@/lib/posts";

type HomeSearchProps = {
  posts: PostData[];
};

const extractCity = (title: string) => {
  const match = title.match(/in (.*?)(:|$)/i);
  return match?.[1]?.trim() ?? title;
};

const formatSalaryNeeded = (post: PostData) => {
  const verdictMatch = post.verdict?.match(/\$([\d,]+)/);
  if (verdictMatch) {
    return `$${Number.parseInt(verdictMatch[1].replace(/,/g, ""), 10) / 1000}k`;
  }

  const total = post.costs.reduce(
    (sum, item) =>
      sum + Number.parseFloat(item.price.replace(/[^0-9.]/g, "")),
    0
  );
  const annual = Math.round((total * 12 * 1.25) / 1000) * 1000;
  return `$${annual / 1000}k`;
};

export default function HomeSearch({ posts }: HomeSearchProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return posts;
    }
    return posts.filter((post) =>
      post.title.toLowerCase().includes(value)
    );
  }, [posts, query]);

  return (
    <div className="space-y-10">
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

        <div className="mt-8">
          <label
            htmlFor="city-search"
            className="text-sm font-medium text-slate-700"
          >
            Where are you moving to?
          </label>
          <input
            id="city-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for Austin, Seattle, Miami..."
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-800 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Data sourced from: Zillow
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Redfin</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">USDA</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">BLS</span>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">
            Popular Cities
          </h2>
          <p className="text-sm text-slate-500">
            {filtered.length} cities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const city = extractCity(post.title);
            const salary = formatSalaryNeeded(post);
            const imageUrl = `https://source.unsplash.com/featured/600x400/?${encodeURIComponent(
              city
            )}`;

            return (
              <Link
                key={post.slug}
                href={`/cost-of-living/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-emerald-200/40"
              >
                <div
                  className="h-40 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {city}
                    </h3>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {salary} Salary Needed
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {post.excerpt ??
                      post.description ??
                      "Explore local pricing from rent to utilities with US-standard formatting and USD benchmarks."}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
