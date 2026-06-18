import Link from "next/link";
import PostForm from "@/components/PostForm/PostForm";
import type { Post } from "@/components/types/index";
import styles from "@/styles/pages/edit.module.css";

const API_URL = "https://blog-api-t6u0.onrender.com/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPage({ params }: Props) {
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

      {/* Header */}
      <div className={styles.header}>
        <Link href={`/posts/${id}`} className={styles.back}>
          Postə qayıt
        </Link>
        <h1 className={styles.title}>
          Postu <span>Redaktə et</span>
        </h1>
        <p className={styles.subtitle}>
          Dəyişiklikləri etdikdən sonra yenilə
        </p>
      </div>

      {/* Form */}
      <PostForm mode="edit" initialData={post!} />

    </div>
  );
}
