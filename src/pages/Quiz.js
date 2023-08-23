import React from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../features/videos/videoesSlice";
import Error from "../components/ui/Error";
import QuizQuestion from "../components/QuizQuestion";
import {
  useGetQuizzesQuery,
  useGetSpecificQuizQuery,
} from "../features/quizzes/quizzesSlice";
import QuizQuestions from "../components/QuizQuestions";
import RelatedVideoLoader from "../components/ui/loaders/RelatedVideoLoader";

export default function Quiz() {
  const { videoId } = useParams();
  const { data: video, isLoading, isError } = useGetVideoQuery(videoId);
  const {
    data: quizzes,
    isLoading: quizLoading,
    isError: quizError,
  } = useGetSpecificQuizQuery(videoId);
  let content = null;
  if (isLoading) {
    content = <RelatedVideoLoader></RelatedVideoLoader>;
  } else if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  } else if (!isLoading && !isError && video?.id) {
    content = <h1 className="text-2xl font-bold">{video.title}</h1>;
  }
  let contentQuiz = null;
  if (quizLoading) {
    contentQuiz = <div>Loading...</div>;
  } else if (!quizLoading && quizError) {
    contentQuiz = <Error message="There was an error!" />;
  } else if (!quizLoading && !quizError && quizzes?.length === 0) {
    contentQuiz = <p>No Quizzes</p>;
  } else if (!quizLoading && !quizError && quizzes?.length > 0) {
    contentQuiz = <QuizQuestion quizzes={quizzes} video={video} />;
  } else {
    contentQuiz = <div>Loading...</div>;
  }
  return (
    <div>
      <NavBar />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            {content}
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <div className="space-y-8 ">{contentQuiz}</div>
        </div>
      </section>
    </div>
  );
}
