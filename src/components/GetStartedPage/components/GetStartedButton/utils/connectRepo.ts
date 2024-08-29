import axios from "axios";
import { IndexRepoAPIResponse } from "@/types";

export const connectRepo = async (
  repository: string,
  branch: string,
): Promise<IndexRepoAPIResponse> => {
  try {
    const res = await axios.post("/api/index_repo", { repository, branch });
    return res.data;
  } catch (e) {
    console.error("Error connecting GitHub repo: ", e);
    return e as IndexRepoAPIResponse;
  }
};
