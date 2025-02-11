import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import SignUp from "../Pages/SignUp";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("SignUp Component", () => {
  test("renders the form correctly", () => {
    render(<SignUp />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    render(<SignUp />);
    fireEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Please enter your name")).toBeInTheDocument();
    expect(await screen.findByText("Please enter your email")).toBeInTheDocument();
    expect(await screen.findByText("Please enter a password")).toBeInTheDocument();
  });

  test("allows input changes", () => {
    render(<SignUp />);

    const nameInput = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput).toHaveValue("John Doe");

    const emailInput = screen.getByPlaceholderText("Enter your email");
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput).toHaveValue("john@example.com");
  });

  test("submits form successfully", async () => {
    mockedAxios.post.mockResolvedValue({ data: { message: "Success" } });
    window.alert = jest.fn();

    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3003/signup",
      { username: "John Doe", email: "john@example.com", password: "password123" }
    ));

    expect(window.alert).toHaveBeenCalledWith("Sign up completed for John Doe");
  });
});

test("handles API error gracefully", async () => {
  mockedAxios.post.mockRejectedValue(new Error("Network Error"));
  window.alert = jest.fn();

  render(<SignUp />);

  fireEvent.change(screen.getByPlaceholderText("Enter your name"), { target: { value: "John Doe" } });
  fireEvent.change(screen.getByPlaceholderText("Enter your email"), { target: { value: "john@example.com" } });
  fireEvent.change(screen.getByPlaceholderText("Enter password"), { target: { value: "password123" } });

  fireEvent.click(screen.getByText("Submit"));

  await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Something went wrong. Please try again."));
});
