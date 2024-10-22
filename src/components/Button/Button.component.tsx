import MuiButton, { ButtonProps } from '@mui/material/Button';

interface IButton extends ButtonProps {};

export default function Button(props: IButton) {
    return <MuiButton {...props} />;
}