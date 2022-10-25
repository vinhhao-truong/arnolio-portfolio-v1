import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

const TopProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState<string>("");

  useEffect(() => {
    scrollYProgress.onChange((pos) => {
      setProgress(`${pos * 100}%`);
    });
  }, [scrollYProgress]);

  return (
    <div
      style={{ height: progress }}
      className="hidden md:block md:fixed left-0 bottom-0 max-w-[100vw] z-20 w-1 bg-red-theme"
    ></div>
  );
};

export default TopProgressBar;
