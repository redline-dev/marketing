/** @vitest-environment jsdom */

import { render } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: { stack: "stack" },
}));

import Stack from "./index";

describe("Stack", () => {
  it("renders children in a div with the stack class", () => {
    const { container } = render(<Stack>content</Stack>);

    const el = container.querySelector("div");

    expect(el?.className).toContain("stack");
    expect(el?.textContent).toBe("content");
  });

  it("sets base custom properties from default direction and gap", () => {
    const { container } = render(<Stack>content</Stack>);

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.getPropertyValue("--stack-direction-base")).toBe("column");
    expect(el.style.getPropertyValue("--stack-gap-base")).toBe(
      "var(--space-lg)",
    );
  });

  it("emits a custom property per breakpoint for responsive values", () => {
    const { container } = render(
      <Stack direction={{ base: "column", md: "row" }}>content</Stack>,
    );

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.getPropertyValue("--stack-direction-base")).toBe("column");
    expect(el.style.getPropertyValue("--stack-direction-md")).toBe("row");
    expect(el.style.getPropertyValue("--stack-direction-lg")).toBe("");
  });

  it("maps gap tokens to space variables", () => {
    const { container } = render(<Stack gap="xxl">content</Stack>);

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.getPropertyValue("--stack-gap-base")).toBe(
      "var(--space-xxl)",
    );
  });

  it("applies align, justify and wrap", () => {
    const { container } = render(
      <Stack align="center" justify="space-between" wrap>
        content
      </Stack>,
    );

    const el = container.querySelector("div") as HTMLElement;

    expect(el.style.alignItems).toBe("center");
    expect(el.style.justifyContent).toBe("space-between");
    expect(el.style.flexWrap).toBe("wrap");
  });
});
