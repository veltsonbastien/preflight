"use client";

import { usePageContext } from "@/providers";
import styles from "../../GetStartedPage.module.scss";

export const BranchInput = ({ width = 200 }) => {
  const { branch, setBranch } = usePageContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBranch(e.target.value);
  };

  return (
    <input
      placeholder={"Branch name: (e.g. main)"}
      className={styles["text-input"]}
      style={{ width }}
      value={branch}
      onChange={(e) => handleChange(e)}
    />
  );
};
