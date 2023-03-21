import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Thumbnail } from "./Thumbnail";

describe("Thumbnail Tests", () => {
  beforeEach(() => {
    render(<Thumbnail>Component</Thumbnail>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
