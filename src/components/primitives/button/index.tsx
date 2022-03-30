/** @jsxImportSource @compiled/react */
import React from 'react';
import {ClassNames} from "@compiled/react";
import { ax } from '@compiled/react/runtime';
import Spinner from "../spinner";

interface ButtonProps extends CompiledJSXProps<HTMLButtonElement> {
	loading?: boolean
	type: "button" | "submit" | "reset" | undefined
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ disabled, loading, className, children, type = "button", ...props }, ref) => {

	return (
		<ClassNames>
			{({ css, style }) => {
				return (
					//@ts-ignore
					<button
						type={type}
						role="button"
						aria-disabled={disabled}
						disabled={disabled || loading}
						/**
						* Can buttons that have a loading state be considered a toggle button?
						* Not sure...
						*/
						aria-pressed={typeof loading !== undefined ? loading : undefined}
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
							transition: 'opacity 0.3s',
							lineHeight: "1.2",
							"&[disabled]": {
								cursor: "not-allowed",
								opacity: loading ? 0.8 : 0.4
							},
						}), className])}
						{...style}
						{...props}
					>
						<div aria-hidden={!!loading} css={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							opacity: loading ? 1 : 0,
							transition: '0.2s',
							position: 'absolute',
							left: 0,
							top: 0
						}}><Spinner size="sm"/></div>
						<span aria-hidden={loading} css={{
							opacity: loading ? 0 : 1,
							transition: '0.2s'
						}}>
							{children}
						</span>
					</button>
				)
			}}
		</ClassNames>

	)
})

export default Button
