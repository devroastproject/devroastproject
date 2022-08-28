export const callApiUpload = async (endpoint, method, file, token=null, id) => {

    const formData = new FormData();

    formData.append('avatar', file);
    formData.append('user', id);
    
    const response = await fetch("http://localhost:8000/api/" + endpoint, {
        body: formData, 
        method: method,
        headers: {'Authorization': token}
    });
    
    return await parseResponse(response)
};