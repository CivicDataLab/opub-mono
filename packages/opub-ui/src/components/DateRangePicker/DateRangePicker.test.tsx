import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DateRangePicker } from "./DateRangePicker";

describe("DateRangePicker Tests", () => {
  beforeEach(() => {
    render(<DateRangePicker>Component</DateRangePicker>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
