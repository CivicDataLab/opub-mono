import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TextArea } from "./TextArea";

describe("TextArea Tests", () => {
  beforeEach(() => {
    render(<TextArea>Component</TextArea>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
