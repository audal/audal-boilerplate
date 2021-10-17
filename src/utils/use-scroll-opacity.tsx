import { useInView } from "react-intersection-observer";

export const useScrollOpacity = (delay?: number) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    delay: 50,
    initialInView: typeof window === "undefined",
  });
  return {
    ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(15px)",
      transition: "opacity 0.7s, transform 0.7s",
      transitionDelay: delay ? `${delay}ms` : "0",
    },
  };
};
