import { useDispatch, useSelector } from "react-redux";
import { offMasked, selectGlobalState } from "../../redux/globalStateSlice";
import { Portal } from "@mui/material";

const Mask: React.FC = () => {
  const { isMasked, isMaskClosable, isGlobalLoading, successState } =
    useSelector(selectGlobalState);
  const dispatch = useDispatch();

  return false ? (
    <Portal>
      <div
        onClick={isMaskClosable ? () => dispatch(offMasked()) : () => {}}
        className={`fixed top-0 left-0 z-[2000] w-full h-full backdrop-blur-lg  ${
          isMasked || isGlobalLoading || !!successState.msg ? "block" : "hidden"
        }`}
      ></div>
    </Portal>
  ) : (
    <></>
  );
};
export default Mask;
