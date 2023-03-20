import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Switch } from "./Switch";

describe("Switch Tests", () => {
  beforeEach(() => {
    render(<Switch>Component</Switch>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
