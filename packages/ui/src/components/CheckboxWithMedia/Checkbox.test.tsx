import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox Tests", () => {
  beforeEach(() => {
    render(<Checkbox>Component</Checkbox>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
