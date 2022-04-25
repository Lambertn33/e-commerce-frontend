import React,{useState} from 'react'
import Navbar from '../../reusable/Navbar'
import { useQuery,useMutation,useQueryClient } from 'react-query'
import * as auth from '../../services/authService'
import * as userFunctions from '../../services/userFunctionService'
import FormInput from '../../reusable/Form/FormInput'
import FormButton from '../../reusable/Form/FormButton'
import { useNavigate } from 'react-router-dom'
import FormErrorMessage from '../../reusable/Form/FormErrorMessage'
import FormSuccessMessage from '../../reusable/Form/FormSuccessMessage'

export default function Account() {
  const [balance , setBalance] = useState('')
  const [hasError , setHasError] = useState(false)
  const [hasSuccess , setHasSuccess] = useState(false)
  const [isUpdating , setIsUpdating] = useState(false)
  const [errorMessage , setErrorMessage] = useState('')
  const [successMessage , setSuccessMessage] = useState('')
  const user = auth.getCurrentUser()
  const queryClient = useQueryClient()
  let navigate = useNavigate();
  const topUpMyBalance = async() =>{
        try {
            setIsUpdating(true)
            await userFunctions.topUpMyBalance(balance)
        } catch (error) {
        if(error && error.response.status !== 200){
            setIsUpdating(false)
            setHasError(true)
            setErrorMessage(error.response.data.message)
        }
        }
    }
    const useTopUpMyBalance = () =>{
        return useMutation(topUpMyBalance ,{
            onSuccess:()=>{
                queryClient.invalidateQueries('balance')
                setHasSuccess(true)
                setSuccessMessage('Balance Updated Successfully')
                setBalance('')
            }
        })
      }
    const { mutate } = useTopUpMyBalance()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        mutate(balance)
      }
  const {data , isLoading, isError} = useQuery('balance',userFunctions.myBalance)
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
          return  <FormErrorMessage errorMessage="an error occured..please try again" />
      }

  return (
    <div>
        <Navbar user={user} />
        <div className='container'>
                    <div className="row">
                        <h2 style={{padding:'3%', textAlign:'center'}}>My Balance</h2>
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
                                {
                                     hasSuccess && 
                                     <FormSuccessMessage successMessage={successMessage} />
                                }
                                <FormInput
                                    label="Available Balance"
                                    onChange={e=>setBalance(e.target.value)}
                                    value={data.balance}
                                    required=''
                                    disabled='disabled'
                                    type='number'
                                />
                                <FormInput
                                    label="Top Up Your Balance"
                                    onChange={e=>setBalance(e.target.value)}
                                    value={balance}
                                    required='required'
                                    disabled=''
                                    type='number'
                                  
                                />
                                <FormButton 
                                  title={!isLoading ? "Top Up balance":"Please wait ..."}
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
