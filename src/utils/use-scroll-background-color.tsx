import React from "react";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";

export const useScrollBackgroundColor = (
	backgroundColor: string,
	textColor: string
) => {
	const { ref, inView } = useInView({ threshold: 0.3 });

	return {
		ref,
		ColorSetter: (
			<Helmet>
				{inView && (
					<style>{`  :root { --background-col: ${backgroundColor}; --text-col: ${textColor}; } `}</style>
				)}
			</Helmet>
		),
	};
};
