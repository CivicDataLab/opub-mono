import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton";

describe("IconButton Tests", () => {
  beforeEach(() => {
    render(<IconButton>Component</IconButton>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
