import React from 'react'
import '../css/navbar.css';
import { Link } from 'react-router-dom';


export default function NavbarComponent() {
  console.log("rendering navbar")
  return (
    <>
    <div>
      <ul className="container">
            <span className="sub-container">
                <Link to="/user/home"><li>Home</li></Link>
                <Link to="/user/menu"><li>Menu</li></Link>
                <Link to="/user/orders"><li>Orders</li></Link>
            </span>
            <span className="sub-container"> 
                <Link to="/user/profile"><li>Profile</li></Link>
                <Link to="/"><li className="logout">Logout</li></Link>
                <Link to="/"><li>Login</li></Link>
                <Link to="/signup"><li>Sign Up</li></Link>
            </span>
        </ul>
    </div>
    </>
  )
}
