import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAssignmentsQuery } from "../features/assignments/assignmentsSlice";
import { useGetQuizzesQuery } from "../features/quizzes/quizzesSlice";
import { shortDateFormat } from "../util/dateConvert";
import Box from "@mui/material/Box";
import AssignmentModal from "./AssignmentModal";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useGetassignmentMarksQuery } from "../features/assignmentMark/assignmentMarkSlice";
import { checkSubmission } from "../util/checkSubmission";
import DescriptionLoader from "./ui/loaders/DescriptionLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  borderRadius: "15px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "black",
  textAlign: "center",
};

const VideoDetails = ({ video }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id, title, description, views, duration, createdAt } = video;
  const auth = useSelector((state) => state.auth);
  const {
    data: assignments,
    isLoading: assignmentLoading,
    isError: isAssignmentError,
    error: assignmentError,
  } = useGetAssignmentsQuery();
  const {
    data: assignmentMarks,
    isLoading: markLoading,
    isError: isMarkError,
    error: markError,
  } = useGetassignmentMarksQuery();
  const {
    data: quizzes,
    isLoading: quizLoading,
    isError: isQuizError,
    error: quizError,
    isSuccess: markSuccess,
  } = useGetQuizzesQuery();
  const correspondingAssignment = assignments?.find((assignment) => {
    return assignment?.video_id === id;
  });
  const isQuizAvailable = quizzes?.find((quiz) => {
    return quiz?.video_id === id;
  });

  const uploadDate = shortDateFormat(createdAt);

  let content = null;
  if (assignmentLoading || quizLoading || markLoading) {
    content = <DescriptionLoader></DescriptionLoader>;
  } else if (!assignmentLoading && isAssignmentError) {
    content = <p>{assignmentError} </p>;
  } else if (!assignmentLoading && !isAssignmentError && isQuizError) {
    content = <p>{quizError} </p>;
  } else if (
    !assignmentLoading &&
    !isAssignmentError &&
    !quizLoading &&
    !isQuizError &&
    assignments?.length === 0
  ) {
  } else if (
    !assignmentLoading &&
    !isAssignmentError &&
    !quizLoading &&
    !isQuizError &&
    quizzes?.length === 0
  ) {
  } else if (
    !assignmentLoading &&
    !isAssignmentError &&
    !quizLoading &&
    !isQuizError &&
    assignments?.length > 0 &&
    quizzes?.length > 0 &&
    auth?.user &&
    markSuccess
  ) {
    const isSubmittedProperty = checkSubmission(
      assignmentMarks,
      auth.user.id,
      correspondingAssignment.id
    );
    const { isSubmitted } = isSubmittedProperty;
    content = (
      <>
        {" "}
        <div className="flex gap-4">
          {correspondingAssignment?.id && !isSubmitted && (
            <>
              <button
                onClick={handleOpen}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                এসাইনমেন্ট
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <AssignmentModal
                    handleClose={handleClose}
                    correspondingAssignment={correspondingAssignment}
                  ></AssignmentModal>
                </Box>
              </Modal>
            </>
          )}
          {correspondingAssignment?.id && isSubmitted && (
            <>
              <button
                disabled
                className="px-3 font-bold py-1 border border-gray text-gray rounded-full text-sm"
              >
                Assignment Submitted.
              </button>
            </>
          )}

          {isQuizAvailable && (
            <Link
              to={`/quiz/${id}`}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              কুইজে অংশগ্রহণ করুন
            </Link>
          )}
        </div>
        {correspondingAssignment?.id && isSubmitted && (
          <>
            <h2
              disabled
              className="px-3 font-bold py-1 mt-4 text-white text-gray  text-xl"
            >
              {isSubmittedProperty.mark}
            </h2>
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {uploadDate}
      </h2>
      {content}

      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
};

export default VideoDetails;
