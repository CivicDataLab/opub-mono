import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Autocomplete } from "./Autocomplete";

describe("Autocomplete Tests", () => {
  beforeEach(() => {
    render(<Autocomplete>Component</Autocomplete>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
