import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

jest.mock('../context/CartContext');
jest.mock('../components/Navbar', () => () => <div>Mocked Navbar</div>);

describe('Cart Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty cart message', () => {
    useCart.mockReturnValue({
      cart: [],
      addToCart: jest.fn(),
      decrementToCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('renders cart items and total price', () => {
    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: 'Test Product',
          price: 10.0,
          quantity: 2,
          image: 'test.jpg',
        },
      ],
      addToCart: jest.fn(),
      decrementToCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $10 | Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument();
  });

  it('calls addToCart when + button is clicked', () => {
    const addToCartMock = jest.fn();

    useCart.mockReturnValue({
      cart: [
        {
          id: 1,
          title: 'Test Product',
          price: 10.0,
          quantity: 1,
          image: 'test.jpg',
        },
      ],
      addToCart: addToCartMock,
      decrementToCart: jest.fn(),
    });

    render(<Cart />);

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    expect(addToCartMock).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Product',
      price: 10.0,
      quantity: 1,
      image: 'test.jpg',
    });
  });

  it('calls decrementToCart when - button is clicked', () => {
    const decrementToCartMock = jest.fn();

    useCart.mockReturnValue({
      cart: [
        {
          id: 2,
          title: 'Test Product 2',
          price: 5.0,
          quantity: 2,
          image: 'test2.jpg',
        },
      ],
      addToCart: jest.fn(),
      decrementToCart: decrementToCartMock,
    });

    render(<Cart />);

    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);

    expect(decrementToCartMock).toHaveBeenCalledWith({
      id: 2,
      title: 'Test Product 2',
      price: 5.0,
      quantity: 2,
      image: 'test2.jpg',
    });
  });
});
