import React , {useState} from 'react'
import Navbar from '../../reusable/Navbar'
import auth from '../../services/authService'
import Product from './Product'
import { useQuery } from 'react-query'
import * as productsService from '../../services/productsService'

export default function Products() {
  const user = auth.getCurrentUser()
  const [products , setProducts] = useState([]);
  const {isLoading, isError} = useQuery('products',productsService.getAllProducts,{
    onSuccess:products =>{
      setProducts(products.data)
    }
  })
  return (
    <div>
        <Navbar user={user}/>
        <div className='container'>
           <div className="row">
             <h2 style={{padding:'3%', textAlign:'center'}}>Availables Products In Stock</h2>
             {
               isLoading? 
               <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
              </div>
               :
               isError? 
               <div className='alert alert-danger'> an error occured..please try again</div>
               :
               products.map(product=>{
                 return <Product
                  key = {product.id}
                  id={product.id}
                  name = {product.name} 
                  price = {product.price}
                  user={user}
                  />
               })
             }
           </div>
        </div>
    </div>
  )
}
