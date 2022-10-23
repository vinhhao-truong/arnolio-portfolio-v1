import React from "react";

export const upperCaseFirst = (sentence: string): string => {
  const lowercase: string = sentence.toLowerCase().trim();

  return sentence[0].toUpperCase() + lowercase.slice(1);
};

export const upperCaseEveryFirst = (
  sentence: string,
  separator?: string
): string => {
  const lowercasedArr: string[] = separator
    ? sentence.split(separator)
    : sentence.split(" ");

  return lowercasedArr
    .map((word) => upperCaseFirst(word))
    .join(separator ? separator : " ");
};
