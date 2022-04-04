/** @jsxImportSource @compiled/react */
import React from "react";
// import { violet, blackA } from "@radix-ui/colors";
import { CheckIcon } from "@radix-ui/react-icons";
import { useFormProvider } from "../form-provider";
import FormAlert from "../form-alert";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import usePersistedId from "../utils/use-persisted-id";
import VisuallyHidden from "../visually-hidden";

// export interface CheckBoxProps
// 	extends CompiledJSXPropsOmitRef<HTMLInputElement> {
// 	name: string;
// 	children: string;
// 	sizes?: "xs" | "sm" | "md" | "lg" | "xl";
// 	required?: boolean;
// 	checked?: boolean;
// 	validationErrorMessage?: string | ((type: "required") => string);
// }

export const CheckBox = ({
	name,
	children,
	sizes = "md",
	required = false,
	checked,
	validationErrorMessage,
	value,
	formContext,
	onChange,
	...props
}): JSX.Element => {
	// console.log(onCheckedChange);
	// console.log(required);
	const foundSize = {
		xs: "0.75rem",
		sm: "1rem",
		md: "1.5rem",
		lg: "2rem",
		xl: "3rem",
	}[sizes];

	const innerSize = {
		xs: "0.5rem",
		sm: "0.75rem",
		md: "1rem",
		lg: "1.5rem",
		xl: "2rem",
	}[sizes];

	const id = usePersistedId();

	return (
		<>
			<div>
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
						id={id}
						{...props}
					>
						<CheckboxPrimitive.Indicator
							css={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
							}}
							{...formContext?.register(name, { required: required })}
							onCheckedChange={onchange}
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
			</div>
			{formContext?.errors[name]?.type === "required" && (
				<FormAlert>Required</FormAlert>
			)}
		</>
	);
};

export const CheckBoxGroup = ({
	children,
	value,
	onChange,
	name,
	checked = false,
	required = false,
}) => {
	const formContext = useFormProvider();

	if (formContext) {
		return (
			<CheckBox
				value={value}
				onChange={(e) => {
					formContext.setValue(name, !checked);
					if (onChange) {
						onChange(e);
					}
				}}
				checked={checked}
				name={name}
				required={required}
				formContext={formContext}
			>
				{children}
			</CheckBox>
		);
	} else {
		return (
			<CheckBox value={value} onChange={onChange} name={name}>
				{children}
			</CheckBox>
		);
	}
};
