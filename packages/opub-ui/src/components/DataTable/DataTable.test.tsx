import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DataTable } from "./DataTable";

describe("DataTable Tests", () => {
  beforeEach(() => {
    render(<DataTable>Component</DataTable>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
