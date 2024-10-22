import { FormField } from "../types/form";
import { DEFAULT_FORM_INITIAL_VALUES } from "./constants";

export const generateUniqueId = () => {

    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = randLetter + Date.now();
    return uniqid;
}

export const delay = (timeout = 2000) => {
    return new Promise((rs) => {
        setTimeout(() => {
            rs("Delay function resolved");
        }, timeout);
    })
}

export const isObjectEmpty = (objectName: {} | { [k: string]: string }) => {
    return Object.keys(objectName).length === 0
}

export const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
    const _ = { ...obj }
    keys.forEach((key) => delete _[key])
    return _
}

/**
* Performs a deep merge of objects and returns new object. Does not modify
* objects (immutable) and merges arrays via concatenation.
*
* @param {...object} objects - Objects to merge
* @returns {object} New object with merged key/values
*/
type DeepMerge<T> = (objects: T[]) => T;

export const mergeDeep: DeepMerge<{ [key: string]: any }> = (objects) => {
    const isObject = (obj: any): obj is { [key: string]: any } =>
        obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach((key) => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep([pVal, oVal]);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
};

export const isRegexPattern = (input: string | undefined): boolean => {
    if (typeof input !== 'string') {
        return false; // Only strings can be regex patterns
    }

    // Use a regular expression to check if the string is a valid regex pattern
    const regexPattern = /^\/.*\/[gimuy]*$/;
    return regexPattern.test(input);
}

export const sanitizeRegexPattern = (pattern: string): RegExp => {
    
    const escapeRegExp = (input: string) => {
        // return input.replace(/\+/, '');
        // return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return input.replace(/[#-}]/g, '\\$&');
    };

    const sanitizedPattern = escapeRegExp(pattern.slice(1, -1));

    return new RegExp(sanitizedPattern);
}


// form related functions
export const createFormInitialValues = (form: FormField) => {
    form = { ...form, name: form.label }

    if (form.type === 'checkbox') {
        form = {
            ...form,
            defaultValue: !!form.defaultValue
        }
    }
    if (form.type === 'multiple') {
        form = {
            ...form,
            ...(!!form.defaultValue && typeof form.defaultValue === 'string' ?
                { defaultValue: form.defaultValue.split(',').map(v => v.trim()) } : {})
        }
    }

    return mergeDeep([DEFAULT_FORM_INITIAL_VALUES, form]) as FormField;
}

export const createFormFieldAttributes = (field: FormField) => {

    const updatedField: { [k: string]: any } = {
        ...omit(
            {
                ...field,
                required: field.required.enabled,
                pattern: field.pattern.value,
                ...field.properties
            },
            'minLength', 'maxLength', 'properties', 'uniqId', 'value', 'defaultValue')
    }

    if (['hidden', 'checkbox', 'select', 'radio'].includes(field.type)) {
        delete updatedField.inputProps;
        delete updatedField.min;
        delete updatedField.max;
        delete updatedField.minLength;
        delete updatedField.maxLength;
    }

    // TODO: default prop value for radio button check...
    if (['radio'].includes(field.type)) {
        return {
            ...updatedField,
            defaultValue: field.defaultValue
        }
    }

    if (['text'].includes(field.type)) {
        updatedField.inputProps = {
            minLength: field.minLength.value,
            maxLength: field.maxLength.value,
        }
    }

    if (['textarea'].includes(field.type)) {
        updatedField.minLength = field.minLength.value;
        updatedField.maxLength = field.maxLength.value;
    }

    if (['number'].includes(field.type)) {
        updatedField.min = field.minLength.value ? Number(field.minLength.value) : undefined;
        updatedField.max = field.maxLength.value ? Number(field.maxLength.value) : undefined;
    }

    if (['checkbox', 'select'].includes(field.type)) {
        return omit(updatedField, 'label')
    }

    return updatedField;
}

export const generateOptionsFromString = (list = '', separator = ',') => {
    return list.split(separator).map((v: string) => {
        const value = v.trim();
        return { label: value, value }
    })
}