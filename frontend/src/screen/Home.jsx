import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [ SearchTerm , setSearchTerm] = useState("");
  const { addToCart, cart, decrementToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getProduct")
      .then((response) => {
        setData(response.data.Products);
        setFilteredData(response.data.Products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    console.log(SearchTerm);
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const truncateText = (text, wordLimit) => {
    return (
      text.split(" ").slice(0, wordLimit).join(" ") +
      (text.split(" ").length > wordLimit ? "..." : "")
    );
  };

  const getProductQuantity = (productId) => {
    const productInCart = cart.find((item) => item.id === productId);
    return productInCart ? productInCart.quantity : 0;
  };
  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="container mt-4">
        <div className="row ">
          {filteredData.map((item) => (
            <div key={item.id} className="col-md-3 mb-3 ">
              <div
                className="card full-cart "
                style={{ width: "18rem", height: "36rem" }}
              >
                <img
                  className="card-img-top fixed-image"
                  src={item.image}
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{truncateText(item.title, 7)}</h5>
                  <p className="card-text">
                    {truncateText(item.description, 20)}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${item.price}
                  </p>

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
                </div>
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div className="col-12 text-center">
              <h4>No products found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
