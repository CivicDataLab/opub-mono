import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TimeField } from "./TimeField";

describe("TimeField Tests", () => {
  beforeEach(() => {
    render(<TimeField>Component</TimeField>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
