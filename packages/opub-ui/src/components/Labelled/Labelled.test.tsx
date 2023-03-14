import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Labelled } from "./Labelled";

describe("Labelled Tests", () => {
  beforeEach(() => {
    render(<Labelled>Component</Labelled>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
