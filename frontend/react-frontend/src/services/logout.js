export const logOut = (user, setUser) => {
    setUser({...user, token: null, info: null})
    localStorage.removeItem("user_token")
    localStorage.removeItem("token_time")
}