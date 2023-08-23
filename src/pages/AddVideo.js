import React, { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import TextInput from "../components/ui/TextInput";
import TextArea from "../components/ui/TextArea";
import { useAddVideoMutation } from "../features/videos/videoesSlice";
import Success from "../components/ui/Success";
import Error from "../components/ui/Error";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
export default function AddVideo() {
  const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setThumbnail("");
    setDuration("");
    setViews("");
  };
  // Submit Handler for Video add
  const handleSubmit = (e) => {
    e.preventDefault();
    const createdAt = new Date().toISOString();
    Swal.fire({
      title: "Do you want to proceed? One New video will be added",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        addVideo({
          title,
          description,
          url,
          thumbnail,
          createdAt,
          duration,
          views,
        }).then(() => {
          Swal.fire("Saved!", "", "success");
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    resetForm();
  };
  return (
    <div>
      <AdminNavBar />

      <form method="POST" onSubmit={handleSubmit}>
        <div className="shadow w-15 m-28 overflow-hidden sm:rounded-md">
          <div className="px-4 sm:px-0 pb-4">
            <h3 className="text-lg font-medium leading-6 text-white">
              Add video
            </h3>
            <p className="mt-1 text-sm text-white">
              Please fillup the form to edit video
            </p>
          </div>
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6 text-black">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Video title"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <TextInput
                  title="YouTube Video link"
                  value={url}
                  required
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <TextInput
                  title="Video Duration"
                  value={duration}
                  required
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <TextInput
                  title="Video no of views"
                  value={views}
                  required
                  onChange={(e) => setViews(e.target.value)}
                />
              </div>
              <div className="col-span-6">
                <TextArea
                  title="Description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
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

          {isSuccess && (
            <div className="flex justify-center items-center flex-col">
              <Success message="Video was added successfully Add More? " />
              <Link
                to="/admin/videos"
                type="submit"
                className=" justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-gray-500"
              >
                Go Back
              </Link>
            </div>
          )}
          {isError && <Error message="There was an error adding video!" />}
        </div>
      </form>
    </div>
  );
}
