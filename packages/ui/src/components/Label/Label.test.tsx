import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label";

describe("Label Tests", () => {
  beforeEach(() => {
    render(<Label>Component</Label>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
