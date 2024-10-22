// Checkbox.tsx
import React, { ChangeEvent, ReactNode } from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  label: ReactNode;
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({id, name, value, label, checked, onChange}) => {

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        // name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
