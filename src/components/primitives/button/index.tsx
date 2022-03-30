/** @jsxImportSource @compiled/react */
import React from 'react';

const Button = ({ disabled, loading, type = "button", ...props }) => {

	return (
		<button
			type={type}
			role="button"
			aria-disabled={disabled}
			disabled={disabled}
			/**
			* Can buttons that have a loading state be considered a toggle button?
			* Not sure...
			*/
			aria-pressed={typeof loading !== undefined ? !!loading : undefined}
			css={{
				cursor: "pointer",
				appearance: "none",
				display: "inline-flex",
				justifyContent: "center",
				alignItems: "center",
				position: "relative",
				userSelect: "none",
				whiteSpace: "nowrap",
				verticalAlign: "middle",
				outlineOffset: "2px",
				width: "auto",
				opacity: disabled ? 0.4 : 1,
				transition: 'opacity 0.3s',
				lineHeight: "1.2",
				"&[disabled]": {
					cursor: "not-allowed"
				}
			}}
			{...props}
		/>
	)
}

export default Button
