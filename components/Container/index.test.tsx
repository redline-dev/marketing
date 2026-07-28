/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    container: "container",
    default: "default",
    narrow: "narrow",
    full: "full",
  },
}));

import Container from "./index";

describe("Container", () => {
  it("renders children inside a div by default", () => {
    const { container } = render(<Container>content</Container>);

    const el = container.querySelector("div");

    expect(el).toBeTruthy();
    expect(el?.textContent).toBe("content");
  });

  it("applies the default size class", () => {
    const { container } = render(<Container>content</Container>);

    const el = container.querySelector("div");

    expect(el?.className).toContain("container");
    expect(el?.className).toContain("default");
  });

  it("applies the requested size class", () => {
    const { container } = render(<Container size="narrow">content</Container>);

    expect(container.querySelector("div")?.className).toContain("narrow");
  });

  it("renders a custom element via `as`", () => {
    const { container } = render(<Container as="section">content</Container>);

    expect(container.querySelector("section")).toBeTruthy();
  });

  it("merges a custom className", () => {
    const { container } = render(
      <Container className="extra">content</Container>,
    );

    expect(container.querySelector("div")?.className).toContain("extra");
  });
});
