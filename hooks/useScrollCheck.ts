import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

const useScrollCheck = () => {
  const { scrollX, scrollY } = useScroll();

  const [currentX, setCurrentX] = useState<number>(0);
  const [currentY, setCurrentY] = useState<number>(0);

  const [status, setStatus] = useState<string>();

  useEffect(() => {
    scrollX.onChange((pos) => {
      setCurrentX(pos);
    });
    scrollY.onChange((pos) => {
      setCurrentY(pos);
    });
  }, [scrollX, scrollY]);

  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.getVelocity());
    });
  }, [scrollY]);

  return status;
};

export default useScrollCheck;
