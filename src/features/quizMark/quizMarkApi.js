import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => `/quizMark`,
    }),

    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quizMark = await queryFulfilled;
          if (quizMark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
                undefined,
                (draft) => {
                  draft.push(quizMark.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    editQuizMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quizMark = await queryFulfilled;
          if (quizMark?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
                undefined,
                (draft) => {
                  return draft.map((item) =>
                    item.id == arg.id ? quizMark.data : item
                  );
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    deleteQuizMark: builder.mutation({
      query: ({ id }) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic delete
        const patchresult = dispatch(
          apiSlice.util.updateQueryData("getQuizMarks", undefined, (draft) => {
            return draft.filter((e) => {
              return e.id != arg;
            });
          })
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
  useAddQuizMarkMutation,
  useEditQuizMarkMutation,
  useGetQuizMarksQuery,
  useDeleteQuizMarkMutation,
} = quizMarkApi;
