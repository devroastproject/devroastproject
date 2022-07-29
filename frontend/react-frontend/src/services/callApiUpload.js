export const callApiUpload = async (endpoint, method, file, token=null, id) => {

    const formData = new FormData();

    formData.append('avatar', file);
    formData.append('user', id);
    
    const response = await fetch("http://localhost:8000/api/" + endpoint, {
        body: formData, 
        method: method,
        headers: {'Authorization': token}
    });
    
    try { // try to parse json, but always return response status
        const data = await response.json();
        data.code = response.status

        if (response.status < 200 || response.status > 300) {
            console.log(`Error: status ${response.status}`)
        } else {
            localStorage.setItem('devroast_token_time', Date.now()) // on successful request, refresh local token timeout
        }

        return data;

    } catch {
        return {"code": response.status}
    }
};