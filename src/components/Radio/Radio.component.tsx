import { Radio, RadioGroup as MuiRadioGroup, RadioProps, RadioGroupProps, FormControlLabel } from '@mui/material';

interface CustomRadioButtonProps extends RadioProps { }

export default function CustomRadioButton(props: CustomRadioButtonProps) {
    return (
        <Radio {...props} />
    );
};

interface IRadioGroup extends RadioGroupProps {
    options: Array<{ label: string, value: string }>
}
export const RadioGroup = ({ name = '', options, ...props }: IRadioGroup) => {

    return <MuiRadioGroup name={name} {...props}>
        {
            options.map(option => <FormControlLabel
                label={option.label}
                control={<CustomRadioButton />}
                value={option.value}
                key={option.value}
            />
            )
        }
    </MuiRadioGroup>
}