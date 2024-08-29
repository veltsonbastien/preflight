import axios from "axios";
import { QueryRepoAPIResponse } from "@/types";

export const queryRepo = async (
  repository: string,
  branch: string,
  query: string,
): Promise<QueryRepoAPIResponse> => {
  try {
    const result = await axios.post<QueryRepoAPIResponse>("/api/query_repo", {
      repository,
      branch,
      query,
    });

    return result.data;
  } catch (e) {
    console.error("Error querying repo: ", e);
    return e as QueryRepoAPIResponse;
  }
};
