import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";

export default function Cart() {
  const { addToCart, cart, decrementToCart } = useCart();

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getProductQuantity = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="list-group mb-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <img
                      className="card-img-top fixed-image"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div>
                    <h5>{item.title}</h5>
                    <p>
                      Price: ${item.price} | Quantity: {item.quantity}
                    </p>
                  </div>
                  {getProductQuantity(item.id) > 0 ? (
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => decrementToCart(item)}
                      >
                        -
                      </button>
                      <span>{getProductQuantity(item.id)}</span>
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <h4
              className=""
              style={{
                marginBottom: "7rem",
                backgroundColor: "chartreuse",
                width: "205px",
                textAlign: "center",
                borderRadius: "5px",
              }}
            >
              Total: ${calculateTotal().toFixed(2)}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}
