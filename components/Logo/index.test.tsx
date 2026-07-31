/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    logo: "logo",
    mark: "mark",
    wordmark: "wordmark",
    bold: "bold",
    regular: "regular",
    suffix: "suffix",
    sm: "sm",
    md: "md",
    lg: "lg",
  },
}));

import Logo from "./index";

afterEach(cleanup);

describe("Logo", () => {
  it("renders the wordmark and suffix", () => {
    render(<Logo />);

    expect(screen.getByText("REDLINE")).toBeTruthy();
    expect(screen.getByText("/dev")).toBeTruthy();
  });

  it("defaults to medium size and bold weight", () => {
    render(<Logo />);

    const wordmark = screen.getByText("REDLINE");

    expect(wordmark.className).toContain("bold");
    expect(wordmark.closest(".logo")?.className).toContain("md");
  });

  it("applies the regular weight when bold is false", () => {
    render(<Logo bold={false} />);

    const wordmark = screen.getByText("REDLINE");

    expect(wordmark.className).toContain("regular");
    expect(wordmark.className).not.toContain("bold");
  });

  it("applies the requested size", () => {
    render(<Logo size="sm" />);

    expect(screen.getByText("REDLINE").closest(".logo")?.className).toContain(
      "sm",
    );
  });
});
