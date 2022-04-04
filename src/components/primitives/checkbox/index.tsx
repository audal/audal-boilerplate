/** @jsxImportSource @compiled/react */
import React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { useFormProvider, IFormContext } from "../form-provider";
import FormAlert from "../form-alert";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import usePersistedId from "../utils/use-persisted-id";

// export interface CheckBoxProps
export interface CheckBoxProps
	extends CompiledJSXPropsOmitRef<HTMLInputElement> {
	/**
	 * Name of the CheckBox - will be used for the form validation if using FormContext so make sure it's unique.
	 */
	name: string;
	/**
	 * Children refers to the label
	 * */
	children: any;
	/**
	 * The size of the radio button.
	 * */
	sizes?: "xs" | "sm" | "md" | "lg" | "xl";
	/**
	 * Make the field required or not. Defaults to false for all field types.
	 */
	required?: boolean;
	/**
	 * Make the field disabled or not. Defaults to false for all field types.
	 */
	disabled?: boolean;
	/**
	 * This refers to the value of the input
	 */
	value?: string | number | boolean;
	/**
	 * This refers to the input style
	 */
	inputBoxStyle?: any;
	/*
	 * Our form provider.
	 */
	formContext?: IFormContext;
}

export const CheckBox = ({
	name,
	children,
	sizes = "md",
	required,
	checked,
	formContext,
	onChange,
	inputBoxStyle,
}: CheckBoxProps): JSX.Element => {
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
							backgroundColor: `${checked ? "#007FFF" : "white"}`,
							border: `${checked ? "3px solid #007FFF" : "3px solid #0002"}`,
							width: `${foundSize} !important`,
							height: `${foundSize} !important`,
							borderRadius: 4,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: `0 2px 10px "#007FFF"`,
							"&:focus": { boxShadow: `0px 0px 5px 2px #47a2ff` },
						}}
						id={id}
						onCheckedChange={onChange}
						checked={checked}
						{...formContext?.register(name, {
							required: required,
						})}
						className={inputBoxStyle}
					>
						<CheckboxPrimitive.Indicator
							css={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
							}}
						>
							<CheckIcon color="white" width={innerSize} height={innerSize} />
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
	required = false,
	defaultChecked = false,
	inputBoxStyle,
}: CheckBoxProps) => {
	/*
	 * Get our form provider. It may not exist
	 * (if the input component is not inside a FormProvider and is using the component separately)
	 * so make sure to not access it directly without first checking.
	 * */
	const formContext = useFormProvider();

	const [checked, setChecked] = React.useState(defaultChecked);

	if (formContext !== undefined) {
		return (
			<CheckBox
				value={!checked}
				onChange={(e) => {
					setChecked(!checked);
					formContext.setValue(name, e);
					if (onChange) {
						onChange(e);
					}
				}}
				checked={checked}
				name={name}
				required={required}
				formContext={formContext}
				inputBoxStyle={inputBoxStyle}
			>
				{children}
			</CheckBox>
		);
	} else {
		return (
			<CheckBox
				inputBoxStyle={inputBoxStyle}
				value={value}
				onChange={onChange}
				name={name}
			>
				{children}
			</CheckBox>
		);
	}
};
