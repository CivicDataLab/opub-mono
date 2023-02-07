import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InputBase } from "./InputBase";

describe("InputBase Tests", () => {
  beforeEach(() => {
    render(<InputBase>Component</InputBase>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
