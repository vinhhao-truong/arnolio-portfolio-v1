import { TargetAndTransition, Variants } from "framer-motion";

//To scale
interface ScaleProps {
  scaleUp: TargetAndTransition;
  scaleDown: TargetAndTransition;
}
export const scales: ScaleProps = {
  scaleUp: { scale: 1.2 },
  scaleDown: { scale: 0.8 },
};

//To fade
interface FadeProps {
  fadeIn: TargetAndTransition;
  fadeOut: TargetAndTransition;
}
export const fades: FadeProps = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

//To translate
interface TranslateProps {
  x: (distance: string | number) => TargetAndTransition;
  y: (distance: string | number) => TargetAndTransition;
}
export const translates: TranslateProps = {
  x: (distance) => ({ x: distance }),
  y: (distance) => ({ y: distance }),
};
