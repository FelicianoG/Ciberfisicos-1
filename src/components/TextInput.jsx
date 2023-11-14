import React from "react";

// eslint-disable-next-line react/prop-types
export const TextInput = ({ label, onChange, ...props }) => {
  return (
    <div>
      <h3>{label}</h3>
      <input {...props} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};
