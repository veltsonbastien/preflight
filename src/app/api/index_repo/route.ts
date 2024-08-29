import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { GREPTILE_API_BASE_URL, OWNER } from "@/constants";
import { IndexStatus } from "@/types";

interface RepoIndexResponse {
  response: string;
}

const INDEX_REPO_URL = `${GREPTILE_API_BASE_URL}/repositories`;

export const POST = async (req: NextRequest) => {
  const { repository, branch } = await req.json();

  if (!repository || !branch) {
    return NextResponse.json({
      index_status: IndexStatus.ERROR,
      status: 400,
      message: "Missing repository or branch",
    });
  }

  const data = {
    remote: "github",
    repository: `${OWNER}/${repository}`,
    branch,
  };

  try {
    await axios.post<RepoIndexResponse>(INDEX_REPO_URL, data, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "X-Github-Token": `${process.env.GITHUB_PAT}`,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Successfully connected to GitHub repo",
    });
  } catch (e) {
    // @ts-ignore: typescript error with e
    const errorObject = e.response.data;
    const error = errorObject.response;

    console.error("Error connecting GitHub repo: ", error);
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
};
