import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar Tests", () => {
  beforeEach(() => {
    render(<ProgressBar>Component</ProgressBar>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
