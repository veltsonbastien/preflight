export enum IndexStatus {
  SUBMITTED = "submitted",
  CLONING = "cloning",
  PROCESSING = "processing",
  COMPLETED = "completed",
  NOT_CONNECTED = "not-connected",
  ERROR = "ERROR",
  CONNECTING = "connecting",
}

export enum AppStatus {
  NOT_CONNECTED = "not-connected",
  CONNECTED = "connected",
}

export interface IndexStatusAPIResponse {
  index_status: IndexStatus;
  status: number;
  message: string;
}

export interface RepoConnection {
  repository: string;
  branch: string;
}

export interface IndexRepoAPIResponse {
  status: number;
  message: string;
}

interface QueryRepoSource {
  repository: string;
  remote: string;
  branch: string;
  filepath: string;
  linestart: number | null;
  lineend: number | null;
  summary: string;
}

export interface QueryRepoResponse {
  message: string;
  sources: QueryRepoSource[];
}

export interface QueryRepoAPIResponse {
  status: number;
  message: string;
  data: QueryRepoResponse;
}
