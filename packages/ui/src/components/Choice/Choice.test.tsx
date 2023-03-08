import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Choice } from "./Choice";

describe("Choice Tests", () => {
  beforeEach(() => {
    render(<Choice>Component</Choice>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
