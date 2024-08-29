import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { AppStatus, IndexStatus, RepoConnection } from "@/types";

interface PageContextProps {
  appStatus: AppStatus;
  setAppStatus: (a: AppStatus) => void;
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  repo: string;
  setRepo: (repo: string) => void;
  branch: string;
  setBranch: (branch: string) => void;
  indexStatus: IndexStatus | null;
  setIndexStatus: (indexStatus: IndexStatus | null) => void;
  mostRecentConnections: RepoConnection[];
  addToMostRecentConnections: (connection: RepoConnection) => void;
}

const PageContext = createContext<PageContextProps>({} as PageContextProps);

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [appStatus, setAppStatus] = useState<AppStatus>(
    AppStatus.NOT_CONNECTED,
  );
  const [indexStatus, setIndexStatus] = useState<IndexStatus | null>(null);
  const [repo, setRepo] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mostRecentConnections, setMostRecentConnections] = useState<
    RepoConnection[]
  >([]);

  const addToMostRecentConnections = useCallback(
    (connection: RepoConnection) => {
      if (connection.repository === "" || connection.branch === "") return;

      //don't add duplicates
      if (
        mostRecentConnections.find(
          (c) =>
            c.repository === connection.repository &&
            c.branch === connection.branch,
        )
      )
        return;

      const updatedConnections = [connection, ...mostRecentConnections];
      setMostRecentConnections(updatedConnections);
    },
    [mostRecentConnections],
  );

  const value = useMemo(
    () => ({
      repo,
      setRepo,
      appStatus,
      setAppStatus,
      branch,
      setBranch,
      indexStatus,
      setIndexStatus,
      modalOpen,
      setModalOpen,
      mostRecentConnections,
      addToMostRecentConnections,
    }),
    [
      repo,
      appStatus,
      branch,
      indexStatus,
      modalOpen,
      mostRecentConnections,
      addToMostRecentConnections,
    ],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context)
    throw new Error(
      "No context, please ensure this is being used within the PageProvider",
    );
  return context;
};
