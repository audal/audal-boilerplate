/** @jsxImportSource @compiled/react */
import React from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { useWindowSize } from "@react-hook/window-size";
import {useAnimatableLayoutEffectNoTransitions} from "../../utils/use-animatable-layout-effect";
import {deepMemo} from "../../utils/deep-memo";

interface FadeInOnScrollProps extends CompiledJSXProps<HTMLDivElement> {
	delay?: number;
	triggerOnce?: boolean;
	threshold?: number;
}

export const FadeInOnScroll = deepMemo(
	({
		 delay = 0,
		 triggerOnce = false,
		 threshold = 0.2,
		 css,
		 ...props
	 }: FadeInOnScrollProps) => {
		const {
			ref: inViewRef,
			inView,
			entry,
		} = useInView({ delay: 0.5, threshold, triggerOnce: triggerOnce });

		const [width] = useWindowSize();
		const [loadedOnce, setLoadedOnce] = React.useState(false);
		const [hasBeenInView, setHasBeenInView] = React.useState(false);
		const isPlayingRef = React.useRef<boolean>(false);

		useAnimatableLayoutEffectNoTransitions(() => {
			if (!loadedOnce) {
				setLoadedOnce(true);
				return;
			}
			if (width >= 768 && entry?.target) {
				const animation = gsap
					.fromTo(
						entry?.target,
						{
							y: 50,
							opacity: 0,
						},
						{
							y: 0,
							opacity: 1,
							ease: "power2.out",
							duration: 0.7,
						}
					)
					.pause();

				if (inView && !isPlayingRef.current) {
					isPlayingRef.current = true;
					animation
						.play(0)
						.delay(delay)
						.then(() => {
							setHasBeenInView(true);
							isPlayingRef.current = false;
						});
				} else {
					if (hasBeenInView && !isPlayingRef.current) {
						animation.reverse(0);
					}
				}
			}
		}, [inView]);

		return (
			<div
				css={{
					width: "100%",
					"@media (min-width: 767px)": {
						opacity: 0,
						transform: "translateY(50px)"
					},
					...css
				}}
				ref={inViewRef}
				{...props}
			/>
		);
	}
);
