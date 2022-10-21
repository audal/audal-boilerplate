import React from 'react';
import {
    Control,
    FieldErrors,
    FieldValues,
    SubmitHandler,
    useForm,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';

export interface IFormContext {
    register: UseFormRegister<FieldValues>;
    control: Control;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    errors: FieldErrors;
    setValue: UseFormSetValue<any>;
}

export interface FormProviderProps {
    /**
	 * On submit, values from the child form components will be
	 * returned in the format:
	 * [key: string]: value (any) - instead of the native
	 * event.
	 * This makes it easy to further process the data or send it to an endpoint,
	 * without worrying about handling.
	 * */
    onSubmit: SubmitHandler<FieldValues>;
    children: React.ReactNode | React.ReactNode[] | string | null | undefined;
}

const FormContext = React.createContext<IFormContext>(null as any);

/**
 * This creates an instance of <form /> that you can use Primitive Input, Select, Checkbox, Radio, etc elements in.
 * It wraps form elements in a React Context and a form tag so that you can access values and error messages anywhere
 * within your form. React-Hook-Form is used underneath.
 * @alias FormProviderProps
 * */
const FormProvider = React.forwardRef<HTMLFormElement, FormProviderProps>(
    ({ children, onSubmit }, ref) => {
        const {
            register,
            handleSubmit,
            control,
            formState: { errors },
            setValue,
            getValues,
            reset,
        } = useForm();

        return (
            <FormContext.Provider
                value={{register, control, handleSubmit, errors, setValue, getValues, }}
            >
                <form
                    ref={ref}
                    css={{ border: '1px solid transparent', width: '100%' }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {children}
                </form>
            </FormContext.Provider>
        );
    },
);

FormProvider.displayName = 'FormProvider';

export default FormProvider;

/**
 * This will give you access to a FormProvider parent's values
 * if it exists. It is not guaranteed to exist,
 * so check if it returns values before using.
 * */
export const useFormProvider = (): IFormContext | undefined => React.useContext(FormContext);
