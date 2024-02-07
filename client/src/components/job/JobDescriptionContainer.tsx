import React from "react";

interface JobDescriptionContainer {
  children: React.ReactNode;
}

function JobDescriptionContainer({ children }: JobDescriptionContainer) {
  return (
    <div className="w-3/5 max-h-screen  overflow-y-auto p-5">{children}</div>
  );
}

export default JobDescriptionContainer;
