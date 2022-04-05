/** @jsxImportSource @compiled/react */
import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { nanoid } from "nanoid";
import {deepMemo} from "../../utils/deep-memo";
import {gsapClearRefs} from "../../utils/gsap-clear-refs";
import {useAnimatableLayoutEffect} from "../../utils/use-animatable-layout-effect";

export interface ParallaxProps extends React.HTMLProps<HTMLDivElement> {
	mobileX?: number[];
	mobileY?: number[];
	mobileOpacity?: number[];
	desktopX?: number[];
	desktopY?: number[];
	desktopOpacity?: number[];
}

export const Parallax = deepMemo(
	({
		 mobileX = [0, 0],
		 mobileY = [0, 0],
		 mobileOpacity = [1, 1],
		 desktopX = [0, 0],
		 desktopY = [0, 0],
		 desktopOpacity = [1, 1],
			css,
		 ...props
	 }: ParallaxProps): JSX.Element => {
		const contentRef = React.useRef<HTMLDivElement>(null);
		const [id] = React.useState(() => nanoid());

		const retrieveNum = (value: number, base = 0) => {
			return value ? value : base;
		};

		useAnimatableLayoutEffect(() => {
			gsap.registerPlugin(ScrollTrigger);

			let timeline: gsap.core.Timeline | null = null;
			let scrollTrig: globalThis.ScrollTrigger | null = null;

			ScrollTrigger.matchMedia({
				"(max-width: 1279px)": () => {
					gsapClearRefs([contentRef]);
					const from = {
						x: retrieveNum(mobileX[0]),
						y: retrieveNum(mobileY[0]),
						opacity: retrieveNum(mobileOpacity[0], 1),
					};
					timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
					gsap.set(contentRef.current, from);
					timeline.fromTo(
						contentRef.current,
						from,
						{
							x: retrieveNum(mobileX[1]),
							y: retrieveNum(mobileY[1]),
							opacity: retrieveNum(mobileOpacity[1], 1),
							duration: 100,
						},
						0
					);
					scrollTrig = ScrollTrigger.create({
						trigger: contentRef.current,
						animation: timeline,
						markers: false,
						start: "top bottom",
						end: "bottom top",
						scrub: 0,
						invalidateOnRefresh: true,
					});
				},
				"(min-width: 1280px)": () => {
					timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
					const from = {
						x: retrieveNum(desktopX[0]),
						y: retrieveNum(desktopY[0]),
						opacity: retrieveNum(desktopOpacity[0], 1),
					};
					gsap.set(contentRef.current, from);
					timeline.fromTo(
						contentRef.current,
						from,
						{
							x: retrieveNum(desktopX[1]),
							y: retrieveNum(desktopY[1]),
							opacity: retrieveNum(desktopOpacity[1], 1),
							duration: 100,
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
		}, [mobileX, mobileY, mobileOpacity, desktopX, desktopY, desktopOpacity]);

		return (
			<div css={{ transform: `translate(${retrieveNum(mobileX[0])}px, ${retrieveNum(
					mobileY[0]
				)}px)`, opacity: retrieveNum(mobileOpacity[0], 1), "@media (min-width: 1200px)": { transform: `translate(${retrieveNum(desktopX[0])}px, ${retrieveNum(desktopY[0])}px)`, opacity: retrieveNum(desktopOpacity[0], 1) }, ...css }} ref={contentRef} {...props} />
		);
	}
);
