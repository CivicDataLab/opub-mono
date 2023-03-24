import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon Tests", () => {
  beforeEach(() => {
    render(<Icon>Component</Icon>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
