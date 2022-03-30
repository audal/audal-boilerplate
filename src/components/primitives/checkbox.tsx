/** @jsxImportSource @compiled/react */
import React from "react";
// import { violet, blackA } from "@radix-ui/colors";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export const RadioGroup = RadioGroupPrimitive.Root;
interface CheckBoxProps {
	id: string;
	children: any;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const CheckBox = ({
	children,
	id,
	size = "xl",
	...props
}: CheckBoxProps): JSX.Element => {
	const foundSize = {
		xs: "0.75rem",
		sm: "1rem",
		md: "1.5rem",
		lg: "2rem",
		xl: "3rem",
	}[size];
	const innerSize = {
		xs: "0.35rem",
		sm: "0.5rem",
		md: "0.75rem",
		lg: "1rem",
		xl: "1.5rem",
	}[size];
	console.log(foundSize);
	return (
		<div css={{ display: "flex", margin: "10px 0", alignItems: "center" }}>
			<RadioGroupPrimitive.Item
				css={{
					all: "unset",
					backgroundColor: "white",
					width: `${foundSize} !important`,
					height: `${foundSize} !important`,
					borderRadius: "100%",
					boxShadow: `0 2px 10px black`,
					"&:hover": { backgroundColor: "red" },
					"&:focus": { boxShadow: `0 0 0 2px black` },
				}}
				value="default"
				id={id}
				{...props}
			>
				<RadioGroupPrimitive.Indicator
					css={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						position: "relative",
						"&::after": {
							content: '""',
							display: "block",
							width: `${innerSize} !important`,
							height: `${innerSize} !important`,
							borderRadius: "50%",
							backgroundColor: "red",
						},
					}}
				/>
			</RadioGroupPrimitive.Item>
			<label
				css={{
					color: "black",
					fontSize: 15,
					lineHeight: 1,
					userSelect: "none",
					paddingLeft: 15,
				}}
				htmlFor={id}
			>
				{children}
			</label>
		</div>
	);
};
