import { lowerCaseAddSeparator } from "../utils/lowerCase";

test("Dash link", () => {
  expect(lowerCaseAddSeparator("Artoo, blog", "-")).toBe("artoo-blog");
});
