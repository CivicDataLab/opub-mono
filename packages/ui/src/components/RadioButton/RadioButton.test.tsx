import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RadioButton } from "./RadioButton";

describe("RadioButton Tests", () => {
  beforeEach(() => {
    render(<RadioButton>Component</RadioButton>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
