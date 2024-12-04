import styles from "../Error/Error.module.css";

export default function Error({ title, message, onConfirm }) {
  return (
    <div className={styles.error}>
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div className={styles.confirmationActions}>
          <button onClick={onConfirm} className={styles.button}>
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
