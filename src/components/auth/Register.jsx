import React , {useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useMutation ,useQueryClient } from 'react-query'
import FormInput from '../reusable/Form/FormInput'
import FormErrorMessage from '../reusable/Form/FormErrorMessage'
import FormButton from '../reusable/Form/FormButton'
import auth from '../services/authService'

export default function Register() {
    const [names , setNames] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [hasError , setHasError] = useState(false)
    const [errorMessage , setErrorMessage] = useState('')
    const queryClient = useQueryClient()
    let navigate = useNavigate();

    const attemptToSignUp = async() =>{
        try {
            setIsLoading(true)
            await auth.register(names , email , password)
            await auth.login(email , password)
            window.location.href ="/user/products"
        } catch (error) {
          setIsLoading(false)
          if(error && error.response.status !== 200){
              setHasError(true)
              setErrorMessage(error.response.data.message)
          }
        }
    }
    const useAttemptToSignUp = () =>{
        return useMutation(attemptToSignUp,{
            onSuccess:()=>{
                queryClient.invalidateQueries('products')
               }
        })
      }
      const { mutate } = useAttemptToSignUp()
    
    
      const handleSubmit = async(e) =>{
        e.preventDefault()
        const user = { names , email , password }
        mutate(user)
      }
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3" style={{paddingTop:'100px'}}>
            <div className="card d-flex justify-content-center ">
                <div className="card-body">
                <h4 className="card-title" style={{textAlign:'center'}}>Welcome To E-Commerce App</h4>
                    <h6 style={{textAlign:'center'}}>Sign Up</h6>
                    <form onSubmit={handleSubmit}>
                        {
                            hasError && 
                           <FormErrorMessage errorMessage={errorMessage} />
                        }
                        <FormInput 
                          label="Names"
                          disabled=""
                          onChange={e =>setNames(e.target.value)}
                          required=""
                          type="text"
                          value={names}
                        />
                        <FormInput 
                          label="Email address"
                          disabled=""
                          onChange={e =>setEmail(e.target.value)}
                          required=""
                          type="email"
                          value={email}
                        />
                        <FormInput 
                          label="Password"
                          disabled=""
                          onChange={e =>setPassword(e.target.value)}
                          required=""
                          type="password"
                          value={password}
                        />
                        <FormButton 
                             title={isLoading ? "Please wait..":"Register"}
                        />
                    <Link to="/" className='link-primary'>Already Have an Account?</Link>
                </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
