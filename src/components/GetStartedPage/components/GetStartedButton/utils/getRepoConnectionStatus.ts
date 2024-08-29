import axios from "axios";
import { IndexStatusAPIResponse } from "@/types";

export const getRepoConnectionStatus = async (
  repository: string,
  branch: string,
): Promise<IndexStatusAPIResponse> => {
  try {
    const res = await axios.get<IndexStatusAPIResponse>(
      `/api/index_status?repository=${repository}&branch=${branch}`,
    );
    return res.data;
  } catch (e) {
    console.error("Error getting GitHub repo connection status: ", e);
    return e as IndexStatusAPIResponse;
  }
};
