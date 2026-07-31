/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    section: "section",
    compact: "compact",
    spacious: "spacious",
    none: "none",
  },
}));

import Section from "./index";

describe("Section", () => {
  it("renders a <section> by default with the base class", () => {
    const { container } = render(<Section>content</Section>);

    const el = container.querySelector("section");

    expect(el).toBeTruthy();
    expect(el?.className).toContain("section");
  });

  it("does not add a modifier class for the default spacing", () => {
    const { container } = render(<Section>content</Section>);

    const el = container.querySelector("section");

    expect(el?.className).not.toContain("compact");
    expect(el?.className).not.toContain("spacious");
  });

  it("adds the modifier class for non-default spacing", () => {
    const { container } = render(<Section spacing="compact">content</Section>);

    expect(container.querySelector("section")?.className).toContain("compact");
  });

  it("renders a custom element via `as`", () => {
    const { container } = render(<Section as="div">content</Section>);

    expect(container.querySelector("div")).toBeTruthy();
    expect(container.querySelector("section")).toBeNull();
  });
});
