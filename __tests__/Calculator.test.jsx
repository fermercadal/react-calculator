import { render, screen } from "@testing-library/react";
import Calculator from "../components/Calculator";
import "@testing-library/jest-dom";

describe("Calculator", () => {
  it("renders calculator", () => {
    render(<Calculator />);

    const heading = screen.getByRole("heading", {
      name: /React Calculator/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
