import React from "react";

const ViewProfileShimmer = () => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full" >
      <div className="flex items-center gap-4">
        <div className="skeleton h-36 w-36 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="skeleton h-4 w-full md:w-56"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default ViewProfileShimmer;
