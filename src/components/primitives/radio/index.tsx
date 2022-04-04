/** @jsxImportSource @compiled/react */
import React from "react";
// import { violet, blackA } from "@radix-ui/colors";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import usePersistedId from "../utils/use-persisted-id";
import { useFormProvider } from "../form-provider";
import FormAlert from "../form-alert";
import VisuallyHidden from "../visually-hidden";

export const RadioGroup = RadioGroupPrimitive.Root;
// interface RadioContentProps extends CompiledJSXPropsOmitRef<HTMLInputElement> {
// 	name: string;
// 	children: any;
// 	sizes?: "xs" | "sm" | "md" | "lg" | "xl";
// 	required?: boolean;
// 	checked?: boolean;
// 	value?: string | boolean | undefined;
// 	validationErrorMessage?: string | ((type: "required") => string);
// }

export const RadioContent = ({
	sizes = "md",
	children,
	value,
	disabled,
}): JSX.Element => {
	const foundsize = {
		xs: "0.75rem",
		sm: "1rem",
		md: "1.5rem",
		lg: "2rem",
		xl: "3rem",
	}[sizes];
	const innersizes = {
		xs: "0.35rem",
		sm: "0.5rem",
		md: "0.75rem",
		lg: "1rem",
		xl: "1.5rem",
	}[sizes];
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
					width: `${foundsize} !important`,
					height: `${foundsize} !important`,
					borderWidth: "2px",
					borderStyle: "solid",
					borderImage: "initial",
					borderRadius: "999px",
					borderColor: "inherit",
					color: "#fff",
					transition: 'all 0.3s',
					"&:hover": { backgroundColor: "#0001" },
					"&[data-state=checked], &:hover[data-state=checked]": {
						
						borderColor: "#007FFF",
					},
				}}
				value={value}
				id={id}
				disabled={disabled}
				aria-disabled={disabled}
			>
				<RadioGroupPrimitive.Indicator
					css={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						position: "relative",
						transition: 'all 0.3s',
						"&::after": {
							content: '""',
							display: "block",
							width: `${innersizes} !important`,
							height: `${innersizes} !important`,
							borderRadius: "50%",
							backgroundColor: "#007FFF",
						},
					}}
				/>
			</RadioGroupPrimitive.Item>
			<label
				css={{
					color: "black",
					fontsizes: 15,
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

export const RadioBase = ({
	children,
	onChange,
	name,
	required,
	value,
	formContext,
}) => {
	if (!Array.isArray(children)) {
		children = [children];
	}
	React.useEffect(() => {
		if (formContext) {
			formContext?.setValue(name, children[0].props.value);
		}
	}, []);
	return (
		<RadioGroupPrimitive.Root
			onValueChange={onChange}
			value={value}
			name={name}
			defaultValue={children[0].props.value}
			{...formContext?.register(name, { required: required })}
		>
			{children}
			{formContext?.errors[name]?.type === "required" && (
				<FormAlert>Required</FormAlert>
			)}
		</RadioGroupPrimitive.Root>
	);
};

export const Radio = ({
	children,
	value,
	onChange,
	name,
	required = false,
}) => {
	const formContext = useFormProvider();

	if (formContext) {
		return (
			<RadioBase
				value={value}
				onChange={(e) => {
					formContext.setValue(name, e);
					if (onChange) {
						onChange(e);
					}
				}}
				name={name}
				required={required}
				formContext={formContext}
			>
				{children}
			</RadioBase>
		);
	} else {
		return (
			<RadioBase value={value} onChange={onChange} name={name}>
				{children}
			</RadioBase>
		);
	}
};

// export default Radio;
