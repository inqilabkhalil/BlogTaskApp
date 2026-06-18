"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import styles from "./DeleteButton.module.css";

type Props = {
  id: number;
};

const API_URL = "https://blog-api-t6u0.onrender.com/posts";

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error();

      router.push("/");
    } catch {
      alert("Silinmə uğursuz oldu. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        className={styles.deleteBtn}
        onClick={() => setShowModal(true)}
      >
        🗑️ Sil
      </button>

      {/* Modal */}
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>

            <div className={styles.icon}>⚠️</div>
            <h3>Postu silmək istəyirsiniz?</h3>
            <p>
              Bu əməliyyat geri qaytarıla bilməz. Post həmişəlik
              silinəcək.
            </p>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
                disabled={loading}
              >
                Ləğv et
              </button>

              <button
                className={styles.confirmBtn}
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ClipLoader size={14} color="#ffffff" />
                    Silinir...
                  </>
                ) : (
                  "Bəli, Sil"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}