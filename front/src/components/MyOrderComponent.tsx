import React from 'react'
import '../css/myorder.css'

export default function MyOrderComponent() {
  return (
    
    <div className="container-myorder">
        <div className="card">
            <h2>My Order</h2>
            <div className="order-details">
                <div className="item">
                    <span className="name">Burger</span>
                    <span className="quantity">x2</span>
                    <span className="price">$10.00</span>
                </div>
                <div className="item">
                    <span className="name">Pizza</span>
                    <span className="quantity">x1</span>
                    <span className="price">$12.00</span>
                </div>
                <div className="total">
                    <span>Total:</span>
                    <span className="total-price">$22.00</span>
                </div>
                <div className="status">
                    <span>Status:</span>
                    <span className="order-status">In Progress</span>
                </div>
            </div>
        </div>
    </div>
  )
}
