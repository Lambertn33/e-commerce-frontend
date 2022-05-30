import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../services/authService'

export default function Navbar({user}) {
    function Logout(){
        auth.logout();
        window.location = "/"
        
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">E-commerce App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
                !user.is_admin ? 
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to ='/user/products' className="nav-link active">Products List</Link>
                    </li>
                    <li className="nav-item">
                        <Link to ='/user/my-transactions' className="nav-link active">My Transactions</Link>
                    </li>
                    <li className="nav-item">
                        <Link to ='/user/my-balance' className="nav-link active">My Wallet</Link>
                    </li>
                </ul>:
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to ='/user/products' className="nav-link active">Products List</Link>
                    </li>
                    <li className="nav-item">
                        <Link to ='/user/products/create' className="nav-link active">Create New Product</Link>
                    </li>
                </ul>
            }
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">{user.names}</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" style={{cursor:'pointer'}} aria-current="page" onClick={Logout}>Logout</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
  )
}
