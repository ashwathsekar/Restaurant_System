import React, { useEffect, useState } from "react";
import "../css/myorder.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function MyOrderComponent(props: any) {
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
        <select>
          <option value="processing">Processing</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
        </select>
        <button className="m-2">Update Status</button>
      </div>
    </div>
  );
}
