import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import '../css/home.css'

export default function HomePage() {
  return (
    <>
    <NavbarComponent />
    
    <div className="container-home">
        <div className="header-home">
            <h1>Welcome to our Restaurant</h1>
            <p>Order delicious food online or manage orders as an employee</p>
        </div>
        
    </div>
    </>
  )
}
