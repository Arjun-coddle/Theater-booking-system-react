import { render, screen } from "@testing-library/react";
import { SecureRouteProvider, SecureRoute } from "../Context/SecureRoute";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

const TestComponent = () => {
    const context = useContext(SecureRoute);
    if (!context) throw new Error("SecureRoute must be used within SecureRouteProvider");
    const { state, dispatch } = context;
    
    return (
        <div>
            <p>Current User: {state.user}</p>
            <button onClick={() => dispatch({ type: "LOGIN", payload: "test_user" })}>Login</button>
            <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
        </div>
    );
};

test("renders SecureRouteProvider and handles login/logout actions", async () => {
    render(
        <SecureRouteProvider>
            <TestComponent />
        </SecureRouteProvider>
    );
    
    expect(screen.getByText("Current User: null")).toBeInTheDocument();
    
    await userEvent.click(screen.getByText("Login"));
    expect(screen.getByText("Current User: test_user")).toBeInTheDocument();
    
    await userEvent.click(screen.getByText("Logout"));
    expect(screen.getByText("Current User: null")).toBeInTheDocument();
});

test("initializes with token from localStorage", () => {
    localStorage.setItem("token", "saved_user");
    render(
        <SecureRouteProvider>
            <TestComponent />
        </SecureRouteProvider>
    );
    expect(screen.getByText("Current User: saved_user")).toBeInTheDocument();
    localStorage.removeItem("token");
});
