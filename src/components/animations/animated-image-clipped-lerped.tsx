import React from "react";
import useJarallax from "hooks/use-jarallax";
import { useInView } from "react-intersection-observer";
import { useWindowSize } from "@react-hook/window-size";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
	useAnimatableLayoutEffect,
	useAnimatableLayoutEffectNoTransitions
} from "../../utils/use-animatable-layout-effect";
import {gsapClearRefs} from "../../utils/gsap-clear-refs";

export enum IntersectionVariants {
	topDown = "polygon(0 0, 100% 0, 100% 9%, 0 16%)",
	bottomUp = "polygon(0 83%, 100% 94%, 100% 100%, 0 100%)",
	leftRight = "polygon(0 0, 14% 0, 6% 100%, 0 100%)",
	rightLeft = "polygon(82% 0, 100% 0, 100% 100%, 95% 100%)",
	parallelogram = "polygon(27% 0, 100% 0, 48% 100%, 0 100%)",
}

interface AnimatedImageProps extends ImageProps {
	className?: string;
	imageClassName?: string;
	variant?: IntersectionVariants;
}

export const AnimatedImageClippedLerped = ({
											   className = "",
											   imageClassName = "",
											   variant = IntersectionVariants.leftRight,
											   ...props
										   }: AnimatedImageProps): JSX.Element => {
	const clipRef = React.useRef<HTMLDivElement>(null);
	const contentRef = React.useRef<HTMLDivElement>(null);
	const innerSkewRef = React.useRef<HTMLDivElement>(null);
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

	useAnimatableLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		let scrollTrig: globalThis.ScrollTrigger | null = null;

		const proxy = { skew: 0 },
			skewSetter = gsap.quickSetter(contentRef.current, "skewY", "deg"), // fast
			clamp = gsap.utils.clamp(-8, 5);

		const innerProxy = { skew: 0 },
			innerSkewSetter = gsap.quickSetter(innerSkewRef.current, "skewY", "deg");

		ScrollTrigger.matchMedia({
			"(max-width: 1279px)": () => {
				gsapClearRefs([contentRef]);
			},
			"(min-width: 1280px)": () => {
				scrollTrig = ScrollTrigger.create({
					trigger: contentRef.current,
					markers: false,
					start: "top bottom",
					end: "bottom top",
					scrub: 1,
					invalidateOnRefresh: true,
					onUpdate: (self) => {
						const skew = clamp(self.getVelocity() / 300);
						// only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
						if (Math.abs(skew) > Math.abs(proxy.skew)) {
							proxy.skew = skew;
							gsap.to(proxy, {
								skew: 0,
								duration: 0.8,
								ease: "power3",
								overwrite: true,
								onUpdate: () => {
									skewSetter(-proxy.skew);
								},
							});
							gsap.to(innerProxy, {
								skew: 0,
								duration: 0.8,
								ease: "power3",
								overwrite: true,
								onUpdate: () => {
									innerSkewSetter(proxy.skew);
								},
							});
						}
					},
				});
			},
		});

		return () => {
			if (scrollTrig) {
				scrollTrig.kill();
			}
		};
	}, []);

	return (
		<>
			<div ref={inViewRef} className={`absolute`} style={{ marginTop: `${imageOffset}px` }} />
			<div css={{ width: "100%", height: "100%" }} ref={contentRef}>
				<Box ref={imageParallaxRef} className="w-full h-full">
					<Box ref={innerSkewRef} className="w-full h-full">
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
				</Box>
			</div>
		</>
	);
};
