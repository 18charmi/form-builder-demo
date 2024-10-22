import { Box, Container, Typography, } from "@mui/material"
import Button from "../components/Button"
import Input from "../components/Input"
import FormControl from "../components/FormControl"
import Select from "../components/Select"
import { ACTION_TYPES, DEFAULT_FORM_INITIAL_VALUES, FIELD_LABEL_TYPOGRAPHY_CUSTOM_STYLE, FIELD_LABEL_TYPOGRAPHY_VARIANT, FIELD_TYPES } from "../util/constants"
import { useEffect, useState } from "react"
import FormFieldPreview from "../components/FormFieldPreview"
import { FormField, FormFieldAction } from "../types/form"
import { Form, Field } from 'react-final-form'
import { createFormInitialValues, generateUniqueId, isRegexPattern } from "../util/common"
import { saveForm, updateActionType, updateActiveFormDetail } from "../store/Form.slice"
import ErrorMessage from "../components/ErrorMessage"
import { FormApi, setIn } from "final-form"
import { useAppDispatch, useAppSelector } from "../hooks"
import Checkbox from "../components/Checkbox"
import FormDomField from "../components/FormDomField"
import FormValidationField from "../components/FormValidationField"
import { RadioGroup } from "../components/Radio"

const initialFormData = DEFAULT_FORM_INITIAL_VALUES
type visibleAttributes = {
  validation: boolean,
  dom: boolean
}
// Form Generation
function Home() {

  const [formData, updateFormData] = useState({ title: "" });
  const [fields, setFields] = useState<Array<FormField>>([]);
  const [visibleAttribute, updateVisibleAttribute] = useState<visibleAttributes>({
    validation: false,
    dom: false
  });

  let formRef: FormApi<FormField>;

  const actionType = useAppSelector((state) => state.form.actionType);
  const dispatch = useAppDispatch();

  // reset form fields & fetching type
  useEffect(() => {
    if (actionType === ACTION_TYPES.SAVE_SUCC) {
      setFields([]);
      updateFormData({title: ''})
      handleAction(FormFieldAction.RESET);
      //TODO: add toast message on success
      dispatch(updateActionType(ACTION_TYPES.NONE));
    }
  }, [actionType]);

  // handle form field possible action - 
  const handleAction = (action: FormFieldAction, payload?: FormField | FormField[]) => {

    switch (action) {
      case FormFieldAction.ADD: {

        let updatedList = [...fields];
        if (payload && !Array.isArray(payload)) {
          // for selected form fields
          if (payload.uniqId.length > 0) {
            const Index = updatedList.findIndex(l => l.uniqId === payload.uniqId);

            if (Index !== -1) {
              const fieldObject = {
                ...updatedList[Index],
                ...payload
              }
              updatedList = [...updatedList.slice(0, Index), fieldObject, ...updatedList.slice(Index + 1)];
            }
          } else {
            let obj = {
              ...payload,
              uniqId: generateUniqueId(),
            }
            updatedList.push(createFormInitialValues(obj));

          }
        }
        setFields(updatedList);
        handleAction(FormFieldAction.RESET);

      }
        break;
      case FormFieldAction.EDIT:
        if (payload && !Array.isArray(payload)) {
          const updatedPayload = payload;
          formRef.restart(updatedPayload)
        }
        break;
      case FormFieldAction.RESET:
        formRef.restart(initialFormData);
        break;
      case FormFieldAction.PREVIEW:
      case FormFieldAction.SAVE_FORM:

        const formId = generateUniqueId();
        const formDetail = {

          title: (formData.title.length > 0) ? formData.title : `Form Number: #${formId}`,
          description: "",
          id: formId,
          field: fields

        }
        if (action === FormFieldAction.PREVIEW) {
          dispatch(updateActiveFormDetail(formDetail))
        } else {
          dispatch(saveForm(formDetail));
        }
        break;
      case FormFieldAction.REMOVE:
        if (payload && !Array.isArray(payload)) {
          setFields(l => {
            let Index = l.findIndex(d => d.uniqId === payload.uniqId);
            let updatedList = Index !== -1 ? [...l.slice(0, Index), ...l.slice(Index + 1)] : l;
            return updatedList;
          })
        }
        break;
      case FormFieldAction.REORDER_LIST:
        if (payload && Array.isArray(payload)) {
          setFields(payload);
        }
        break;
    }
  }

  const handleAttributeVisibility = (name: keyof visibleAttributes, value: boolean) => {
    updateVisibleAttribute(v => ({ ...v, [name]: value }));
  }

  return (
    <Container maxWidth="xl" sx={{ p: 5 }}>
      <h2>Create New Form </h2>
      <hr />
      <div style={{ display: 'flex', flexWrap: "wrap", height: "75vh" }}>
        {/* form field selection elements */}
        <Box sx={{ flex: 1, padding: '1rem' }}>

          <h4 style={{ textAlign: 'center', fontWeight: "bold", textDecoration: "underline" }}>Create New Form</h4>

          <FormControl>
            <Input
              label="Enter form title" value={formData.title} onChange={(e) => updateFormData({ title: e.target.value })}
            />
          </FormControl>


          <Form
            onSubmit={(values, form) => {
              handleAction(FormFieldAction.ADD, values);
              form.restart();
            }}
            initialValues={initialFormData}
            validate={({ label, type, options, minLength, maxLength, pattern, properties, defaultValue}: FormField) => {
              let errors: Partial<FormField> = {};

              const setError = (key: string, value: any) => {
                errors = setIn(errors, key, value)
              }

              if (!label) {
                errors.label = "Please enter field label ";
              }

              if (['hidden'].includes(type) && !defaultValue) {
                if(!visibleAttribute.dom) handleAttributeVisibility('dom', true);
                errors.defaultValue = "Please enter a value for the hidden field";
              }

              if (['select', 'radio'].includes(type) && !options) {
                errors.options = "Please enter options";
              }

              if (['textarea'].includes(type) && (!properties?.minRows || properties?.minRows < 2)) {
                setError('properties.minRows', "Please provide minimum 2 rows for the textarea");
              }

              if (minLength.enabled && (!minLength.value || isNaN(minLength.value) || !(minLength.value >= 0))) {
                setError('minLength.value', type === "number" ? "Please enter valid min value" : "Please enter valid min length ");
              }

              if (maxLength.enabled && (!maxLength.value || isNaN(maxLength.value) || (maxLength.value <= 0))) {
                setError('maxLength.value', type === "number" ? "Please enter valid max value" : "Please enter valid max length ");
              }

              if (pattern.enabled && (!pattern.value || !isRegexPattern(pattern.value))) {
                setError('pattern.value', "Please enter valid regex pattern");
              }

              return errors;
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => {

              // Referenced the formApi method/s to out of the form
              if (!formRef && form) {
                formRef = form
              }
              const showValidationField = !['form-label', 'hidden'].includes(values.type) && (values.required.enabled || values.minLength.enabled || values.maxLength.enabled || values.pattern.enabled || visibleAttribute.validation)
              const showDomField = visibleAttribute.dom


              return (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>

                  <Field name="type">
                    {
                      props => (
                        <FormControl label="Select field type">
                          <Select options={FIELD_TYPES} {...props.input} />
                        </FormControl>
                      )
                    }
                  </Field>

                  <Field name="label" >
                    {({ input, meta }) => (
                      <FormControl>
                        <>
                          <Input
                            label="Enter field label"
                            {...input}
                          />
                          <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                        </>
                      </FormControl>
                    )
                    }
                  </Field>

                  {['textarea'].includes(values.type) ?
                    <>
                      <Field name="properties.minRows" >
                        {({ input, meta }) => (
                          <FormControl>
                            <>
                              <Input
                                label="Enter min number of rows"
                                {...input}
                              />
                              <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                            </>
                          </FormControl>
                        )
                        }
                      </Field>
                      <Field name="properties.maxRows" >
                        {({ input }) => (
                          <FormControl>
                            <>
                              <Input
                                label="Enter max number of rows"
                                {...input}
                              />
                            </>
                          </FormControl>
                        )
                        }
                      </Field>
                    </> : <></>
                  }

                  {[ 'multiple', 'select', 'radio'].includes(values.type) ?
                    <Field name="options" >
                      {({ input, meta }) => (
                        <FormControl>
                          <>
                            <Input
                              label="Enter Options for dropdown selection"
                              {...input}
                              helperText="enter values comma separated (Ex: Option1, Option2, ...)"
                            />
                            <ErrorMessage text={meta.error} show={meta.error && meta.touched} />
                          </>
                        </FormControl>
                      )
                      }
                    </Field> : <></>
                  }

                  {['form-label'].includes(values.type) ?
                    <>

                      <Field name="properties.labelDescription" >
                        {({ input }) => (
                          <FormControl>
                            <>
                              <Input
                                label="Enter description text"
                                {...input}
                              />
                            </>
                          </FormControl>
                        )
                        }
                      </Field>
                      <Field name="properties.labelTitleVariant" type="radio">
                        {({ input }) => (
                          <FormControl label={"Select Title Variant"}>
                            <RadioGroup options={FIELD_LABEL_TYPOGRAPHY_VARIANT}  {...input} sx={{ flexDirection: 'row' }} />
                          </FormControl>
                        )
                        }
                      </Field>
                      <Field name="properties.labelStyleVariant" type="radio">
                        {({ input }) => (
                          <FormControl label={"Select Style Variant"}>
                            <RadioGroup options={FIELD_LABEL_TYPOGRAPHY_CUSTOM_STYLE}  {...input} sx={{ flexDirection: 'row' }} />
                          </FormControl>
                        )
                        }
                      </Field>

                      {/* Runtime preview for form label field */}
                      <FormControl label={"Label Preview"}>
                        <Box>
                          <Typography variant={values.properties?.labelTitleVariant}
                            sx={{
                              ...values.properties?.labelStyleVariant ? (
                                values.properties?.labelStyleVariant === 'bold' ? {
                                  fontWeight: 'bold'
                                } : values.properties?.labelStyleVariant === 'italic' ? {
                                  fontStyle: 'italic'
                                } : values.properties?.labelStyleVariant === 'underline' ? {
                                  textDecoration: 'underline'
                                } : {}) : {}
                            }}
                          >{values.label}</Typography>
                          <Typography>{values.properties?.labelDescription}</Typography>
                        </Box>
                      </FormControl>

                    </> : <></>
                  }

                  {
                    !['form-label'].includes(values.type) && <>

                    { !['hidden'].includes(values.type) &&
                      <FormControl label="Validation" controlLabel fullWidth={false}>
                        <Checkbox checked={showValidationField} onChange={({ target }) => handleAttributeVisibility('validation', target.checked)} />
                      </FormControl>
}
                      {
                        showValidationField ?
                          <Box sx={{ paddingLeft: 2, borderLeft: '1px solid #000' }}>
                            <FormValidationField />
                          </Box> :
                          <></>
                      }

                      <FormControl label="DOM fields" controlLabel fullWidth={false}>
                        <Checkbox checked={showDomField} onChange={({ target }) => handleAttributeVisibility('dom', target.checked)} />
                      </FormControl>

                      {
                        showDomField ?
                          <Box sx={{ paddingLeft: 2, borderLeft: '1px solid #000' }}>
                            <FormDomField />
                          </Box> :
                          <></>
                      }
                    </>
                  }

                  <FormControl >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button variant="contained" type="submit" disabled={submitting || pristine}>{values.uniqId ? 'Update Field' : 'Add Form Field'}</Button>
                      <Button variant="contained" onClick={() => handleAction(FormFieldAction.RESET)} disabled={submitting} >Reset</Button>
                    </Box>
                  </FormControl>

                </form>
              )
            }}
          />

        </Box>

        {/* Preview of the form */}
        <FormFieldPreview fields={fields} loading={actionType === ACTION_TYPES.SAVE_REQ} handleAction={handleAction} />

      </div>


    </Container>

  )
}

export default Home