import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../screen/About';


jest.mock('../components/Navbar', () => () => <div data-testid="navbar-mock">Mocked Navbar</div>);

describe('AboutUs Page', () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  it('renders the Navbar component', () => {
    expect(screen.getByTestId('navbar-mock')).toBeInTheDocument();
  });

  it('renders the hero section heading and description', () => {
    expect(screen.getByText('About Cloth-Hub')).toBeInTheDocument();
    expect(screen.getByText(/Discover fashion with purpose/i)).toBeInTheDocument();
  });

  it('renders the "Who We Are" section', () => {
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
    expect(
      screen.getByText(/We are an online clothing store that believes in empowering people/i)
    ).toBeInTheDocument();
  });

  it('renders the "Our Mission" section', () => {
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(
      screen.getByText(/To revolutionize online fashion by delivering comfortable/i)
    ).toBeInTheDocument();
  });

  it('renders all values in "What We Stand For"', () => {
    expect(screen.getByText('Quality')).toBeInTheDocument();
    expect(screen.getByText('Affordability')).toBeInTheDocument();
    expect(screen.getByText('Customer First')).toBeInTheDocument();
  });

  it('renders the CTA section and button', () => {
    expect(screen.getByText('Be a Part of the Cloth-Hub Family')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore Products' })).toBeInTheDocument();
  });
});
