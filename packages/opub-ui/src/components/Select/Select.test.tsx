import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Select } from "./Select";

describe("Select Tests", () => {
  beforeEach(() => {
    render(<Select>Component</Select>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
