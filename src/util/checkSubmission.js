export const checkSubmission = (arr, studentId, assignmentId) => {
  for (let i = 0; i < arr?.length; i++) {
    if (
      arr[i].student_id === studentId &&
      arr[i].assignment_id === assignmentId
    ) {
      if (arr[i].status === "pending") {
        return {
          isSubmitted: true,
          mark: "Mark IsPending",
        };
      } else
        return {
          isSubmitted: true,
          mark: `You got ${arr[i].mark} out of ${arr[i].totalMark} in this assignment`,
        };
    }
  }
  return {
    isSubmitted: false,
  };
};
export const checkQuizSubmission = (arr, studentId, videoId) => {
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i].student_id === studentId && arr[i].video_id === videoId) {
      return true;
    }
  }
  return false;
};
