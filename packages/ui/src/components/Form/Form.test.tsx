import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Form } from "./Form";

describe("Form Tests", () => {
  beforeEach(() => {
    render(<Form>Component</Form>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
