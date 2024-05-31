import React, { useState , useEffect} from 'react'
import '../css/menu.css'
import NavbarComponent from '../components/NavbarComponent'
import axios from 'axios';
import MenuItemComponent from '../components/MenuItemComponent';
import { ReactReduxContext, useSelector } from 'react-redux';
import Confetti from 'react-confetti'

interface Order{
  items: string[],
  total: number,
  status: string
}

export default function MenuPage() {


    const [total, setTotal] = useState(0)
    const cartItems = useSelector((state:any)=> state.cart)
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState<Order>({ items: [], total: 0, status: "" })
    const [cart, setCart] = useState([])

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

      const handleCheckout = () =>{
        if (total<=0) {
          alert("Cart Empty! Please add items.")
          return
        }
        setOrder({items:cartItems, total: total, status:"Pending"});
        console.log(order)
        alert("Checkout successful")
      }
      const updateTotal = () =>{
        let total = 0;
        cartItems.forEach((item:any) => {
            total += item.price;
        });
        setTotal(total)
      }
      useEffect(()=>{
        updateTotal()
      }, [cartItems])
    
      useEffect(()=>{
        fetchMenu()
      }, [])
      console.log(menu)
    


  return (
    <>

    <NavbarComponent />
    
    <div className="container-menu">
            <h2>Menu</h2>
            <div className= "menu-items">
              {menu.map((item: any) => (    // default we get all trades since "" string is common substring to all title string.. and inclues checnk if a sting is a substring of another string
                <MenuItemComponent key={item._id} item={item} />
            ))}
            </div>
           
    </div>
            <div className="cart">
            <h3>Shopping Cart</h3>
              <ul className="cart-items">
                {cartItems.reduce((uniqueItems: any[], item: any) => {
                  if (!uniqueItems.some(uniqueItem => uniqueItem.name === item.name)) {
                    uniqueItems.push(item);
                  }
                  return uniqueItems;
                }, []).map((item: any) => {
                  const count = cartItems.filter((itemInCart: any) => itemInCart.name === item.name).length;
                  return <li key={item.name}>{item.name} x{count}</li>
                })}
              </ul>
                <p>Total Price: ${total.toFixed(2)}</p>
                <button className="btn-checkout" onClick={handleCheckout}>Checkout</button>

            </div>

    </>
  )
}
