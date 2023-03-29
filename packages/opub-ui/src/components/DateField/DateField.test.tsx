import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DateField } from "./DateField";

describe("DateField Tests", () => {
  beforeEach(() => {
    render(<DateField>Component</DateField>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
