import React from "react";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@react-hook/window-size";
import {ElementPositionRect, getPositionOfElement} from "./get-position-of-element";
import {useAnimatableLayoutEffect} from "./use-animatable-layout-effect";

export default function useJarallax(
	speed: number,
	type: "scroll" | "scale" | "opacity" | "scroll-opacity" | "scale-opacity" = "scroll",
	direction: "horizontal" | "vertical" = "vertical"
): (node?: Element | null | undefined) => void {
	const ref = React.useRef<HTMLElement | null>(null);
	const imageClipRef = React.useRef<HTMLElement | null>(null);
	const bounds = React.useRef<ElementPositionRect | undefined>();
	const startingPoint = React.useRef<number>(0);
	const requestAnimator = React.useRef<number | null>(null);
	const inViewAsRef = React.useRef<boolean>(false);

	const [windowWidth] = useWindowSize();

	const { ref: inViewRef, inView } = useInView();

	const setRefs = React.useCallback(
		(node) => {
			if (node) {
				ref.current = node;
				imageClipRef.current = node.querySelector(".jarallax-img");
				//ref.current.style.backgroundColor = "blue"
				if (ref?.current) {
					ref.current.style.width = "100%";
					ref.current.style.height = "100%";
					ref.current.style.overflow = "hidden";
				}
				if (imageClipRef?.current) {
					imageClipRef.current.style.width = "100%";
					imageClipRef.current.style.height = direction === "vertical" ? "120%" : "100%";
				}
			}
			inViewRef(node);
		},
		[inViewRef]
	);

	useAnimatableLayoutEffect(() => {
		inViewAsRef.current = inView;
	}, [inView]);

	useAnimatableLayoutEffect(() => {
		if (ref.current) {
			bounds.current = getPositionOfElement(ref);
			startingPoint.current = window.scrollY;
		}

		if (inView) {
			const easer = () => {
				if (bounds.current && imageClipRef?.current && ref?.current) {
					const scrollTop = window.scrollY || document.documentElement.scrollTop;

					if (direction === "horizontal") {
						if (windowWidth >= 1280) {
							let min, max, newMin;
							min = bounds.current.left - window.innerWidth;
							max = bounds.current.right;

							const percentage = ((scrollTop - min) * 100) / (max - min);
							newMin = -(window.innerWidth * 0.25);
							const newMax = 0;
							const x = (percentage / 100) * (newMax - newMin) + newMin;
							if (direction === "horizontal") {
								imageClipRef.current.style.transform = `translate3d(${x}px, 0, 0) scale(1.75)`;
							} else {
								imageClipRef.current.style.transform = `translate3d(0, ${x}px, 0) scale(1.75)`;
							}
						}
					} else if (direction === "vertical") {
						const winH = window.innerHeight;
						const scrollBottom = scrollTop + winH;

						const targetPosi = ref.current.getBoundingClientRect().top + scrollTop;
						const targetHeight = ref.current.clientHeight;
						const targetShowPosi = targetPosi - winH;
						const targetEndPosi = targetPosi + targetHeight;

						if (scrollTop > targetShowPosi && scrollTop < targetEndPosi) {
							const childHeight = imageClipRef.current.clientHeight;
							const maxVal = childHeight - targetHeight;
							const setVal = (
								(scrollBottom - targetPosi) *
								(maxVal / (winH + targetHeight))
							).toFixed(1);
							imageClipRef.current.style.transform = "translate3d(0," + -setVal + "px,0)";
						}
					}
				}

				if (inViewAsRef.current && windowWidth >= 1280) {
					requestAnimationFrame(easer);
				} else if (requestAnimator.current !== undefined && requestAnimator.current !== null) {
					cancelAnimationFrame(requestAnimator.current);
				}
			};
			requestAnimator.current = requestAnimationFrame(easer);
		} else if (requestAnimator.current !== undefined && requestAnimator.current !== null) {
			cancelAnimationFrame(requestAnimator.current);
		}

		return () => {
			if (requestAnimator.current) {
				cancelAnimationFrame(requestAnimator.current);
			}
		};
	}, [inView]);

	return setRefs;
}
