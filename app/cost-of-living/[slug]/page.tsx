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
        <p className="text-sm text-slate-500">Published {post.date}</p>
      </header>

      {post.verdict ? (
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
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
