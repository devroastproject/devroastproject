import { parseResponse } from "./parseResponse";

export const callApi = async (endpoint, method, body=null, token=null) => {
    const fetchOptions = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
    };
    if (body){
        fetchOptions.body = JSON.stringify(body)
    }
    if (token){
        fetchOptions.headers['Authorization'] = token
    }

    const response = await fetch("http://localhost:8000/api/" + endpoint, fetchOptions);
    
    return await parseResponse(response)
};