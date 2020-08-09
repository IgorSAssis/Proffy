import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    name: string;
    label: string;
    defaultOption?: string;
    options: Array<{
        value: string;
        label: string;
    }>
}

const Select: React.FC<SelectProps> = ({ name, label, options , defaultOption, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={ name }>{ label }</label>
            <select value="" id={ name } { ...rest }>
                <option value="" disabled hidden >{ defaultOption }</option>
                { options.map(option => {
                    return <option key={ option.value } value={ option.value }>{ option.label }</option>
                }) }
            </select>
        </div>
    )
}

export default Select;