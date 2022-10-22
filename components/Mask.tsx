import { useSelector } from "react-redux";
import { selectGlobalState } from "../redux/globalStateSlice";

const Mask: React.FC = () => {
  const { isMasked } = useSelector(selectGlobalState);

  return isMasked ? (
    <div className="fixed top-0 left-0 z-20 w-full h-full bg-mask"></div>
  ) : (
    <></>
  );
};
export default Mask;
