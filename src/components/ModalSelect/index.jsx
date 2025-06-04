import React from 'react';

export const ModalSelect = ({ label, name, value, onChange, options, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-[#C0090E] focus:border-[#C0090E]"
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};