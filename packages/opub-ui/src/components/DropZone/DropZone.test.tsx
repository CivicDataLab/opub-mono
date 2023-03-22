import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DropZone } from "./DropZone";

describe("DropZone Tests", () => {
  beforeEach(() => {
    render(<DropZone>Component</DropZone>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
