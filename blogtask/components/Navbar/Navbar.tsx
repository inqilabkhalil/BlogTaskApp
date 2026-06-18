import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>

        {/* Brand */}
        <Link href="/" className={styles.brand}>
          📝 My<span>Blog</span>
        </Link>

        {/* New Post */}
        <Link href="/create" className={styles.newPostBtn}>
          <span className={styles.plus}>+</span>
          Yeni Post
        </Link>

      </div>
    </nav>
  );
}