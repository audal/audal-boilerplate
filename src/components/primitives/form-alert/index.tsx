import React from "react";

/**
 * Simple Accessible Alert component that can be re-used.
 * @alias CompiledJSXProps<HTMLSpanElement>
 * */
const FormAlert: React.FC = React.forwardRef<
	HTMLSpanElement,
	CompiledJSXProps<HTMLSpanElement>
>((props, ref) => (
	<span
		ref={ref}
		role="alert"
		css={{
			display: "block",
			color: "red",
			paddingTop: "6px",
			textTransform: "uppercase",
			fontSize: "12px",
			fontWeight: "bold",
		}}
		{...props}
	/>
));

FormAlert.displayName = "FormAlert";

export default FormAlert;
