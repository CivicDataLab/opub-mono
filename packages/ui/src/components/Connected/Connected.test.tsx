import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Connected } from "./Connected";

describe("Connected Tests", () => {
  beforeEach(() => {
    render(<Connected>Component</Connected>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
