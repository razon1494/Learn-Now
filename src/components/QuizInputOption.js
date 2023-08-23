import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuizAnswer } from "../features/quizzes/quizzesAnswerSlice";

export default function QuizInputOption({ option, quizid }) {
  const [optionCheck, setOptionCheck] = useState(false);
  const dispatch = useDispatch();
  const handleOnchange = (e) => {
    const isChecked = e.target.checked;
    setOptionCheck(isChecked);
    dispatch(addQuizAnswer({ id: quizid, option: option.option }));
  };
  return (
    <label key={option.id}>
      <input
        type="checkbox"
        name={``}
        checked={optionCheck}
        onChange={handleOnchange}
      />
      {option.option}
    </label>
  );
}
