import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Combobox } from "./Combobox";

describe("Combobox Tests", () => {
  beforeEach(() => {
    render(<Combobox>Component</Combobox>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
