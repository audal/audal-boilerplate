import React from 'react'
import {
	FieldErrors,
	FieldValues,
	SubmitHandler,
	useForm,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue
} from "react-hook-form";

export interface IFormContext {
	register: UseFormRegister<FieldValues>
	handleSubmit: UseFormHandleSubmit<FieldValues>
	errors: FieldErrors
	setValue: UseFormSetValue<any>
}

export interface FormProviderProps {
	onSubmit: SubmitHandler<FieldValues>
	children: React.ReactNode | React.ReactNode[] | string | null | undefined
}

const FormContext = React.createContext<IFormContext>(null as any)

const FormProvider = React.forwardRef<HTMLFormElement, FormProviderProps>(({children, onSubmit}, ref) => {

	const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

	return (
		<FormContext.Provider
			value={{
				register,
				handleSubmit,
				errors,
				setValue
			}}
		>
			<form ref={ref} css={{ border: Object.keys(errors).length != 0 ? '1px solid red' : '1px solid transparent', width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
				{children}
			</form>
		</FormContext.Provider>
	);
})

export default FormProvider

export const useFormProvider = (): IFormContext => {
	return React.useContext(FormContext)
}
