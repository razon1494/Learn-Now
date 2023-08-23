import React from "react";
import AdminNavBar from "../components/AdminNavBar";
import { useParams } from "react-router-dom";
import { useGetQuizQuery } from "../features/quizzes/quizzesSlice";
import Error from "../components/ui/Error";
import EditQuizForm from "../components/EditQuizForm";
import RelatedVideoLoader from "../components/ui/loaders/RelatedVideoLoader";

export default function EditQuiz() {
  const { quizId } = useParams();
  const { data: quiz, isLoading, isError, error } = useGetQuizQuery(quizId);
  let content = null;

  if (isLoading) {
    content = <RelatedVideoLoader></RelatedVideoLoader>;
  } else if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  } else if (!isLoading && !isError && quiz?.id) {
    content = <EditQuizForm quiz={quiz} />;
  }

  return (
    <div>
      <AdminNavBar />
      {content}
    </div>
  );
}
