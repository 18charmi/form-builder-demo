import React from 'react';

interface NumberInputProps extends React.HTMLAttributes<HTMLInputElement> { }

const NumberInput = (props: NumberInputProps) => {
    return (
        <input {...props} style={{
            height: '52px',
            borderRadius: '4px',
            paddingLeft: '15px',
            border: '1px solid #ccc',
            margin: '0 0 1rem',
            outline: 'none'
        }} />);
};

export default NumberInput;
