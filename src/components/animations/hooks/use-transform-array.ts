import { MotionValue, useSpring, useTransform } from "framer-motion";
import { CSSProperties } from "react";

interface UseTransformArrayProps {
  properties: {
    [key in keyof CSSProperties]: (string | number)[];
  };
  scrollY: MotionValue;
}

// Very illegal and fun
const useTransformArray = ({ properties, scrollY }: UseTransformArrayProps) => {
  const physics = { damping: 30, mass: 0.05, stiffness: 200 };
  const sprungY = useSpring(scrollY, physics);
  return Object.fromEntries(
    Object.entries(properties).map(([key, valArr]) => {
      // need to create 'points' that framer can map our array of vals to.
      // Just split the number 1 (for 0-1) and divide by the amount of properties we're moving thru
      const arr = valArr.map((_, i) => (1 / valArr.length) * i);
      return [key, useTransform(sprungY, arr, valArr)];
    })
  );
};

export default useTransformArray;
