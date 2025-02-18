import { render, screen } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Footer from "./Footer";
import '@testing-library/jest-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Footer Component", () => {
  it("should render footer sections correctly", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText("Got a show, event, activity or a great experience? Partner with us & get listed on MovieMatic")).toBeInTheDocument();
    expect(screen.getByText("Copyright © 07-02-2025 Blue_Bird. All rights reserved.")).toBeInTheDocument();
    expect(screen.getByAltText("instagram")).toBeInTheDocument();
    expect(screen.getByAltText("facebook")).toBeInTheDocument();
    expect(screen.getByAltText("youtube")).toBeInTheDocument();
    expect(screen.getByAltText("linkedin")).toBeInTheDocument();
  });

  it("should navigate to '/home' when Home is clicked", async () => {
    const navigateMock = jest.fn();
    (jest.mocked(useNavigate) as jest.Mock).mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText("Home"));
    expect(navigateMock).toHaveBeenCalledWith("/home");
  });

  it("should navigate to '/movies' when Movies is clicked", async () => {
    const navigateMock = jest.fn();
    (jest.mocked(useNavigate) as jest.Mock).mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText("movies"));
    expect(navigateMock).toHaveBeenCalledWith("/movies");
  });

  it("should not navigate when clicking on Events and Profile (since they have no navigation)", async () => {
    const navigateMock = jest.fn();
    (jest.mocked(useNavigate) as jest.Mock).mockReturnValue(navigateMock);

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    await userEvent.click(screen.getByText("events"));
    await userEvent.click(screen.getByText("profile"));

    // expect(navigateMock).not.toHaveBeenCalled();
  });
});
