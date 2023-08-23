import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useGetassignmentMarksQuery } from "../features/assignmentMark/assignmentMarkSlice";
import { useSelector } from "react-redux";
import {
  useGetStudentQuery,
  useGetUsersQuery,
} from "../features/users/usersAPI";
import LeaderBoardRow from "./LeaderBoardRow";
import { useGetQuizMarksQuery } from "../features/quizMark/quizMarkApi";
import RelatedVideoLoader from "../components/ui/loaders/RelatedVideoLoader";

export default function LeaderBoard() {
  const [quizMarkTotal, setQuizMarkTotal] = useState(0);
  const [assignmentMarkTotal, setAssignmentMarkTotal] = useState(0);
  const {
    data: assignmentMarks,
    isLoading: assignmentLoading,
    isError: assignmentIsError,
  } = useGetassignmentMarksQuery();
  const {
    data: quizMarks,
    isLoading: quizLoading,
    isError: quizIsError,
  } = useGetQuizMarksQuery();
  const { user } = useSelector((state) => state.auth);

  const {
    data: students,
    isLoading: studentsLoading,
    isError: studentsError,
  } = useGetStudentQuery();
  let leaderBoardData = [];
  if (students?.length) {
    for (let i = 0; i < students.length; i++) {
      leaderBoardData.push({
        id: students[i].id,
        name: students[i].name,
        email: students[i].email,
      });
    }
  }

  // Add Quiz & Assignment Marks in the leaderBoardData
  if (
    !assignmentLoading &&
    !quizLoading &&
    !studentsLoading &&
    leaderBoardData.length > 0
  ) {
    for (let i = 0; i < leaderBoardData.length; i++) {
      const id = leaderBoardData[i].id;
      if (assignmentMarks.length > 0) {
        let assignmentMarkSum = 0;
        for (let j = 0; j < assignmentMarks.length; j++) {
          if (assignmentMarks[j].student_id === id) {
            if (assignmentMarks[j].mark)
              assignmentMarkSum += parseInt(assignmentMarks[j].mark);
          }
        }
        leaderBoardData[i].assignmentMark = assignmentMarkSum;
      }
    }
  }
  if (
    !assignmentLoading &&
    !quizLoading &&
    !studentsLoading &&
    user?.id &&
    leaderBoardData.length > 0
  ) {
    for (let i = 0; i < leaderBoardData.length; i++) {
      const id = leaderBoardData[i].id;

      if (quizMarks.length > 0 && id) {
        let quizMarkSum = 0;
        for (let j = 0; j < quizMarks.length; j++) {
          if (quizMarks[j].student_id === id) {
            if (quizMarks[j].mark) quizMarkSum += parseInt(quizMarks[j].mark);
          }
        }
        leaderBoardData[i].quizMark = quizMarkSum;
        leaderBoardData[i].quizMark = quizMarkSum;
      }
    }
  }
  if (leaderBoardData.length > 0) {
    for (let i = 0; i < leaderBoardData.length; i++) {
      if (leaderBoardData[i].assignmentMark && leaderBoardData[i].quizMark) {
        leaderBoardData[i].totalMark =
          leaderBoardData[i].quizMark + leaderBoardData[i].assignmentMark;
      } else if (!leaderBoardData[i].quizMark) {
        leaderBoardData[i].totalMark = leaderBoardData[i].assignmentMark;
      } else if (!leaderBoardData[i].assignmentMark) {
        leaderBoardData[i].totalMark = leaderBoardData[i].quizMark;
      }
    }
  }

  console.log(leaderBoardData);
  // Sort the array in descending order based on totalMark
  leaderBoardData.sort((a, b) => b.totalMark - a.totalMark);

  // Add the rank property to each object in the array
  let rank = 1;
  for (let i = 0; i < leaderBoardData.length; i++) {
    // Check if the current totalMark is the same as the previous totalMark
    if (
      i > 0 &&
      leaderBoardData[i].totalMark === leaderBoardData[i - 1].totalMark
    ) {
      // If so, set the rank to the same as the previous object
      leaderBoardData[i].rank = leaderBoardData[i - 1].rank;
    } else {
      // Otherwise, set the rank to the current rank
      leaderBoardData[i].rank = rank;
    }
    // Increment the rank only if the current totalMark is not the same as the next totalMark
    if (
      i < leaderBoardData.length - 1 &&
      leaderBoardData[i].totalMark !== leaderBoardData[i + 1].totalMark
    ) {
      rank++;
    }
  }
  let content = null;
  if (assignmentLoading || quizLoading || studentsLoading) {
    content = <RelatedVideoLoader></RelatedVideoLoader>;
  } else if (assignmentIsError || quizIsError || studentsError) {
    content = <p>Error Occured</p>;
  } else if (students.length === 0) {
    content = <p>No Student Found</p>;
  } else if (leaderBoardData.length > 0) {
    content = leaderBoardData.map((student) => (
      <LeaderBoardRow key={student.id} student={student}></LeaderBoardRow>
    ));
  }

  const userData = leaderBoardData.find((s) => s.id === user?.id);
  return (
    <div>
      <NavBar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead></thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {userData?.rank}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.quizMark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.assignmentMark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {userData?.quizMark + userData?.assignmentMark}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
