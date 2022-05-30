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

export async function getAllProducts(){
    let response = await axios.get(`${endpoint}/products`)
    return await response.data
}
export async function getSingleProduct(id){
    let response = await axios.get(`${endpoint}/products/${id}`)
    return await response.data
}

export default {
    getAllProducts,
    getSingleProduct
}