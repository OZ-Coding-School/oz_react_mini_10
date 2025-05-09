import React from 'react';

const InputField = ({ label, type, value, onChange, error }) => {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default InputField;
