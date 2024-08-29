"use client";

import { AppStatus } from "@/types";
import { usePageContext, useSuggestionsPageContext } from "@/providers";
import { useRecommendation, useSuggestions } from "./hooks";
import { Modal } from "./components";
import styles from "./Suggestions.module.scss";

export const Suggestions = () => {
  const {
    repo,
    branch,
    setModalOpen,
    setAppStatus,
    setBranch,
    setRepo,
    setIndexStatus,
  } = usePageContext();
  const { setModalSuggestion } = useSuggestionsPageContext();
  const { suggestions, loading, randomFact, reReview } = useSuggestions();

  const { getRecommendationForSuggestion } = useRecommendation();

  const handleSuggestionClick = (suggestion: string) => {
    setModalSuggestion(suggestion);
    getRecommendationForSuggestion(suggestion);
    setModalOpen(true);
  };

  const handleBackButtonClick = () => {
    setBranch("");
    setRepo("");
    setIndexStatus(null);
    setAppStatus(AppStatus.NOT_CONNECTED);
  };

  return (
    <div className={styles["suggestions-page-wrapper"]}>
      <Modal />
      <button className={styles["back-button"]} onClick={handleBackButtonClick}>
        Back
      </button>
      <div className={styles["page-content"]}>
        <div className={styles["header"]}>
          <h1>
            Your <b style={{ color: "#2083bf" }}>code</b> review:{" "}
          </h1>
          <p>
            Showing improvements for <b>{repo}</b>{" "}
          </p>
          <p>
            Current branch: <b>{branch}</b>
          </p>
        </div>
        <div className={styles["suggestions-wrapper"]}>
          {loading ? (
            <p className={styles["loading"]}>
              As you wait for your review, here&apos;s a fact to muse about. Did
              you know: {randomFact}. 🤔
            </p>
          ) : (
            <div className={styles["suggestions"]}>
              <h2>
                Here are some suggestions to improve your code. Click on each to
                get more information about potential fixes!
              </h2>
              {suggestions.map((suggestion, index) => {
                return (
                  <div
                    key={index}
                    className={styles["suggestion"]}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <p>{suggestion}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {suggestions.length !== 0 && !loading ? (
          <button
            className={styles["re-push-button"]}
            type="button"
            onClick={reReview}
          >
            Re-Review
          </button>
        ) : null}
      </div>
    </div>
  );
};
