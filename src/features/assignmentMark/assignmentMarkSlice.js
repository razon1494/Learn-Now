import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getassignmentMarks: builder.query({
      query: () => `/assignmentMark`,
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignmentMark = await queryFulfilled;
          if (assignmentMark?.data?.id) {
            dispatch(
              // Pessimistically Assignment Update
              apiSlice.util.updateQueryData(
                "getassignmentMarks",
                undefined,
                (draft) => {
                  draft.push(assignmentMark.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const assignmentMark = await queryFulfilled;
          if (assignmentMark?.data?.id) {
            // Pessimistic updatecode
            dispatch(
              apiSlice.util.updateQueryData(
                "getassignmentMarks",
                undefined,
                (draft) => {
                  return draft.map((item) =>
                    item.id == arg.id ? assignmentMark.data : item
                  );
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    deleteAssignmentMark: builder.mutation({
      query: ({ id }) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic delete
        const patchresult = dispatch(
          apiSlice.util.updateQueryData(
            "getassignmentMarks",
            undefined,
            (draft) => {
              return draft.filter((e) => {
                return e.id != arg;
              });
            }
          )
        );
        try {
        } catch (err) {
          patchresult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetassignmentMarksQuery,
  useEditAssignmentMarkMutation,
  useAddAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation,
} = assignmentMarkApi;
