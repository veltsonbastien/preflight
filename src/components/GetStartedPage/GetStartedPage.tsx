"use client";

import { usePageContext } from "@/providers";
import { BranchInput, GetStartedButton, RepoInput } from "./components";
import { AppStatus, IndexStatus, RepoConnection } from "@/types";
import styles from "./GetStartedPage.module.scss";

export const GetStartedPage = () => {
  const {
    repo,
    branch,
    indexStatus,
    mostRecentConnections,
    setRepo,
    setBranch,
    setIndexStatus,
    setAppStatus,
  } = usePageContext();

  const handleMRCClick = (connection: RepoConnection) => {
    setRepo(connection.repository);
    setBranch(connection.branch);
    setIndexStatus(IndexStatus.COMPLETED);
    setAppStatus(AppStatus.CONNECTED);
  };

  return (
    <div className={styles["get-started-page-wrapper"]}>
      <div className={styles["header"]}>
        <h1> Welcome to My PreFlight </h1>
        <p> Let&apos;s get started by connecting a repo! </p>
      </div>
      <div className={styles["inputs"]}>
        <RepoInput />
        <BranchInput />
        <GetStartedButton />
      </div>
      <div>
        {indexStatus ? (
          <p className={styles["indexing-status"]}>
            {indexStatus === IndexStatus.ERROR ? (
              <b className={styles["error"]}>
                There was an error connecting {repo}, please check API Key, and
                that GitHub token has proper access and try again.
              </b>
            ) : indexStatus === IndexStatus.CONNECTING ? (
              <b>Connecting {repo} to Greptile...</b>
            ) : indexStatus === IndexStatus.COMPLETED ? (
              <b className={styles["success"]}>
                Successfully connected {repo}! Showing potential improvements
                for {branch} branch
              </b>
            ) : (
              <b>Almost there! Current repo index status: {indexStatus}</b>
            )}
          </p>
        ) : null}
        {mostRecentConnections.length > 0 ? (
          <>
            <hr className={styles[".hr"]} />
            <div className={styles["most-recent-connections-wrapper"]}>
              <p className={styles["mrc-title"]}> Most recent connections: </p>
              {mostRecentConnections.map((connection, index) => (
                <div
                  key={index}
                  className={styles["mrc"]}
                  onClick={() => handleMRCClick(connection)}
                >
                  <div className={styles["small-space"]}>
                    <b>Repo:</b>
                    {connection.repository}
                  </div>
                  <div className={styles["small-space"]}>
                    <b>Branch:</b>
                    {connection.branch}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
