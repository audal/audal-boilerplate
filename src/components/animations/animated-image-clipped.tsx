/** @jsxImportSource @compiled/react */
import React from "react";
import Image, { ImageProps } from "next/image";
import useJarallax from "hooks/use-jarallax";
import { twMerge } from "tailwind-merge";
import { Box } from "primitives/box";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@react-hook/window-size";
import {
	useAnimatableLayoutEffect,
	useAnimatableLayoutEffectNoTransitions,
} from "hooks/use-animatable-layout-effect";
import gsap from "gsap";

export enum IntersectionVariants {
	topDown = "polygon(0 0, 100% 0, 100% 9%, 0 16%)",
	bottomUp = "polygon(0 83%, 100% 94%, 100% 100%, 0 100%)",
	leftRight = "polygon(0 0, 14% 0, 6% 100%, 0 100%)",
	rightLeft = "polygon(82% 0, 100% 0, 100% 100%, 95% 100%)",
	parallelogram = "polygon(27% 0, 100% 0, 48% 100%, 0 100%)",
}

export interface AnimatedImageProps extends ImageProps {
	className?: string;
	imageClassName?: string;
	variant?: IntersectionVariants;
}

export const AnimatedImageClipped = ({
										 className = "",
										 imageClassName = "",
										 variant = IntersectionVariants.leftRight,
										 ...props
									 }: AnimatedImageProps): JSX.Element => {
	const clipRef = React.useRef<HTMLDivElement>(null);
	const imageParallaxRef = useJarallax(0.7, "scroll", "vertical");
	const { ref: inViewRef, inView, entry } = useInView({ threshold: 0.3, triggerOnce: true });
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
						y: 50,
						opacity: 0,
						clipPath: variant,
					},
					{
						y: 0,
						opacity: 1,
						clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 0% 100%)",
						ease: "power2.out",
						duration: 0.4,
					}
				)
				.pause();

			if (inView) {
				animation.play(0);
			} else {
				animation.reverse(0);
			}
		}
	}, [inView, entry]);

	return (
		<>
			<div ref={inViewRef} className={`absolute`} style={{ marginTop: `${imageOffset}px` }} />
			<Box ref={imageParallaxRef} className={twMerge("w-full h-full", className)}>
				<div
					ref={clipRef}
					className={`w-full h-full jarallax-img`}
					style={{ transform: "translateX(0)" }}
				>
					<Image
						objectFit="cover"
						className={twMerge("w-full h-full", imageClassName)}
						alt="image"
						layout="fill"
						priority
						{...props}
					/>
				</div>
			</Box>
		</>
	);
};
