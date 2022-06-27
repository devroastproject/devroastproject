import React, {useState} from "react";

import TextField from '@mui/material/TextField';

export const useInput = ({ type, label, defaultValue="", multiline=false }) => {
    const [value, setValue] = useState(defaultValue);
    const input = <TextField variant="outlined" label={label} value={value} multiline={multiline} onChange={e => setValue(e.target.value)} type={type} name={label}/>
    return [value, input];
  }