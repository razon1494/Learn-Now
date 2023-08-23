import React from "react";
import { useGetAssignmentsQuery } from "../features/assignments/assignmentsSlice";
import { AssignmentItem } from "./AssignmentItem";
import { Link } from "react-router-dom";
import DescriptionLoader from "./ui/loaders/DescriptionLoader";
export const AssignmentsList = () => {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();
  let content = null;
  if (isLoading) {
    content = <DescriptionLoader></DescriptionLoader>;
  }
  if (!isLoading && isError) {
    content = <p>{error} </p>;
  }
  if (!isLoading && !isError && assignments?.length === 0) {
    content = <p>No Assignments found </p>;
  }
  if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map((assignment) => (
      <AssignmentItem
        key={assignment.id}
        assignment={assignment}
      ></AssignmentItem>
    ));
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <Link to={"/admin/assignmentadd"} className="btn ml-auto">
              Add Assignment
            </Link>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Title</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Mark</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
