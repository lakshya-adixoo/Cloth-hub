import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './screen/Home'
import Navbar from './components/Navbar'
import About from './screen/About'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <>
    <CartProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route path='/cart' element={<Cart/>} />
    </Routes>
    </BrowserRouter>
    </CartProvider>
    </>
  )
}
