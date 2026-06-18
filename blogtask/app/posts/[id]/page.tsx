import Link from "next/link";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import type { Post } from "@/components/types/index";
import styles from "@/styles/pages/detail.module.css";

const API_URL = "https://blog-api-t6u0.onrender.com/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;

  let post: Post | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

    if (res.status === 404) throw new Error("404");
    if (!res.ok) throw new Error("500");

    post = await res.json();
  } catch (err: any) {
    error =
      err.message === "404"
        ? "Post tapılmadı (404)"
        : "Xəta baş verdi. Yenidən cəhd edin.";
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <Link href="/" className={styles.errorBack}>
          Ana səhifəyə qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      {/* Back */}
      <Link href="/" className={styles.back}>
        Ana səhifə
      </Link>

      {/* Meta */}
      <div className={styles.meta}>
        <span className={styles.badge}>Post</span>
        <span className={styles.postId}>#{id}</span>
      </div>

      {/* Title */}
      <h1 className={styles.title}>{post?.title}</h1>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Body */}
      <p className={styles.body}>{post?.body}</p>

      {/* Actions */}
      <div className={styles.actions}>
        <Link href={`/posts/${id}/edit`} className={styles.editBtn}>
          ✏️ Redaktə et
        </Link>
        <DeleteButton id={Number(id)} />
      </div>

    </div>
  );
}
