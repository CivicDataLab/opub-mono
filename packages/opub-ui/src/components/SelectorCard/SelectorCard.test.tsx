import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SelectorCard } from "./SelectorCard";

describe("SelectorCard Tests", () => {
  beforeEach(() => {
    render(<SelectorCard>Component</SelectorCard>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
