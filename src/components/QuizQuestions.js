import React from "react";

export default function QuizQuestions({ quizzes }) {
  return (
    <div>
      {quizzes.map((q) => {
        const { question, options } = q;
        console.log(options);
        return (
          <div className="quiz">
            <h4 className="question">{question}</h4>
            <form className="quizOptions">
              {options.map((option) => (
                <label for="">
                  <input type="checkbox" id="" />
                  {option?.option}
                  checked = {(e) => e.target.checked}
                </label>
              ))}
            </form>
          </div>
        );
      })}
      <button className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
        Submit
      </button>
    </div>
  );
}
