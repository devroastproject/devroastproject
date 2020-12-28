import React, {useState} from "react";

export const useInput = ({ type, label }) => {
    const [value, setValue] = useState("");
    const input = <> <label> {label} <input value={value} onChange={e => setValue(e.target.value)} type={type} /> </label> </>;
    return [value, input];
  }