/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./index.module.css", () => ({
  default: {
    headerContainer: "headerContainer",
  },
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import Header from "./index";

describe("Header", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_NAME = "Redline Development";
  });

  it("renders a home link with the site name", () => {
    render(<Header />);

    const siteTitle = screen.getByRole("heading", {
      level: 1,
      name: "Redline Development",
    });
    const homeLink = screen.getByRole("link", { name: "Redline Development" });

    expect(siteTitle).toBeTruthy();
    expect(homeLink.getAttribute("href")).toBe("/");
  });
});
