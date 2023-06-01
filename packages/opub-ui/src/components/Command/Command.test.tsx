import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Command } from "./Command";

describe("Command Tests", () => {
  beforeEach(() => {
    render(<Command>Component</Command>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
