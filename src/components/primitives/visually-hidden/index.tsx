/** @jsxImportSource @compiled/react */
import React from 'react';

/**
 * A component to render text for screen-readers. A simple span with css rules to hide the text in an accessible way.
 *
 * @alias VisuallyHiddenProps
 * */
export type VisuallyHiddenProps = React.HTMLProps<HTMLDivElement>

const VisuallyHidden = (props: VisuallyHiddenProps): JSX.Element => {
	return <span css={{
		border: 0,
		clip: "rect(0px, 0px, 0px, 0px)",
		height: "1px",
		width: "1px",
		margin: "-1px",
		padding: 0,
		overflow: "hidden",
		whiteSpace: "nowrap",
		position: "absolute",
	}} {...props} />
}

export default VisuallyHidden
