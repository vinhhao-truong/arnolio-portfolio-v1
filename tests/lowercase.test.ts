import { lowerCaseAddSeparator } from "../utils/lowerCase";

test("Dash link", () => {
  expect(lowerCaseAddSeparator("Artoo, blog", "-")).toBe("artoo-blog");
});

test("In sentence", () => {
  expect(
    lowerCaseAddSeparator("Artoo Blogs - A simple social media site", "-")
  ).toBe("artoo-blogs-a-simple-social-media-site");
});
