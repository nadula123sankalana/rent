import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");
const outputFile = path.join(process.cwd(), "lib", "posts-data.json");

if (!fs.existsSync(postsDir)) {
  console.error("Posts directory not found:", postsDir);
  process.exit(1);
}

const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

const posts = files.map((file) => {
  const slug = file.replace(/\.md$/, "");
  const filePath = path.join(postsDir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? `Cost of Living in ${slug}`,
    date: data.date ?? "",
    currency: data.currency ?? "$",
    costs: Array.isArray(data.costs) ? data.costs : [],
    content,
    verdict: data.verdict ?? "",
    excerpt: data.excerpt ?? data.description ?? ""
  };
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
console.log(`Wrote ${posts.length} post(s) to ${outputFile}`);
