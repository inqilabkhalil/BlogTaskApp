import PostCard from "@/components/PostCard/PostCard";
import Search from "@/components/Search/Search";
import type { Post } from "@/components/types";
import styles from "@/styles/pages/home.module.css";

const API_URL = "https://blog-api-t6u0.onrender.com/posts";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { q } = await searchParams;

  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (!res.ok) throw new Error();

    posts = await res.json();

    if (q) {
      posts = posts.filter((post) =>
        post.title.toLowerCase().includes(q.toLowerCase())
      );
    }
  } catch {
    error = "Postlar yüklənmədi. Zəhmət olmasa yenidən cəhd edin.";
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>
          My<span>Blog</span>
        </h1>
      </div>

      <Search />

      {error && <p className={styles.error}>{error}</p>}

      {!error && posts.length === 0 && (
        <div className={styles.empty}>
          <p>🗒️ Post tapılmadı.</p>
        </div>
      )}

      <div className={styles.list}>
        {posts.reverse().map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}