import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CostTable from "@/components/CostTable";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Cost of Living Dataset"
    };
  }
  const [city, state] = post.title.includes("in ")
    ? post.title.split("in ").pop()?.split(":")[0]?.split(", ") ?? []
    : [];

  const cityState = city && state ? `${city}, ${state}` : post.title;

  return {
    title: `Cost of Living in ${cityState} - 2026 Prices`,
    description: `US cost of living dataset for ${cityState}, including rent, groceries, and everyday essentials.`
  };
}

export default async function CostOfLivingPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const formatUsd = (value: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

  const parsePrice = (raw: string) => {
    const normalized = raw.replace(/[^0-9.]/g, "");
    const parsed = Number.parseFloat(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const totalMonthly = post.costs.reduce(
    (sum, item) => sum + parsePrice(item.price),
    0
  );
  const derivedSalary = Math.round((totalMonthly * 12 * 1.25) / 1000) * 1000;
  const verdictSalary =
    post.verdict?.match(/\$([\d,]+)/)?.[1]?.replace(/,/g, "") ?? null;
  const salaryNeeded = verdictSalary
    ? Number.parseInt(verdictSalary, 10)
    : derivedSalary;
  const verdictTone = salaryNeeded >= 80000 ? "warning" : "success";
  const verdictClasses =
    verdictTone === "warning"
      ? "border-amber-100 bg-amber-50/70 text-amber-900"
      : "border-emerald-100 bg-emerald-50/70 text-emerald-900";

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: post.title,
    description:
      "US cost of living data with rent, groceries, insurance, and utilities.",
    creator: {
      "@type": "Organization",
      name: "The Modern Ledger"
    },
    datePublished: post.date,
    priceCurrency: "USD"
  };

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">
          US Pricing Dataset
        </p>
        <h1 className="text-4xl font-semibold text-slate-800">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>Published {post.date}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
            Last Updated: Jan 2026
          </span>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-200/40">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Downtown Rent
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-800">
            ${formatUsd(parsePrice(post.costs[0]?.price ?? "0"))}
          </p>
          <p className="text-xs text-slate-500">
            Typical 1-bed monthly
          </p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-200/40">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Total Monthly
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-800">
            ${formatUsd(totalMonthly)}
          </p>
          <p className="text-xs text-slate-500">Estimated monthly spend</p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm shadow-slate-200/40">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Salary Needed
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-800">
            ${Math.round(salaryNeeded / 1000)}k
          </p>
          <p className="text-xs text-slate-500">Comfortable target</p>
        </div>
      </section>

      {post.verdict ? (
        <section className={`rounded-2xl border p-6 ${verdictClasses}`}>
          <p className="text-xs uppercase tracking-[0.2em]">
            Quick Verdict
          </p>
          <p className="mt-3 text-base font-medium text-slate-800">
            {post.verdict}
          </p>
        </section>
      ) : null}

      <CostTable costs={post.costs} currency={post.currency} />

      <section className="prose prose-slate max-w-3xl">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </section>
    </article>
  );
}
