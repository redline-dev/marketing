/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    button: "button",
    primary: "primary",
    secondary: "secondary",
    sm: "sm",
    md: "md",
    lg: "lg",
  },
}));

import Button from "./index";

afterEach(cleanup);

describe("Button", () => {
  it("renders children as a native button by default", () => {
    render(<Button>Start a project</Button>);

    const button = screen.getByRole("button", { name: "Start a project" });

    expect(button).toBeTruthy();
    expect(button.tagName).toBe("BUTTON");
  });

  it("defaults to the primary variant and medium size", () => {
    render(<Button>Start a project</Button>);

    const button = screen.getByRole("button");

    expect(button.className).toContain("primary");
    expect(button.className).toContain("md");
  });

  it("applies the requested variant and size", () => {
    render(
      <Button variant="secondary" size="lg">
        View work
      </Button>,
    );

    const button = screen.getByRole("button");

    expect(button.className).toContain("secondary");
    expect(button.className).toContain("lg");
  });

  it("disables the native button element", () => {
    render(<Button disabled>Start a project</Button>);

    const button = screen.getByRole("button", { name: "Start a project" });

    expect(button).toHaveProperty("disabled", true);
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Start a project
      </Button>,
    );

    screen.getByRole("button", { name: "Start a project" }).click();

    expect(onClick).not.toHaveBeenCalled();
  });

  it("fires onClick when enabled", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Start a project</Button>);

    screen.getByRole("button", { name: "Start a project" }).click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders as an anchor when href is provided", () => {
    render(<Button href="#contact">Start a project</Button>);

    const link = screen.getByRole("link", { name: "Start a project" });

    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("#contact");
  });

  it("renders a disabled link as a non-interactive element with aria-disabled", () => {
    render(
      <Button href="#contact" disabled>
        Start a project
      </Button>,
    );

    expect(screen.queryByRole("link")).toBeNull();

    const disabledLink = screen.getByText("Start a project");

    expect(disabledLink.tagName).toBe("SPAN");
    expect(disabledLink.getAttribute("aria-disabled")).toBe("true");
  });
});
