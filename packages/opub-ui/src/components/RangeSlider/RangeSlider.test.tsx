import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RangeSlider } from "./RangeSlider";

describe("RangeSlider Tests", () => {
  beforeEach(() => {
    render(<RangeSlider>Component</RangeSlider>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
