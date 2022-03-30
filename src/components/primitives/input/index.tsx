import React from 'react'
import {useFormProvider} from "../form-provider";

export interface InputProps extends CompiledJSXPropsOmitRef<HTMLInputElement> {
	name: string,
	validationRegex?: RegExp,
	minLength?: number,
	maxLength?: number,
	validationErrorMessage?: string
	required?: boolean
}

const FormAlert: React.FC = (props) => (
	<span role="alert" css={{ color: 'red' }} {...props} />
)

const Input = ({ type = "text", name, validationRegex, minLength, maxLength, validationErrorMessage, required = false, value, onChange, onBlur, disabled, ...props }: InputProps) => {

	if (type === "submit") {
		throw new Error('Audal Components: The Input Primitive should not be used as a submit button. Please use <button type="submit" /> instead.')
	}

	const typeRules = {
		password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
		email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		tel: /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g,
		number: /^-?\d+\.?\d*$/
	}[type] as RegExp

	const formContext = useFormProvider()

	/*
	* Set up our register function to be react-hook-form if the context exists,
	* if it doesn't, pass the props we destructed back to the element
	* */
	const registerFn = formContext && formContext.register ? formContext.register(name, {
		pattern: validationRegex ? validationRegex : typeRules,
		minLength,
		maxLength,
		required,
		onChange,
		onBlur,
		disabled,
		value,
	}) : {
		required,
		onChange,
		onBlur,
		disabled,
		value,
	}

	return (
		<>
			<input
				aria-invalid={formContext && formContext.errors && formContext.errors[name] ? "true" : "false"}
				type={type}
				{...registerFn}
				{...props}
			/>
			{formContext && formContext.errors && formContext.errors[name] && (<>
				{formContext.errors[name].type === "required" && (
					<FormAlert>Required</FormAlert>
				)}
				{formContext.errors[name].type === "pattern" && (
					<>
						{type === "password" && <FormAlert>This password is not strong enough. Please</FormAlert>}
						{type === "email" && <FormAlert>This is not a valid email.</FormAlert>}
						{type === "tel" && <FormAlert>This is not a valid number.</FormAlert>}
						{type !== "password" && type !== "tel" && type !== "email" && <FormAlert>This is invalid.</FormAlert>}
					</>
				)}
				{formContext.errors[name].type === "maxLength" && (
					<FormAlert>Maximum length exceeded</FormAlert>
				)}
				{formContext.errors[name].type === "minLength" && (
					<FormAlert>Not long enough</FormAlert>
				)}
			</>)}
		</>
	)
};

export default Input
