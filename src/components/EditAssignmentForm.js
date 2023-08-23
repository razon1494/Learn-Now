import React, { useState } from "react";
import { useGetVideoesQuery } from "../features/videos/videoesSlice";
import Error from "./ui/Error";
import {
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../features/assignments/assignmentsSlice";
import AdminNavBar from "./AdminNavBar";
import Success from "./ui/Success";
import { useNavigate } from "react-router-dom";
import TextInput from "./ui/TextInput";
import VideoLoader from "./ui/loaders/VideoLoader";

export default function EditAssignmentForm({ assignment }) {
  const [title, setTitle] = useState(assignment.title || "");
  const [video_id, setVideo_id] = useState(assignment.video_id || "");
  const [video_title, setVideo_title] = useState(assignment.video_title || "");
  const [totalMark, setTotalMark] = useState(assignment.totalMark || "");
  const navigate = useNavigate();
  const [editAssignment, { isLoading, isSuccess, isError }] =
    useEditAssignmentMutation();
  const {
    data: videos,
    isLoading: videoLoading,
    isError: videoError,
    error,
  } = useGetVideoesQuery();
  const {
    data: assignments,
    isLoading: assignmmentLoading,
    isError: assignmentError,
  } = useGetAssignmentsQuery();

  const handleSubmit = (e) => {
    const video = videos.find((video) => video.title === video_title);

    let video_id = null;
    if (video) {
      video_id = video.id;
      editAssignment({
        id: assignment.id,
        data: {
          title,
          video_id,
          video_title,
          totalMark,
        },
      });
      // Do something with the video_id
    } else {
    }

    navigate("/admin/assignment");
  };

  let content = null;

  if (videoLoading || assignmmentLoading) {
    content = <VideoLoader></VideoLoader>;
  } else if (!videoLoading && assignmentError) {
    content = <Error message="There was an error!" />;
  } else if (
    !videoLoading &&
    !videoError &&
    !assignmmentLoading &&
    videos?.length
  ) {
    const filterByExisting = (video) => {
      if (video.title === video_title) {
        return true;
      }
      const exists = assignments.some(
        (assignment) => assignment.video_id === video.id
      );
      return !exists;
    };

    content = (
      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
        <label>Select Video To assign</label>
        <select
          name="video_title"
          required
          value={video_title}
          onChange={(event) => setVideo_title(event.target.value)}
        >
          <option value="" hidden>
            Assign Video
          </option>
          {videos.filter(filterByExisting).map((v) => (
            <option selected={v.title === video_title} value={v.title}>
              {v.title}{" "}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="mx-48 mt-32">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="shadow w-15 overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6 text-black">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Assignment title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {content}

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <TextInput
                  title="Total Mark"
                  value={totalMark}
                  onChange={(e) => setTotalMark(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>

          {isSuccess && <Success message="Video was added successfully" />}
          {isError && <Error message="There was an error adding video!" />}
        </div>
      </form>
    </div>
  );
}
