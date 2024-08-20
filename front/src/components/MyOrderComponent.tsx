import React, { useEffect, useState } from "react";
import "../css/myorder.css";
import { io } from "socket.io-client";


const socket = io("http://localhost:8000")

export default function MyOrderComponent(props: any) {
    const [orderStatus, setOrderStatus] =useState('Processing')

    const handleSendUpdate = ()=> {
        // socket.emit('update-status', orderStatus)
        console.log(orderStatus)
    }

    const handleUpdateSelector = (e:any)=> {
        setOrderStatus(e.target.value);
    }




  return (
    <div className="order-card">
      <div className="order-details">
        <p>
          <strong>Items:</strong>  {props.data.items && props.data.items.map((item:any, index:any)=>{return (<>{item.name} x{item.quantity} </>)})}
        </p>
        <p>
          <strong>Prices:</strong> {props.data.items && props.data.items.map((item:any, index:any)=>{return (<>${item.price} </>)})}
        </p>
        <p>
          <strong>Total Price:</strong> ${props.data.total && props.data.total.toFixed(2)}
        </p>
        <p>
          <strong>Status:</strong> {props.data.status && props.data.status}
        </p>
      </div>
      <div className="update-status">
        <select onChange={handleUpdateSelector}>
          <option value="Processing">Processing</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button className="m-2" onClick={handleSendUpdate}>Update Status</button>
      </div>
    </div>
  );
}
