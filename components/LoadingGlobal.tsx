import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { selectGlobalState } from "../redux/globalStateSlice";
import { motion } from "framer-motion";

const LoadingGlobal: React.FC = () => {
  const { colors, isGlobalLoading } = useSelector(selectGlobalState);

  return (
    <motion.div
      initial={{ display: "none" }}
      animate={
        isGlobalLoading
          ? { y: "5vh", display: "block" }
          : { y: 0, display: "none" }
      }
      className="fixed top-0 right-[5vw] z-20 flex items-center justify-center p-4 rounded-full dark:bg-white-theme"
    >
      <ReactLoading
        color={colors["blue-theme"]}
        width="1.5rem"
        height="1.5rem"
        type="spin"
      />
    </motion.div>
  );
};

export default LoadingGlobal;
