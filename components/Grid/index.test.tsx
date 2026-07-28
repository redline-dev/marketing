/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: { grid: "grid" },
}));

import Grid from "./index";

describe("Grid", () => {
  it("renders children in a div with the grid class", () => {
    const { container } = render(<Grid>content</Grid>);

    expect(container.querySelector("div")?.className).toContain("grid");
  });

  it("maps a fixed column count to a repeat() template", () => {
    const { container } = render(<Grid columns={3}>content</Grid>);

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.getPropertyValue("--grid-columns-base")).toBe(
      "repeat(3, minmax(0, 1fr))",
    );
  });

  it("emits a column template per breakpoint for responsive columns", () => {
    const { container } = render(
      <Grid columns={{ base: 1, md: 2, lg: 4 }}>content</Grid>,
    );

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.getPropertyValue("--grid-columns-base")).toBe(
      "repeat(1, minmax(0, 1fr))",
    );
    expect(el.style.getPropertyValue("--grid-columns-md")).toBe(
      "repeat(2, minmax(0, 1fr))",
    );
    expect(el.style.getPropertyValue("--grid-columns-lg")).toBe(
      "repeat(4, minmax(0, 1fr))",
    );
  });

  it("uses an auto-fit template when minChildWidth is set", () => {
    const { container } = render(
      <Grid minChildWidth="16rem" columns={3}>
        content
      </Grid>,
    );

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.gridTemplateColumns).toContain("auto-fit");
    expect(el.style.gridTemplateColumns).toContain("16rem");
    // columns is ignored in favour of the fluid template
    expect(el.style.getPropertyValue("--grid-columns-base")).toBe("");
  });

  it("maps gap tokens to space variables", () => {
    const { container } = render(<Grid gap="lg">content</Grid>);

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.getPropertyValue("--grid-gap-base")).toBe(
      "var(--space-lg)",
    );
  });
});
