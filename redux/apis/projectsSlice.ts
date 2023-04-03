import { portfolioApi } from "./../apisSlice";
const projectsApi = portfolioApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProjects: build.query({
      query: () => {
        return {
          url: `${process.env.PROJECT_API}`,
        };
      },
      providesTags: () => [{ type: "projects", id: "all-projects" }],
      transformResponse: (data) => Object.values(data ? data : []),
      keepUnusedDataFor: 5,
    }),
    postNewProject: build.mutation({
      query: ({ name, demoUrl, slug, thumbnail, srcCodeUrl, idToken }) => {
        return {
          url: `${process.env.PROJECT_API}?auth=${idToken}`,
          method: "POST",
          body: {
            name,
            demoUrl,
            slug,
            thumbnail,
            srcCodeUrl,
            halo: "halo",
          },
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const { useGetAllProjectsQuery, usePostNewProjectMutation } =
  projectsApi;
