import { Field, useFormState } from "react-final-form";
import FormControl from "../FormControl";
import Input from "../Input";
import Checkbox from "../Checkbox";
import ErrorMessage from "../ErrorMessage";

type IFormCommonFields = {}
export default function FormDomField({ }: IFormCommonFields) {
    const formState = useFormState();
    const selectedFieldType = formState.values['type'];

    return <>

        <Field name="id" >
            {({ input }) => (
                <FormControl>
                    <Input
                        label="Enter field id"
                        {...input}
                    />
                </FormControl>
            )
            }
        </Field>

        <Field name="placeholder" >
            {({ input }) => (
                <FormControl>
                    <Input
                        label="Enter field placeholder"
                        {...input}
                    />
                </FormControl>
            )
            }
        </Field>


        {['text', 'number', 'radio', 'checkbox', 'hidden', 'select', 'multiple'].includes(selectedFieldType) ?
            <Field name="defaultValue" type={['text', 'radio', 'select', 'multiple'].includes(selectedFieldType) ? "text" : selectedFieldType}>
                {({ input, meta }) => {
                    if (selectedFieldType === 'checkbox')
                        return <FormControl label="Keep Selected" controlLabel fullWidth={false}>
                            <Checkbox {...input} />
                        </FormControl>

                    if (selectedFieldType === 'hidden')
                        return (
                            <FormControl>
                                <>
                                    <Input label="Enter field defaultValue" {...input} type="text" />
                                    <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                                </>
                            </FormControl>
                        )
                    return (
                        <FormControl>
                            <Input label="Enter field defaultValue" {...input} />
                        </FormControl>
                    )
                }
                }
            </Field> : <></>
        }

    </>
}