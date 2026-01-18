import postsData from "@/lib/posts-data.json";

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
  verdict?: string;
  excerpt?: string;
  description?: string;
};
const posts = postsData as PostData[];

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function getPostBySlug(slug: string): PostData | null {
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getAllPosts(): PostData[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
