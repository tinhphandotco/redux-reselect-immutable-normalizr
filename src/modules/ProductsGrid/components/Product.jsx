import React from "react";

import { timeAgo, formatMoney } from 'utils';

import "./Product.scss";

export default function Product({ product }) {
  return (
    <div className="product">
      <div className="face">
        <span style={{ fontSize: product.size + "px" }}>{product.face}</span>
      </div>
      <div><b>Price:</b> <span className="price">${formatMoney(product.price)}</span></div>
      <div><b>Size:</b> {product.size}</div>
      <div><b>Date:</b> {timeAgo(product.date)}</div>
      <button className="buy">Add to card</button>
    </div>
  );
}
