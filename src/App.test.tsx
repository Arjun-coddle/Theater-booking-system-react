import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Movies from "./Pages/Movies";
import SignUp from "./Pages/SignUp";
import ViewMovieDeatiles from "./Pages/ViewMovieDeatiles";

describe("Signup Route", () => {
  test("renders component on route", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/view/:id" element={<ViewMovieDeatiles />} />
        </Routes>
      </MemoryRouter>
    );

  });
});
