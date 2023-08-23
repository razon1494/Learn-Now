import React from "react";
import CorrectQuizOption from "./CorrectQuizOption";

export default function QuizSubmitted({ specificQuiz, quizzes }) {
  const { mark, student_name, totalCorrect, totalMark, totalWrong } =
    specificQuiz;

  return (
    <div>
      <h2 className="text-center text-2xl font-bold ">
        You Have Submitted The Quiz <br /> Your Mark is:
        <span className="text-red-500 mx-4">
          {mark} / {quizzes.length * 5}
        </span>
      </h2>
      <h5 className="my-8 text-xl text-gray-400">
        Dear {student_name}, We regret to inform you that you have already
        participated in this quiz once and retaking it is not possible. In the
        previous attempt, <br /> Your Total Correct Answers:
        <span className="text-yellow-500 mx-1 font-bold ">{totalCorrect}</span>
        <br /> Your Total Incorrect Answers:
        <span className="text-yellow-500 mx-1 font-bold ">{totalWrong}</span>
        <br /> There were total{" "}
        <span className="text-yellow-500 mx-1 font-bold ">
          {quizzes.length}
        </span>{" "}
        questions. <br /> Each question carries a constant value of 5 marks,
        <br /> You got total
        <span className="text-yellow-500 mx-1 font-bold ">
          {mark}
        </span> marks. <br />
        The maximum possible marks for this quiz are
        <span className="text-yellow-500 mx-1 font-bold ">
          {totalMark}
        </span>. <br />
        The correct answers for all the questions are provided below for your
        reference. We wish you the best in your future endeavors.
      </h5>
      <h2 className="text-center text-2xl font-bold my-8">
        Quiz Answers Below
      </h2>

      {quizzes.map((quiz) => {
        const { question, options, id } = quiz;
        return (
          <div key={quiz.id} className="quiz">
            <h4 className="question">{question}</h4>
            <form className="quizOptions">
              {options.map((option) => (
                <CorrectQuizOption
                  key={option.id}
                  option={option}
                  quizid={id}
                ></CorrectQuizOption>
              ))}
            </form>
          </div>
        );
      })}
    </div>
  );
}
