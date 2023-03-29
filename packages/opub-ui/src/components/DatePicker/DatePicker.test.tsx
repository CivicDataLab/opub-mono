import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DatePicker } from "./DatePicker";

describe("DatePicker Tests", () => {
  beforeEach(() => {
    render(<DatePicker>Component</DatePicker>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
