import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";

describe("Separator Tests", () => {
  beforeEach(() => {
    render(<Separator>Component</Separator>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
