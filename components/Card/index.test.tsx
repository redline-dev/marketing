/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    card: "card",
    sm: "sm",
    md: "md",
    lg: "lg",
    interactive: "interactive",
    accent: "accent",
  },
}));

import Card from "./index";

afterEach(cleanup);

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Card content</Card>);

    expect(screen.getByText("Card content")).toBeTruthy();
  });

  it("renders as a div", () => {
    render(<Card>Card content</Card>);

    expect(screen.getByText("Card content").tagName).toBe("DIV");
  });

  it("defaults to md padding with no interactive or accent styling", () => {
    render(<Card>Card content</Card>);

    const card = screen.getByText("Card content");

    expect(card.className).toContain("md");
    expect(card.className).not.toContain("interactive");
    expect(card.className).not.toContain("accent");
  });

  it("applies the requested padding variant", () => {
    render(<Card padding="lg">Card content</Card>);

    expect(screen.getByText("Card content").className).toContain("lg");
  });

  it("applies the interactive hover hook when requested", () => {
    render(<Card interactive>Card content</Card>);

    expect(screen.getByText("Card content").className).toContain("interactive");
  });

  it("applies the accent styling when requested", () => {
    render(<Card accent>Card content</Card>);

    expect(screen.getByText("Card content").className).toContain("accent");
  });
});
