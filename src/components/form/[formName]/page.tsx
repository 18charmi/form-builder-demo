"use client";
import formContent from '../form-builder-schema.json';
import { Field, FieldRenderProps, Form } from 'react-final-form';
import { FormField } from '../form-type';
import { FormApi } from 'final-form';
import { EFormFieldType, FormFieldType, createFormFieldAttributes, generateOptionsFromString, getFieldType, sanitizeRegexPattern } from '../form-common-utils';
import { Fragment, HTMLInputTypeAttribute } from 'react';
import FormControl from './FormControl.component';
import ErrorMessage from './ErrorMessage.component';
import { Input } from './Input.component';
import NumberInput from './NumberInput.component';
import TextArea from './TextArea.component';
import RadioButton from './RadioButton.component';
import CustomSelect from './Select.component';
import Checkbox from './Checkbox.component';
import FormLabel from './FormLabel.component';
import { Button } from './Button.component';

const page = async ({ params }: { params: { formName: number } }) => {

  const fields = formContent.form_fields;

  //generating form initial state like {"FirstName": '', [field labels]: ''}
  const initialValues = !fields.length ? {} : fields.reduce((total, acc) => {

    // set the initial values for form fields
    if (acc.basic_config) {
      total = { ...total, [acc.basic_config.name]: acc.basic_config.default_value }
    }


    return total;
  }, {});

  const handleSubmit = (values: FormField, formRef: FormApi<FormField>) => {
    // const labelField = activeForm.field.reduce((total: Array<keyof FormField>, acc) => {
    //     if (acc.type === 'form-label') {
    //         total.push(acc.label as keyof FormField)
    //     }
    //     return total
    // }, [])

    // const submittedValues = omit(values, ...labelField)
    console.log(values);
    // alert(JSON.stringify(submittedValues))
    // formRef.restart();
  }

  // render form field component
  const renderFormField = (field: FormField): React.ReactNode => {

    let defaultProps: object = {};
    const fieldInputType = getFieldType[field.__component];
    const fieldAttribute = createFormFieldAttributes(field);

    if (field.__component !== EFormFieldType.LABEL_FIELD) {
      if ([EFormFieldType.CHECKBOXES, EFormFieldType.RADIO_BUTTON].includes(field.__component as EFormFieldType)) {
        defaultProps = {
          ...defaultProps,
          initialValue: field.basic_config.default_value
        }
      } else {
        defaultProps = {
          ...defaultProps,
          defaultValue: field.basic_config.default_value
        }
      }
    }

    switch (field.__component) {
      case EFormFieldType.LABEL_FIELD:
        return <FormLabel title={field.title} description={field.description} />;
      case EFormFieldType.RADIO_BUTTON:
        return <FormControl label={field.basic_config!.label}>
          <>
            {
              field.options!.map((f, i) =>
                <Field key={`${field.basic_config!.name}-option-${i}`}
                  type={fieldInputType}

                  name={field.basic_config!.name}
                  value={f.label} // update add the options field

                  {...defaultProps}>
                  {({ input, meta }) => <>
                    <RadioButton
                      id={input.value}
                      label={f.label}
                      // props available via input [name, value, checked, onChange]
                      {...input} />
                    <ErrorMessage text={meta.error} show={meta.error && meta.touched && i === field.options!.length - 1} /></>}

                </Field>)
            }
          </>
        </FormControl>;
      case EFormFieldType.CHECKBOXES:
        return <FormControl label={field.basic_config!.label}>
          <>
            {
              field.options!.map((f, i) =>
                <Field key={`${field.basic_config!.name}-option-${i}`}
                  type={fieldInputType}
                  name={field.basic_config!.name}
                  value={f.label} // update add the options field

                  id={f.label}
                  {...defaultProps}>
                  {({ input, meta }) => <>
                    <Checkbox
                      id={input.value}
                      label={f.label}
                      // props available via input [name, value, checked, onChange]
                      {...input}
                    />
                    <ErrorMessage text={meta.error} show={meta.error && meta.touched} /></>}

                </Field>)
            }
          </>
        </FormControl>;
      case EFormFieldType.HIDDEN:
        return <Field
          name={field.basic_config!.name}
          type={fieldInputType}
          {...defaultProps}>
          {({ input }) => <input {...input} {...fieldAttribute} />}
        </Field>;
      // case "password":
      case EFormFieldType.SINGLE_LINE_INPUT:
        return <Field
          name={field.basic_config!.name}
          type={fieldInputType}
          {...defaultProps}>
          {({ input, meta }) => <FormControl label={field.basic_config.label}>
            <>
              <Input {...input} {...fieldAttribute} />
              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
            </>
          </FormControl>}
        </Field>

      case EFormFieldType.NUMBER:
        return <Field
          name={field.basic_config.name}
          type={fieldInputType}
          {...defaultProps}>
          {({ input, meta }) => <FormControl label={field.basic_config.label}>
            <>
              <NumberInput {...input} {...fieldAttribute} />
              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
            </>
          </FormControl>}
        </Field>;
      case EFormFieldType.PARAGRAPH_TEXT:
        return <Field
          name={field.basic_config.name}
          type={fieldInputType}
          {...defaultProps}>
          {({ input, meta }) => <FormControl label={field.basic_config.label}>
            <>
              <TextArea {...input} {...fieldAttribute} />
              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
            </>
          </FormControl>}
        </Field>;

      case EFormFieldType.DROPDOWN:
        {
          const options = generateOptionsFromString(field.options);
          return <Field
            name={field.basic_config.name}
            type={fieldInputType}
            {...defaultProps}>
            {({ input, meta }) => <FormControl label={field.basic_config.label}>
              <>
                {(fieldAttribute.hasOwnProperty("options")) ?
                  <CustomSelect {...fieldAttribute} options={options} {...input} /> : <></>}
                <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
              </>
            </FormControl>}
          </Field>;
        } break;
      // case "multiple":
      //   {
      //     const options = generateOptionsFromString(fieldAttribute.options!);
      //     return <Field
      //     name={field.basic_config.name}
      //     type={fieldInputType}
      //     {...defaultProps}>
      //     {({ input, meta }) => <FormControl label={f.label}>
      //       <>
      //         <Select {...fieldAttribute} options={options}  {...input} multiple />
      //         <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
      //       </>
      //     </FormControl>}
      //     </Field>;
      //   } break;

      default:
        return <></>;

    }

  }

  return (
    <div className="h-screen w-screen p-4">
      Form Preview Page [{params.formName}]
      <hr />

      {
        (!fields.length) ? <>Form Fields are empty</> :
          <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validate={(values: FormField) => {
              const errors: Record<string, any> = {};
              fields.map(field => {
                const currentField = field.basic_config?.name as keyof typeof initialValues;
                const currentValue = values[currentField];
                const fieldType = field.__component;

                if (field.validation) {

                  if (!!field.validation.is_required && !currentValue) {
                    errors[currentField] = field.validation.required_message.length === 0 ?
                      `Please enter value for ${(currentField as string).toLowerCase()}` : field.validation.required_message;
                  }

                  if (!!field.validation.min_length) {
                    let errorExist = false;
                    if (fieldType === EFormFieldType.NUMBER) {
                      errorExist = (!currentValue || Number(currentValue) < Number(field.validation.min_length_value));
                    } else if (!currentValue || (currentValue as string).length < Number(field.validation.min_length_value)) {
                      errorExist = true;
                    }
                    if (errorExist) {
                      errors[currentField] = field.validation.min_length_message.length === 0 ?
                        `Please enter valid min length value for ${(currentField as string).toLowerCase()}` : field.validation.min_length_message;
                    }
                  }

                  if (!!field.validation.max_length) {
                    let errorExist = false;
                    if (fieldType === EFormFieldType.NUMBER) {
                      errorExist = (Number(currentValue) > Number(field.validation.max_length_value));
                    } else if (currentValue && (currentValue as string).length > Number(field.validation.max_length_value)) {
                      errorExist = true;
                    }
                    if (errorExist) {
                      errors[currentField] = field.validation.max_length_message.length === 0 ?
                        `Please enter valid max length value for ${(currentField as string).toLowerCase()}` : field.validation.max_length_message;
                    }
                  }

                  if (!!field.validation.regex) {
                    const pattern = sanitizeRegexPattern(field.validation.regex_pattern!);
                    const validateRegex = pattern.test(currentValue);

                    // considering value to be required in case of regex pattern validation
                    if (!currentValue || !validateRegex) {
                      errors[currentField] = field.validation.regex_message.length === 0 ?
                        `Please enter value for ${(currentField as string).toLowerCase()}` : field.validation.regex_message;
                    }
                  }

                }

              })
              return errors;
            }}
            render={({ handleSubmit, submitting }) => {

              return (
                <form className='flex flex-col p-4' onSubmit={handleSubmit}>

                  {
                    fields.map((field, index) => <Fragment key={`${field.__component}-${index}`}>
                      {renderFormField(field as FormField)}
                    </Fragment>)
                  }

                  <Button type='submit' disabled={submitting}>Submit form</Button>

                </form>
              )
            }}
          />

      }

    </div>
  );
};

export default page;
