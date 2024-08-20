import React, { useState, useEffect } from "react";
import "../css/menu.css";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";
import MenuItemComponent from "../components/MenuItemComponent";
import { ReactReduxContext, useSelector } from "react-redux";
import Confetti from "react-confetti";
import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:8000");

interface Order {
  items: string[];
  total: number;
  status: string;
}

export default function MenuPage() {
  const [total, setTotal] = useState(0);
  const cartItems = useSelector((state: any) => state.cart);
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState<Order>({
    items: [],
    total: 0,
    status: "",
  });
  const [cart, setCart] = useState([]);

  // console.log("menu", menu);
  // console.log("Catitems", cartItems);

  const orderParser = (cartitems: [any]) => {
    let new_items: any = [
      {
        name: cartitems[0].name,
        price: cartitems[0].price,
        description: cartitems[0].description,
        quantity: 1,
      },
    ];

    for (let i = 1; i < cartitems.length; i++) {
      let found = false;
      for (let j = 0; j < new_items.length; j++) {
        if (new_items && new_items[j].name === cartitems[i].name) {
          new_items[j].quantity = new_items[j].quantity + 1;
          found = true; 
          break;
         }   
        }

        if (!found){
          new_items.push({
            name: cartitems[i].name,
            price: cartitems[i].price,
            description: cartitems[i].description,
            quantity: 1,
          });
         }
   
      }

    // console.log("Modified items: ", new_items);
    return new_items;
  };

  const fetchMenu = async () => {
    try {
      let uri = "http://localhost:8000/user/get-menu";
      const response = await axios.get(uri);
      //   console.log(response.data)
      setMenu(response.data.menu[0].menu);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleCheckout = () => {
    if (total <= 0 && order.items) {
      alert("Cart Empty! Please add items.");
      return;
    }
    console.log("Cart", cartItems);
    console.log("Total", total);
    orderParser(cartItems);

    console.log("Client side: ");
    console.log(order);
    socket.emit("new-order", order);
    alert("Checkout successful");
  };
  const updateTotal = () => {
    let total = 0;
    cartItems.forEach((item: any) => {
      total += item.price;
    });
    setTotal(total);
    let items = cartItems.length !== 0 ? orderParser(cartItems) : [];
    setOrder({ ...order, items: items, total: total, status: "Pending" });
  };
  useEffect(() => {
    updateTotal();
  }, [cartItems]);

  useEffect(() => {
    fetchMenu();
  }, []);
  // console.log(menu)

  return (
    <>
      <NavbarComponent />

      <div className="container-menu">
        <h2>Menu</h2>
        <div className="menu-items">
          {menu.map(
            (
              item: any // default we get all trades since "" string is common substring to all title string.. and inclues checnk if a sting is a substring of another string
            ) => (
              <MenuItemComponent key={item._id} item={item} />
            )
          )}
        </div>
      </div>
      <div className="cart">
        <h3>Shopping Cart</h3>
        <ul className="cart-items">
          {cartItems
            .reduce((uniqueItems: any[], item: any) => {
              if (
                !uniqueItems.some((uniqueItem) => uniqueItem.name === item.name)
              ) {
                uniqueItems.push(item);
              }
              return uniqueItems;
            }, [])
            .map((item: any) => {
              const count = cartItems.filter(
                (itemInCart: any) => itemInCart.name === item.name
              ).length;
              return (
                <li key={item.name}>
                  {item.name} x{count}
                </li>
              );
            })}
        </ul>
        <p>Total Price: ${total.toFixed(2)}</p>
        <button className="btn-checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
}
