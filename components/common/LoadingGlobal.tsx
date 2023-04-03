import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSuccessMsg,
  selectGlobalState,
} from "../../redux/globalStateSlice";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useEffect } from "react";
import Iconify from "./Iconify";

const LoadingGlobal: React.FC = () => {
  const { colors, isGlobalLoading, successState } =
    useSelector(selectGlobalState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successState) {
      const showMsg = setTimeout(() => {
        dispatch(closeSuccessMsg());
      }, 2800);

      return () => clearTimeout(showMsg);
    }
  }, [successState]);

  return (
    <div className="">
      <motion.div
        style={{ transform: "translate(-50%, -50%)" }}
        initial={{ display: "none" }}
        animate={
          // isGlobalLoading
          isGlobalLoading
            ? { y: "8vh", display: "block", opacity: 1 }
            : !!successState.msg
            ? {
                opacity: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              }
            : { y: 0, display: "none" }
        }
        // className="fixed top-0 z-20 flex items-center justify-center p-4 rounded-full left-1/2 dark:bg-white-theme"
        className="fixed top-1/2 left-1/2 z-[100]"
      >
        <Loader
          color={colors["red-theme"]}
          type="Spin Stretch"
          className="w-[100px]"
        />
      </motion.div>
      <motion.div
        initial={{ display: "none", opacity: 0 }}
        className="fixed top-1/2 left-1/2 z-[100] flex flex-col items-center gap-4"
        animate={
          // isGlobalLoading
          !!successState.msg
            ? {
                display: "block",
                opacity: 1,
                scale: 2,
                transition: {
                  delay: 0.2,
                  duration: 0.5,
                  ease: "backIn",
                },
              }
            : { y: 0, display: "none" }
        }
      >
        <div className="flex justify-center">
          <Iconify
            icon="charm:circle-tick"
            color={successState.color ? successState.color : "#52b788"}
            className="text-3xl"
          />
        </div>

        <h2 className="text-xl" style={{ color: successState.color }}>
          {successState.msg}
        </h2>
      </motion.div>
    </div>
  );
};

export default LoadingGlobal;
