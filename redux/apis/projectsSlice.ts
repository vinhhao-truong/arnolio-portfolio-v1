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
      keepUnusedDataFor: 5,
    }),
    postNewProject: build.mutation({
      query: ({ projectData, idToken }) => {
        return {
          url: `/api/project/add-project`,
          method: "POST",
          body: {
            ...projectData,
          },
          params: { idToken },
        };
      },
      invalidatesTags: ["projects"],
    }),
    deleteProject: build.mutation({
      query: ({ id, idToken }) => {
        return {
          url: `/api/project/delete-project`,
          method: "DELETE",
          body: {
            id,
          },
          params: { idToken },
        };
      },
      invalidatesTags: ["projects"],
    }),
    editProject: build.mutation({
      query: ({ projectData, id, idToken }) => {
        return {
          url: `/api/project/edit-project`,
          method: "PATCH",
          body: {
            ...projectData,
            id,
          },
          params: { idToken },
        };
      },
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  usePostNewProjectMutation,
  useDeleteProjectMutation,
  useEditProjectMutation,
} = projectsApi;
