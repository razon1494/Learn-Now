import React, { useState } from "react";
import { useAddAssignmentMarkMutation } from "../features/assignmentMark/assignmentMarkSlice";
import { useSelector } from "react-redux";

export default function AssignmentModal({
  handleClose,
  correspondingAssignment,
}) {
  const [addAssignmentMark, { isLoading, isSuccess, isError }] =
    useAddAssignmentMarkMutation();
  const auth = useSelector((state) => state.auth);
  const [repo_link, setRepo_link] = useState("");
  const submitAssignment = (e) => {
    e.preventDefault();
    console.log(repo_link);
    const user = auth.user;
    const data = {
      student_id: user.id,
      student_name: user.name,
      assignment_id: correspondingAssignment.id,
      title: correspondingAssignment.title,
      createdAt: new Date().toISOString(),
      totalMark: correspondingAssignment.totalMark,
      mark: "",
      repo_link,
      status: "pending",
    };
    addAssignmentMark(data);
    handleClose();
  };

  return (
    <section className="modal-main">
      <h2 className="text-2xl font-bold mb-4">Assignment Details</h2>
      <h2 className="text-2xl font-bold mb-4">
        {correspondingAssignment.title}
      </h2>
      <form onSubmit={submitAssignment} className="flex flex-col gap-4 mx-28">
        <label>
          Repo Link:
          <input
            type="text"
            name="repo_link"
            value={repo_link}
            onChange={(e) => setRepo_link(e.target.value)}
            placeholder="Github Repo Link"
            className="w-full px-4 py-2 border bg-gray-300 border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </label>
        <button
          disabled={isLoading}
          type="submit"
          className=" bg-blue-500 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <button
        onClick={handleClose}
        className="mt-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded font-semibold focus:outline-none"
      >
        Close
      </button>
    </section>
  );
}
