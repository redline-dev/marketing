/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    headerContainer: "headerContainer",
    inner: "inner",
    logo: "logo",
    logoMark: "logoMark",
    logoText: "logoText",
    logoSuffix: "logoSuffix",
    nav: "nav",
    navLink: "navLink",
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

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} className={className} />,
}));

// MobileNav has its own dedicated test suite; stubbing it here avoids
// duplicate nav-link matches, since it intentionally renders the same
// labels as the desktop row for a different breakpoint.
vi.mock("@/components/MobileNav", () => ({
  default: (props: Record<string, unknown>) => (
    <div data-testid="mobile-nav-stub" data-props={JSON.stringify(props)} />
  ),
}));

import Header from "./index";

afterEach(cleanup);

describe("Header", () => {
  it("renders a header landmark", () => {
    const { container } = render(<Header />);

    expect(container.querySelector("header")).toBeTruthy();
  });

  it("renders the logo wordmark", () => {
    const { container } = render(<Header />);

    expect(container.querySelector(".logoText")?.textContent).toBe(
      "REDLINE/dev",
    );
    expect(screen.getByText("/dev")).toBeTruthy();
  });

  it("renders no logo mark when logoSrc is omitted", () => {
    const { container } = render(<Header />);

    expect(container.querySelector("img")).toBeNull();
  });

  it("renders a logo image when logoSrc is provided", () => {
    const { container } = render(<Header logoSrc="/logo.svg" />);

    const logo = container.querySelector("img");

    expect(logo?.getAttribute("src")).toBe("/logo.svg");
  });

  it("renders the desktop nav links", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Work" })).toHaveProperty(
      "href",
      expect.stringContaining("/#work"),
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveProperty(
      "href",
      expect.stringContaining("/#services"),
    );
    expect(screen.getByRole("link", { name: "Process" })).toHaveProperty(
      "href",
      expect.stringContaining("/#process"),
    );
  });

  it("renders the CTA using the shared Button component as a link", () => {
    render(<Header />);

    const cta = screen.getByRole("link", { name: "Start a project" });

    expect(cta.tagName).toBe("A");
    expect(cta).toHaveProperty("href", expect.stringContaining("/#contact"));
  });

  it("marks the matching nav link as the current page", () => {
    render(<Header activeHref="/#services" />);

    expect(
      screen
        .getByRole("link", { name: "Services" })
        .getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Work" }).getAttribute("aria-current"),
    ).toBeNull();
  });

  it("wires the nav items, active link, and CTA into MobileNav", () => {
    const { getByTestId } = render(<Header activeHref="/#services" />);

    const props = JSON.parse(
      getByTestId("mobile-nav-stub").getAttribute("data-props") ?? "{}",
    );

    expect(props.items).toEqual([
      { label: "Work", href: "/#work" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
    ]);
    expect(props.activeHref).toBe("/#services");
    expect(props.ctaHref).toBe("/#contact");
    expect(props.ctaLabel).toBe("Start a project");
  });
});
