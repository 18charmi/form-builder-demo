import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../Button';
import { updateActiveFormDetail } from '../../store/Form.slice';
import { createFormFieldAttributes, generateOptionsFromString, omit, sanitizeRegexPattern } from '../../util/common';
import { Field, FieldRenderProps, Form } from 'react-final-form';
import { FormField } from '../../types/form';
import FormControl from '../FormControl';
import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import Select from '../Select';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormApi } from 'final-form';
import { Close } from '@mui/icons-material';
import Checkbox from '../Checkbox';
import { RadioGroup } from '../Radio';
import { Typography } from '@mui/material';
import TextArea from '../TextArea';
import NumberInput from '../NumberInput';
// import FileInput from '../FileInput';

interface IFormGeneratedPreview { }
export default function FormGeneratedPreview({ }: IFormGeneratedPreview) {

  const activeForm = useAppSelector((state) => state.form.activeForm)
  const dispatch = useAppDispatch()

  //generating form initial state like {"FirstName": '', [field labels]: ''}
  const initialValues = !activeForm.id.length ? {} : activeForm.field.reduce((total, acc) => {

    // set the initial values for form fields
    total = { ...total, [acc.label]: acc.defaultValue }

    return total;
  }, {});

  const handleClose = () => dispatch(updateActiveFormDetail({}));
  const handleSubmit = (values: FormField, formRef: FormApi<FormField>) => {

    const labelField = activeForm.field.reduce((total: Array<keyof FormField>, acc) => {
      if (acc.type === 'form-label') {
        total.push(acc.label as keyof FormField)
      }
      return total
    }, [])

    const submittedValues = omit(values, ...labelField)
    console.log(submittedValues);
    alert(JSON.stringify(submittedValues))
    formRef.restart();
  }

  const renderFormField = (f: FormField, { input, meta }: FieldRenderProps<any, HTMLElement, any>): React.ReactNode => {

    const fieldAttribute = createFormFieldAttributes(f);


    switch (f.type) {
      case "hidden":
        return <input {...input} {...fieldAttribute} />
        break;
      case "password":
      case "text":
        return <FormControl>
          <>
            <Input {...input} {...fieldAttribute} />
            <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
          </>
        </FormControl>
        break;
      case "number":
        return <FormControl label={f.label}>
          <>
            <NumberInput {...input} {...fieldAttribute} />
            <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
          </>
        </FormControl>
        break;
      case "textarea":
        return <FormControl label={f.label}>
          <>
            <TextArea {...input} {...fieldAttribute} />
            <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
          </>
        </FormControl>
        break;
      case "multiple":
        {
          const options = generateOptionsFromString(fieldAttribute.options!);
          return <FormControl label={f.label}>
            <>
              <Select {...fieldAttribute} options={options}  {...input} multiple />
              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
            </>
          </FormControl>
        } break;

      case "select":
        {
          const options = generateOptionsFromString(fieldAttribute.options!);
          return <FormControl label={f.label}>
            <>
              <Select {...fieldAttribute} options={options}  {...input} />
              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
            </>
          </FormControl>
        } break;

      case "radio":
        {
          const options = generateOptionsFromString(fieldAttribute.options!);
          return <FormControl label={f.label}>
            <>
              <RadioGroup {...fieldAttribute} options={options}  {...input} />
              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
            </>
          </FormControl>
        } break;

      case "checkbox":
        {
          return <FormControl label={f.label} controlLabel fullWidth={false}>
            <Checkbox {...fieldAttribute}  {...input} />
          </FormControl>
        }
        break;
      case "form-label":
        {
          return <Box>
            <Typography variant={fieldAttribute.labelTitleVariant}
              sx={{
                ...fieldAttribute.labelStyleVariant ? (
                  fieldAttribute.labelStyleVariant === 'bold' ? {
                    fontWeight: 'bold'
                  } : fieldAttribute.labelStyleVariant === 'italic' ? {
                    fontStyle: 'italic'
                  } : fieldAttribute.labelStyleVariant === 'underline' ? {
                    textDecoration: 'underline'
                  } : {}) : {}
              }}
            >{f.label}</Typography>
            <Typography>{fieldAttribute.labelDescription}</Typography>
          </Box>
        }
        break;
      default:
        return <></>;
        break;
    }

  }

  // console.log({initialValues})
  if (!activeForm.id.length)
    return <></>;

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      maxWidth={'xl'}
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
        <p>{activeForm.title}</p>
        <Button onClick={handleClose}> <Close /></Button>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {activeForm.description}
        </DialogContentText>

        {
          (!activeForm.field.length) ? <>Form Fields are empty</> :
            <Form
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validate={(values: FormField) => {
                const errors: Record<string, any> = {};
                activeForm.field.map(field => {
                  const currentField = field.label as keyof typeof initialValues;
                  const fieldType = field.type;

                  // TODO: find more optimised way for below common validations

                  // required validation
                  if (!!field.required.enabled && !values[currentField]) {
                    errors[currentField] = field.required.message.length === 0 ?
                      `Please enter value for ${(currentField as string).toLowerCase()}` : field.required.message;
                  }

                  // min length validation
                  if (!!field.minLength.enabled) {
                    if (fieldType === 'number') {
                      // validation the min value
                      if (!values[currentField] || Number(values[currentField]) < field.minLength.value!) {
                        errors[currentField] = field.minLength.message.length === 0 ?
                          `Please enter valid min length value for ${(currentField as string).toLowerCase()}` : field.minLength.message;
                      }
                    } else if (!values[currentField] || (values[currentField] as string).length < field.minLength.value!) {

                      errors[currentField] = field.minLength.message.length === 0 ?
                        `Please enter valid min length value for ${(currentField as string).toLowerCase()}` : field.minLength.message;
                    }
                  }

                  // max length validation
                  if (!!field.maxLength.enabled) {
                    if (fieldType === 'number') {

                      // validation the max value
                      if (Number(values[currentField]) > field.maxLength.value!) {
                        errors[currentField] = field.maxLength.message.length === 0 ?
                          `Please enter valid max length for ${(currentField as string).toLowerCase()}` : field.maxLength.message;
                      }
                    } else if (!values[currentField] || (values[currentField] as string).length > field.maxLength.value!) {

                      errors[currentField] = field.maxLength.message.length === 0 ?
                        `Please enter valid max length for ${(currentField as string).toLowerCase()}` : field.maxLength.message;
                    }
                  }

                  // regex pattern validation

                  // need to add fieldType instead of type 
                  if (!!field.pattern.enabled) {

                    const pattern = sanitizeRegexPattern(field.pattern.value!);
                    const validateRegex = pattern.test(values[currentField]);
                    if (!validateRegex) {
                      errors[currentField] = field.pattern.message.length === 0 ?
                        `Please enter value for ${(currentField as string).toLowerCase()}` : field.pattern.message;
                    }
                  }

                })
                return errors;
              }}
              render={({ handleSubmit, submitting }) => {

                return (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>

                    {/*  <FileInput onFileChange={(file) => console.log(`File...>`, file)} />}
                     */}
                    {
                      activeForm.field.length === 0 ? <></> :
                        activeForm.field.map(f =>
                          <Field name={f.name} key={f.uniqId}
                            type={f.type}
                            {...f.type === 'checkbox' ? { initialValue: f.defaultValue! } : { defaultValue: f.defaultValue }}
                          >
                            {props => renderFormField(f, props)}
                          </Field>
                        )
                    }

                    <FormControl >
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button variant="contained" fullWidth type="submit" disabled={submitting}>Submit form</Button>
                      </Box>
                    </FormControl>

                  </form>
                )
              }}
            />

        }

      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}