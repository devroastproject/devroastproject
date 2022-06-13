import React, {useState} from "react";
import TextField from '@mui/material/TextField';

export const useInput = ({ type, label, defaultValue="" }) => {
    const [value, setValue] = useState(defaultValue);
    // const input = <label htmlFor={label}> {label} <input value={value} onChange={e => setValue(e.target.value)} type={type} name={label}/> </label>;
    const input = <TextField variant="outlined" label={label} value={value} onChange={e => setValue(e.target.value)} type={type} name={label}/>
    return [value, input];
  }