import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge Tests", () => {
  beforeEach(() => {
    render(<Badge>Component</Badge>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
