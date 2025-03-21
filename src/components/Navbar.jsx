import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Navbar({onSearch}) {

    const [searchItem, setSearchItem] = useState("")

    const { cart } = useCart();


    const calculateCartCount = () =>
      cart.reduce((total, item) => total + item.quantity, 0);


    const handleSearch = (e) =>{
        e.preventDefault();
        onSearch(searchItem);
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Cloth-Hub</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart ({calculateCartCount()})
            </Link>
          </li>
        </ul>
        <form className="d-flex" onSubmit={handleSearch}>
          <input className="form-control me-2" 
          type="search" 
          placeholder="Search" 
          aria-label="Search" 
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

