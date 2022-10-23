import { upperCaseFirst, upperCaseEveryFirst } from "../utils/upperCase";

describe("Capitalize First Character in the Sentence", () => {
  const caseOne: string = "heLLo woRld.";

  test(caseOne, () => {
    expect(upperCaseFirst(caseOne)).toBe("Hello world.");
  });
});

describe("Capitalize First Character of Every Word", () => {
  const caseOne: string = "heLlo wOrlD.";
  const caseTwo: string = "byE-bye.";

  test(caseOne, () => {
    expect(upperCaseEveryFirst(caseOne)).toBe("Hello World.");
  });

  test(caseTwo, () => {
    expect(upperCaseEveryFirst(caseTwo, "-")).toBe("Bye-Bye.");
  });
});
