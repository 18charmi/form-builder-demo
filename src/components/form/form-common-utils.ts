import { HTMLInputTypeAttribute } from "react";
import { FormField } from "./form-type";

export const FormFieldType = {
    CHECKBOXES: "fc.check-boxes",
    DROPDOWN: "fc.dropdown",
    HIDDEN: "fc.hidden",
    LABEL_FIELD: "fc.label-field",
    MULTI_SELECT: "fc.multi-select",
    NUMBER: "fc.number",
    PARAGRAPH_TEXT: "fc.paragraph-text",
    RADIO_BUTTON: "fc.radio-buttons",
    SINGLE_LINE_INPUT: "fc.single-line-input",
}
export enum EFormFieldType {
    CHECKBOXES = "fc.check-boxes",
    DROPDOWN = "fc.dropdown",
    HIDDEN = "fc.hidden",
    LABEL_FIELD = "fc.label-field",
    MULTI_SELECT = "fc.multi-select",
    NUMBER = "fc.number",
    PARAGRAPH_TEXT = "fc.paragraph-text",
    RADIO_BUTTON = "fc.radio-buttons",
    SINGLE_LINE_INPUT = "fc.single-line-input",
}

export const getFieldType = {
    [FormFieldType.CHECKBOXES]: "checkbox",
    [FormFieldType.DROPDOWN]: "select",
    [FormFieldType.HIDDEN]: "hidden",
    [FormFieldType.LABEL_FIELD]: "label-field",
    [FormFieldType.MULTI_SELECT]: "select",
    [FormFieldType.NUMBER]: "number",
    [FormFieldType.PARAGRAPH_TEXT]: "textarea",
    [FormFieldType.RADIO_BUTTON]: "radio",
    [FormFieldType.SINGLE_LINE_INPUT]: "text"
}

export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
    const _ = { ...obj }
    keys.forEach((key) => delete _[key])
    return _
}

export const createFormFieldAttributes = (field: FormField) => {

    if (field.__component == EFormFieldType.LABEL_FIELD) return field;

    let updatedField: FormField & { [k: string]: any } = structuredClone({
        ...field,
        ...field.basic_config,
        autoFocus: field.basic_config.auto_focus,
        // TODO: default prop value for radio button check...
        // defaultValue: field.basic_config.default_value
    });

    // create native field validation attributes
    if (field.validation) {

        if (field.validation.is_required) {
            updatedField.required = field.validation.is_required;
        }
        if (field.validation.regex) {
            updatedField.pattern = escapeRegExp(field.validation.regex_pattern);
        }
        if (field.validation.min_length) {
            if (field.__component === EFormFieldType.NUMBER) {
                updatedField.min = field.validation.min_length_value;
            } else {
                updatedField.minLength = field.validation.min_length_value;
            }
        }
        if (field.validation.max_length) {
            if (field.__component === EFormFieldType.NUMBER) {
                updatedField.max = field.validation.max_length_value;
            } else {
                updatedField.maxLength = field.validation.max_length_value;
            }
        }
    }

    ["__component", "basic_config", "default_value", "auto_focus", "validation", "style_config", "max_rows"].map((d) => {
        delete updatedField[d]
    })

    switch (field.__component) {
        case EFormFieldType.CHECKBOXES:
        case EFormFieldType.DROPDOWN:
        case EFormFieldType.MULTI_SELECT:
        case EFormFieldType.RADIO_BUTTON:
            updatedField.options = generateOptionsFromString(updatedField.options);
            // for radio button
            updatedField.defaultValue = field.basic_config.default_value;
            break;

        case EFormFieldType.PARAGRAPH_TEXT:
            updatedField.rows = field.max_rows;
            break;
    }

    return updatedField;
}

export const generateOptionsFromString = (list: Array<{ label: string }> = []) => {
    return list.map((v) => {
        return { label: v.label, value: v.label }
    })
}

const escapeRegExp = (input: string) => {
    // return input.replace(/\+/, '');
    // return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // return input.replace(/[#-}]/g, '\\$&');
    return input.slice(1, -1);

};
export const sanitizeRegexPattern = (pattern: string): RegExp => {

    const sanitizedPattern = escapeRegExp(pattern);

    return new RegExp(sanitizedPattern);
}
