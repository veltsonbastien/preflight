import styles from "./Loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles["loading-wrapper"]}>
      <p>Loading...</p>
    </div>
  );
};
