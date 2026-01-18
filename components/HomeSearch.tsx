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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Suggestions for autocomplete
  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return [];
    }
    return posts
      .filter((post) => {
        const city = extractCity(post.title);
        return city.toLowerCase().includes(value) || post.title.toLowerCase().includes(value);
      })
      .slice(0, 5); // Limit to 5 suggestions
  }, [posts, query]);

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
    <div>
      <section className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)', marginTop: '-3rem', maxWidth: '100vw' }}>
        {/* Background image - full screen */}
        <div className="absolute inset-0 -z-0">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/tiny.jpg)' }}
          ></div>
          {/* Black transparent overlay for better content visibility */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 text-center md:px-12">
          {/* Badge - white text */}
          <div className="mb-6 inline-flex items-center justify-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-white">
              Real Cost of Living Data for 2026
            </span>
            <span className="h-px w-8 bg-white/60"></span>
          </div>

          {/* Main heading - white text */}
          <h1 className="mx-auto mb-6 max-w-5xl text-3xl font-medium leading-[1.3] text-white md:text-4xl lg:text-5xl lg:leading-[1.2]">
            We track rent, food, and insurance prices across{" "}
            <span className="relative inline-block text-white">
              <span className="relative z-10">50 US States</span>
              <span className="absolute bottom-1.5 left-0 z-0 h-2.5 w-full bg-emerald-400/50"></span>
            </span>{" "}
            to help you budget your move.
          </h1>

          {/* Description - white text */}
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
            Compare apartments, groceries, utilities, and essential monthly
            expenses with USD-first formatting and US locale standards.
          </p>

          {/* Search input - larger and more prominent */}
          <div className="mx-auto mb-8 max-w-3xl">
            <div className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="city-search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowSuggestions(true);
                  setFocusedIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay to allow click events on suggestions
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setFocusedIndex((prev) => 
                      prev < suggestions.length - 1 ? prev + 1 : prev
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                  } else if (e.key === "Enter" && focusedIndex >= 0) {
                    e.preventDefault();
                    const selectedPost = suggestions[focusedIndex];
                    window.location.href = `/cost-of-living/${selectedPost.slug}`;
                  }
                }}
                placeholder="Where are you moving in 2026?"
                className="w-full rounded-full border-2 border-white/30 bg-white/95 px-16 py-5 text-lg text-slate-800 shadow-xl shadow-black/20 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-white focus:bg-white focus:shadow-2xl focus:shadow-black/30 md:text-xl md:py-6"
              />
              
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50 border border-slate-100">
                  {suggestions.map((post, index) => {
                    const city = extractCity(post.title);
                    return (
                      <Link
                        key={post.slug}
                        href={`/cost-of-living/${post.slug}`}
                        className={`block px-6 py-3.5 transition-all duration-150 ${
                          index === focusedIndex
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-700 hover:bg-slate-50"
                        } ${index !== suggestions.length - 1 ? "border-b border-slate-100" : ""}`}
                        onMouseEnter={() => setFocusedIndex(index)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-base">{city}</span>
                          <svg
                            className={`h-4 w-4 transition-colors ${
                              index === focusedIndex
                                ? "text-emerald-500"
                                : "text-slate-300"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Data sources - white text */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="font-normal text-white/80">Data sourced from:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {["Zillow", "Redfin", "USDA", "BLS"].map((source) => (
                <span
                  key={source}
                  className="rounded-md bg-white/90 px-3 py-1 text-xs font-normal text-slate-700 shadow-lg transition-all hover:bg-white hover:shadow-xl"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
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
