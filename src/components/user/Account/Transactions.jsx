import React,{useState} from 'react'
import Navbar from '../../reusable/Navbar'
import { useQuery } from 'react-query'
import * as auth from '../../services/authService'
import * as userFunctions from '../../services/userFunctionService'
import FormErrorMessage from '../../reusable/Form/FormErrorMessage'

export default function Transactions() {
  const user = auth.getCurrentUser()
  const [transactions , setTransactions] = useState([])
  const { isLoading, isError} = useQuery('transactions',userFunctions.myTransactions,{
    onSuccess:(data)=>{
      setTransactions(data.data)
    }
  })
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
  return  <FormErrorMessage errorMessage="an error occured...please try again" />
}
  return (
    <div>
        <Navbar user={user}/>
        <div className='container'>
           <div className="row">
              <div className="col-md-8">
                <br />
                  <table class="table caption-top">
                          <caption>List of My Transactions</caption>
                          <thead>
                            <tr>
                              <th scope="col">Description</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              transactions.map(transaction=>{
                                return(
                                  <tr>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.amount} FRWS</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                  </table>
              </div>
           </div>
        </div>
    </div>
  )
}
