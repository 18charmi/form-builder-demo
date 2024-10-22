import { Typography } from "@mui/material";

export default function ErrorMessage({ show = false, text = '' }) {
    if (!show) return <></>;

    //TODO: define theme for color palette
    return <Typography component="span" color={'#ff604f'} >
        {text}
    </Typography>
}