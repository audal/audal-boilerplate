/** @jsxImportSource @compiled/react */
import React from "react";
// import { violet, blackA } from "@radix-ui/colors";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import usePersistedId from "../utils/use-persisted-id";

export const RadioGroup = RadioGroupPrimitive.Root;
interface RadioContentProps {
	children: any;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const RadioContent = ({
	children,
	size = "md",
	...props
}: RadioContentProps): JSX.Element => {
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
	const id = usePersistedId();
	return (
		<div css={{ display: "flex", margin: "10px 0", alignItems: "center" }}>
			<RadioGroupPrimitive.Item
				css={{
					backgroundColor: "white",
					border: "2px solid #0002",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					flexShrink: 0,
					width: `${foundSize} !important`,
					height: `${foundSize} !important`,
					borderWidth: "2px",
					borderStyle: "solid",
					borderImage: "initial",
					borderRadius: "999px",
					borderColor: "inherit",
					color: "#fff",
					"&:hover": { backgroundColor: "#0001" },
					"&[data-state=checked], &:hover[data-state=checked]": {
						background: "blue",
						borderColor: "blue"
					},
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
