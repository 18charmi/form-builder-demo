import { TypographyOwnProps } from "@mui/material"
import { HTMLInputTypeAttribute } from "react"

export type FormFieldType = 'text' | 'textarea' | 'password' | 'checkbox' | 'select' | 'radio' | 'form-label' | 'number' | 'hidden' | 'multiple'

export enum FormFieldAction {
    ADD = "add",
    EDIT = "edit",
    PREVIEW = "preview",
    REMOVE = "remove",
    REORDER_LIST = "reorder_list",
    RESET = "reset",
    SAVE_FORM = "save"
}

export type FormField = {
    value: string

    uniqId: string,

    // can be used to pre-define a custom type
    // fieldType: FormFieldType | string,

    type: HTMLInputTypeAttribute,

    // common property
    autoFocus?: boolean,
    label: string,
    id?: string,
    name: string,
    placeholder?: string,
    defaultValue?: string | boolean | string[],

    // common validations
    disabled?: boolean,

    // currently the minLength & maxLength are validating the values for min & max also
    minLength: {
        enabled: boolean,
        value: number | undefined,
        message: string
    },
    maxLength: {
        enabled: boolean,
        value: number | undefined,
        message: string
    },
    pattern: {
        enabled: boolean,
        value: string | undefined,
        message: string
    },
    required: {
        enabled: boolean,
        message: string
    },


    //TODO: allow options in the form of label value pair
    options?: string, // comma separated 

    properties?: {
        minRows?: number,
        maxRows?: number,
        labelDescription?: string,
        labelTitleVariant?: TypographyOwnProps['variant'],
        labelStyleVariant?: 'bold' | 'italic' | 'underline'
    }
    // TODO: maybe can add props like hintText, width, submitBtnText
}

export type formDetails = {
    id: string,
    title: string,
    description: string,
    field: FormField[]
}
