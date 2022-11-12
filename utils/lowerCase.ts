export const lowerCaseAddSeparator = (
  sentence: string,
  separator: string
): string => {
  const noSpecialWhitespace: RegExp = /\s*\W\s/g;
  const lowerCase: string = sentence.toLowerCase().trim();
  const withoutSpecial: string = lowerCase.replace(noSpecialWhitespace, " ");

  return withoutSpecial.split(" ").join(separator);
};
