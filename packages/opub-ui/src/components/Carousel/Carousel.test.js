import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Carousel } from "./Carousel";

describe("Carousel Tests", () => {
  beforeEach(() => {
    render(<Carousel>Component</Carousel>);
  });

  test("should show Component text all the time", () => {
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
