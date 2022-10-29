import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { selectGlobalState } from "../redux/globalStateSlice";
import { motion } from "framer-motion";

const LoadingGlobal: React.FC = () => {
  const { colors, isGlobalLoading } = useSelector(selectGlobalState);

  return (
    <motion.div
      initial={{ display: "none", x: "-50%" }}
      animate={
        isGlobalLoading
          ? { y: "8vh", display: "block" }
          : { y: 0, display: "none" }
      }
      // className="fixed top-0 z-20 flex items-center justify-center p-4 rounded-full left-1/2 dark:bg-white-theme"
      className="fixed top-0 left-1/2"
    >
      <ReactLoading
        color={colors["red-theme"]}
        width="4rem"
        height="4rem"
        type="bars"
      />
    </motion.div>
  );
};

export default LoadingGlobal;
