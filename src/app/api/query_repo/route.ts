import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { GREPTILE_API_BASE_URL, OWNER } from "@/constants";
import { QueryRepoResponse, IndexStatus } from "@/types";

const QUERY_REPO_URL = `${GREPTILE_API_BASE_URL}/query`;

export const POST = async (req: NextRequest) => {
  const { repository, branch, query } = await req.json();

  if (!repository || !branch) {
    return NextResponse.json({
      index_status: IndexStatus.ERROR,
      status: 400,
      message: "Missing repository or branch",
    });
  }

  const data = {
    messages: [
      {
        id: "some-id-1", // optional, unique identifier for the message
        content: query,
        role: "user",
      },
    ],
    repositories: [
      {
        remote: "github",
        repository: `${OWNER}/${repository}`,
        branch,
      },
    ],
  };

  try {
    const res = await axios.post<QueryRepoResponse>(QUERY_REPO_URL, data, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "X-Github-Token": `${process.env.GITHUB_PAT}`,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Successfully connected to GitHub repo",
      data: res.data,
    });
  } catch (e) {
    // @ts-ignore: typescript error with e
    const errorObject = e.response.data;
    const error = errorObject.response;

    console.error("Error connecting GitHub repo: ", error);
    return NextResponse.json({
      status: 500,
      message: error,
      data: null,
    });
  }
};
