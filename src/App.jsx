import React, {useState} from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Route , Routes , useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import RequireAuth from './components/auth/RequireAuth';
import Products from './components/user/Products/Products';
import Purchase from './components/user/Products/Purchase';
import auth from './components/services/authService'
import Account from './components/user/Account/Account';
import Transactions from './components/user/Account/Transactions';
import RequireAuthAdmin from './components/auth/RequireAuthAdmin';
import CreateProduct from './components/admin/CreateProduct';

function App() {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [isLoading , setIsLoading] = useState(false)
  const [hasError , setHasError] = useState(false)
  const [errorMessage , setErrorMessage] = useState('')
  let navigate = useNavigate();

  const attemptToLogin = async() =>{
      try {
          setIsLoading(true)
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
  const useAttemptToLogin = () =>{
    return useMutation(attemptToLogin)
  }
  const { mutate } = useAttemptToLogin()


  const handleSubmit = async(e) =>{
    e.preventDefault()
    const user = { email , password }
    mutate(user)
  }
  return (
   <Routes>
       <Route exact path='/user/products/:id/purchase' element={
          <RequireAuth>
              <Purchase />
          </RequireAuth>
        }>          
       </Route>     
       <Route exact path='/user/my-transactions' element={
          <RequireAuth>
              <Transactions />
          </RequireAuth>
        }>          
       </Route>     
       <Route exact path='/user/my-balance' element={
          <RequireAuth>
              <Account />
          </RequireAuth>
        }>          
       </Route>     
       <Route exact path='/user/products/create' element={
          <RequireAuthAdmin>
              <CreateProduct />
          </RequireAuthAdmin>
        }>          
       </Route>     
       <Route exact path='/user/products' element={
          <RequireAuth>
              <Products />
          </RequireAuth>
        }>          
       </Route>     
       <Route path='/register' element={
         <Register />
        }>          
       </Route>
       <Route exact path='/' element={
         <Login 
          email = {email}
          password={password}
          setEmail = {e=>setEmail(e.target.value)}
          setPassword = {e=>setPassword(e.target.value)}
          handleLogin = {handleSubmit}
          errorMessage={errorMessage}
          hasError = {hasError}
          isLoading = {isLoading}
         />
        }>          
       </Route>
   </Routes>
  );
}

export default App;
