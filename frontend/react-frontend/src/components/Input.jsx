import React from "react";

const Input = ({name, type, label, setter, data}) => {

    return (
        <label htmlFor={name}>
            {label} 
            <input type={type} name={name} onChange ={ e => setter({...data, [name] : e.target.value})}/>
        </label>
    )
}

export default Input;
