import React from 'react'
import '../css/orders.css'
import NavbarComponent from '../components/NavbarComponent'
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:8000")

export default function OrdersPage() {
  return (
    <>
    <NavbarComponent />

    <div className="container-orders-page">
        <h2>Orders</h2>
        <div className="orders">
            <div className="order-card">
                <div className="order-details">
                    <p><strong>Items:</strong> Burger x2, Pizza x1</p>
                    <p><strong>Prices:</strong> $10.00, $12.00</p>
                    <p><strong>Total Price:</strong> $22.00</p>
                    <p><strong>Status:</strong> In Progress</p>
                </div>
                <div className="update-status">
                    <select>
                        <option value="processing">Processing</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <button>Update Status</button>
                </div>
            </div>
            {/* <!-- Add more order cards here --> */}
        </div>
    </div>
    </>
  )
}
