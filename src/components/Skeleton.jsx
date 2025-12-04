import React from "react";

const Skeleton = () => (
  <div className="animate-pulse flex flex-col gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gray-300 h-20 rounded" />
    ))}
  </div>
);

export default Skeleton;
