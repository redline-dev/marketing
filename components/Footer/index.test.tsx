/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    footerContainer: "footerContainer",
    copyright: "copyright",
  },
}));

import Footer from "./index";

afterEach(cleanup);

describe("Footer", () => {
  it("renders a footer element", () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector("footer");

    expect(footer).toBeTruthy();
    expect(footer?.className).toBe("footerContainer");
  });

  it("renders the Logo wordmark", () => {
    render(<Footer />);

    expect(screen.getByText("REDLINE")).toBeTruthy();
  });

  it("renders the current year in the copyright notice", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();

    expect(
      screen.getByText((text) => text.includes(year) && text.includes("©")),
    ).toBeTruthy();
  });
});
