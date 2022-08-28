export const parseResponse = async (response) => {
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
}