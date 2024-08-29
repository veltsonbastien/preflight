"use client";

import {
  PageProvider,
  usePageContext,
  SuggestionsPageProvider,
} from "@/providers";
import { GetStartedPage, Suggestions } from "@/components";
import { AppStatus } from "@/types";

//I added this extra layer, so I didn't put the "use client" directive within the Home component

export const MainContent = () => {
  const { appStatus } = usePageContext();

  switch (appStatus) {
    case AppStatus.CONNECTED:
      return (
        <SuggestionsPageProvider>
          <Suggestions />
        </SuggestionsPageProvider>
      );
    default:
      return <GetStartedPage />;
  }
};

export const Main = () => {
  return (
    <PageProvider>
      <MainContent />
    </PageProvider>
  );
};
