"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostData } from "@/lib/posts";
import { FaHouse, FaBurger, FaTemperatureHigh } from "react-icons/fa6";

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

const tempByCity: Record<string, string> = {
  "Austin, TX": "95°F",
  "Dallas, TX": "96°F",
  "Miami, FL": "90°F",
  "Denver, CO": "88°F",
  "Seattle, WA": "75°F",
  "Phoenix, AZ": "110°F",
  "Atlanta, GA": "92°F",
  "Boston, MA": "85°F",
  "Chicago, IL": "86°F",
  "Houston, TX": "96°F",
  "Los Angeles, CA": "84°F",
  "Nashville, TN": "92°F",
  "New York, NY": "88°F",
  "Philadelphia, PA": "88°F",
  "San Francisco, CA": "72°F"
};

const parsePrice = (raw: string) => {
  const normalized = raw.replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);

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
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-500">
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
          <input
            id="city-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Where are you moving in 2026?"
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-6 py-5 text-lg text-slate-800 shadow-lg shadow-emerald-100/40 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200"
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
            const salaryValue =
              Number.parseInt(salary.replace(/[^0-9]/g, ""), 10) || 0;
            const salaryBadgeClass =
              salaryValue >= 100
                ? "bg-rose-100 text-rose-700"
                : salaryValue >= 80
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-800";

            return (
              <Link
                key={post.slug}
                href={`/cost-of-living/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-emerald-200/40"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  />
                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-md ${salaryBadgeClass}`}
                  >
                    {salary} Salary Req.
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {city}
                    </h3>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-slate-500">
                        <FaHouse className="text-emerald-500" />
                        Rent
                      </span>
                      <span className="font-semibold text-slate-800">
                        $
                        {formatUsd(
                          parsePrice(
                            post.costs.find((item) =>
                              item.category.toLowerCase().includes("rent")
                            )?.price ?? "0"
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-slate-500">
                        <FaBurger className="text-amber-500" />
                        Food
                      </span>
                      <span className="font-semibold text-slate-800">
                        $
                        {formatUsd(
                          parsePrice(
                            post.costs.find((item) =>
                              item.category.toLowerCase().includes("grocer")
                            )?.price ?? "0"
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-slate-500">
                        <FaTemperatureHigh className="text-sky-500" />
                        Temp
                      </span>
                      <span className="font-semibold text-slate-800">
                        {tempByCity[city] ?? "75°F"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
