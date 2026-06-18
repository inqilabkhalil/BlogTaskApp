import Link from "next/link";
import PostForm from "@/components/PostForm/PostForm";
import styles from "@/styles/pages/create.module.css";

export default function CreatePage() {
  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <Link href="/" className={styles.back}>
          Ana səhifə
        </Link>
        <h1 className={styles.title}>
          Yeni <span>Post</span>
        </h1>
        <p className={styles.subtitle}>
          Fikirlərini dünya ilə paylaş
        </p>
      </div>

      {/* Form */}
      <PostForm mode="create" />

    </div>
  );
}