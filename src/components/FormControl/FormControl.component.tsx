import { FormControl as MuiFormControl, FormLabel, FormControlProps, FormControlLabel } from "@mui/material";
import { ReactElement } from "react";

interface IFormControl extends FormControlProps {
    label?: string;
    children?: ReactElement;
    controlLabel?: boolean; //for checkbox

    // TODO- use same component in radiogroup component
}
function FormControl({ label = '', children = <></>, controlLabel = false, ...props }: IFormControl) {
    return <MuiFormControl fullWidth sx={{ my: 1, ...props.sx }} {...props}>

        {
            controlLabel ? <FormControlLabel control={children} label={label} />
                : <>
                    {label.length > 0 ? <FormLabel>{label}</FormLabel> : null}
                    {children}
                </>
        }


    </MuiFormControl>
};
export default FormControl;