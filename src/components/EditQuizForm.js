import React, { useState } from "react";
import { useEditQuizMutation } from "../features/quizzes/quizzesSlice";
import { useGetVideoesQuery } from "../features/videos/videoesSlice";
import Error from "./ui/Error";
import { useNavigate } from "react-router-dom";
import Success from "./ui/Success";
import TextInput from "./ui/TextInput";
import VideoLoader from "./ui/loaders/VideoLoader";

export default function EditQuizForm({ quiz }) {
  const [editQuiz, { isLoading, isSuccess, isError }] = useEditQuizMutation();
  const {
    id,
    question: initialQuestion,
    video_title: initialVideoTitle,
    video_id,
    options: initialOptions,
  } = quiz;
  const [question, setQuestion] = useState(initialQuestion || "");
  const [video_title, setVideo_title] = useState(initialVideoTitle || "");
  const [option1, setOption1] = useState(initialOptions[0]?.option || "");
  const [option2, setOption2] = useState(initialOptions[1]?.option || "");
  const [option3, setOption3] = useState(initialOptions[2]?.option || "");
  const [option4, setOption4] = useState(initialOptions[3]?.option || "");
  const [option1IsCorrect, setOption1IsCorrect] = useState(
    initialOptions[0]?.isCorrect || false
  );
  const [option2IsCorrect, setOption2IsCorrect] = useState(
    initialOptions[1]?.isCorrect || false
  );
  const [option3IsCorrect, setOption3IsCorrect] = useState(
    initialOptions[2]?.isCorrect || false
  );
  const [option4IsCorrect, setOption4IsCorrect] = useState(
    initialOptions[3]?.isCorrect || false
  );

  // Getting required data
  const {
    data: videos,
    isLoading: videoLoading,
    isError: videoError,
    error,
  } = useGetVideoesQuery();
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
      editQuiz({
        id,
        data: {
          question,
          video_id,
          video_title,
          options,
        },
      });
      // Do something with the video_id
    } else {
      console.log(`Video with title ${video_title} not found`);
    }

    navigate("/admin/quizzes");
  };

  let content = null;

  if (videoLoading) {
    content = <VideoLoader></VideoLoader>;
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
          {videos.map((v) => (
            <option selected={v.title === video_title} value={v.title}>
              {v.title}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
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
  );
}
