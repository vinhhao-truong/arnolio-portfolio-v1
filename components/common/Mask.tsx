import { useDispatch, useSelector } from "react-redux";
import { offMasked, selectGlobalState } from "../../redux/globalStateSlice";

const Mask: React.FC = () => {
  const { isMasked, isMaskClosable } = useSelector(selectGlobalState);
  const dispatch = useDispatch();

  return (
    <div
      onClick={isMaskClosable ? () => dispatch(offMasked()) : () => {}}
      className={`fixed top-0 left-0 z-20 w-full h-full bg-mask ${
        isMasked ? "block" : "hidden"
      }`}
    ></div>
  );
};
export default Mask;
