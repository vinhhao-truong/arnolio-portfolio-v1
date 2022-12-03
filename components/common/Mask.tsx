import { useDispatch, useSelector } from "react-redux";
import { offMasked, selectGlobalState } from "../../redux/globalStateSlice";

const Mask: React.FC = () => {
  const { isMasked } = useSelector(selectGlobalState);
  const dispatch = useDispatch();

  return (
    <div
      // onClick={() => dispatch(offMasked())}
      className={`absolute top-0 left-0 z-20 w-full h-full bg-mask ${
        isMasked ? "block" : "hidden"
      }`}
    ></div>
  );
};
export default Mask;
