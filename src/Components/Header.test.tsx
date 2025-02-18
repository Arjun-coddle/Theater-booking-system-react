import { render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import '@testing-library/jest-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header Component", () => {
  it("should render logo, navigation links, search bar, and logout button", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByAltText("app-logo")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("More...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });

  it("should call navigate on logout button click", async () => {
    const navigateMock = jest.fn();
    jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {});
    (jest.mocked(useNavigate) as jest.Mock).mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /log out/i });

    await userEvent.click(logoutButton);

    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
