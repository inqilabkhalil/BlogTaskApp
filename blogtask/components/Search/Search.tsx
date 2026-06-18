"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Search.module.css";

export default function Search() {
  const router = useRouter();
  const [value, setValue] = useState("");


  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      if (value) {
        params.set("q", value);
      }

      router.replace(`/?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value, router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>🔍</span>
        <input
          type="text"
          placeholder="Post axtar..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  );
}