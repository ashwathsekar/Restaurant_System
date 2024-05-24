
import '../css/profile.css'
import NavbarComponent from '../components/NavbarComponent'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

export default function ProfilePage() {
    const {user} = useAuth();
    console.log("Helloo", user);

    const fetchOrders = async () =>{

        try {
          let uri = "http://localhost:8000/user/get-orders"
          const response = await axios.post(uri, user._id)
          console.log(response.data)
        }
        catch(error:any){
          console.log(error.response.data);
    
        }
      }
    
      useEffect(()=>{
        fetchOrders()
      }, [])

  return (
    <>
    <NavbarComponent />

    <div className="container-profile">
            <div className="profile">
                <h2>Profile</h2>
                <div className="profile-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                </div>
                <h3>My Orders</h3>
                <div className="orders">
                    <div className="order-card">
                        <div className="order-details">
                            <p><strong>Items:</strong> Burger x2, Pizza x1</p>
                            <p><strong>Total Price:</strong> $22.00</p>
                            <p><strong>Status:</strong> In Progress</p>
                        </div>
                    </div>
                    {/* {//<!-- Add more order cards here -->} */}
                </div>
            </div>
        </div>
    </>
  )
}
