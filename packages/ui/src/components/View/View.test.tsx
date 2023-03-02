import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { View } from "./View";

describe("View Tests", () => {
  beforeEach(() => {
    render(<View>Component</View>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
