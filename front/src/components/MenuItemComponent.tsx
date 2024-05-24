import React from "react";
import "../css/menu.css";

export default function MenuItemComponent(props: any) {
    console.log(props)
  return (
    <>
      <div className="menu-items">
        <div className="item-card">
          <div className="item-details">
            <h3 className="item-name">{props.item.name}</h3>
            <p className="item-description">{props.item.description}</p>
            <p className="item-description"> Price: ${props.item.price}</p>
          </div>
          <div className="item-actions">
            <button className="btn-minus">-</button>
            <span className="quantity">0</span>
            <button className="btn-plus">+</button>
          </div>
        </div>
        {/* <!-- Add more item cards here --> */}
      </div>
      {/* <div className="item-details">
        <h3 className="item-name">{props.name}</h3>
        <p className="item-description">{props.description}</p>
        <p className="item-description"> Price: ${props.price}</p>
    </div> */}
      `
    </>
  );
}
