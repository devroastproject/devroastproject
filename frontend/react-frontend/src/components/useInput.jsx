import React, {useState} from "react";

export const useInput = ({ type, label, defaultValue="" }) => {
    const [value, setValue] = useState(defaultValue);
    const input = <label> {label} <input value={value} onChange={e => setValue(e.target.value)} type={type} name={label}/> </label>;
    return [value, input];
  }