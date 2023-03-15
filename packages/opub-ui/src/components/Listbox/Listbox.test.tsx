import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Listbox } from "./Listbox";

describe("Listbox Tests", () => {
  beforeEach(() => {
    render(<Listbox>Component</Listbox>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
