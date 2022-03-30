/** @jsxImportSource @compiled/react */
import React from "react";

/**
 * Simple Accessible Alert component that can be re-used.
 * @alias CompiledJSXProps<HTMLSpanElement>
 * */
const FormAlert: React.FC = React.forwardRef<HTMLSpanElement, CompiledJSXProps<HTMLSpanElement>>((props, ref) => (
	<span ref={ref} role="alert" css={{ color: 'red' }} {...props} />
))

export default FormAlert
