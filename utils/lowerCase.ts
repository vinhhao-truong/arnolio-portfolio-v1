export const lowerCaseAddSeparator = (
  sentence: string,
  separator: string
): string => {
  return sentence.toLowerCase().trim().split(" ").join(separator);
};
