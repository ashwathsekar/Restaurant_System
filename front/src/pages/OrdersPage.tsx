import React, {useState} from 'react'
import '../css/orders.css'
import NavbarComponent from '../components/NavbarComponent'
import { io, Socket } from "socket.io-client";
import MyOrderComponent from '../components/MyOrderComponent';

const socket = io("http://localhost:8000")


export default function OrdersPage() {

    const [orders, setOrders] = useState<any>([])
    console.log("ODERS", orders)

    socket.on('place-order', (order)=>{
        console.log("Hello World!")
        console.log(order)
        setOrders([...orders, order])
    })
  return (
    <>
    <NavbarComponent />

    <div className="container-orders-page">
        
        <h2 className='m-5'>Orders</h2>
        {/* {JSON.stringify(orders)} */}
        <div className="orders">
            {orders && orders.map((order:any, index:any)=>{
                return(
                    <MyOrderComponent key={index} data={order} />        
                )
            })}
            {/* <!-- Add more order cards here --> */}
        </div>
    </div>
    </>
  )
}
