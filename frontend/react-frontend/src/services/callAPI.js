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
   console.log("response",response)

    const data = await response.json();
    data.code = response.status
   console.log("data",data)
    if (response.status !== 200) {
        console.log(`Error: status ${response.status}`)
    } else {
        localStorage.setItem('token_time', Date.now()) // on successful request, refresh local token timeout
    }

    return data;
};