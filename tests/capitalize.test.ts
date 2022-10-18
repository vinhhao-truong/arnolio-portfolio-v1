import { capitalizeFirst, capitalizeEveryFirst } from "../utils/capitalize";

describe("Capitalize First Character in the Sentence", () => {
  const caseOne: string = "heLLo woRld.";

  test(caseOne, () => {
    expect(capitalizeFirst(caseOne)).toBe("Hello world.");
  });
});

describe("Capitalize First Character of Every Word", () => {
  const caseOne: string = "heLlo wOrlD.";
  const caseTwo: string = "byE-bye.";

  test(caseOne, () => {
    expect(capitalizeEveryFirst(caseOne)).toBe("Hello World.");
  });

  test(caseTwo, () => {
    expect(capitalizeEveryFirst(caseTwo, "-")).toBe("Bye-Bye.");
  });
});
