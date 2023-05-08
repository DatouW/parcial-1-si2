import React from "react";
import "../../styles/product-card.css";
export default function ProductCard() {
  return (
    <div className="product_item">
      <div className="product_img">
        <img src="" alt="" />
      </div>
      <h3 className="product_name"></h3>
      <span></span>
      <div className="product_cart-bottom">
        <span className="price"></span>
        <span>
          <i className="ri-add-line"></i>
        </span>
      </div>
    </div>
  );
}
