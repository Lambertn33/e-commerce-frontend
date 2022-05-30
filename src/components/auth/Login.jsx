import React from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../reusable/Form/FormInput'
import FormErrorMessage from '../reusable/Form/FormErrorMessage'
import FormButton from '../reusable/Form/FormButton'

export default function Login({email , password , setEmail , setPassword , handleLogin , isLoading ,hasError , errorMessage ,hideErrorMessage}) {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3" style={{paddingTop:'100px'}}>
                <div className="card d-flex justify-content-center ">
                    <div className="card-body">
                    <h4 className="card-title" style={{textAlign:'center'}}>Welcome To E-Commerce App</h4>
                    <h6 style={{textAlign:'center'}}>Sign In</h6>
                     
                    <form onSubmit={handleLogin}>
                        {
                            hasError && 
                           <FormErrorMessage errorMessage={errorMessage} />
                        }
                        <FormInput 
                          label="Email address"
                          disabled=""
                          onChange={setEmail}
                          required=""
                          type="email"
                          value={email}
                        />
                        <FormInput 
                          label="Password"
                          disabled=""
                          onChange={setPassword}
                          required=""
                          type="password"
                          value={password}
                        />
                        <FormButton 
                        title={isLoading ? "Please wait..":"Login"}
                        />
                        <Link to="/register" className='link-primary'>New Customer?</Link>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
