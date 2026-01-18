import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type CostItem = {
  category: string;
  price: string;
  note?: string;
};

export type PostData = {
  slug: string;
  title: string;
  date: string;
  currency?: string;
  costs: CostItem[];
  content: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): PostData | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const costs = Array.isArray(data.costs) ? (data.costs as CostItem[]) : [];

  return {
    slug,
    title: data.title ?? `Cost of Living in ${slug}`,
    date: data.date ?? "",
    currency: data.currency ?? "$",
    costs,
    content
  };
}

export function getAllPosts(): PostData[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is PostData => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
