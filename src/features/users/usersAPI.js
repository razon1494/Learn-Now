import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => `/users?role=student`,
    }),
  }),
});

export const { useGetStudentQuery } = usersApi;
