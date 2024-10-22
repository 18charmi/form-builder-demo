import { MenuItem, Select as MuiSelect, SelectProps } from "@mui/material";

interface ISelect extends SelectProps {
    options: Array<{ label: string; value: string; }>;
}
function Select({ options, ...props }: ISelect) {
    return <MuiSelect
        {...props}
    >
        {
            options.map(option => <MenuItem key={option.value} value={option.value} >{option.label}</MenuItem>)
        }

    </MuiSelect>
}

export default Select;