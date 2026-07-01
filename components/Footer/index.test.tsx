/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    footerContainer: "footerContainer",
  },
}));

import Footer from "./index";

describe("Footer", () => {
  it("renders a footer element", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");

    expect(footer).toBeTruthy();
    expect(footer?.className).toBe("footerContainer");
  });
});
