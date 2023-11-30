import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Tray } from "./Tray";

describe("Tray Tests", () => {
  beforeEach(() => {
    render(<Tray>Component</Tray>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
