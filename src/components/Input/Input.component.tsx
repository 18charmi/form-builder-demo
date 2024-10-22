import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

type ITextField = TextFieldProps

export default function Input(props: ITextField) {
    return <MuiTextField {...props} />;
}