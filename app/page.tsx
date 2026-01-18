import { getAllPosts } from "@/lib/posts";
import HomeSearch from "@/components/HomeSearch";

export default function HomePage() {
  const posts = getAllPosts();

  return <HomeSearch posts={posts} />;
}
