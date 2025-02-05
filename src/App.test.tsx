// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { SecureRouteProvider } from './Context/SecureRoute';

const renderWithSecureRouteProvider = (state: { user: { name: string; } | null; }) => {
  return render(
    <SecureRouteProvider value={{ state }}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </SecureRouteProvider>
  );
};

describe('App Component', () => {
  test('renders Login component when user is not authenticated', () => {
    renderWithSecureRouteProvider({ user: null });

    // Check if Login component is rendered
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renders Home component when user is authenticated', () => {
    renderWithSecureRouteProvider({ user: { name: 'John Doe' } });

    // Navigate to home route
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );

    // Check if Home component is rendered
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  test('renders SignUp component on /signup route', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );

    // Check if SignUp component is rendered
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
