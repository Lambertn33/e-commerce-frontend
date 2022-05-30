import React,{useState} from 'react'
import auth from '../services/authService'
import Navbar from '../reusable/Navbar'
import * as adminService  from '../services/adminService'
import {  useNavigate } from 'react-router-dom'
import { useMutation , useQueryClient } from 'react-query'
import FormSuccessMessage from '../reusable/Form/FormSuccessMessage'
import FormInput from '../reusable/Form/FormInput'
import FormErrorMessage from '../reusable/Form/FormErrorMessage'
import FormButton from '../reusable/Form/FormButton'

export default function CreateProduct() {
  const user = auth.getCurrentUser()
  const [name , setName] = useState('')
  const [price , setPrice] = useState('')
  const [isLoading , setIsLoading] = useState(false)
  const [hasError , setHasError] = useState(false)
  const [errorMessage , setErrorMessage] = useState('')
  const queryClient = useQueryClient()
  let navigate = useNavigate();
  const createProduct = async() =>{
    try {
        setIsLoading(true)
        await adminService.createNewProduct(name ,price)
        navigate('/user/products')
    } catch (error) {
      setIsLoading(false)
      if(error && error.response.status !== 200){
          setHasError(true)
          setErrorMessage(error.response.data.message)
      }
    }
}
const useCreateProduct = () =>{
    return useMutation(createProduct,{
        onSuccess:()=>{
            queryClient.invalidateQueries('products')
        }
    })
  }
  const { mutate } = useCreateProduct()
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const newProduct = { name ,price }
    mutate(newProduct)
  }
  return (
    <div>
        <Navbar user={user}/>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3" style={{paddingTop:'100px'}}>
                    <div className="card d-flex justify-content-center ">
                        <div className="card-body">
                        <h4 className="card-title" style={{textAlign:'center'}}>Add New Product</h4>
                        
                        <form onSubmit={handleSubmit}>
                            {
                                hasError && 
                                <FormErrorMessage errorMessage={errorMessage} />
                            }
                            <FormInput
                              disabled=""
                              label="Product Name"
                              onChange={e =>setName(e.target.value)}
                              required=""
                              type="text"
                              value={name}
                            />
                            <FormInput
                              disabled=""
                              label="Product Price"
                              onChange={e =>setPrice(e.target.value)}
                              required=""
                              type="number"
                              value={price}
                            />
                            <FormButton 
                                title={!isLoading ? "Add Product":"Please wait ..."}
                            />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
