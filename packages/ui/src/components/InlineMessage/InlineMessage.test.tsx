import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InlineMessage } from "./InlineMessage";

describe("InlineMessage Tests", () => {
  beforeEach(() => {
    render(<InlineMessage>Component</InlineMessage>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
