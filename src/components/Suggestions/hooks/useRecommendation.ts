import { usePageContext, useSuggestionsPageContext } from "@/providers";
import { queryRepo } from "../utils";

export const useRecommendation = () => {
  const { repo, branch } = usePageContext();
  const { setModalRecommendation, setCurrentRecommendationLoading } =
    useSuggestionsPageContext();

  const getRecommendationForSuggestion = (suggestion: string) => {
    setCurrentRecommendationLoading(true);

    const RECOMMENDATION_QUERY = `How would you recommend I fix ${suggestion}? Please return the answer in markdown format.`;

    queryRepo(repo, branch, RECOMMENDATION_QUERY)
      .then((data) => {
        setModalRecommendation(data.data.message);
      })
      .finally(() => setCurrentRecommendationLoading(false));
  };

  return {
    getRecommendationForSuggestion,
  };
};
