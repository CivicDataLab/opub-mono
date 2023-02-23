import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner Tests", () => {
  beforeEach(() => {
    render(<Spinner>Component</Spinner>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
