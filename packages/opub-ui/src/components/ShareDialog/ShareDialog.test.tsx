import "@testing-library/jest-dom";
import { ShareDialog } from "./ShareDialog";
import { render, screen } from "@testing-library/react";

describe("ShareDialog Tests", () => {
  beforeEach(() => {
    render(<ShareDialog>Component</ShareDialog>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
