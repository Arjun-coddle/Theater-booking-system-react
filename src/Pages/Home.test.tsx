import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';

jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/ListMovies', () => () => <div data-testid="list-movies">ListMovies</div>);
jest.mock('../components/SlideShow', () => () => <div data-testid="slideshow">SlideShow</div>);

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'JohnDoe');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders Header, Footer, ListMovies, and SlideShow components', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('list-movies')).toBeInTheDocument();
    expect(screen.getByTestId('slideshow')).toBeInTheDocument();
  });

  it('displays the welcome message with the username from localStorage', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('Hello JohnDoe')).toBeInTheDocument();
    expect(screen.getByText('Welcome to MovieMatic')).toBeInTheDocument();
  });

  it('has a link to see all movies', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const seeAllLink = screen.getByText('See All ▶');
    expect(seeAllLink).toBeInTheDocument();
    expect(seeAllLink.closest('a')).toHaveAttribute('href', '/movies');
  });
});