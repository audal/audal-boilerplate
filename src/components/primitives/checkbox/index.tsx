/** @jsxImportSource @compiled/react */
import React from "react";
// import { violet, blackA } from "@radix-ui/colors";
import { CheckIcon } from "@radix-ui/react-icons";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import usePersistedId from "../utils/use-persisted-id";

interface CheckBoxProps {
	children: any;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const CheckBox = ({
	children,
	size = "md",
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
		xs: "0.5rem",
		sm: "0.75rem",
		md: "1rem",
		lg: "1.5rem",
		xl: "2rem",
	}[size];
	const id = usePersistedId();
	return (
		<div css={{ alignItems: "center", display: "flex" }}>
			<CheckboxPrimitive.Root
				css={{
					all: "unset",
					backgroundColor: "white",
					width: `${foundSize} !important`,
					height: `${foundSize} !important`,
					borderRadius: 4,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					boxShadow: `0 2px 10px gray`,
					"&:hover": { backgroundColor: "red" },
					"&:focus": { boxShadow: `0 0 0 2px black` },
				}}
				defaultChecked
				id={id}
				{...props}
			>
				<CheckboxPrimitive.Indicator
					css={{
						alignItems: "center",
						justifyContent: "center",
						display: "flex",
					}}
				>
					<CheckIcon width={innerSize} height={innerSize} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
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
