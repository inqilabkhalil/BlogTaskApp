"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import type { Post } from "@/components/types/index";
import styles from "./PostForm.module.css";

// ── Types ──────────────────────────────────────────
type FormValues = {
  title: string;
  body: string;
};

type Props = {
  mode: "create" | "edit";
  initialData?: Post;
};

// ── Constants ──────────────────────────────────────
const API_URL = "https://blog-api-t6u0.onrender.com/posts";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Başlıq ən az 3 simvol olmalıdır")
    .max(100, "Başlıq ən çox 100 simvol ola bilər")
    .required("Başlıq mütləqdir"),
  body: Yup.string()
    .min(10, "Mətn ən az 10 simvol olmalıdır")
    .required("Mətn mütləqdir"),
});

// ── Component ──────────────────────────────────────
export default function PostForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const isEdit = mode === "edit";
  const url = isEdit ? `${API_URL}/${initialData?.id}` : API_URL;
  const method = isEdit ? "PUT" : "POST";

  // ── Formik ───────────────────────────────────────
  const formik = useFormik<FormValues>({
    initialValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error();

        router.push(isEdit ? `/posts/${initialData?.id}` : "/");
      } catch {
        setServerError("Əməliyyat uğursuz oldu. Yenidən cəhd edin.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ── Render ───────────────────────────────────────
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>

      {/* Server xətası */}
      {serverError && <p className={styles.error}>{serverError}</p>}

      {/* Başlıq */}
      <div className={styles.formGroup}>
        <label htmlFor="title">Başlıq</label>
        <input
          id="title"
          type="text"
          placeholder="Post başlığı..."
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.title && formik.errors.title
              ? styles.inputError
              : ""
          }
        />
        {formik.touched.title && formik.errors.title && (
          <p className={styles.fieldError}>{formik.errors.title}</p>
        )}
      </div>

      {/* Mətn */}
      <div className={styles.formGroup}>
        <label htmlFor="body">Mətn</label>
        <textarea
          id="body"
          placeholder="Post mətnini yazın..."
          rows={6}
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={
            formik.touched.body && formik.errors.body
              ? styles.inputError
              : ""
          }
        />
        {formik.touched.body && formik.errors.body && (
          <p className={styles.fieldError}>{formik.errors.body}</p>
        )}
      </div>

      {/* Footer */}
      <div className={styles.divider} />
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => router.back()}
        >
          Ləğv et
        </button>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <>
              <ClipLoader size={14} color="#ffffff" />
              Gözləyin...
            </>
          ) : isEdit ? "Yenilə" : "Paylaş"}
        </button>
      </div>

    </form>
  );
}