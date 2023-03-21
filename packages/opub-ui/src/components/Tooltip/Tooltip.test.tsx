import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip Tests", () => {
  beforeEach(() => {
    render(<Tooltip>Component</Tooltip>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
