"use client";

import { useState } from "react";
import {
  AppStatus,
  IndexRepoAPIResponse,
  IndexStatus,
  IndexStatusAPIResponse,
} from "@/types";
import { usePageContext } from "@/providers";
import { connectRepo, getRepoConnectionStatus } from "./utils";
import styles from "./GetStartedButton.module.scss";

export const GetStartedButton = ({
  buttonText = "Get Started!",
  color = "#50C878",
}) => {
  const {
    setAppStatus,
    setIndexStatus,
    addToMostRecentConnections,
    branch,
    repo,
  } = usePageContext();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    setIndexStatus(null);
    getRepoConnectionStatus(repo, branch)
      .then(async (res: IndexStatusAPIResponse) => {
        switch (res.index_status) {
          case IndexStatus.COMPLETED:
            setIndexStatus(IndexStatus.COMPLETED);
            setAppStatus(AppStatus.CONNECTED);
            addToMostRecentConnections({ repository: repo, branch });
            break;
          case IndexStatus.ERROR:
            if (res.message === "Repository not processed by Greptile.") {
              setIndexStatus(IndexStatus.CONNECTING);
              //this is our sign to start the indexing process
              connectRepo(repo, branch).then((res: IndexRepoAPIResponse) => {
                if (res.status === 200) setIndexStatus(IndexStatus.SUBMITTED);
              });
            }
            setIndexStatus(res.index_status);
            break;
          default: //in the case of submitted, cloning and processing
            setIndexStatus(res.index_status);
            break;
        }
      })
      .catch((e) => {
        console.error("Error getting GitHub repo connection status: ", e);
        setAppStatus(AppStatus.NOT_CONNECTED);
      })
      .finally(() => setButtonLoading(false));
  };

  return (
    <button
      style={{ backgroundColor: color }}
      className={styles["button"]}
      onClick={(e) => handleClick(e)}
      disabled={buttonLoading}
    >
      {buttonLoading ? "Connecting..." : buttonText}
    </button>
  );
};
