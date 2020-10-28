import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    register?: any;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, register, ...rest }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} name={name} ref={register} {...rest} />
        </div>
    )
}

export default Textarea;
