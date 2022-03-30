/*
 * Our page transition
 * */
import React from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import {useAnimatableLayoutEffect} from "../../utils/use-animatable-layout-effect";
import {useLayoutContext} from "../../layouts";

export const LayoutTransition = ({
									 children,
									 shouldChange,
								 }: {
	children: React.ReactNode | React.ReactNodeArray;
	shouldChange: string;
}) => {
	const [tictac, setTictac] = React.useState<"tic" | "tac">("tic");
	const tictacRef = React.useRef<"tic" | "tac">("tic");

	const [hasLoaded, setHasLoaded] = React.useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setForceRefresh] = React.useState("");

	const {
		actions: {
			onTransitionStart,
			onTransitionEnd,
			purgeTransitionStartCallbacks,
			purgeTransitionEndCallbacks,
		},
	} = useLayoutContext();

	const ticChildren = React.useRef<React.ReactNode | React.ReactNodeArray>(children);
	const ticRef = React.useRef<HTMLDivElement>(null);
	const ticInnerRef = React.useRef<HTMLDivElement>(null);

	const tacChildren = React.useRef<React.ReactNode | React.ReactNodeArray>(null);
	const tacRef = React.useRef<HTMLDivElement>(null);
	const tacInnerRef = React.useRef<HTMLDivElement>(null);

	const scroll = typeof window === "undefined" ? 0 : window.scrollY;

	useAnimatableLayoutEffect(() => {
		/*
		 * Never transition the first page load
		 * */
		if (!hasLoaded) {
			setHasLoaded(true);
			return;
		}

		document.body.classList.add("is-transitioning");

		/*
		 * Run transitionStart callbacks
		 * */
		const transitionStarts = onTransitionStart();

		transitionStarts.forEach((callbackFn: () => void) => {
			callbackFn();
		});

		purgeTransitionStartCallbacks();

		/*
		 * Kill the ScrollTriggers so they don't bounce around
		 * during the transition, but keep the applied parameters
		 * */
		const triggers = ScrollTrigger.getAll();
		triggers.forEach((trigger) => {
			trigger.kill(false, false);
		});

		gsap.set(tictac === "tic" ? tacRef.current : ticRef.current, {
			position: "fixed",
			zIndex: 2,
			marginTop: 0,
			top: 0,
			width: "100%",
			opacity: 1,
			backgroundColor: "white",
			filter: "contrast(1) saturate(1) grayscale(0)",
			y: window.innerHeight,
		});

		gsap.set(tictac === "tic" ? tacInnerRef.current : ticInnerRef.current, {
			opacity: 0,
		});

		gsap.set(tictac === "tic" ? ticInnerRef.current : tacInnerRef.current, {
			opacity: 1,
		});

		gsap.set(tictac === "tic" ? ticRef.current : tacRef.current, {
			position: "fixed",
			zIndex: 0,
			top: -scroll,
			height: scroll + window.innerWidth,
			width: "100%",
		});

		gsap.fromTo(
			tictac === "tic" ? ticRef.current : tacRef.current,
			{ y: 0, filter: "contrast(1) saturate(1) grayscale(0)" },
			{
				y: -(window.innerHeight * 0.2),
				duration: 2,
				opacity: 0,
				filter: "contrast(0.1) saturate(0) grayscale(1)",
				ease: "Power4.easeInOut",
			}
		);

		/*
		 * Set our tic/tac state here, with our new children
		 * to trigger a re-render. We do this here instead of at
		 * animation end to:
		 * 1. We need to trigger a re-render in the first place to set our children for our next state
		 * 2. We want to make sure that if a new navigation event occurs before the animation finishes, our previous one will cancel gracefully
		 * */

		if (tictac === "tic") {
			tacChildren.current = children;
		} else {
			ticChildren.current = children;
		}

		setTictac(tictac === "tic" ? "tac" : "tic");
		tictacRef.current = tictac === "tic" ? "tac" : "tic";

		gsap
			.fromTo(
				tictacRef.current === "tac" ? tacRef.current : ticRef.current,
				{ y: window.innerHeight },
				{ y: 0, duration: 1.4, delay: 0.3, ease: "Power4.easeInOut" }
			)
			.then(() => {
				/*
				 * Prepare our next transition
				 * */

				gsap.set(tictacRef.current === "tac" ? ticRef.current : tacRef.current, {
					position: "fixed",
					top: 0,
					marginTop: 0,
					zIndex: 0,
					filter: "contrast(1) saturate(1) grayscale(0)",
					pointerEvents: "none",
				});

				gsap.to(tictacRef.current === "tac" ? tacRef.current : ticRef.current, {
					clearProps: "transform,y,position,filter,pointerEvents,height",
				});

				/*
				 * ScrollTrigger will be instantiating the triggers in the
				 * offset position of the element before it slides up,
				 * so we have to refresh on the tween end.
				 * */

				//ScrollTrigger.clearScrollMemory();
				ScrollTrigger.refresh();
				//ScrollTrigger.update();

				document.body.classList.remove("is-transitioning");
				/*
				 * Run transitionEnd callbacks
				 * */

				const transitionEnds = onTransitionEnd();

				transitionEnds.forEach((callbackFn: () => void) => {
					callbackFn();
				});

				purgeTransitionEndCallbacks();

				gsap.to(tictacRef.current === "tac" ? ticInnerRef.current : tacInnerRef.current, {
					opacity: 0,
					duration: 0.8,
				});
				gsap
					.to(tictacRef.current === "tac" ? tacInnerRef.current : ticInnerRef.current, {
						opacity: 1,
						duration: 0.8,
					})
					.then(() => {
						/*
						 * Remove the unneeded (old) children
						 * */
						if (tictacRef.current === "tac") {
							ticChildren.current = null;
						} else {
							tacChildren.current = null;
						}

						//Force refresh
						setForceRefresh(tictacRef.current);
					});
			});
	}, [shouldChange]);

	return (
		<div
			style={{
				marginTop: "-1px" /* Stop margin collapse from children */,
				paddingTop: "1px",
			}}
		>
			<div
				className="tic"
				style={{
					minHeight: tictac === "tic" ? "100vh" : "",
				}}
				ref={ticRef}
			>
				<div ref={ticInnerRef}>{ticChildren.current}</div>
			</div>
			<div
				className="tac"
				style={{
					minHeight: tictac === "tac" ? "100vh" : "",
				}}
				ref={tacRef}
			>
				<div ref={tacInnerRef} style={{ opacity: 0 }}>
					{tacChildren.current}
				</div>
			</div>
		</div>
	);
};
