import React from "react";

interface ReactProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  divRef?: React.MutableRefObject<null>;
  id?: string;
}

export default ReactProps;
