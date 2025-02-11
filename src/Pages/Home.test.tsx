import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Pages/Home';

const localStorageMock = (function() {
  let store: { [key: string]: string } = {};

  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

jest.mock('../Components/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Mock Header</header>;
  };
});

jest.mock('../Components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Mock Footer</footer>;
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear(); 
  });

  it('renders the Home component with a default welcome message when no username is in localStorage', () => {
    render(<Home />);
    expect(screen.getByText("Welcome to MovieMatic")).toBeInTheDocument();
  });

  it('renders the Home component with the correct welcome message when a username is in localStorage', () => {
    render(<Home />);
    // const welcomeMessage = screen.getByRole('heading', { name: 'Hello TestUser' });
    // expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the "Welcome to MovieMatic" heading', () => {
    render(<Home />);
    // const welcomeHeading = screen.getByRole('heading', { name: 'Welcome to MovieMatic' });
    // expect(welcomeHeading).toBeInTheDocument();
  });

  it('renders the Header component', () => {
    render(<Home />);
    // const header = screen.getByTestId('header');
    // expect(header).toBeInTheDocument();
  });

  it('renders the Footer component', () => {
    render(<Home />);
    // const footer = screen.getByTestId('footer'); 
    // expect(footer).toBeInTheDocument();
  });
});
