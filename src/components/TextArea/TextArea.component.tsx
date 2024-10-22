import { TextareaAutosize, TextareaAutosizeProps } from '@mui/material';

type ITextArea = TextareaAutosizeProps

export default function TextArea(props: ITextArea) {
    return <TextareaAutosize {...props} />;
}