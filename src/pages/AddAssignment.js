import React, { useState } from "react";
import {
  useAddAssignmentMutation,
  useGetAssignmentsQuery,
} from "../features/assignments/assignmentsSlice";
import { useGetVideoesQuery } from "../features/videos/videoesSlice";
import AdminNavBar from "../components/AdminNavBar";
import Success from "../components/ui/Success";
import Error from "../components/ui/Error";
import TextInput from "../components/ui/TextInput";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PlayerLoader from "../components/ui/loaders/PlayerLoader";
const AddAssignment = () => {
  const [addAssignment, { isLoading, isSuccess, isError }] =
    useAddAssignmentMutation();
  const {
    data: videos,
    isLoading: videoLoading,
    isError: videoError,
  } = useGetVideoesQuery();
  const [title, setTitle] = useState("");
  const [video_title, setVideo_title] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const { data: assignments, isLoading: assignmmentLoading } =
    useGetAssignmentsQuery();
  const navigate = useNavigate();
  // Add Assignment Submit Handler
  const handleSubmit = (e) => {
    const video = videos.find((video) => video.title === video_title);
    let video_id = null;
    if (video) {
      video_id = video.id;
      Swal.fire({
        title: "Do you want to proceed? One New video will be added",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // Call the api to update database
          addAssignment({
            title,
            video_id,
            video_title,
            totalMark,
          }).then(() => {
            Swal.fire("Saved!", "", "success");
            navigate("/admin/assignment");
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

      // Do something with the video_id
    } else {
      console.log(`Video with title ${video_title} not found`);
    }
  };
  // Loading and other error handling
  let content = null;
  if (videoLoading || assignmmentLoading) {
    content = <PlayerLoader></PlayerLoader>;
  } else if (!videoLoading && isError) {
    content = <Error message="There was an error!" />;
  } else if (
    !videoLoading &&
    !videoError &&
    !assignmmentLoading &&
    videos?.length
  ) {
    const filterByExisting = (video) => {
      const exists = assignments.some(
        (assignment) => assignment.video_id === video.id
      );
      return !exists;
    };

    content = (
      <div className="col-span-4 sm:col-span-3 lg:col-span-2 flex flex-col items-center">
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
            <option value={v.title}>{v.title} </option>
          ))}
        </select>
        <small className="text-red-600 text-xs">
          Note: If all videos has assignment then you will not get any options.
          You need to add a new video first
        </small>
      </div>
    );
  }
  return (
    <div>
      <AdminNavBar />
      <div className="container ml-48 mt-16">
        <div className="">
          <h2 className="text-center text-3xl font-bold text-white my-8">
            Add A New Assignment
          </h2>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="shadow w-15 overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6 text-black">
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextInput
                    title="Assignment title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {content}

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <TextInput
                    title="Total Mark"
                    type="number"
                    value={totalMark}
                    required
                    onChange={(e) => setTotalMark(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>

            {isSuccess && <Success message="Video was added successfully" />}
            {isError && <Error message="There was an error adding video!" />}
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddAssignment;
