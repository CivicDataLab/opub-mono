import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TextField } from "./TextField";

describe("TextField Tests", () => {
  beforeEach(() => {
    render(<TextField>Component</TextField>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
