import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link Tests", () => {
  beforeEach(() => {
    render(<Link>Component</Link>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
