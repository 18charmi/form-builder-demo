import { Field, useFormState } from "react-final-form";
import { FormGroup } from "@mui/material";
import FormControl from "../FormControl";
import Checkbox from "../Checkbox";
import Input from "../Input";
import ErrorMessage from "../ErrorMessage";

type IFormCommonFields = {}
export default function FormValidationField({ }: IFormCommonFields) {
    const formState = useFormState();
    const fieldType = formState.values['type'];
    const requiredEnabled = formState.values['required'];
    const minLengthEnabled = formState.values['minLength'];
    const maxLengthEnabled = formState.values['maxLength'];
    const patternEnabled = formState.values['pattern'];

    return <>

        <Field name="required.enabled" type="checkbox">
            {({ input }) => (
                <FormControl label="Required" controlLabel fullWidth={false}>
                    <Checkbox {...input} />
                </FormControl>
            )}
        </Field>
        {requiredEnabled.enabled &&
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'center' }}>

                {requiredEnabled.enabled && <Field name="required.message">
                    {({ input }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <Input
                                label="Custom message"
                                placeholder="Enter custom message "
                                {...input}
                            />
                        </FormControl>
                    )}
                </Field>
                }
            </FormGroup>
        }

        <Field name="minLength.enabled" type="checkbox">
            {({ input }) => (
                <FormControl label="minLength" controlLabel fullWidth={false}>
                    <Checkbox {...input} />
                </FormControl>
            )
            }
        </Field>
        {minLengthEnabled.enabled &&
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'baseline', gap: 1, }}>

                <Field name="minLength.value">
                    {({ input, meta }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <>
                                <Input
                                    type="number"
                                    label={fieldType === "number" ? "Min Value" : "Min Length"}
                                    placeholder={fieldType === "number" ? "Enter min length" : "Enter min length"}
                                    {...input}
                                />
                                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                        </FormControl>
                    )}
                </Field>
                <Field name="minLength.message">
                    {({ input, meta }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <>
                                <Input
                                    label="Custom message"
                                    placeholder="Enter custom message"
                                    {...input}
                                />
                                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                        </FormControl>
                    )}
                </Field>

            </FormGroup>
        }

        <Field name="maxLength.enabled" type="checkbox">
            {({ input }) => (
                <FormControl label="maxLength" controlLabel fullWidth={false}>
                    <Checkbox {...input} />
                </FormControl>
            )
            }
        </Field>
        {maxLengthEnabled.enabled &&
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'baseline', gap: 1, }}>

                <Field name="maxLength.value">
                    {({ input, meta }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <>
                                <Input
                                    type="number"
                                    label="Max Length"
                                    placeholder="Enter max length"
                                    {...input}
                                />
                                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                        </FormControl>
                    )}
                </Field>
                <Field name="maxLength.message">
                    {({ input, meta }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <>
                                <Input
                                    label="Custom message"
                                    placeholder="Enter custom message"
                                    {...input}
                                />
                                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                        </FormControl>
                    )}
                </Field>

            </FormGroup>
        }

        <Field name="pattern.enabled" type="checkbox">
            {({ input }) => (
                <FormControl label="pattern" controlLabel fullWidth={false}>
                    <Checkbox {...input} />
                </FormControl>
            )}
        </Field>
        {patternEnabled.enabled &&
            <FormGroup sx={{ flexDirection: 'row', alignItems: 'baseline', gap: 1 }}>
                <Field name="pattern.value">
                    {({ input, meta }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <>
                                <Input
                                    label="Regex pattern"
                                    placeholder="Enter regex pattern"
                                    {...input}
                                />
                                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                        </FormControl>
                    )}
                </Field>
                <Field name="pattern.message">
                    {({ input, meta }) => (
                        <FormControl fullWidth={false} sx={{ flex: 1 }}>
                            <>
                                <Input
                                    label="Custom message"
                                    placeholder="Enter custom message"
                                    {...input}
                                />
                                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                        </FormControl>
                    )}
                </Field>
            </FormGroup>
        }

    </>
}