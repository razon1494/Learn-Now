import React from "react";

export default function LeaderBoardRow({ student }) {
  const { id, rank, name, email, assignmentMark, quizMark, totalMark } =
    student;
  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{rank}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{quizMark}</td>
      <td className="table-td text-center">{assignmentMark}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}
