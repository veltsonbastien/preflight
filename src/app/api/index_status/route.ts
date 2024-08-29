import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { GREPTILE_API_BASE_URL, OWNER } from "@/constants";
import { IndexStatus } from "@/types";

interface IndexStatusResponse {
  repository: string;
  remote: string;
  branch: string;
  private: boolean;
  status: IndexStatus;
  filesProcessed: number;
  numFiles: number;
  sampleQuestions: string[];
  sha: string;
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const repository = searchParams.get("repository");
  const branch = searchParams.get("branch");

  if (!repository || !branch) {
    return NextResponse.json({
      index_status: IndexStatus.ERROR,
      status: 400,
      message: "Missing repository or branch",
    });
  }

  const repositoryId = encodeURIComponent(
    `github:${branch}:${OWNER}/${repository}`,
  );
  const INDEX_STATUS_URL = `${GREPTILE_API_BASE_URL}/repositories/${repositoryId}`;

  try {
    const result = await axios.get<IndexStatusResponse>(INDEX_STATUS_URL, {
      headers: { Authorization: `Bearer ${process.env.API_KEY}` },
    });

    return NextResponse.json({
      index_status: result.data.status,
      status: 200,
      message: "Successfully retrieved index status",
    });
  } catch (e) {
    // @ts-ignore: typescript error with e
    const errorObject = e.response.data;
    const error = errorObject.error;

    return NextResponse.json({
      index_status: IndexStatus.ERROR,
      status: 500,
      message: error,
    });
  }
};
