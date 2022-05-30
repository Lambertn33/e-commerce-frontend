import React from 'react'
import { Link } from 'react-router-dom'
import productImage from './Product.jpg'

export default function Product({id , name , price,user}) {
  return (
    <div className="col-md-3">
        <div class="card" style={{width:'18rem',padding:'4%'}}>
            <img src={productImage} class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">{price} frws</p>
                {
                  !user.is_admin && <Link to={`/user/products/${id}/purchase`} class="btn btn-primary">Buy Product</Link>
                }
            </div>
        </div>
    </div>
  )
}
