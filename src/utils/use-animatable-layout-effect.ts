/** @jsxImportSource @compiled/react */
import React from "react";
import {useLayoutContext} from "../layouts";

export const useAnimatableLayoutEffect = (
	props: React.EffectCallback,
	deps: React.DependencyList = []
) => {
	const effect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
	effect(props, deps);
};

export const useAnimatableLayoutEffectNoTransitions = (
	props: React.EffectCallback,
	deps: React.DependencyList = []
) => {
	const {
		actions: { onTransitionStart, onTransitionEnd },
	} = useLayoutContext();

	const isAnimatingRef = React.useRef<boolean>(false);

	const effect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

	effect(() => {
		onTransitionStart(() => (isAnimatingRef.current = true));
		onTransitionEnd(() => (isAnimatingRef.current = false));
	}, []);

	effect(isAnimatingRef.current ? () => {} : props, deps);
};
