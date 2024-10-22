import React, { ChangeEvent, FC } from 'react';

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholderText?: string;
}

// TODO: pass placeholder from attributes
const CustomSelect: FC<SelectProps> = ({ options, value, onChange, placeholderText = "--Please choose an option--" }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <select value={value} onChange={handleSelectChange}>
      <option value="">{placeholderText}</option>
      {options.map((option) => {

        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
      }
      )}
    </select>
  );
};

export default CustomSelect;
