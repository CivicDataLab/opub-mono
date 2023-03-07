import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InlineError } from "./InlineError";

describe("InlineError Tests", () => {
  beforeEach(() => {
    render(<InlineError>Component</InlineError>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
