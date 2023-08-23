import React from "react";
import { useGetQuizzesQuery } from "../features/quizzes/quizzesSlice";
import Quizitem from "./Quizitem";
import { Link } from "react-router-dom";
import DescriptionLoader from "./ui/loaders/DescriptionLoader";

export default function QuizzesList() {
  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();
  let content = null;
  if (isLoading) {
    content = <DescriptionLoader></DescriptionLoader>;
  }
  if (!isLoading && isError) {
    content = <p>{error} </p>;
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <p>No quizzes found </p>;
  }
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map((quiz) => (
      <Quizitem key={quiz.id} quiz={quiz}></Quizitem>
    ));
  }
  return (
    <div>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to={"/admin/addquiz"}>
                <button className="btn ml-auto">Add Quiz</button>
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
