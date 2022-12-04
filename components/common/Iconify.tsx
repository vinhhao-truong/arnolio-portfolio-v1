import { Icon, IconifyIcon } from "@iconify/react";

import React from "react";
import ReactProps from "../../interfaces/ReactProps";

interface IconifyProps extends ReactProps {
  icon: string | IconifyIcon;
  color: string;
}
const Iconify: React.FC<IconifyProps> = (props) => {
  return <Icon {...props} />;
};

export default Iconify;
