import { EFormFieldType } from "./form-common-utils";

export type FormFieldBasicConfig = {
    basic_config: {
        name: string,
        label: string,
        placeholder: string,
        auto_focus: boolean,
        disabled: boolean,
        default_value: string,
    }
};

export type FormFieldValidation = {
    validation: {
        is_required: boolean,
        required_message: string,
        min_length: boolean,
        min_length_value: string,
        min_length_message: string,
        max_length: boolean,
        max_length_value: string,
        max_length_message: string,
        regex: boolean,
        regex_pattern: string,
        regex_message: string,
    }
};

export type FormFieldStyleConfig = {
    style_config: {
        width: null | string,
        text_variant: null | string,
        font_style: null | string,
    }
}

// export type FormFieldText = { __component:  "fc.single-line-input" | "fc.number" } &
export type FormFieldText = { __component: EFormFieldType.SINGLE_LINE_INPUT | EFormFieldType.NUMBER } &
    FormFieldBasicConfig &
    FormFieldValidation &
    FormFieldStyleConfig

export type FormFieldSelection = {
    __component: EFormFieldType.MULTI_SELECT | EFormFieldType.RADIO_BUTTON | EFormFieldType.DROPDOWN | EFormFieldType.CHECKBOXES,
    options: Array<{ label: string }>
} &
    FormFieldBasicConfig &
    FormFieldValidation &
    FormFieldStyleConfig

export type FormFieldHidden = { __component: EFormFieldType.HIDDEN } &
    FormFieldBasicConfig &
    FormFieldValidation

export type FormFieldParagraph = {
    __component: EFormFieldType.PARAGRAPH_TEXT,
    max_rows: number,
} &
    FormFieldBasicConfig &
    FormFieldValidation &
    FormFieldStyleConfig

export type FormFieldLabel = {
    __component:  "fc.label-field",
    title: string,
    description: string,
} & FormFieldStyleConfig

export type FormField = FormFieldText | FormFieldSelection | FormFieldHidden | FormFieldParagraph | FormFieldLabel;