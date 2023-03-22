import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Menu } from "./Menu";

describe("Menu Tests", () => {
  beforeEach(() => {
    render(<Menu>Component</Menu>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
