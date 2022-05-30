import axios from "axios";
import url  from './url'
const loginEndpoint = `${url}`

export async function register(names , email , password){
    let response = await axios.post(`${loginEndpoint}/auth/register` , {names, email , password}) 
    return await response.data   
}
export async function login(email , password){
    let response = await axios.post(`${loginEndpoint}/auth/login` , {email , password})
    let { user, token } = await response.data
    localStorage.setItem("authToken", token)
    localStorage.setItem("currentUser", JSON.stringify(user))
}
export function logout() {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser");
}
export function getCurrentUser() {
    let loggedInUser = localStorage.getItem('currentUser')
    loggedInUser = JSON.parse(loggedInUser)
    return loggedInUser
}

export default {
    login,
    logout,
    register,
    getCurrentUser
}