import { FormFieldType } from "../types/form";

// All the routes are defined here
export const ROUTES = {
    HOME: '/',
    FORM_LIST: '/list'
};

export const FIELD_TYPES: Array<{ label: string, value: FormFieldType }> = [
    {
        label: 'Single line Text',
        value: 'text'
    }, {
        label: 'Paragraph Text',
        value: 'textarea'
    },
    {
        label: 'Password',
        value: 'password'
    },
    {
        label: 'Number',
        value: 'number'
    }, {
        label: 'Checkbox',
        value: 'checkbox'
    }, {
        label: 'Radio',
        value: 'radio'
    },
    {
        label: 'Dropdown',
        value: 'select'
    },
    {
        label: 'Form Label',
        value: 'form-label'
    },
    {
        label: 'Hidden field',
        value: 'hidden'
    },
    {
        label: 'Multiple selection',
        value: 'multiple'
    },
]

export const FIELD_LABEL_TYPOGRAPHY_VARIANT = [

    {
        label: 'Heading 1',
        value: 'h1'
    }, {
        label: 'Heading 2',
        value: 'h2'
    }, {
        label: 'Heading 3',
        value: 'h3'
    },
    {
        label: 'Heading 4',
        value: 'h4'
    }, {
        label: 'Heading 5',
        value: 'h5'
    }, {
        label: 'Heading 6',
        value: 'h6'
    }, {
        label: 'Caption',
        value: 'caption'
    }, {
        label: 'Button',
        value: 'button'
    }, {
        label: 'Subtitle1',
        value: 'subtitle1'
    }, {
        label: 'Subtitle2',
        value: 'subtitle2'
    },
]
export const FIELD_LABEL_TYPOGRAPHY_CUSTOM_STYLE = [
    {
        label: 'Bold',
        value: 'bold'
    }, {
        label: 'Italic',
        value: 'italic'
    }, {
        label: 'Underline',
        value: 'underline'
    }
]
export const DEFAULT_FORM_INITIAL_VALUES = {
    value: '',
    uniqId: '',
    type: FIELD_TYPES[0].value,

    // common property
    autoFocus: false,
    label: '',
    id: '',
    name: '',
    placeholder: '',
    defaultValue: '',

    // common validations
    disabled: false,
    minLength: {
        enabled: false,
        value: undefined,
        message: ''
    },
    maxLength: {
        enabled: false,
        value: undefined,
        message: ''
    },
    pattern: {
        enabled: false,
        value: undefined,
        message: ''
    },
    required: {
        enabled: false,
        message: ''
    },

    // comma separated 
    options: '',

    // can be used to nest options or provide rows for paragraph text
    properties: {}
}
export const DUMMY_FORM_LISTS = [
    {
        title: "Contact Us form 1",
        description: "",
        id: "864f9",
        field: [{
            ...DEFAULT_FORM_INITIAL_VALUES,
            uniqId: '12312',
            label: 'FirstName',
            name: 'FirstName',
            autoFocus: true
        }]
    }, {
        title: "Contact Us form 2",
        description: "",
        id: "864f8",
        field: [{
            ...DEFAULT_FORM_INITIAL_VALUES,
            uniqId: '123123',
            label: 'FirstName',
            name: 'FirstName',
            required: {
                enabled: true,
                message: 'Please enter your first name'
            },
        }, {
            ...DEFAULT_FORM_INITIAL_VALUES,
            uniqId: '123124',
            label: 'LastName',
            name: 'LastName',
            required: {
                enabled: true,
                message: ''
            },
        }]
    }, {
        title: "Contact Us form 3",
        description: "",
        id: "864f7",
        field: [{
            uniqId: '123123',
            type: 'input',
            label: 'testing',
            name: 'testing',
            value: ''
        }]

    }, {
        title: "Contact Us form 4",
        description: "",
        id: "864f6",
        field: [{
            uniqId: '123123',
            type: 'input',
            label: 'testing',
            name: 'testing',
            value: ''
        }]
    }, {
        title: "Contact Us form 5",
        description: "",
        id: "864f5",
        field: [{
            uniqId: '123123',
            type: 'input',
            label: 'testing',
            name: 'testing',
            value: ''
        }]
    }
]

export const ACTION_TYPES = {
    NONE: 'NONE',
    SAVE_REQ: 'SAVE_REQ',
    SAVE_SUCC: 'SAVE_SUCC',
    SAVE_FAIL: 'SAVE_FAIL',

    DELETE_REQ: 'DELETE_REQ',
    DELETE_SUCC: 'DELETE_SUCC',
    DELETE_FAIL: 'DELETE_FAIL',
}
