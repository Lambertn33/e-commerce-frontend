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
export async function createNewProduct(name , price){
    let response = await axios.post(`${endpoint}/admin/products` , {name,price}) 
    return await response.data   
}

export default {
    createNewProduct
}