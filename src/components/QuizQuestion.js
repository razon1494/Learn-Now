import React, { useState } from "react";
import QuizInputOption from "./QuizInputOption";
import { useSelector } from "react-redux";
import {
  useAddQuizMarkMutation,
  useGetQuizMarksQuery,
} from "../features/quizMark/quizMarkApi";
import { checkQuizSubmission } from "../util/checkSubmission";
import { useParams } from "react-router-dom";
import QuizSubmitted from "./QuizSubmitted";

export default function QuizQuestion({ quizzes, video }) {
  const auth = useSelector((state) => state.auth);
  const params = useParams();

  const [mark, setMark] = useState(0);
  const [addQuizMark, { isLoading, isSuccess }] = useAddQuizMarkMutation();
  const {
    data: quizMarks,
    isLoading: quizLoading,
    isError: quizError,
  } = useGetQuizMarksQuery();
  const isSubmitted = checkQuizSubmission(quizMarks, auth?.user?.id, video?.id);
  const quizzesAnswer = useSelector((state) => state.quizzesAnswer);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { user } = auth;
    console.log(quizzes.length);
    let data = {
      student_id: user.id,
      student_name: user.name,
      video_id: video.id,
      video_title: video.title,
      totalQuiz: quizzes.length,
      totalCorrect: 0,
      totalWrong: 0,
      totalMark: quizzes.length * 5,
      mark: 0,
    };
    for (let i = 0; i < quizzes?.length; i++) {
      const answer = quizzesAnswer.find((q) => q.quiz_id === quizzes[i].id);
      if (answer) {
        let options = quizzes[i].options;
        let correctOptions = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].isCorrect) {
            correctOptions.push(options[i].option);
          }
        }
        const givenAnswer = quizzesAnswer.find(
          (q) => q.quiz_id === quizzes[i].id
        );
        let getMark = true;
        if (givenAnswer.option.length === correctOptions.length) {
          for (let i = 0; i < givenAnswer.option.length; i++) {
            const check = correctOptions.includes(givenAnswer.option[i]);
            if (!check) {
              getMark = false;
              break;
            } else {
              getMark = true;
            }
          }
        } else {
          getMark = false;
        }

        if (getMark) {
          data.totalCorrect = data.totalCorrect + 1;
        } else {
          data.totalWrong = data.totalWrong + 1;
        }
      }
    }

    data.mark = data.totalCorrect * 5;

    addQuizMark(data);
  };
  let specificQuiz;
  if (quizMarks?.length) {
    specificQuiz = quizMarks.find((q) => q.video_id === video.id);
  }

  return (
    <div>
      {isSubmitted ? (
        <QuizSubmitted
          specificQuiz={specificQuiz}
          quizzes={quizzes}
        ></QuizSubmitted>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {quizzes.map((quiz, questionIndex) => {
            const { question, options, id } = quiz;
            return (
              <div key={questionIndex} className="quiz">
                <h4 className="question">{question}</h4>
                <form className="quizOptions">
                  {options.map((option) => (
                    <QuizInputOption
                      key={option.id}
                      option={option}
                      quizid={id}
                    ></QuizInputOption>
                  ))}
                </form>
              </div>
            );
          })}
          <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
