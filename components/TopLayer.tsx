import React from "react";
import ReactProps from "../interfaces/ReactProps";

const TopLayer: React.FC<ReactProps> = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-top-layer"></div>
  );
};

export default TopLayer;
