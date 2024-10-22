import React, { ChangeEvent, ReactNode } from 'react';

interface RadioButtonProps {
  id: string;
  name: string;
  label: ReactNode;
  value: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ name, id, label, value, checked =false, onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleInputChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
 export default RadioButton;