import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface SuggestionsPageContext {
  modalSuggestion: string;
  setModalSuggestion: (suggestion: string) => void;
  modalRecommendation: string;
  setModalRecommendation: (recommendation: string) => void;
  currentRecommendationLoading: boolean;
  setCurrentRecommendationLoading: (loading: boolean) => void;
}

const SuggestionsPageContext = createContext<SuggestionsPageContext | null>(
  null,
);

interface SuggestionsPageProviderProps {
  children: ReactNode;
}

export const SuggestionsPageProvider = ({
  children,
}: SuggestionsPageProviderProps) => {
  const [modalSuggestion, setModalSuggestion] = useState("");
  const [modalRecommendation, setModalRecommendation] = useState("");
  const [currentRecommendationLoading, setCurrentRecommendationLoading] =
    useState(false);

  const value = useMemo(
    () => ({
      modalSuggestion,
      setModalSuggestion,
      modalRecommendation,
      setModalRecommendation,
      currentRecommendationLoading,
      setCurrentRecommendationLoading,
    }),
    [modalSuggestion, modalRecommendation, currentRecommendationLoading],
  );

  return (
    <SuggestionsPageContext.Provider value={value}>
      {children}
    </SuggestionsPageContext.Provider>
  );
};

export const useSuggestionsPageContext = () => {
  const context = useContext(SuggestionsPageContext);
  if (!context) {
    throw new Error(
      "No context, please ensure this is being used within the SuggestionsPageProvider",
    );
  }
  return context;
};
