import React from "react";

export default function AssignmentMarkStat({ assignMentMarks }) {
  let pending = 0;
  let published = 0;
  for (let i = 0; i < assignMentMarks.length; i++) {
    if (assignMentMarks[i].status === "pending") {
      pending++;
    }
    if (assignMentMarks[i].status === "published") {
      published++;
    }
  }

  return (
    <ul className="assignment-status">
      <li>
        Total <span>{assignMentMarks?.length}</span>
      </li>
      <li>
        Pending <span>{pending}</span>
      </li>
      <li>
        Mark Sent <span>{published}</span>
      </li>
    </ul>
  );
}
