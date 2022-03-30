/** @jsxImportSource @compiled/react */
import React from "react";
import { PageProps } from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import "keen-slider/keen-slider.min.css";
import "focus-visible/dist/focus-visible";
import "./reset.css"
import { SkipNavContent, SkipNavLink } from "@reach/skip-nav";
import "@reach/skip-nav/styles.css";
import FadeTransition from "../components/transitions/fade-transition";
import Provider from "../components/primitives/provider";

export interface LayoutContextType {
	actions: {
		onTransitionStart: (callback?: () => void) => (() => void)[];
		onTransitionEnd: (callback?: () => void) => (() => void)[];
		purgeTransitionStartCallbacks: () => void;
		purgeTransitionEndCallbacks: () => void;
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LayoutContext = React.createContext<LayoutContextType>(null as any);

const LayoutContextProvider = ({ children, location }: PageProps): React.ReactElement => {
	/*
	 * Children can add functions to execute when transition state changes
	 * */
	const beforeTransitionExecutors = React.useRef<(() => void)[]>([]);
	const afterTransitionExecutors = React.useRef<(() => void)[]>([]);

	/* These act as both getters and setters */
	const onTransitionStart = (callback?: () => void) => {
		if (callback) {
			beforeTransitionExecutors.current.push(callback);
		}
		return beforeTransitionExecutors.current;
	};
	const onTransitionEnd = (callback?: () => void) => {
		if (callback) {
			afterTransitionExecutors.current.push(callback);
		}
		return afterTransitionExecutors.current;
	};

	/*
	 * Create purge functions for the transition itselfd
	 * */

	const purgeTransitionStartCallbacks = () => {
		beforeTransitionExecutors.current = [];
	};

	const purgeTransitionEndCallbacks = () => {
		afterTransitionExecutors.current = [];
	};

	return (
		<Provider>
			<LayoutContext.Provider
			value={{
				actions: {
					onTransitionStart,
					onTransitionEnd,
					purgeTransitionStartCallbacks,
					purgeTransitionEndCallbacks,
				},
			}}
		>
			<SkipNavLink />
			<div css={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
				<Header />
				<FadeTransition shouldChange={location.pathname}>
					<SkipNavContent as="main">{children}</SkipNavContent>
				</FadeTransition>
				<Footer  />
			</div>

		</LayoutContext.Provider>
		</Provider>
	);
};

export default LayoutContextProvider

/*
 * Layout Context as a hook.
 * */
export const useLayoutContext = (): LayoutContextType => {
	const context = React.useContext<LayoutContextType>(LayoutContext);
	if (!context) {
		throw new Error(`useLayoutContext must be used within a LayoutContextProvider`);
	}
	return context;
};
