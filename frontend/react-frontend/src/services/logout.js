export const logOut = (user, setUser) => {
    localStorage.removeItem("devroast_user_token")
    localStorage.removeItem("devroast_token_time")
    setUser({...user, token: null, info: null})
}