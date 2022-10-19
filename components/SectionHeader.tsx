import React from "react";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return <div className="text-center text-4xl font-semibold">{title}</div>;
};

export default SectionHeader;
