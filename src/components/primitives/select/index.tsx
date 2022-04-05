/** @jsxImportSource @compiled/react */
import React, { useEffect } from "react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useFormProvider } from "../form-provider";
import usePersistedId from "../utils/use-persisted-id";
import { Controller } from "react-hook-form";
import throwOnMissing from "../utils/throw-on-missing";
import FormAlert from "../form-alert";

interface SelectOptionProps{
	/**
	 * The option label
	 */
	children: React.ReactChild | React.ReactChildren | string;
	/**
	 * This diables the option from being selected.
	 * The default value is false
	 */
	disabled?: boolean;
	/**
	 * The option value sent to the form handler when selected
	 */
	value: string;
}

/**
 * <SelectOption /> component. Must always be a child of <Select /> component
 * @param {CompiledJSXCustomProps<SelectOptionProps>}
 * @returns {React.ReactElement}
 */
export const SelectOption = ({ children, value, disabled=false }: CompiledJSXCustomProps<SelectOptionProps>): React.ReactElement => {
	return (
		<SelectPrimitive.Item
			css={{
				fontSize: 13,
				lineHeight: 1,
				color: violet.violet11,
				borderRadius: 3,
				display: "flex",
				alignItems: "center",
				height: 25,
				padding: "0 35px 0 25px",
				position: "relative",
				userSelect: "none",
				"&[data-disabled]": {
					color: mauve.mauve8,
					pointerEvents: "none",
				},
				"&:hover": {
					backgroundColor: "blue",
				},
			}}
			value={value}
			disabled={disabled}
			aria-disabled={disabled}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator
				css={{
					position: "absolute",
					left: 0,
					width: 25,
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<CheckIcon />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
};

interface SelectBaseProps{
	/** 
	 * List of select options
	 * Each uses the <SelectOption /> component
	*/
	children: React.ReactNode | React.ReactNode[];
	/** 
	 * PLaceholder text of the select input 
	*/
	placeholder: string;
	/**
	 * function that will be executed when the value of the select input changes
	 */
	onChange: (e: React.SyntheticEvent) => void;
	/**
	 * Name of the input. It must be unique in the form
	 */
	name: string;
	/**
	 * If the value is true, this prevents the form from submitting if a value has not been set.
	 * The default value is false
	 */
	required: boolean;
	/**
	 * This is used to get the form provider value if the <Select /> compoonent 
	 * is a child of a <FormProvider /> component
	 */
	formContext?: any;
	/**
	 * This prop is passed down from the <Select /> component.
	 * This is used to style the input box or trigger box
	 */
	inputBoxStyle?: string;
	// disabled: boolean;
}

/**
 * <SelectBase /> component. It always accept children.
 * Its children are the same children passed to <Select /> component i.e. the options
 * @param {CompiledJSXCustomProps<SelectBaseProps}
 * @returns {React.ReactElement}
 */
const SelectBase = ({
	children,
	onChange,
	placeholder,
	name,
	required,
	formContext,
	inputBoxStyle,
	// disabled=false
}: CompiledJSXCustomProps<SelectBaseProps>): React.ReactElement => {

	if (!children) {
		children = [
			<SelectOption disabled value="NA">
				No options available.
			</SelectOption>,
		];
	}

	if (!Array.isArray(children)) {
		children = [children];
	}

	if (placeholder) {
		children = [
			<SelectOption disabled value={placeholder}>
				{placeholder}
			</SelectOption>,
			...children,
		];
	}

	React.useEffect(() => {
		if (!placeholder && formContext) {
			formContext.setValue(name, children[0].props.value);
		}
	}, []);

	return (
		<div>
			<SelectPrimitive.Root
				onValueChange={onChange}
				name={name}
				defaultValue={children[0].props.value}
				{...formContext?.register(name, { required: required })}
			>
				<SelectPrimitive.SelectTrigger
					css={{
						padding: "4px 7px",
						width: "100%",
						border: "1px solid #0002",
						borderRadius: "3px",
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "space-between",
						fontSize: 15,
						lineHeight: 1,
						userSelect: "none",
						height: 35,
						gap: 5,
						textAlign: "left",
						backgroundColor: "white",
						color: "#000",
						"&:hover": { backgroundColor: mauve.mauve3 },
					}}
					className={inputBoxStyle}
					aria-label={name}
					// disabled={disabled}
					// aria-disabled={disabled}
				>
					<SelectPrimitive.Value />
					<SelectPrimitive.Icon>
						<ChevronDownIcon />
					</SelectPrimitive.Icon>
				</SelectPrimitive.SelectTrigger>
				<SelectPrimitive.Content
					css={{
						overflow: "hidden",
						backgroundColor: "white",
						borderRadius: 6,
						boxShadow:
							"0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
					}}
				>
					<SelectPrimitive.SelectScrollUpButton
						css={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: 25,
							backgroundColor: "white",
							color: violet.violet11,
							cursor: "default",
						}}
					>
						<ChevronUpIcon />
					</SelectPrimitive.SelectScrollUpButton>
					<SelectPrimitive.Viewport
						css={{
							padding: "5px",
						}}
					>
						{children}
					</SelectPrimitive.Viewport>
					<SelectPrimitive.SelectScrollDownButton
						css={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: 25,
							backgroundColor: "white",
							color: violet.violet11,
							cursor: "default",
						}}
					>
						<ChevronDownIcon />
					</SelectPrimitive.SelectScrollDownButton>
				</SelectPrimitive.Content>
			</SelectPrimitive.Root>
			{formContext?.errors[name]?.type === "required" && (
				<FormAlert>Required</FormAlert>
			)}
		</div>
	);
};

interface SelectProps{
	/** 
	 * PLaceholder text of the select input 
	*/
	placeholder: string;
	/** 
	 * List of select options
	 * Each uses the <SelectOption /> component
	*/
	children: React.ReactNode | React.ReactNode[];
	/**
	 * function that will be executed when the value of the select input changes
	 */
	onChange: (e: React.SyntheticEvent) => void;
	/**
	 * Name of the input. It must be unique in the form group
	 */
	name: string;
	/**
	 * If the value is true, this prevents the form from submitting if a value has not been set.
	 * The default value is false
	 */
	required: boolean;
	/**
	 * This is styles from the css prop that gets converted into classNames.
	 * This is used to style the input box or trigger box
	 */
	className?: string;
}


/** 
 * <Select /> component - This is the root component that houses 
 * all the <SelectOption />
 * 
 */
export const Select = ({
	placeholder,
	children,
	onChange,
	name,
	required = false,
	className
}: CompiledJSXPropsOmitRef<SelectProps>): React.ReactElement => {
	throwOnMissing(name, "name", "Select");

	/*
	 * Get our form provider. It may not exist
	 * (if the input component is not inside a FormProvider and is using the component separately)
	 * so make sure to not access it directly without first checking.
	 * */

	const formContext = useFormProvider();
	
	if (formContext) {
		return (
			<SelectBase
				onChange={(e: React.SyntheticEvent) => {
					formContext.setValue(name, e);
					if (onChange) {
						onChange(e);
					}
				}}
				name={name}
				placeholder={placeholder}
				required={required}
				formContext={formContext}
				inputBoxStyle={className}
			>
				{children}
			</SelectBase>
		);
	} else {
		return (
			<SelectBase
				value={value}
				onChange={onChange}
				name={name}
				placeholder={placeholder}
			>
				{children}
			</SelectBase>
		);
	}
};

export default Select;
