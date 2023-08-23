import { apiSlice } from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => `/quizzes`,
    }),
    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    getSpecificQuiz: builder.query({
      query: (videoId) => `/quizzes?video_id=${videoId}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const quiz = await queryFulfilled;
          if (quiz?.data?.id) {
            console.log(quiz.data);
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(quiz.data);
                }
              )
            );
          }
        } catch (err) {
          console.log(err, "JJJJ");
        }
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic delete
        const patchresult = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
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
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic delete
        const patchresult = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
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
  useAddQuizMutation,
  useDeleteQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
  useGetSpecificQuizQuery,
} = quizzesApi;
