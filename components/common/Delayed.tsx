import React, { useState, useEffect } from "react";
import ReactProps from "../../interfaces/ReactProps";

interface DelayedProps extends ReactProps {
  waitBeforeShow?: number;
}
const Delayed: React.FC<DelayedProps> = ({
  children,
  waitBeforeShow = 500,
}) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? <>{children}</> : <></>;
};

export default Delayed;
