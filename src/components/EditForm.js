import React, { useState } from "react";
import { useEditVideoMutation } from "../features/videos/videoesSlice";
import TextInput from "./ui/TextInput";
import Success from "./ui/Success";
import Error from "./ui/Error";
import TextArea from "./ui/TextArea";
import {
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../features/assignments/assignmentsSlice";
import {
  useEditQuizMutation,
  useGetQuizzesQuery,
} from "../features/quizzes/quizzesSlice";
import { useGetassignmentMarksQuery } from "../features/assignmentMark/assignmentMarkSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEditAssignmentMarkMutation } from "../features/assignmentMark/assignmentMarkSlice";
import {
  useEditQuizMarkMutation,
  useGetQuizMarksQuery,
} from "../features/quizMark/quizMarkApi";
export default function EditForm({ video }) {
  const {
    id,
    title: initialTitle,
    description: initialDescription,
    url: initialUrl,
    duration: initialDuration,
    views: initialViews,
  } = video;
  const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();

  const [title, setTitle] = useState(initialTitle);

  const [description, setDescription] = useState(initialDescription);
  const [url, setUrl] = useState(initialUrl);
  const [duration, setDuration] = useState(initialDuration);
  const [views, setViews] = useState(initialViews);

  // For related quiz & assignment video_title Change
  const { data: assignments, isLoading: assignmentLoading } =
    useGetAssignmentsQuery();
  const { data: assignmentMarks, isLoading: assignmentMarkLoading } =
    useGetassignmentMarksQuery();
  const { data: quizMarks, isLoading: quizMarkLoading } =
    useGetQuizMarksQuery();
  const [editAssignment] = useEditAssignmentMutation();
  const [editQuiz] = useEditQuizMutation();
  const [editAssignmentMark] = useEditAssignmentMarkMutation();
  const [editQuizMark] = useEditQuizMarkMutation();
  const { data: quizzes, isLoading: quizzesLoading } = useGetQuizzesQuery();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Edit all quiz assignment and mark's video title*/
      if (result.isConfirmed) {
        if (!assignmentLoading && !quizzesLoading) {
          editVideo({
            id,
            data: {
              title,
              description,
              url,

              duration,
              views,
            },
          })
            .then((res) => {
              if (res.data) {
                assignments.map((item) => {
                  if (item.video_id === id) {
                    editAssignment({
                      id: item.id,
                      data: { video_title: res.data.title },
                    });
                  }
                });
                quizzes.map((item) => {
                  if (item.video_id === id) {
                    editQuiz({
                      id: item.id,
                      data: { video_title: res.data.title },
                    });
                  }
                });
                quizMarks.map((item) => {
                  if (item.video_id === id) {
                    editQuizMark({
                      id: item.id,
                      data: { video_title: res.data.title },
                    });
                  }
                });
                assignmentMarks.map((item) => {
                  if (item.video_id === id) {
                    editAssignmentMark({
                      id: item.id,
                      data: { video_title: res.data.title },
                    });
                  }
                });
                navigate("/admin/videos");
              }
            })
            .then(() => {
              Swal.fire("Saved!", "", "success");
              navigate("/admin/videos");
            });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6 text-black">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {isSuccess && <Success message="Video was edited successfully" />}
        {isError && <Error message="There was an error editing video!" />}
      </div>
    </form>
  );
}
