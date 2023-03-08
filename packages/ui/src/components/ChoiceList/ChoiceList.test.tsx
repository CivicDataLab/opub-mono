import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CheckboxGroup } from "./CheckboxGroup";

describe("CheckboxGroup Tests", () => {
  beforeEach(() => {
    render(<CheckboxGroup>Component</CheckboxGroup>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
