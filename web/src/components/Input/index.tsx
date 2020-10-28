import React, { InputHTMLAttributes } from "react";

import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    type?: string;
    register?: any;
}

const Input: React.FC<InputProps> = ({ name, label, type = "text", register, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} type={type} ref={register} {...rest} />
        </div>
    )
}

export default Input;
