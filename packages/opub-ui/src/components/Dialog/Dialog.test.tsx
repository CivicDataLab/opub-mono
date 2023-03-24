import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog";

describe("Dialog Tests", () => {
  beforeEach(() => {
    render(<Dialog>Component</Dialog>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
