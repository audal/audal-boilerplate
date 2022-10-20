import React from "react"

const Divider = ({
					 className,
					 ...props
				 }: CompiledJSXPropsOmitRef<HTMLHRElement>): JSX.Element => {
	return (
		<hr
			aria-orientation="horizontal"
			css={{
				opacity: 0.6,
				borderColor: "#bab6af44",
				borderStyle: "solid",
				borderTopWidth: "1px",
				width: "100%",
			}}
			className={className}
			{...props}
		/>
	);
};

export default Divider;
