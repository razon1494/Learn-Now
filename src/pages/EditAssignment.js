import React from "react";
import AdminNavBar from "../components/AdminNavBar";
import EditAssignmentForm from "../components/EditAssignmentForm";
import { useParams } from "react-router-dom";
import { useGetAssignmentQuery } from "../features/assignments/assignmentsSlice";
import Error from "../components/ui/Error";
import RelatedVideoLoader from "../components/ui/loaders/RelatedVideoLoader";

const EditAssignment = () => {
  const { assignmentId } = useParams();

  const {
    data: assignment,
    isLoading,
    isError,
    error,
  } = useGetAssignmentQuery(assignmentId);
  let content = null;

  if (isLoading) {
    content = <RelatedVideoLoader></RelatedVideoLoader>;
  } else if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  } else if (!isLoading && !isError && assignment?.id) {
    content = <EditAssignmentForm assignment={assignment} />;
  }

  return (
    <div>
      <AdminNavBar></AdminNavBar>
      {content}
    </div>
  );
};
export default EditAssignment;
