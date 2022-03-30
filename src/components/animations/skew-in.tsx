/** @jsxImportSource @compiled/react */
import React from "react";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@react-hook/window-size";
import gsap from "gsap";
import {
	useAnimatableLayoutEffect,
	useAnimatableLayoutEffectNoTransitions
} from "../../utils/use-animatable-layout-effect";

interface SkewInProps extends React.HTMLProps<HTMLDivElement> {
	delay?: number;
	triggerOnce?: boolean;
}

export const SkewIn = ({ delay = 0, triggerOnce = false, ...props }: SkewInProps): JSX.Element => {
	const clipRef = React.useRef<HTMLDivElement>(null);
	const { ref: inViewRef, inView, entry } = useInView({ threshold: 0.3, triggerOnce });
	const [imageOffset, setImageOffset] = React.useState(0);

	const [width] = useWindowSize();

	useAnimatableLayoutEffect(() => {
		if (clipRef?.current) {
			const { height } = clipRef.current?.getBoundingClientRect();
			setImageOffset(height / 2);
		}
	}, [clipRef?.current]);

	useAnimatableLayoutEffectNoTransitions(() => {
		if (width >= 1280 && clipRef?.current) {
			const animation = gsap
				.fromTo(
					clipRef.current,
					{
						yPercent: 40,
						opacity: 0,
						rotate: 1.8,
					},
					{
						yPercent: 0,
						opacity: 1,
						rotate: 0,
						ease: "power2.out",
						duration: 0.7,
					}
				)
				.pause();

			if (inView) {
				animation.play(0).delay(delay);
			} else {
				animation.reverse(0);
			}
		}
	}, [inView, entry]);

	return (
		<>
			<div ref={inViewRef} className={`absolute`} style={{ marginTop: `${imageOffset}px` }} />
			<div css={{width: "100%", height: "100%", overflow: "hidden"}}>
				<div ref={clipRef} {...props} />
			</div>
		</>
	);
};
