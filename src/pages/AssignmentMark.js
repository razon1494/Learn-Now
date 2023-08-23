import React, { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import { useGetassignmentMarksQuery } from "../features/assignmentMark/assignmentMarkSlice";
import { dateFormat } from "../util/dateConvert";
import AssignmentMarkItem from "../components/AssignmentMarkItem";
import AssignmentMarkStat from "../components/AssignmentMarkStat";
import DescriptionLoader from "../components/ui/loaders/DescriptionLoader";

export default function AssignmentMark() {
  const {
    data: assignMentMarks,
    isLoading,
    isError,
    error,
  } = useGetassignmentMarksQuery();

  let content = null;
  let statContent = (
    <ul className="assignment-status">
      <li>
        Total <span></span>
      </li>
      <li>
        Pending <span></span>
      </li>
      <li>
        Mark Sent <span></span>
      </li>
    </ul>
  );
  if (isLoading) {
    content = <DescriptionLoader></DescriptionLoader>;
  }
  if (!isLoading && isError) {
    content = <p>{error} </p>;
  }
  if (!isLoading && !isError && assignMentMarks?.length === 0) {
    content = <p>No Assignment found </p>;
  }
  if (!isLoading && !isError && assignMentMarks?.length > 0) {
    statContent = (
      <AssignmentMarkStat
        assignMentMarks={assignMentMarks}
      ></AssignmentMarkStat>
    );
    content = assignMentMarks.map((m) => {
      return <AssignmentMarkItem assignmentMark={m}></AssignmentMarkItem>;
    });
  }
  return (
    <div>
      <AdminNavBar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            {statContent}
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Full Mark</th>
                    <th className="table-th">Mark</th>
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
