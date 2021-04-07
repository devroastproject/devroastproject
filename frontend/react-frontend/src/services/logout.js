export const logOut = (user, setUser) => {
    localStorage.removeItem("user_token")
    localStorage.removeItem("token_time")
    setUser({...user, token: null, info: null})
}