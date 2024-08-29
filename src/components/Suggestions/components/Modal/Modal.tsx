"use client";

import Markdown from "react-markdown";
import { usePageContext, useSuggestionsPageContext } from "@/providers";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const { modalOpen, setModalOpen } = usePageContext();
  const { modalSuggestion, modalRecommendation, currentRecommendationLoading } =
    useSuggestionsPageContext();

  if (!modalOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <div
          className={styles["modal-close"]}
          onClick={() => setModalOpen(false)}
        ></div>
        <div className={styles["suggestion-wrapper"]}>
          <p className={styles["title"]}>Suggestion:</p>
          <p className={styles["suggestion"]}>
            {modalSuggestion.substring(4)}:
          </p>
        </div>
        <div className={styles["recommendation-wrapper"]}>
          {currentRecommendationLoading ? (
            <p className={styles["loading"]}>
              Coming up with a live recommendation for you...
            </p>
          ) : modalRecommendation.length === 0 ? (
            <p>
              There was a problem loading the recommendation, please try again.
            </p>
          ) : (
            <>
              <p className={styles["title"]}>Recommended Fix: </p>
              <div className={styles["recommendation"]}>
                <Markdown>{modalRecommendation}</Markdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
