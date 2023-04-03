import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: () => ({}),
  tagTypes: ["projects"],
});
