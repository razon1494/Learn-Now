import React, { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import { useGetVideoesQuery } from "../features/videos/videoesSlice";
import { useNavigate } from "react-router-dom";
import { useAddQuizMutation } from "../features/quizzes/quizzesSlice";
import Error from "../components/ui/Error";
import TextInput from "../components/ui/TextInput";
import Success from "../components/ui/Success";
import Swal from "sweetalert2";
import DescriptionLoader from "../components/ui/loaders/DescriptionLoader";
export default function AddQuiz() {
  // Add quiz
  const [addQuiz, { isLoading, isSuccess, isError }] = useAddQuizMutation();
  // State declare
  const [question, setQuestion] = useState("");
  const [video_title, setVideo_title] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option1IsCorrect, setOption1IsCorrect] = useState(false);
  const [option2IsCorrect, setOption2IsCorrect] = useState(false);
  const [option3IsCorrect, setOption3IsCorrect] = useState(false);
  const [option4IsCorrect, setOption4IsCorrect] = useState(false);
  // Getting required data
  const {
    data: videos,
    isLoading: videoLoading,
    isError: videoError,
    error,
  } = useGetVideoesQuery();
  // Submit handler
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const video = videos.find((video) => video.title === video_title);
    const options = [
      { id: 1, option: option1, isCorrect: option1IsCorrect },
      { id: 2, option: option2, isCorrect: option2IsCorrect },
      { id: 3, option: option3, isCorrect: option3IsCorrect },
      { id: 4, option: option4, isCorrect: option4IsCorrect },
    ];
    let video_id = null;
    if (video) {
      video_id = video.id;

      Swal.fire({
        title: "Do you want to proceed? One New Quiz will be added",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          addQuiz({
            question,
            video_id,
            video_title,
            options,
          }).then(() => {
            Swal.fire("Saved!", "", "success");
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      console.log(`Video with title ${video_title} not found`);
    }

    navigate("/admin/quizzes");
  };
  // Loading Handler
  let content = null;

  if (videoLoading) {
    content = <DescriptionLoader></DescriptionLoader>;
  } else if (!videoLoading && isError) {
    content = <Error message="There was an error!" />;
  } else if (!videoLoading && !videoError && videos?.length) {
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
          {videos.map((v) => (
            <option value={v.title}>{v.title} </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div>
      <AdminNavBar></AdminNavBar>
      {/* Add Form  */}
      <div className="container ml-48 mt-16">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="shadow w-15 overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6 text-black">
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                {content}
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Option one"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                  />
                  <label className="d-inline">
                    <input
                      type="checkbox"
                      checked={option1IsCorrect}
                      onChange={() => setOption1IsCorrect(!option1IsCorrect)}
                    />
                    option 1 is Correct
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Option Two"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                  />
                  <label className="d-inline">
                    <input
                      type="checkbox"
                      checked={option2IsCorrect}
                      onChange={() => setOption2IsCorrect(!option2IsCorrect)}
                    />
                    option 2 is Correct
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Option Three"
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                  />
                  <label className="d-inline">
                    <input
                      type="checkbox"
                      checked={option3IsCorrect}
                      onChange={() => setOption3IsCorrect(!option3IsCorrect)}
                    />
                    option 3 is Correct
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <TextInput
                    title="Option Four"
                    value={option4}
                    onChange={(e) => setOption4(e.target.value)}
                  />
                  <label className="d-inline">
                    <input
                      type="checkbox"
                      checked={option4IsCorrect}
                      onChange={() => setOption4IsCorrect(!option4IsCorrect)}
                    />
                    option 4 is Correct
                  </label>
                </div>
                <div className="col-span-6 sm:col-span-3"></div>
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
}
