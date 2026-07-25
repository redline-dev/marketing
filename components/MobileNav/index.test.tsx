/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    mobileNav: "mobileNav",
    toggle: "toggle",
    bar: "bar",
    barOpenTop: "barOpenTop",
    barOpenHide: "barOpenHide",
    barOpenBottom: "barOpenBottom",
    panel: "panel",
    panelOpen: "panelOpen",
    panelNav: "panelNav",
    panelLink: "panelLink",
  },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    ...rest
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
}));

import MobileNav from "./index";

afterEach(cleanup);

const ITEMS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
];

describe("MobileNav", () => {
  it("renders a closed toggle button by default", () => {
    render(<MobileNav items={ITEMS} ctaHref="/#contact" ctaLabel="Start" />);

    const toggle = screen.getByRole("button", { name: "Open menu" });

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("opens the panel and shows nav links + CTA when toggled", () => {
    render(<MobileNav items={ITEMS} ctaHref="/#contact" ctaLabel="Start" />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(
      screen
        .getByRole("button", { name: "Close menu" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    expect(screen.getByRole("link", { name: "Work" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Services" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Start" })).toBeTruthy();
  });

  it("closes when a nav link is clicked", () => {
    render(<MobileNav items={ITEMS} ctaHref="/#contact" ctaLabel="Start" />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("link", { name: "Work" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toBeTruthy();
  });

  it("closes on Escape", () => {
    render(<MobileNav items={ITEMS} ctaHref="/#contact" ctaLabel="Start" />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeTruthy();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.getByRole("button", { name: "Open menu" })).toBeTruthy();
  });

  it("marks the matching link as the current page", () => {
    render(
      <MobileNav
        items={ITEMS}
        activeHref="/#services"
        ctaHref="/#contact"
        ctaLabel="Start"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(
      screen
        .getByRole("link", { name: "Services" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Work" }).getAttribute("aria-current"),
    ).toBeNull();
  });
});
