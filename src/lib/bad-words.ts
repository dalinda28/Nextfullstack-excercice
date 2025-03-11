// List of bad words in French and English
const BAD_WORDS = [
  // English
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "whore",
  "slut",
  "bastard",
  // French
  "putain",
  "merde",
  "connard",
];

/**
 * Verifies if a text contains any bad words from the predefined list
 * @param text The text to check for bad words
 * @returns An object with a boolean indicating if bad words were found and the first bad word found (if any)
 */
export const verifyBadWord = (
  text: string
): { hasBadWord: boolean; badWord?: string } => {
  if (!text) return { hasBadWord: false };

  const lowerText = text.toLowerCase();

  for (const word of BAD_WORDS) {
    if (lowerText.includes(word)) {
      return { hasBadWord: true, badWord: word };
    }
  }

  return { hasBadWord: false };
};
