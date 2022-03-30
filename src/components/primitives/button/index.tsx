/** @jsxImportSource @compiled/react */
import React from 'react';
import {ClassNames} from "@compiled/react";
import { ax } from '@compiled/react/runtime';

const Button = ({ disabled, loading, className, type = "button", ...props }) => {

	return (
		<ClassNames>
			{({ css, style }) => {
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
						className={ax([css({
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
							},
						}), className])}
						{...style}
						{...props}
					/>
				)
			}}
		</ClassNames>

	)
}

export default Button
