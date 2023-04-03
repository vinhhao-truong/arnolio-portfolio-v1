import React from "react";
import styles from "../../styles/Loader.module.scss";
import { getClasses, getStyles } from "../../utils/getProps";
import ReactProps from "../../interfaces/ReactProps";

interface LoaderProps extends ReactProps {
  color?: string;
  type:
    | "Surrounded Dot"
    | "Spin Stretch"
    | "Three Fading Dots"
    | "Three Waving Dots";
}

const Loader: React.FC<LoaderProps> = ({ type, color, className, style }) => {
  const thisColor = color ? color : "#FFFFFF";
  const defaultWidth = "30px";

  const SurroundedDot = () => {
    return (
      <svg className={`${styles.SurroundedDot}`} viewBox="0 0 50 50">
        <circle
          className="ring"
          stroke={thisColor}
          opacity="0.4"
          cx="25"
          cy="25"
          r="20"
          fill="none"
        ></circle>
        <circle
          className="ball"
          fill={thisColor}
          cx="25"
          cy="5"
          r="3.5"
        ></circle>
      </svg>
    );
  };

  const SpinStretch = () => {
    return (
      <div
        style={{
          borderTopColor: thisColor,
          borderBottomColor: thisColor,
        }}
        className={styles.SpinStretch}
      ></div>
    );
  };

  const ThreeFadingDots = () => {
    return (
      <div
        style={{ backgroundColor: thisColor }}
        className={styles["ThreeFadingDots"]}
      >
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    );
  };

  const ThreeWavingDots = () => {
    return (
      <div
        style={{ backgroundColor: thisColor }}
        className={styles["ThreeWavingDots"]}
      >
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    );
  };

  return (
    <div
      className={`${className ? getClasses(className) : "w-[30px]"}`}
      style={getStyles(style)}
    >
      {type === "Surrounded Dot" && <SurroundedDot />}
      {type === "Spin Stretch" && <SpinStretch />}
      {type === "Three Fading Dots" && <ThreeFadingDots />}
      {type === "Three Waving Dots" && <ThreeWavingDots />}
    </div>
  );
};

export default Loader;
