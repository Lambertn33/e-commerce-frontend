import axios from "axios";
import url  from './url'
const endpoint = `${url}`

const token = localStorage.getItem('authToken')
axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${token}`;
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
export async function myBalance(){
    const response = await axios.get(`${endpoint}/my-account`)
    return await response.data
}
export async function myTransactions(){
    const response = await axios.get(`${endpoint}/my-account/transactions`)
    return await response.data
}
export async function topUpMyBalance(balance){
    const response = await axios.put(`${endpoint}/my-account/topUp`,{balance})
    return await response.data
}
export async function purchaseProduct(id,quantity){
    const response = await axios.post(`${endpoint}/products/${id}/purchase`,{quantity})
    return await response.data
}

export default {
    purchaseProduct,
    myBalance,
    myTransactions
}