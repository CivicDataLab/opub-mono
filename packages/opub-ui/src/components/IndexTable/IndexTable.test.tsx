import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { IndexTable } from "./IndexTable";

describe("IndexTable Tests", () => {
  beforeEach(() => {
    render(<IndexTable>Component</IndexTable>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
