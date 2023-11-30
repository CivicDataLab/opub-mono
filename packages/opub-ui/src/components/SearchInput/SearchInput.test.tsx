import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput Tests", () => {
  beforeEach(() => {
    render(<SearchInput>Component</SearchInput>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
