import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Flex } from "./Flex";

describe("Flex Tests", () => {
  beforeEach(() => {
    render(<Flex>Component</Flex>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
