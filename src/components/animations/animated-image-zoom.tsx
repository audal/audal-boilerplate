import React from "react";
import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";
import { Box } from "primitives/box";
import { useAnimatableLayoutEffect } from "hooks/use-animatable-layout-effect";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { gsapClearRefs } from "utils/gsap-clear-refs";

export interface AnimatedImageProps extends ImageProps {
	className?: string;
	imageClassName?: string;
}

export const AnimatedImageZoom = ({
									  className = "",
									  imageClassName = "",
									  ...props
								  }: AnimatedImageProps): JSX.Element => {
	const contentRef = React.useRef<HTMLDivElement>(null);

	useAnimatableLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		let timeline: gsap.core.Timeline | null = null;
		let scrollTrig: globalThis.ScrollTrigger | null = null;

		ScrollTrigger.matchMedia({
			"(max-width: 1279px)": () => {
				gsapClearRefs([contentRef]);
			},
			"(min-width: 1280px)": () => {
				timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
				const from = {
					scale: 1.4,
					yPercent: -10,
					opacity: 0.6,
					backgroundColor: "#000",
				};
				gsap.set(contentRef.current, from);
				timeline.fromTo(
					contentRef.current,
					from,
					{
						scale: 1,
						opacity: 1,
						yPercent: 0,
						duration: 100,
						backgroundColor: "#0000",
					},
					0
				);
				scrollTrig = ScrollTrigger.create({
					trigger: contentRef.current,
					animation: timeline,
					markers: false,
					start: "top bottom",
					end: "bottom top",
					scrub: 0.5,
					invalidateOnRefresh: true,
				});
			},
		});

		return () => {
			if (timeline) {
				timeline.kill();
			}
			if (scrollTrig) {
				scrollTrig.kill();
			}
		};
	}, []);

	return (
		<>
			<Box className={twMerge("w-full h-full overflow-hidden", className)}>
				<div
					ref={contentRef}
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
