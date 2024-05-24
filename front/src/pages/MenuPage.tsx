import React, { useState , useEffect} from 'react'
import '../css/menu.css'
import NavbarComponent from '../components/NavbarComponent'
import axios from 'axios';
import MenuItemComponent from '../components/MenuItemComponent';


export default function MenuPage() {

    const [menu, setMenu] = useState([]);

    console.log("menu", menu);
    const fetchMenu = async () =>{

        try {
          let uri = "http://localhost:8000/user/get-menu"
          const response = await axios.get(uri)
        //   console.log(response.data)
          setMenu(response.data.menu[0].menu)
        }
        catch(error:any){
          console.log(error.response.data);
    
        }
      }
    
      useEffect(()=>{
        fetchMenu()
      }, [])
      console.log(menu)
    


  return (
    <>

    <NavbarComponent />
    
    <div className="container-menu">
            <h2>Menu</h2>

            {menu.map((item: any) => (    // default we get all trades since "" string is common substring to all title string.. and inclues checnk if a sting is a substring of another string
              <MenuItemComponent key={item._id} item={item}/>
          ))}
            <div className="menu-items">
                <div className="item-card">
                    <div className="item-details">
                        <h3 className="item-name">Burger</h3>
                        <p className="item-description">A delicious burger with all the fixings.</p>
                        <p className="item-description"> Price: $3.00</p>
                    </div>
                    <div className="item-actions">
                        <button className="btn-minus">-</button>
                        <span className="quantity">0</span>
                        <button className="btn-plus">+</button>
                    </div>
                </div>
                {/* <!-- Add more item cards here --> */}
            </div>
            <div className="cart">
                <h3>Shopping Cart</h3>
                <ul className="cart-items">
                    {/* <!-- Cart items will be added dynamically --> */}
                    <li>Burger x2</li>
                </ul>
                <p>Total Price: $6.00</p>
                <button className="btn-checkout">Checkout</button>
            </div>
        </div>

    </>
  )
}
