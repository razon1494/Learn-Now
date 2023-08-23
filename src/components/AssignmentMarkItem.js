import React, { useState } from "react";
import { dateFormat } from "../util/dateConvert";
import { useEditAssignmentMarkMutation } from "../features/assignmentMark/assignmentMarkSlice";
import Swal from "sweetalert2";
export default function AssignmentMarkItem({ assignmentMark }) {
  const {
    id,
    title,
    createdAt,
    student_name,
    repo_link,
    totalMark,
    mark: initialMark,
    status,
  } = assignmentMark;
  const [mark, setMark] = useState(initialMark);
  const [editAssignmentMark, { isLoading, isSuccess, isError }] =
    useEditAssignmentMarkMutation();
  const handleMarkSubmit = (e) => {
    e.preventDefault();
    if (mark > totalMark) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can not give more than the full mark",
      });
    } else
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          editAssignmentMark({
            id,
            data: {
              mark,
              status: "published",
            },
          });
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
  };
  const newDate = dateFormat(createdAt);
  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{newDate}</td>
      <td className="table-td">{student_name}</td>

      <td className="table-td">{repo_link}</td>
      <td className="table-td">{totalMark}</td>
      {status === "pending" ? (
        <td className="table-td input-mark">
          <input
            type="number"
            max={mark}
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          />
          <svg
            onClick={handleMarkSubmit}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </td>
      ) : (
        <td className="table-td">{mark}</td>
      )}
    </tr>
  );
}
