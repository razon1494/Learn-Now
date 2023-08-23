import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const quizzesAnswerSlice = createSlice({
  name: "quizzesAnswer",
  initialState,
  reducers: {
    addQuizAnswer: (state, action) => {
      const { id, option } = action.payload;
      const quizIndex = state.findIndex((quiz) => quiz.quiz_id === id);
      if (quizIndex !== -1) {
        // If quiz with provided id exists in state, push option to its option array
        state[quizIndex].option.push(option);
      } else {
        // If quiz with provided id doesn't exist in state, create a new quiz object and push to state
        const newQuiz = { quiz_id: id, option: [option] };
        state.push(newQuiz);
      }
    },
  },
});
export default quizzesAnswerSlice.reducer;
export const { addQuizAnswer } = quizzesAnswerSlice.actions;
