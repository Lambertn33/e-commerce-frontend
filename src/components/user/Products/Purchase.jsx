import React , {useState} from 'react'
import Navbar from '../../reusable/Navbar'
import auth from '../../services/authService'
import { useQuery , useMutation,useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as productsService from '../../services/productsService'
import * as userFunctionService from '../../services/userFunctionService'
import FormInput from '../../reusable/Form/FormInput'
import FormButton from '../../reusable/Form/FormButton'
import FormErrorMessage from '../../reusable/Form/FormErrorMessage'
import {useParams} from 'react-router-dom'

export default function Purchase() {
    const user = auth.getCurrentUser()
    const [ quantity , setQuantity] = useState('');
    const [ discount , setDiscount] = useState(0);
    const [ totalPriceBeforeDiscount , setTotalPriceBeforeDiscount] = useState(0);
    const [ totalPriceAfterDiscount , setTotalPriceAfterDiscount] = useState(0);
    const [ isSaving , setIsSaving] = useState('');
    const [ hasError , setHasError] = useState(false);
    const [errorMessage , setErrorMessage] = useState('')
    const {id} = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {data , isLoading, isError} = useQuery(['product',id],()=>productsService.getSingleProduct(id))
    const purchaseProduct = async() =>{
        try {
            setIsSaving(true)
            await userFunctionService.purchaseProduct(id , quantity)
            navigate('/user/my-transactions')
        } catch (error) {
          setIsSaving(false)
          if(error && error.response.status !== 200){
              setHasError(true)
              setErrorMessage(error.response.data.message)
          }
        }
    }
    const usePurchaseProduct = () =>{
        return useMutation(purchaseProduct,{
           onSuccess:()=>{
            queryClient.invalidateQueries('transactions')
           }
        })
      }
      const { mutate } = usePurchaseProduct()
      const handleSubmit = async(e) =>{
        e.preventDefault()
        mutate(id , quantity)
      }
      if(isLoading){
            return (
                <div className='d-flex justify-content-center'>
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
      }
      if(isError){
          return <div className='alert alert-danger'> an error occured..please try again</div>
      }
      const setPrices = (e) =>{
        setQuantity(e.target.value)
        setTotalPriceBeforeDiscount(e.target.value * data.price)
        if(data.price >= 50 && data.price <=100){
            let discount = (e.target.value * data.price) - ((e.target.value * data.price) * 0)
            setDiscount((e.target.value * data.price) * 0)
            setTotalPriceAfterDiscount(discount)
        }else if(data.price >= 112 && data.price <=115){
           let discount = (e.target.value * data.price) - (((e.target.value * data.price) * 0.25)/100)
           setDiscount(((e.target.value * data.price) * 0.25)/100)
           setTotalPriceAfterDiscount(discount)
        }else if(data.price >= 120){
            let discount = (e.target.value * data.price) - (((e.target.value * data.price) * 0.5)/100)
            setDiscount(((e.target.value * data.price) * 0.5)/100)
           setTotalPriceAfterDiscount(discount)
        }
      }
      function calculateDiscount(price){
          if(price >= 50 && price <=100){
              return "0% discount"
          }else if(price >= 112 && price <=115){
            return "0.25% discount"
          }else if(price >= 120){
            return "0.50% discount"
          }
      }
      
        return (
            <div>
                <Navbar user={user}/>
                <div className='container'>
                    <div className="row">
                        <h2 style={{padding:'3%', textAlign:'center'}}>Buy {data.name} Product <span><span class="badge bg-danger">{calculateDiscount(data.price)}</span></span></h2>
                    </div>
                    <div className="row">
                        <div className="card">
                           <div className="card-body">
                           <div className="offset-md-3 col-md-6">
                            <form onSubmit={handleSubmit}>
                                {
                                    hasError && 
                                   <FormErrorMessage errorMessage={errorMessage} />
                                }
                                <FormInput 
                                    label="Product Price"
                                    disabled="disabled"
                                    onChange=""
                                    required=""
                                    type="number"
                                    value={data.price}

                                />
                                <FormInput 
                                    label="Quantity"
                                    disabled=""
                                    onChange={setPrices}
                                    required="required"
                                    type="number"
                                    value={quantity}

                                />
                                <FormInput 
                                    label="Total Price Before Discount"
                                    disabled="disabled"
                                    onChange=""
                                    required=""
                                    type="number"
                                    value={totalPriceBeforeDiscount}

                                />
                                <FormInput 
                                    label="Discount"
                                    disabled="disabled"
                                    onChange=""
                                    required=""
                                    type="number"
                                    value={discount}

                                />
                                <FormInput 
                                    label="Total Price After Discount"
                                    disabled="disabled"
                                    onChange=""
                                    required=""
                                    type="number"
                                    value={totalPriceAfterDiscount}

                                />
                                <FormButton
                                  title={ isSaving ? "Please wait...":"Purchase"}
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
