import { START_DELIMITER, SUGGESTION_DELIMITER } from "@/constants";

export const parseMessage = (message: string): string[] => {
  const delimiterIndex = message.indexOf(START_DELIMITER);
  if (delimiterIndex === -1) {
    return [];
  }

  return message
    .slice(delimiterIndex + START_DELIMITER.length)
    .split(SUGGESTION_DELIMITER);
};
