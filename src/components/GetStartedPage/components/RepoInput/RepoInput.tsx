"use client";

import { usePageContext } from "@/providers";
import styles from "../../GetStartedPage.module.scss";

export const RepoInput = ({ width = 200 }) => {
  const { repo, setRepo } = usePageContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRepo(e.target.value);
  };

  return (
    <input
      placeholder={"Repo name:"}
      className={styles["text-input"]}
      style={{ width }}
      value={repo}
      onChange={(e) => handleChange(e)}
    />
  );
};
