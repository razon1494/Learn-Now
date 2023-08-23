import { apiSlice } from "../api/apiSlice";

export const videoessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideoes: builder.query({
      query: () => `/videos`,
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;
          if (video?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getVideoes",
                undefined,
                (draft) => {
                  draft.push(video.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const video = await queryFulfilled;
          if (video?.data?.id) {
            // Pessimistic updatecode
            const newId = arg.id.toString();
            dispatch(
              apiSlice.util.updateQueryData("getVideo", newId, (draft) => {
                draft = video.data;
                return draft;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getVideoes",
                undefined,
                (draft) => {
                  return draft.map((item) =>
                    item.id == arg.id ? video.data : item
                  );
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //optimistic delete
        const patchresult = dispatch(
          apiSlice.util.updateQueryData("getVideoes", undefined, (draft) => {
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
  useGetVideoesQuery,
  useAddVideoMutation,
  useGetVideoQuery,
  useDeleteVideoMutation,
  useEditVideoMutation,
} = videoessApi;
