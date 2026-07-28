/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    divider: "divider",
    horizontal: "horizontal",
    vertical: "vertical",
  },
}));

import Divider from "./index";

describe("Divider", () => {
  it("renders an <hr> with the horizontal orientation by default", () => {
    const { container } = render(<Divider />);

    const el = container.querySelector("hr");

    expect(el).toBeTruthy();
    expect(el?.className).toContain("horizontal");
    expect(el?.getAttribute("aria-orientation")).toBe("horizontal");
  });

  it("applies the vertical orientation class and aria attribute", () => {
    const { container } = render(<Divider orientation="vertical" />);

    const el = container.querySelector("hr");

    expect(el?.className).toContain("vertical");
    expect(el?.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("sets the spacing custom property from the token", () => {
    const { container } = render(<Divider spacing="xl" />);

    const el = container.querySelector("hr") as HTMLElement;

    expect(el.style.getPropertyValue("--divider-spacing")).toBe(
      "var(--space-xl)",
    );
  });

  it("defaults spacing to 0", () => {
    const { container } = render(<Divider />);

    const el = container.querySelector("hr") as HTMLElement;

    expect(el.style.getPropertyValue("--divider-spacing")).toBe("0");
  });
});
