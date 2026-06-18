import Link from "next/link";
import type { Post } from "@/components/types/index";
import styles from "./PostCard.module.css";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const preview =
    post.body.length > 120 ? post.body.slice(0, 120) + "..." : post.body;

  return (
    <div className={styles.card}>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <span className={styles.badge}>Post</span>
      </div>

      {/* Preview */}
      <p className={styles.preview}>{preview}</p>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Footer */}
      <div className={styles.footer}>
        <Link href={`/posts/${post.id}`} className={styles.readMore}>
          Oxu
        </Link>
        <span className={styles.postId}>#{post.id}</span>
      </div>

    </div>
  );
}