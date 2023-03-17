import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ActionList } from "./ActionList";

describe("ActionList Tests", () => {
  beforeEach(() => {
    render(<ActionList>Component</ActionList>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
