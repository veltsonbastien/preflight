import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { BASE_QUERY } from "@/constants";
import { usePageContext } from "@/providers";
import { queryRepo, parseMessage, getFact } from "../utils";

export const useSuggestions = () => {
  const { repo, branch } = usePageContext();

  const QUERY_REPO_SWR_KEY = `query-repo-${repo}-${branch}-${BASE_QUERY}`;

  const { data, isLoading } = useSWR(QUERY_REPO_SWR_KEY, () =>
    queryRepo(repo, branch, BASE_QUERY),
  );

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [randomFact, setRandomFact] = useState<string | null>(null);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    if (!randomFact) getFact().then((fact) => setRandomFact(fact));
    if (isLoading || !data) return;

    const suggestionsAsArray = parseMessage(data.data.message);
    setSuggestions(suggestionsAsArray);
  }, [repo, branch, isLoading, randomFact, data]);

  const reReview = () => {
    getFact().then((fact) => setRandomFact(fact));
    setReloading(true);
    mutate(QUERY_REPO_SWR_KEY).finally(() => setReloading(false));
  };

  return {
    suggestions,
    loading: isLoading || reloading,
    randomFact,
    reReview,
  };
};
