import React from 'react';

const Input = ({ label, name, type, placeholder, onChange }) => (
    <div className="relative">
        <label htmlFor={name} className="text-[#f0f8ff] block mb-2">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            onChange={onChange}
            className="w-full px-3 py-2 text-[#f0f8ff] bg-[#3a3a3a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0f8ff] transition-all duration-300 ease-in-out"
            placeholder={placeholder}
        />
    </div>
);

export default Input;