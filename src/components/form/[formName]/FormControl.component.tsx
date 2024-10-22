import { ReactElement } from "react";

interface IFormControl {
    label?: string;
    children?: ReactElement;
}
function FormControl({
    label = '',
    children = <></>,
    ...props }: IFormControl) {
    return <div className="w-full my-1">
        {label.length > 0 ?
            <label className="text-slate-500">{label}</label> : <></>}
        {children}
    </div>
};
export default FormControl;