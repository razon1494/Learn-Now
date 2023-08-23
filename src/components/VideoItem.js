import React from "react";
import { useDeleteVideoMutation } from "../features/videos/videoesSlice";
import { Link } from "react-router-dom";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "../features/assignments/assignmentsSlice";
import {
  useDeleteQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
} from "../features/quizzes/quizzesSlice";
import Swal from "sweetalert2";
import {
  useDeleteAssignmentMarkMutation,
  useGetassignmentMarksQuery,
} from "../features/assignmentMark/assignmentMarkSlice";
import {
  useDeleteQuizMarkMutation,
  useGetQuizMarksQuery,
} from "../features/quizMark/quizMarkApi";
export default function VideoItem({ video }) {
  const { id, title, description } = video;
  const [deleteVideo] = useDeleteVideoMutation();
  // For Related Assignment and quiz delete when video will be deleted
  const { data: assignments, isLoading: assignmentLoading } =
    useGetAssignmentsQuery();
  const [deleteAssignment] = useDeleteAssignmentMutation();
  const [deleteQuiz] = useDeleteQuizMutation();
  const { data: quizzes, isLoading: quizzesLoading } = useGetQuizzesQuery();
  const { data: assignmentMarks, isLoading: assignmentMarkLoading } =
    useGetassignmentMarksQuery();
  const { data: quizMarks, isLoading: quizMarkLoading } =
    useGetQuizMarksQuery();
  const [deleteAssignmentMark] = useDeleteAssignmentMarkMutation();
  const [deleteQuizMark] = useDeleteQuizMarkMutation();
  let words = description.split(" ");
  let descriptionElements;
  if (description) {
    descriptionElements = words.map((word, i) => {
      if (i % 7 === 0 && i !== 0) {
        return (
          <React.Fragment key={i}>
            <br />
            {word}{" "}
          </React.Fragment>
        );
      } else {
        return <React.Fragment key={i}>{word} </React.Fragment>;
      }
    });
  }
  // Delete Handler
  const handledelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Video and all the related assignments, quizzes and their marks will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!assignmentLoading && !quizzesLoading) {
          deleteVideo(id)
            .then(() => {
              // Delete operation is complete

              assignments.map((item) => {
                if (item.video_id === id) {
                  deleteAssignment(item.id);
                }
              });
              quizzes.map((item) => {
                if (item.video_id === id) {
                  deleteQuiz(item.id);
                }
              });
              quizMarks.map((item) => {
                if (item.video_id === id) {
                  deleteQuizMark(item.id);
                }
              });
              assignmentMarks.map((item) => {
                if (item.video_id === id) {
                  deleteAssignmentMark(item.id);
                }
              });
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch((error) => {
              // Handle any errors
              console.error("Error deleting video:", error);
            });
        }
      }
    });
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td" id="description">
        {descriptionElements}
      </td>
      <td className="table-td flex gap-x-2">
        <svg
          onClick={handledelete}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <Link to={`/admin/edit/${id}`}>
          {" "}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );
}
