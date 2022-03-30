/** @jsxImportSource @compiled/react */
import React from "react";
import {GatsbyImageSVGFallback} from "../gatsby-image-svg-fallback";
import useJarallax from "../../utils/use-jarallax";

export interface AnimatedImageProps {
	containerCss?: AnyKeyCssProps;
}

export const AnimatedImage = ({containerCss = {}, ...props}: AnimatedImageProps): JSX.Element => {
	const imageParallaxRef = useJarallax(0.7, "scroll", "vertical");

	return (
		<div ref={imageParallaxRef} css={{ width: "100%", height: "100%", ...containerCss }}>
			<div css={{ width: "100%", height: "100%", transform: "translateX(0)" }}>
				<GatsbyImageSVGFallback
					{...props}
				/>
			</div>
		</div>
	);
};
