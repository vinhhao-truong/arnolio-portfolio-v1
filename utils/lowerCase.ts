export const lowerCaseAddSeparator = (
  sentence: string,
  separator: string
): string => {
  const noSpecial: RegExp = /^[a-zA-Z0-9]{4,10}$/;
  const onlySpecial: RegExp = /^[a-zA-Z0-9]*$/;
  const lowerCase: string = sentence.toLowerCase().trim();
  const splittedArr: string[] = lowerCase
    .split(" ")
    .map((word) => {
      const isOne: boolean =
        word.includes(",") && word.includes(".") && word.includes(":");
      const isTwo: boolean = word.includes('"') && word.includes("'");

      if (isOne) {
        return word.slice(0, word.length - 1);
      }

      if (isTwo) {
        return word.slice(1, word.length - 1);
      }

      return word;
    })
    .filter((word) => noSpecial.test(word));
  return splittedArr.join(separator);
};
