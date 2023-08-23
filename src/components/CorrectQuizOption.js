import React from "react";

export default function CorrectQuizOption({ option, quizid }) {
  return (
    <label key={option.id}>
      <input type="checkbox" checked={option.isCorrect} readOnly />
      {option.option}
    </label>
  );
}
