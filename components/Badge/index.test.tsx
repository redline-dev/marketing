/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    badge: "badge",
    accent: "accent",
    neutral: "neutral",
  },
}));

import Badge from "./index";

afterEach(cleanup);

describe("Badge", () => {
  it("renders its label text", () => {
    render(<Badge>BACKEND</Badge>);

    expect(screen.getByText("BACKEND")).toBeTruthy();
  });

  it("defaults to the accent tone", () => {
    render(<Badge>BACKEND</Badge>);

    expect(screen.getByText("BACKEND").className).toContain("accent");
  });

  it("applies the requested tone", () => {
    render(<Badge tone="neutral">DRAFT</Badge>);

    expect(screen.getByText("DRAFT").className).toContain("neutral");
  });

  it("renders as a span", () => {
    render(<Badge>BACKEND</Badge>);

    expect(screen.getByText("BACKEND").tagName).toBe("SPAN");
  });
});
