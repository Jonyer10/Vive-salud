import React from "react";

const Input = ({ name, type, value, onChange, placeholder }) => (
  <input
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-2 mb-2 border rounded"
  />
);

export default Input;
